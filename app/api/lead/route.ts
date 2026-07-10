import { Resend } from 'resend';

// אתחול ה-Resend עם מפתח ה-API (שמור ב-Vercel Environment Variables)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('New lead body:', body);

    // בדיקה מוקדמת: האם המפתח קיים?
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ Missing RESEND_API_KEY environment variable');
      return Response.json({ error: 'Configuration Error: Missing API Key' }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Tanami360 <onboarding@resend.dev>',
      to: ['tanami.projects@gmail.com'],
      subject: 'פנייה חדשה מאתר Tanami360!',
      html: `
        <h2>התקבלה פנייה חדשה מהאתר</h2>
        <p><strong>פרטי הפונה:</strong></p>
        <pre>${JSON.stringify(body, null, 2)}</pre>
        <p>מומלץ לבדוק ולחזור בהקדם.</p>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
    
  } catch (error) {
    console.error('Server Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}