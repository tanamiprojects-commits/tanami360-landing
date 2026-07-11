import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('New lead received:', body);

    // פרק את הנתונים מהגוף הבקשה (אם חסר שדה, נציג "לא צוין")
    const name = body.name || 'לא צוין';
    const email = body.email || 'לא צוין';
    const phone = body.phone || 'לא צוין';
    const platform = body.platform || 'לא צוין';
    const features = body.features ? body.features.join(', ') : 'לא צוין';
    const scope = body.scope || 'לא צוין';
    const budget = body.budget || 'לא צוין';

    if (!process.env.RESEND_API_KEY) {
      console.error('❌ Missing RESEND_API_KEY');
      return Response.json({ error: 'Configuration Error: Missing API Key' }, { status: 500 });
    }

    // שליחת המייל עם עיצוב HTML מקצועי
    const { data, error } = await resend.emails.send({
      from: 'Tanami360 <hello@tanami360.com>', // כעת נשלח מהדומיין המאומת שלך!
      to: ['hello@tanami360.com'], // כעת נשלח לתיבה העסקית שלך!
      subject: '📬 פנייה חדשה מאתר Tanami360!',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: #f9f9f9;">
          <h2 style="color: #1A1A4F; border-bottom: 2px solid #FF3B5C; padding-bottom: 10px;">📋 התקבלה פנייה חדשה מאתר Tanami360!</h2>
          <p style="font-size: 16px;">להלן פרטי הפונה והצרכים שלו. מומלץ לחזור אליו בהקדם.</p>
          
          <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin-top: 15px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; width: 30%; color: #555;">שם מלא</td>
                <td style="padding: 8px 0; color: #111;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">דוא"ל</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1A1A4F; text-decoration: none;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">טלפון</td>
                <td style="padding: 8px 0;">${phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">סוג פלטפורמה</td>
                <td style="padding: 8px 0;">${platform}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">תכונות נבחרות</td>
                <td style="padding: 8px 0;">${features}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">היקף הפרויקט</td>
                <td style="padding: 8px 0;">${scope}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">תקציב משוער</td>
                <td style="padding: 8px 0;">${budget}</td>
              </tr>
            </table>
          </div>
          
          <p style="margin-top: 20px; font-size: 14px; color: #777; text-align: center;">צוות Tanami360 - פיתוח פלטפורמות דיגיטליות.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    console.log('✅ Email sent successfully!');
    return Response.json({ success: true });

  } catch (error) {
    console.error('Server Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}