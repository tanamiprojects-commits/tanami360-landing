// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// דף דינמי (מונע ניסיון Pre-rendering בשרת)
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ האתחול נעשה אך ורק בצד הלקוח - זה פותר את ה-Build Error!
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login"); // אם לא מחובר - העבר ל-Login
      } else {
        setUser(user);
      }
      setLoading(false);
    };
    getUser();
  }, [router]);

  if (loading) return <div className="flex justify-center p-10 text-gray-500">טוען...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-[#1A1A4F]">ברוך הבא, {user.email}!</h1>
      <p className="text-gray-600 mt-2">זהו האזור האישי שלך. כאן יופיעו המנוי שלך ופרטי הפרויקט.</p>
      
      <div className="mt-8 bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="font-semibold text-lg">סטטוס מנוי</h3>
        <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
          <div className="h-2 w-1/2 bg-green-500 rounded-full"></div>
        </div>
        <p className="mt-2 text-sm text-gray-500">מנוי פעיל (תקופת ניסיון)</p>
      </div>
    </div>
  );
}