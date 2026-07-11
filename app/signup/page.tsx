// app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert("שגיאה בהרשמה: " + error.message);
    } else {
      alert("נרשמת בהצלחה! עכשיו התחבר עם הפרטים האלה.");
      router.push("/login");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-[#1A1A4F] mb-6">הרשמה לפלטפורמה</h2>
        <input type="email" placeholder="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 border border-gray-300 rounded mb-4" />
        <input type="password" placeholder="סיסמה (לפחות 6 תווים)" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 border border-gray-300 rounded mb-6" />
        <button disabled={loading} className="w-full bg-[#1A1A4F] text-white p-3 rounded font-bold hover:opacity-90 disabled:opacity-50">
          {loading ? "נרשם..." : "הירשם"}
        </button>
        <p className="text-sm text-center mt-4">כבר יש לך חשבון? <span className="text-[#FF3B5C] cursor-pointer" onClick={() => router.push("/login")}>התחבר כאן</span></p>
      </form>
    </div>
  );
}