import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    // אתחול Stripe בתוך הפונקציה - פותר את בעיית ה-Build!
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    // Supabase Client לשרת (עם Service Role Key)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await req.text();
    const sig = req.headers.get('stripe-signature')!;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Webhook signature verification failed.`, err);
      return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 });
    }

    // טיפול באירועים מ-Stripe
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const organizationId = session.metadata?.organizationId;
        const subscriptionId = session.subscription;

        if (userId && organizationId && subscriptionId) {
          // עדכון טבלת subscriptions ב-Supabase
          const { error } = await supabase
            .from('subscriptions')
            .upsert({
              organization_id: organizationId,
              stripe_subscription_id: subscriptionId,
              stripe_price_id: session?.line_items?.data?.[0]?.price?.id,
              status: 'active',
              current_period_start: new Date(session.created * 1000).toISOString(),
              current_period_end: new Date(session.expires_at * 1000).toISOString(),
            });

          if (error) {
            console.error('Error updating Supabase:', error);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Unhandled error in webhook:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}