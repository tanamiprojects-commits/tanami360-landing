'use client';

import { useState, useEffect, useRef } from 'react';

// ============ Types ============
type Language = 'en' | 'he';

interface Selection {
  platform: string;
  features: string[];
  scope: string;
  name: string;
  email: string;
  phone: string;
}

// ============ Content Library (bilingual, with explanations) ============
const content: Record<Language, any> = {
  en: {
    // Hero
    heroTitle: '360° Platforms — Built, Hosted, Maintained.',
    heroSub: 'From idea to live product, Tanami360 handles it all.',
    startCta: 'Start Your Project',
    aboutTitle: 'About Tanami360',
    aboutText: 'We are a digital studio based in Herzliya, Israel. We design, develop, host, and maintain custom web platforms — all under a predictable monthly plan.',
    servicesTitle: 'What We Do',
    services: [
      { title: 'Build', desc: 'Custom platforms with Next.js, Supabase, and AI.' },
      { title: 'Host', desc: 'Fast, secure hosting on Vercel with automatic SSL.' },
      { title: 'Maintain', desc: 'Monthly updates, daily backups, and priority support.' },
    ],
    // Guide
    guideTitle: 'How It Works',
    guideSteps: [
      'Choose your platform type.',
      'Select the features you need.',
      'Define the project scope.',
      'Leave your details, and we’ll get back to you.',
    ],
    // Interactive Wizard (steps)
    stepTitles: ['Platform Type', 'Features', 'Scope', 'Your Details'],
    platforms: [
      { value: 'webapp', label: 'Web Application', desc: 'A responsive web app accessible from any browser. Ideal for SaaS, dashboards, and customer portals.' },
      { value: 'saas', label: 'SaaS Product', desc: 'A subscription-based software service with user authentication, billing, and multi-tenancy.' },
      { value: 'dashboard', label: 'Dashboard / Admin', desc: 'Internal tools, analytics panels, or admin backends with data visualization.' },
      { value: 'custom', label: 'Fully Custom', desc: 'A unique platform built from scratch according to your exact specifications.' },
    ],
    features: [
      { value: 'auth', label: 'User Authentication', desc: 'Login, registration, password reset, social login, and role-based access.' },
      { value: 'payments', label: 'Payments (Stripe)', desc: 'Subscription billing, one-time payments, invoices, and payment analytics.' },
      { value: 'admin', label: 'Admin Panel', desc: 'Manage users, content, settings, and view data through a dedicated back-office.' },
      { value: 'api', label: 'API Integration', desc: 'Connect with external services, webhooks, and provide REST/GraphQL APIs.' },
      { value: 'automation', label: 'Automations', desc: 'Workflow automations, email triggers, scheduled tasks, and AI agents.' },
      { value: 'ai', label: 'AI Features', desc: 'Chatbots, content generation, image recognition, or custom machine learning models.' },
    ],
    scopes: [
      { value: 'mvp', label: 'Quick MVP (2 weeks)', desc: 'A functional prototype to test the market with core features.' },
      { value: 'full', label: 'Full Product (1-2 months)', desc: 'A complete, production-ready platform with all selected features.' },
      { value: 'maintenance', label: 'Monthly Maintenance', desc: 'Ongoing support, updates, backups, and feature enhancements.' },
    ],
    // Contact form
    namePlaceholder: 'Full Name',
    emailPlaceholder: 'Email Address',
    phonePlaceholder: 'Phone (optional)',
    backBtn: 'Back',
    nextBtn: 'Next',
    sendBtn: 'Send Request',
    sendingText: 'Sending...',
    successTitle: 'Request Sent!',
    successText: 'We will review your choices and get back to you within 24 hours.',
    summaryTitle: 'Your Selection',
    // Additional sections
    calendarTitle: 'Today & Upcoming Holidays',
    holidays: ['Tu B\'Av – Aug 2', 'Rosh Hashanah – Sep 15', 'Yom Kippur – Sep 24', 'Sukkot – Sep 29'],
    newsTitle: 'In the News',
    newsItems: [
      'Israel GDP grew 2.5% in Q2 2026',
      'Tech stocks surge as AI regulation eases',
      'Shekel strengthens against dollar',
    ],
    calculatorTitle: 'Cost Estimator',
    calcHoursLabel: 'Estimated hours',
    calcRateLabel: 'Hourly rate ($)',
    calcResult: 'Estimate: $',
    newsletterTitle: 'Stay Updated',
    newsletterPlaceholder: 'Your email',
    subscribeBtn: 'Subscribe',
    contactTitle: 'Let’s Talk',
    contactText: 'Ready to build something great?',
    footer: '© 2026 Tanami360 — Herzliya, Israel',
  },
  he: {
    heroTitle: 'פלטפורמות 360° — פיתוח, אחסון, תחזוקה.',
    heroSub: 'מרעיון ועד למוצר חי, Tanami360 מטפלת בהכול.',
    startCta: 'התחל את הפרויקט שלך',
    aboutTitle: 'על Tanami360',
    aboutText: 'אנחנו סטודיו דיגיטלי בהרצליה, ישראל. אנחנו מתכננים, מפתחים, מאחסנים ומתחזקים פלטפורמות ווב מותאמות אישית — במחיר חודשי קבוע.',
    servicesTitle: 'מה אנחנו עושים',
    services: [
      { title: 'פיתוח', desc: 'פלטפורמות מותאמות עם Next.js, Supabase ו-AI.' },
      { title: 'אחסון', desc: 'אחסון מהיר ומאובטח ב-Vercel עם SSL אוטומטי.' },
      { title: 'תחזוקה', desc: 'עדכונים חודשיים, גיבויים יומיים, ותמיכה טכנית.' },
    ],
    guideTitle: 'איך זה עובד',
    guideSteps: [
      'בחר/י את סוג הפלטפורמה.',
      'בחר/י את התכונות הנדרשות.',
      'הגדר/י את היקף הפרויקט.',
      'השאר/י פרטים ונחזור אליך.',
    ],
    stepTitles: ['סוג פלטפורמה', 'תכונות', 'היקף', 'הפרטים שלך'],
    platforms: [
      { value: 'webapp', label: 'אפליקציית ווב', desc: 'אפליקציה רספונסיבית מכל דפדפן. מתאימה ל-SaaS, דאשבורדים ופורטלים.' },
      { value: 'saas', label: 'מערכת SaaS', desc: 'מוצר מבוסס מנוי עם אימות משתמשים, חיובים ורב-דיירות.' },
      { value: 'dashboard', label: 'לוח בקרה / אדמין', desc: 'כלים פנימיים, פאנלי אנליטיקה וממשקי ניהול עם תצוגות דאטה.' },
      { value: 'custom', label: 'מערכת מותאמת אישית', desc: 'פלטפורמה ייחודית שנבנית לפי המפרט המדויק שלך.' },
    ],
    features: [
      { value: 'auth', label: 'אימות משתמשים', desc: 'כניסה, הרשמה, איפוס סיסמה, התחברות חברתית והרשאות לפי תפקיד.' },
      { value: 'payments', label: 'תשלומים (Stripe)', desc: 'חיובי מנוי, תשלומים חד-פעמיים, חשבוניות ואנליטיקת תשלומים.' },
      { value: 'admin', label: 'לוח בקרה', desc: 'ניהול משתמשים, תוכן, הגדרות וצפייה בנתונים דרך ממשק אדמין.' },
      { value: 'api', label: 'חיבור API', desc: 'אינטגרציה עם מערכות חיצוניות, וובהוקס, ומתן API ללקוחות.' },
      { value: 'automation', label: 'אוטומציות', desc: 'תהליכים אוטומטיים, טריגרים, אימיילים, משימות מתוזמנות וסוכני AI.' },
      { value: 'ai', label: 'תכונות AI', desc: 'צ׳אטבוטים, יצירת תוכן, זיהוי תמונות או מודלים מותאמים אישית.' },
    ],
    scopes: [
      { value: 'mvp', label: 'MVP מהיר (שבועיים)', desc: 'אב-טיפוס פונקציונלי לבדיקת השוק עם הפיצ׳רים המרכזיים.' },
      { value: 'full', label: 'מוצר מלא (1-2 חודשים)', desc: 'פלטפורמה מלאה ומוכנה לייצור עם כל התכונות הנבחרות.' },
      { value: 'maintenance', label: 'תחזוקה חודשית', desc: 'עדכונים, גיבויים, תמיכה והוספת תכונות.' },
    ],
    namePlaceholder: 'שם מלא',
    emailPlaceholder: 'כתובת אימייל',
    phonePlaceholder: 'טלפון (רשות)',
    backBtn: 'חזור',
    nextBtn: 'המשך',
    sendBtn: 'שלח בקשה',
    sendingText: 'שולח...',
    successTitle: 'הבקשה נשלחה!',
    successText: 'נבחן את הבחירות שלך ונחזור אליך תוך 24 שעות.',
    summaryTitle: 'הבחירה שלך',
    calendarTitle: 'היום וחגים קרובים',
    holidays: ['ט"ו באב – 2 באוג׳', 'ראש השנה – 15 בספט׳', 'יום כיפור – 24 בספט׳', 'סוכות – 29 בספט׳'],
    newsTitle: 'בחדשות',
    newsItems: [
      'התוצר הישראלי צמח ב-2.5% ברבעון השני',
      'עליות חדות במניות הטכנולוגיה בעולם',
      'השקל מתחזק מול הדולר',
    ],
    calculatorTitle: 'אומדן עלויות',
    calcHoursLabel: 'שעות עבודה מוערכות',
    calcRateLabel: 'תעריף שעתי (₪)',
    calcResult: 'אומדן: ₪',
    newsletterTitle: 'הישאר מעודכן',
    newsletterPlaceholder: 'האימייל שלך',
    subscribeBtn: 'הרשם',
    contactTitle: 'בואו נדבר',
    contactText: 'מוכנים לבנות משהו גדול?',
    footer: '© 2026 Tanami360 — הרצליה, ישראל',
  },
};

