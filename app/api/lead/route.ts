export async function POST(request: Request) {
  const body = await request.json();
  console.log('New lead:', body);
  // כאן אפשר לשלוח מייל, או לשמור ב-Supabase
  return Response.json({ success: true });
}