export async function POST(request: Request) {
  const body = await request.json();
  console.log('New lead:', body);
  // Here you can save to Supabase or send email later
  return Response.json({ success: true });
}