// ============ Sub-components ============
function DualText({ en, he, as: Tag = 'p', classNameEn = '', classNameHe = '', containerClassName = '' }: any) {
  return (
    <div className={`flex flex-col md:flex-row md:gap-6 items-center md:items-baseline justify-center ${containerClassName}`}>
      <Tag className={`text-left md:text-right w-full md:w-1/2 ${classNameEn}`}>{en}</Tag>
      <Tag className={`text-right w-full md:w-1/2 ${classNameHe}`} dir="rtl">{he}</Tag>
    </div>
  );
}

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(node);
      }
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`animate-on-scroll ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

function ServiceCard({ titleEn, titleHe, descEn, descHe }: { titleEn: string; titleHe: string; descEn: string; descHe: string }) {
  return (
    <div className="bg-cloud rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ripple">
      <DualText en={titleEn} he={titleHe} as="h3" classNameEn="text-2xl font-bold mb-4 text-rose" classNameHe="text-2xl font-bold mb-4 text-rose" />
      <DualText en={descEn} he={descHe} classNameEn="text-midnight/70" classNameHe="text-midnight/70" />
    </div>
  );
}

function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tanami360-a11y');
      if (saved) {
        const s = JSON.parse(saved);
        if (s.fontSize) setFontSize(s.fontSize);
        if (s.highContrast) {
          setHighContrast(true);
          document.documentElement.classList.add('high-contrast');
        }
      }
    } catch {}
  }, []);

  const update = (fs: number, hc: boolean) => {
    setFontSize(fs);
    setHighContrast(hc);
    document.documentElement.style.fontSize = `${fs}%`;
    if (hc) document.documentElement.classList.add('high-contrast');
    else document.documentElement.classList.remove('high-contrast');
    localStorage.setItem('tanami360-a11y', JSON.stringify({ fontSize: fs, highContrast: hc }));
  };

  return (
    <>
      <button className="a11y-btn" onClick={() => setOpen(!open)} title="Accessibility">♿</button>
      {open && (
        <div className="a11y-panel">
          <p className="font-bold mb-2 text-midnight">Accessibility / נגישות</p>
          <div className="flex flex-col gap-2 text-sm">
            <button onClick={() => update(fontSize + 10, highContrast)} className="bg-cloud text-midnight px-3 py-1 rounded">A+ Increase</button>
            <button onClick={() => update(fontSize - 10, highContrast)} className="bg-cloud text-midnight px-3 py-1 rounded">A- Decrease</button>
            <button onClick={() => update(fontSize, !highContrast)} className="bg-cloud text-midnight px-3 py-1 rounded">
              {highContrast ? 'Standard Contrast' : 'High Contrast'}
            </button>
            <button onClick={() => update(100, false)} className="bg-cloud text-midnight px-3 py-1 rounded">Reset</button>
          </div>
        </div>
      )}
    </>
  );
}

// ============ Main Component ============
export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const [step, setStep] = useState(0); // 0=platform, 1=features, 2=scope, 3=contact
  const [selection, setSelection] = useState<Selection>({
    platform: '',
    features: [],
    scope: '',
    name: '',
    email: '',
    phone: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('tanami360-lang');
    if (saved === 'en' || saved === 'he') setLang(saved);
  }, []);

  const toggleLang = (l: Language) => {
    setLang(l);
    localStorage.setItem('tanami360-lang', l);
  };

  const t = content[lang];

  const selectPlatform = (p: string) => {
    setSelection(prev => ({ ...prev, platform: p }));
    setStep(1);
  };
  const toggleFeature = (f: string) => {
    setSelection(prev => ({
      ...prev,
      features: prev.features.includes(f) ? prev.features.filter(x => x !== f) : [...prev.features, f],
    }));
  };
  const selectScope = (s: string) => {
    setSelection(prev => ({ ...prev, scope: s }));
    setStep(3);
  };

  const submit = async () => {
    setSending(true);
    try { await fetch('/api/lead', { method: 'POST', body: JSON.stringify({ ...selection, lang }) }); } catch {}
    setSending(false);
    setSent(true);
  };

  const reset = () => {
    setStep(0);
    setSelection({ platform: '', features: [], scope: '', name: '', email: '', phone: '' });
    setSent(false);
  };

  // Helper to render explanation under a label
  const renderOption = (item: any, onSelect: (val: string) => void, isSelected: boolean) => (
    <button
      onClick={() => onSelect(item.value)}
      className={`p-4 border rounded-xl text-left transition ${isSelected ? 'border-rose bg-rose/5' : 'border-cloud hover:border-rose/50'}`}
    >
      <div className="flex justify-between items-center">
        <span className="font-bold text-midnight">{item.label}</span>
        {isSelected && <span className="text-rose text-xl">✓</span>}
      </div>
      <p className="text-sm text-midnight/70 mt-2">{item.desc}</p>
    </button>
  );

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <AccessibilityWidget />

      {/* Lang Switcher */}
      <div className="flex justify-end gap-2 p-4 max-w-7xl mx-auto">
        <button onClick={() => toggleLang('en')} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${lang === 'en' ? 'bg-rose text-snow' : 'bg-cloud text-midnight'}`}>EN</button>
        <button onClick={() => toggleLang('he')} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${lang === 'he' ? 'bg-rose text-snow' : 'bg-cloud text-midnight'}`}>עברית</button>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-midnight text-snow">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight flex flex-col md:flex-row md:justify-center md:gap-6">
            <span>360° Platforms — Built, Hosted, Maintained.</span>
            <span dir="rtl">פלטפורמות 360° — פיתוח, אחסון, תחזוקה.</span>
          </h1>
          <DualText en={t.heroSub} he={t.heroSub} classNameEn="text-xl md:text-2xl mb-10 text-cloud/90" classNameHe="text-xl md:text-2xl mb-10 text-cloud/90" />
          <button onClick={() => setStep(0)} className="ripple inline-flex items-center gap-2 bg-rose text-snow px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose/90 transition-colors shadow-xl">
            {t.startCta} <span className="text-xl">→</span>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative w-full h-24 md:h-32 animate-wave" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none">
            <path d="M0 50C240 0 480 100 720 50C960 0 1200 100 1440 50V100H0V50Z" fill="var(--color-cloud)" />
          </svg>
        </div>
      </section>

      {/* Interactive Wizard (main area) */}
      <section className="py-20 bg-snow">
        <div className="max-w-5xl mx-auto px-6">
          {!sent ? (
            <>
              {/* Steps indicator */}
              <div className="flex justify-between mb-10">
                {t.stepTitles.map((title: string, idx: number) => (
                  <div key={idx} className={`flex-1 text-center pb-2 border-b-2 ${idx <= step ? 'border-rose' : 'border-cloud'}`}>
                    <span className={`font-semibold ${idx <= step ? 'text-rose' : 'text-midnight/40'}`}>{title}</span>
                  </div>
                ))}
              </div>

              {step === 0 && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 text-center text-midnight">{t.stepTitles[0]}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {t.platforms.map((p: any) => renderOption(p, selectPlatform, selection.platform === p.value))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 text-center text-midnight">{t.stepTitles[1]}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {t.features.map((f: any) => renderOption(f, toggleFeature, selection.features.includes(f.value)))}
                  </div>
                  <div className="flex justify-between mt-10">
                    <button onClick={() => setStep(0)} className="text-midnight/60 hover:text-midnight">{t.backBtn}</button>
                    <button onClick={() => setStep(2)} className="bg-rose text-snow px-6 py-2 rounded-full">{t.nextBtn}</button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 text-center text-midnight">{t.stepTitles[2]}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {t.scopes.map((s: any) => renderOption(s, selectScope, selection.scope === s.value))}
                  </div>
                  <div className="flex justify-between mt-10">
                    <button onClick={() => setStep(1)} className="text-midnight/60 hover:text-midnight">{t.backBtn}</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 text-center text-midnight">{t.stepTitles[3]}</h2>
                  <div className="max-w-md mx-auto space-y-4">
                    <input type="text" placeholder={t.namePlaceholder} value={selection.name} onChange={e => setSelection(prev => ({ ...prev, name: e.target.value }))} className="w-full p-3 border border-cloud rounded-xl focus:border-rose outline-none" />
                    <input type="email" placeholder={t.emailPlaceholder} value={selection.email} onChange={e => setSelection(prev => ({ ...prev, email: e.target.value }))} className="w-full p-3 border border-cloud rounded-xl focus:border-rose outline-none" />
                    <input type="tel" placeholder={t.phonePlaceholder} value={selection.phone} onChange={e => setSelection(prev => ({ ...prev, phone: e.target.value }))} className="w-full p-3 border border-cloud rounded-xl focus:border-rose outline-none" />
                  </div>
                  <div className="flex justify-between mt-10">
                    <button onClick={() => setStep(2)} className="text-midnight/60 hover:text-midnight">{t.backBtn}</button>
                    <button onClick={submit} disabled={sending} className="bg-rose text-snow px-6 py-2 rounded-full disabled:opacity-50">
                      {sending ? t.sendingText : t.sendBtn}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold text-midnight mb-4">{t.successTitle}</h2>
              <p className="text-midnight/70 mb-4">{t.successText}</p>
              <div className="bg-cloud p-4 rounded-xl text-left text-sm space-y-2 max-w-sm mx-auto">
                <p><strong>{t.platforms.find((p:any) => p.value === selection.platform)?.label}</strong></p>
                <p>Features: {selection.features.map(f => t.features.find((x:any) => x.value === f)?.label).join(', ')}</p>
                <p><strong>{t.scopes.find((s:any) => s.value === selection.scope)?.label}</strong></p>
              </div>
              <button onClick={reset} className="mt-6 text-rose font-semibold">Close</button>
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <AnimatedSection className="py-20 bg-cloud">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <DualText en={t.aboutTitle} he={t.aboutTitle} as="h2" classNameEn="text-3xl md:text-4xl font-bold mb-6 text-midnight" classNameHe="text-3xl md:text-4xl font-bold mb-6 text-midnight" />
          <DualText en={t.aboutText} he={t.aboutText} classNameEn="text-lg text-midnight/80 leading-relaxed max-w-2xl mx-auto" classNameHe="text-lg text-midnight/80 leading-relaxed max-w-2xl mx-auto" />
        </div>
      </AnimatedSection>

      {/* Services */}
      <AnimatedSection className="py-20 bg-snow">
        <div className="max-w-6xl mx-auto px-6">
          <DualText en={t.servicesTitle} he={t.servicesTitle} as="h2" classNameEn="text-3xl md:text-4xl font-bold text-center mb-12" classNameHe="text-3xl md:text-4xl font-bold text-center mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.services.map((s: any, i: number) => (
              <ServiceCard key={i} titleEn={s.title} titleHe={s.title} descEn={s.desc} descHe={s.desc} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Guide */}
      <AnimatedSection className="py-16 bg-cloud">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <DualText en={t.guideTitle} he={t.guideTitle} as="h2" classNameEn="text-3xl font-bold mb-6" classNameHe="text-3xl font-bold mb-6" />
          <ol className="space-y-2 text-midnight/70 text-lg">
            {t.guideSteps.map((step: string, i: number) => (
              <li key={i} className="flex items-center gap-2 justify-center">
                <span className="bg-rose text-snow w-6 h-6 rounded-full flex items-center justify-center text-sm">{i+1}</span> {step}
              </li>
            ))}
          </ol>
        </div>
      </AnimatedSection>

      {/* Calculator, Calendar, Newsletter */}
      <AnimatedSection className="py-20 bg-snow">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Calculator */}
          <div className="bg-cloud p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-center text-midnight">{t.calculatorTitle}</h3>
            <CostCalculator t={t} />
          </div>
          {/* Calendar */}
          <div className="bg-cloud p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-center text-midnight">{t.calendarTitle}</h3>
            <Calendar t={t} />
          </div>
          {/* Newsletter */}
          <div className="bg-cloud p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-center text-midnight">{t.newsletterTitle}</h3>
            <Newsletter t={t} />
          </div>
        </div>
      </AnimatedSection>

      {/* News */}
      <AnimatedSection className="py-16 bg-cloud">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-6 text-midnight">{t.newsTitle}</h3>
          <ul className="space-y-3 text-center">
            {t.newsItems.map((item: string) => (
              <li key={item} className="bg-snow p-3 rounded-xl shadow-sm text-midnight/80">{item}</li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* Contact */}
      <AnimatedSection className="py-20 bg-midnight text-snow">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <DualText en={t.contactTitle} he={t.contactTitle} as="h2" classNameEn="text-3xl md:text-4xl font-bold mb-6" classNameHe="text-3xl md:text-4xl font-bold mb-6" />
          <DualText en={t.contactText} he={t.contactText} classNameEn="text-xl mb-8 text-cloud" classNameHe="text-xl mb-8 text-cloud" />
          <a href="mailto:hello@tanami360.com" className="ripple inline-flex items-center gap-2 bg-rose text-snow px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose/90 transition-colors shadow-xl">
            hello@tanami360.com
          </a>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-cloud py-8 text-center text-midnight/60 text-sm">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}

// ============ Helper Components (defined outside to avoid re-render issues) ============

function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setWidth(scrolled);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div id="scroll-progress" style={{ width: `${width}%` }} />;
}

function CostCalculator({ t }: any) {
  const [hours, setHours] = useState(20);
  const [rate, setRate] = useState(150);
  return (
    <div className="text-center">
      <label className="block mb-2 text-midnight">{t.calcHoursLabel}</label>
      <input type="number" value={hours} onChange={e => setHours(+e.target.value)} className="w-full p-2 rounded mb-4" />
      <label className="block mb-2 text-midnight">{t.calcRateLabel}</label>
      <input type="number" value={rate} onChange={e => setRate(+e.target.value)} className="w-full p-2 rounded mb-4" />
      <div className="text-2xl font-bold text-rose">{t.calcResult}{hours * rate}</div>
    </div>
  );
}

function Calendar({ t }: any) {
  const today = new Date();
  const hebrewDate = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', { dateStyle: 'full' }).format(today);
  return (
    <div className="text-center">
      <p className="text-sm text-midnight/70">{today.toDateString()}</p>
      <p className="text-sm text-rose">{hebrewDate}</p>
      <div className="mt-4">
        <h4 className="font-semibold">Upcoming / קרובים</h4>
        <ul className="text-sm text-midnight/70">
          {t.holidays.map((h: string) => <li key={h}>{h}</li>)}
        </ul>
      </div>
    </div>
  );
}

function Newsletter({ t }: any) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const subscribe = () => {
    fetch('/api/lead', { method: 'POST', body: JSON.stringify({ type: 'newsletter', email }) });
    setSubscribed(true);
  };
  if (subscribed) return <p className="text-rose font-semibold">Thanks! / תודה!</p>;
  return (
    <div className="flex gap-2 justify-center">
      <input type="email" placeholder={t.newsletterPlaceholder} value={email} onChange={e => setEmail(e.target.value)} className="p-2 rounded" />
      <button onClick={subscribe} className="bg-rose text-snow px-4 py-2 rounded-full">{t.subscribeBtn}</button>
    </div>
  );
}
