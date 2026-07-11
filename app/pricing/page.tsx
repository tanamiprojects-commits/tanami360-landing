// app/pricing/page.tsx
"use client";

import { useState } from "react";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      // ⚠️ ממש כאן, בשורה הבאה, אתה צריך להדביק את ה-ID שמצאת ב-Stripe:
      const priceId = "price_1Ts1UxHaU1rZ5s1kJCYGBObR"; // <--- החלף כאן בנתון האמיתי!

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("שגיאה ביצירת התשלום.");
      }
    } catch (error) {
      console.error(error);
      alert("שגיאה");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-[#1A1A4F] mb-4">Tanami360 Platform</h1>
      <p className="text-gray-600 mb-8">התחל את המסע שלך עם פלטפורמה דיגיטלית מותאמת אישית.</p>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-2">Starter Plan</h2>
        <p className="text-4xl font-bold text-[#FF3B5C] mb-6">190 ₪<span className="text-sm font-normal text-gray-500"> / חודש</span></p>
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full py-3 bg-[#FF3B5C] text-white rounded-lg font-bold hover:bg-[#e53250] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "מעביר לתשלום..." : "התחל עכשיו"}
        </button>
      </div>
    </div>
  );
}