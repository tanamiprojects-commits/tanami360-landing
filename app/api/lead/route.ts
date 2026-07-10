import { Resend } from 'resend';

// אתחול ה-Resend עם מפתח ה-API שלנו (נתון שיישמר ב-Vercel)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('New lead:', body);

    // כאן אנו שולחים את המייל בפועל!
    const { data, error } = await resend.emails.send({
      from: 'Tanami360 <onboarding@resend.dev>', // שלב מתקדם: אחרי אימות דומיין Resend נחליף את זה ל- hello@tanami360.com
      to: ['hello@tanami360.com'],
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

    // אם הכל עבר בהצלחה, מחזירים הצלחה
    return Response.json({ success: true, data });
    
  } catch (error) {
    console.error('Server Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}