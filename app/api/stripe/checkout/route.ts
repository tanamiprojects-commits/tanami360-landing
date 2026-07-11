import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    // אתחול Stripe בתוך הפונקציה - זה פותר את בעיית ה-Build!
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const body = await req.json();
    const { priceId, userId, organizationId } = body;

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    // יצירת Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get('origin')}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/pricing`,
      metadata: {
        userId: userId || '',
        organizationId: organizationId || '',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error('Error creating checkout session:', err);
    // אם נכשלנו בגלל שאין מפתח, זה יחזיר שגיאה ברורה במקום לקרוס בבנייה
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}