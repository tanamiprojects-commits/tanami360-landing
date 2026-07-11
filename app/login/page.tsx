// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// אתחול הלקוח
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("שגיאה: " + error.message);
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-[#1A1A4F] mb-6">כניסה לפלטפורמה</h2>
        <input 
          type="email" 
          placeholder="אימייל" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="w-full p-3 border border-gray-300 rounded mb-4" 
        />
        <input 
          type="password" 
          placeholder="סיסמה" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className="w-full p-3 border border-gray-300 rounded mb-6" 
        />
        <button 
          disabled={loading} 
          className="w-full bg-[#1A1A4F] text-white p-3 rounded font-bold hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "מתחבר..." : "התחבר"}
        </button>
        <p className="text-sm text-center mt-4">
          עדיין לא נרשמת? <span className="text-[#FF3B5C] cursor-pointer" onClick={() => alert("יש להוסיף דף הרשמה נפרד בהמשך")}>הירשם כאן</span>
        </p>
      </form>
    </div>
  );
}