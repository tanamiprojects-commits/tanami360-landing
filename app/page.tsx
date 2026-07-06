'use client';

import { useState, useEffect, useRef } from 'react';

// ============ Types ============
type LangPref = 'en' | 'he';

interface Selection {
  platform: string;
  features: string[];
  scope: string;
  name: string;
  email: string;
  phone: string;
}

// ============ Bilingual Content (all texts exist in both) ============
const content = {
  en: {
    heroTitle: '360° Platforms — Built, Hosted, Maintained.',
    heroTitleHe: 'פלטפורמות 360° — פיתוח, אחסון, תחזוקה.',
    heroSub: 'From idea to live product, Tanami360 handles it all.',
    heroSubHe: 'מרעיון ועד למוצר חי, Tanami360 מטפלת בהכול.',
    startCta: 'Start Your Project',
    startCtaHe: 'התחל פרויקט',
    aboutTitle: 'About Tanami360',
    aboutTitleHe: 'על Tanami360',
    aboutText: 'We are a digital studio based in Herzliya, Israel. We design, develop, host, and maintain custom web platforms — all under a predictable monthly plan.',
    aboutTextHe: 'אנחנו סטודיו דיגיטלי בהרצליה, ישראל. אנחנו מתכננים, מפתחים, מאחסנים ומתחזקים פלטפורמות ווב מותאמות אישית — במחיר חודשי קבוע.',
    servicesTitle: 'What We Do',
    servicesTitleHe: 'מה אנחנו עושים',
    services: [
      { title: 'Build', titleHe: 'פיתוח', desc: 'Custom platforms with Next.js, Supabase, and AI.', descHe: 'פלטפורמות מותאמות עם Next.js, Supabase ו-AI.' },
      { title: 'Host', titleHe: 'אחסון', desc: 'Fast, secure hosting on Vercel with automatic SSL.', descHe: 'אחסון מהיר ומאובטח ב-Vercel עם SSL אוטומטי.' },
      { title: 'Maintain', titleHe: 'תחזוקה', desc: 'Monthly updates, daily backups, and priority support.', descHe: 'עדכונים חודשיים, גיבויים יומיים, ותמיכה טכנית.' },
    ],
    guideTitle: 'How It Works',
    guideTitleHe: 'איך זה עובד',
    guideSteps: ['Choose your platform type.', 'Select the features you need.', 'Define the project scope.', 'Leave your details, and we’ll get back to you.'],
    guideStepsHe: ['בחר/י את סוג הפלטפורמה.', 'בחר/י את התכונות הנדרשות.', 'הגדר/י את היקף הפרויקט.', 'השאר/י פרטים ונחזור אליך.'],
    stepTitles: ['Platform Type', 'Features', 'Scope', 'Your Details'],
    stepTitlesHe: ['סוג פלטפורמה', 'תכונות', 'היקף', 'הפרטים שלך'],
    platforms: [
      { value: 'webapp', label: 'Web Application', labelHe: 'אפליקציית ווב', desc: 'Responsive web app, ideal for SaaS and dashboards.', descHe: 'אפליקציה רספונסיבית, מתאימה ל-SaaS ודאשבורדים.' },
      { value: 'saas', label: 'SaaS Product', labelHe: 'מערכת SaaS', desc: 'Subscription-based service with billing and multi-tenancy.', descHe: 'שירות מבוסס מנוי עם חיובים ורב-דיירות.' },
      { value: 'dashboard', label: 'Dashboard / Admin', labelHe: 'לוח בקרה / אדמין', desc: 'Internal tools, analytics panels, data visualization.', descHe: 'כלים פנימיים, פאנלי אנליטיקה, תצוגות נתונים.' },
      { value: 'custom', label: 'Fully Custom', labelHe: 'מערכת מותאמת אישית', desc: 'Unique platform built from scratch to your specs.', descHe: 'פלטפורמה ייחודית שנבנית לפי המפרט המדויק שלך.' },
    ],
    features: [
      { value: 'auth', label: 'User Authentication', labelHe: 'אימות משתמשים', desc: 'Login, registration, social login, roles.', descHe: 'כניסה, הרשמה, התחברות חברתית, הרשאות.' },
      { value: 'payments', label: 'Payments (Stripe)', labelHe: 'תשלומים (Stripe)', desc: 'Subscription billing, one-time payments, invoices.', descHe: 'חיובי מנוי, תשלומים חד-פעמיים, חשבוניות.' },
      { value: 'admin', label: 'Admin Panel', labelHe: 'לוח בקרה', desc: 'Manage users, content, settings.', descHe: 'ניהול משתמשים, תוכן, הגדרות.' },
      { value: 'api', label: 'API Integration', labelHe: 'חיבור API', desc: 'REST/GraphQL APIs, webhooks.', descHe: 'ממשקי API, וובהוקס.' },
      { value: 'automation', label: 'Automations', labelHe: 'אוטומציות', desc: 'Workflows, email triggers, scheduled tasks.', descHe: 'תהליכים אוטומטיים, טריגרים, משימות מתוזמנות.' },
      { value: 'ai', label: 'AI Features', labelHe: 'תכונות AI', desc: 'Chatbots, content generation, custom models.', descHe: 'צ׳אטבוטים, יצירת תוכן, מודלים מותאמים.' },
    ],
    scopes: [
      { value: 'mvp', label: 'Quick MVP (2 weeks)', labelHe: 'MVP מהיר (שבועיים)', desc: 'Functional prototype to test the market.', descHe: 'אב-טיפוס פונקציונלי לבדיקת השוק.' },
      { value: 'full', label: 'Full Product (1-2 months)', labelHe: 'מוצר מלא (1-2 חודשים)', desc: 'Production-ready platform with all features.', descHe: 'פלטפורמה מלאה ומוכנה לייצור.' },
      { value: 'maintenance', label: 'Monthly Maintenance', labelHe: 'תחזוקה חודשית', desc: 'Ongoing support, updates, backups.', descHe: 'עדכונים, גיבויים, תמיכה.' },
    ],
    namePlaceholder: 'Full Name / שם מלא',
    emailPlaceholder: 'Email / אימייל',
    phonePlaceholder: 'Phone (optional) / טלפון (רשות)',
    backBtn: 'Back / חזור',
    nextBtn: 'Next / המשך',
    sendBtn: 'Send Request / שלח בקשה',
    sendingText: 'Sending... / שולח...',
    successTitle: 'Request Sent! / הבקשה נשלחה!',
    successText: 'We will review your choices and get back to you within 24 hours. / נבחן את הבחירות ונחזור תוך 24 שעות.',
    summaryTitle: 'Your Selection / הבחירה שלך',
    calendarTitle: 'Today & Holidays / היום וחגים',
    holidays: ['Tu B\'Av – Aug 2 / ט"ו באב – 2 באוג׳', 'Rosh Hashanah – Sep 15 / ראש השנה – 15 בספט׳', 'Yom Kippur – Sep 24 / יום כיפור – 24 בספט׳', 'Sukkot – Sep 29 / סוכות – 29 בספט׳'],
    newsTitle: 'In the News / בחדשות',
    newsItems: [
      'Israel GDP grew 2.5% / התוצר הישראלי צמח ב-2.5%',
      'Tech stocks surge / עליות במניות הטכנולוגיה',
      'Shekel strengthens / השקל מתחזק',
    ],
    calculatorTitle: 'Cost Estimator / אומדן עלויות',
    calcHoursLabel: 'Hours / שעות',
    calcRateLabel: 'Rate ($/₪) / תעריף',
    calcResult: 'Estimate: / אומדן: ',
    newsletterTitle: 'Stay Updated / הישאר מעודכן',
    newsletterPlaceholder: 'Your email / האימייל שלך',
    subscribeBtn: 'Subscribe / הרשם',
    contactTitle: 'Let’s Talk / בואו נדבר',
    contactText: 'Ready to build? / מוכנים לבנות?',
    footer: '© 2026 Tanami360 — Herzliya, Israel / הרצליה, ישראל',
    langPrefQuestion: 'Choose preferred language / בחר שפה מועדפת',
    langPrefEn: 'English emphasized',
    langPrefHe: 'עברית מודגשת',
  },
};

// ============ DualText with preference ============
function DualText({
  en,
  he,
  as: Tag = 'p',
  classNameEn = '',
  classNameHe = '',
  containerClassName = '',
  preferredLang = 'en',
}: {
  en: string;
  he: string;
  as?: React.ElementType;       // <-- תוקן!
  classNameEn?: string;
  classNameHe?: string;
  containerClassName?: string;
  preferredLang?: LangPref;
}) {
  const isEn = preferredLang === 'en';
  const primaryClass = 'text-current font-bold';
  const secondaryClass = 'text-sm text-midnight/50';

  return (
    <div className={`flex flex-col md:flex-row md:gap-6 items-center md:items-baseline justify-center ${containerClassName}`}>
      <Tag
        className={`${isEn ? primaryClass : secondaryClass} ${classNameEn} w-full md:w-1/2 text-left md:text-right`}
      >
        {en}
      </Tag>
      <Tag
        className={`${isEn ? secondaryClass : primaryClass} ${classNameHe} w-full md:w-1/2 text-right`}
        dir="rtl"
      >
        {he}
      </Tag>
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

function ServiceCard({ service, preferredLang }: { service: any; preferredLang: LangPref }) {
  return (
    <div className="bg-cloud rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ripple">
      <DualText
        en={service.title}
        he={service.titleHe}
        as="h3"
        classNameEn="text-2xl mb-4 text-rose"
        classNameHe="text-2xl mb-4 text-rose"
        preferredLang={preferredLang}
      />
      <DualText
        en={service.desc}
        he={service.descHe}
        classNameEn="text-midnight/70"
        classNameHe="text-midnight/70"
        preferredLang={preferredLang}
      />
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
      <button className="a11y-btn" onClick={() => setOpen(!open)} title="Accessibility / נגישות">♿</button>
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
  const [preferredLang, setPreferredLang] = useState<LangPref>('en');
  const [step, setStep] = useState(0);
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
    const saved = localStorage.getItem('tanami360-pref-lang');
    if (saved === 'en' || saved === 'he') setPreferredLang(saved);
  }, []);

  const updatePref = (l: LangPref) => {
    setPreferredLang(l);
    localStorage.setItem('tanami360-pref-lang', l);
  };

  const t = content.en; // all texts are in the single content object now

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
    try { await fetch('/api/lead', { method: 'POST', body: JSON.stringify({ ...selection, preferredLang }) }); } catch {}
    setSending(false);
    setSent(true);
  };

  const reset = () => {
    setStep(0);
    setSelection({ platform: '', features: [], scope: '', name: '', email: '', phone: '' });
    setSent(false);
  };

  const renderOption = (item: any, onSelect: (val: string) => void, isSelected: boolean) => (
    <button
      onClick={() => onSelect(item.value)}
      className={`p-4 border rounded-xl text-left transition ${isSelected ? 'border-rose bg-rose/5' : 'border-cloud hover:border-rose/50'}`}
    >
      <div className="flex justify-between items-center">
        <span className="font-bold text-midnight">{preferredLang === 'en' ? item.label : item.labelHe}</span>
        <span className="text-xs text-midnight/50">{preferredLang === 'en' ? item.labelHe : item.label}</span>
        {isSelected && <span className="text-rose text-xl">✓</span>}
      </div>
      <p className="text-sm text-midnight/70 mt-2">{preferredLang === 'en' ? item.desc : item.descHe}</p>
    </button>
  );

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <AccessibilityWidget />

      {/* Lang Preference Switcher (subtle) */}
      <div className="flex justify-end gap-2 p-4 max-w-7xl mx-auto items-center">
        <span className="text-xs text-midnight/40">Lang:</span>
        <button
          onClick={() => updatePref('en')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition ${preferredLang === 'en' ? 'bg-rose text-snow' : 'bg-cloud text-midnight'}`}
        >
          EN
        </button>
        <button
          onClick={() => updatePref('he')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition ${preferredLang === 'he' ? 'bg-rose text-snow' : 'bg-cloud text-midnight'}`}
        >
          ע
        </button>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-midnight text-snow">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <DualText en={t.heroTitle} he={t.heroTitleHe} preferredLang={preferredLang} containerClassName="flex-col md:flex-row" />
          </h1>
          <DualText en={t.heroSub} he={t.heroSubHe} classNameEn="text-xl md:text-2xl mb-10 text-cloud/90" classNameHe="text-xl md:text-2xl mb-10 text-cloud/90" preferredLang={preferredLang} />
          <button onClick={() => { setStep(0); setSent(false); }} className="ripple inline-flex items-center gap-2 bg-rose text-snow px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose/90 transition-colors shadow-xl">
            <DualText en={t.startCta} he={t.startCtaHe} preferredLang={preferredLang} containerClassName="inline-flex gap-2" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative w-full h-24 md:h-32 animate-wave" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none">
            <path d="M0 50C240 0 480 100 720 50C960 0 1200 100 1440 50V100H0V50Z" fill="var(--color-cloud)" />
          </svg>
        </div>
      </section>

      {/* Interactive Wizard */}
      <section className="py-20 bg-snow">
        <div className="max-w-5xl mx-auto px-6">
          {!sent ? (
            <>
              <div className="flex justify-between mb-10">
                {t.stepTitles.map((title: string, idx: number) => (
                  <div key={idx} className={`flex-1 text-center pb-2 border-b-2 ${idx <= step ? 'border-rose' : 'border-cloud'}`}>
                    <span className={`font-semibold text-sm ${idx <= step ? 'text-rose' : 'text-midnight/40'}`}>
                      {preferredLang === 'en' ? title : t.stepTitlesHe[idx]}
                    </span>
                    <span className="text-xs text-midnight/30 block">{preferredLang === 'en' ? t.stepTitlesHe[idx] : title}</span>
                  </div>
                ))}
              </div>

              {step === 0 && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 text-center text-midnight">
                    <DualText en={t.stepTitles[0]} he={t.stepTitlesHe[0]} preferredLang={preferredLang} />
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {t.platforms.map((p: any) => renderOption(p, selectPlatform, selection.platform === p.value))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 text-center text-midnight">
                    <DualText en={t.stepTitles[1]} he={t.stepTitlesHe[1]} preferredLang={preferredLang} />
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {t.features.map((f: any) => renderOption(f, toggleFeature, selection.features.includes(f.value)))}
                  </div>
                  <div className="flex justify-between mt-10">
                    <button onClick={() => setStep(0)} className="text-midnight/60 hover:text-midnight"><DualText en={t.backBtn} he={t.backBtn} preferredLang={preferredLang} /></button>
                    <button onClick={() => setStep(2)} className="bg-rose text-snow px-6 py-2 rounded-full"><DualText en={t.nextBtn} he={t.nextBtn} preferredLang={preferredLang} /></button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 text-center text-midnight">
                    <DualText en={t.stepTitles[2]} he={t.stepTitlesHe[2]} preferredLang={preferredLang} />
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {t.scopes.map((s: any) => renderOption(s, selectScope, selection.scope === s.value))}
                  </div>
                  <div className="flex justify-between mt-10">
                    <button onClick={() => setStep(1)} className="text-midnight/60 hover:text-midnight"><DualText en={t.backBtn} he={t.backBtn} preferredLang={preferredLang} /></button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 text-center text-midnight">
                    <DualText en={t.stepTitles[3]} he={t.stepTitlesHe[3]} preferredLang={preferredLang} />
                  </h2>
                  <div className="max-w-md mx-auto space-y-4">
                    <input type="text" placeholder={t.namePlaceholder} value={selection.name} onChange={e => setSelection(prev => ({ ...prev, name: e.target.value }))} className="w-full p-3 border border-cloud rounded-xl focus:border-rose outline-none" />
                    <input type="email" placeholder={t.emailPlaceholder} value={selection.email} onChange={e => setSelection(prev => ({ ...prev, email: e.target.value }))} className="w-full p-3 border border-cloud rounded-xl focus:border-rose outline-none" />
                    <input type="tel" placeholder={t.phonePlaceholder} value={selection.phone} onChange={e => setSelection(prev => ({ ...prev, phone: e.target.value }))} className="w-full p-3 border border-cloud rounded-xl focus:border-rose outline-none" />
                  </div>
                  <div className="flex justify-between mt-10">
                    <button onClick={() => setStep(2)} className="text-midnight/60 hover:text-midnight"><DualText en={t.backBtn} he={t.backBtn} preferredLang={preferredLang} /></button>
                    <button onClick={submit} disabled={sending} className="bg-rose text-snow px-6 py-2 rounded-full disabled:opacity-50">
                      <DualText en={sending ? t.sendingText : t.sendBtn} he={sending ? t.sendingText : t.sendBtn} preferredLang={preferredLang} />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold text-midnight mb-4"><DualText en={t.successTitle} he={t.successTitle} preferredLang={preferredLang} /></h2>
              <p className="text-midnight/70 mb-4"><DualText en={t.successText} he={t.successText} preferredLang={preferredLang} /></p>
              <div className="bg-cloud p-4 rounded-xl text-left text-sm space-y-2 max-w-sm mx-auto">
                <p><strong>{preferredLang === 'en' ? t.platforms.find((p:any) => p.value === selection.platform)?.label : t.platforms.find((p:any) => p.value === selection.platform)?.labelHe}</strong></p>
                <p>Features: {selection.features.map(f => preferredLang === 'en' ? t.features.find((x:any) => x.value === f)?.label : t.features.find((x:any) => x.value === f)?.labelHe).join(', ')}</p>
                <p><strong>{preferredLang === 'en' ? t.scopes.find((s:any) => s.value === selection.scope)?.label : t.scopes.find((s:any) => s.value === selection.scope)?.labelHe}</strong></p>
              </div>
              <button onClick={reset} className="mt-6 text-rose font-semibold">Close / סגור</button>
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <AnimatedSection className="py-20 bg-cloud">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <DualText en={t.aboutTitle} he={t.aboutTitleHe} as="h2" classNameEn="text-3xl md:text-4xl font-bold mb-6 text-midnight" classNameHe="text-3xl md:text-4xl font-bold mb-6 text-midnight" preferredLang={preferredLang} />
          <DualText en={t.aboutText} he={t.aboutTextHe} classNameEn="text-lg text-midnight/80 leading-relaxed max-w-2xl mx-auto" classNameHe="text-lg text-midnight/80 leading-relaxed max-w-2xl mx-auto" preferredLang={preferredLang} />
        </div>
      </AnimatedSection>

      {/* Services */}
      <AnimatedSection className="py-20 bg-snow">
        <div className="max-w-6xl mx-auto px-6">
          <DualText en={t.servicesTitle} he={t.servicesTitleHe} as="h2" classNameEn="text-3xl md:text-4xl font-bold text-center mb-12" classNameHe="text-3xl md:text-4xl font-bold text-center mb-12" preferredLang={preferredLang} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.services.map((s: any, i: number) => (
              <ServiceCard key={i} service={s} preferredLang={preferredLang} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Guide */}
      <AnimatedSection className="py-16 bg-cloud">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <DualText en={t.guideTitle} he={t.guideTitleHe} as="h2" classNameEn="text-3xl font-bold mb-6" classNameHe="text-3xl font-bold mb-6" preferredLang={preferredLang} />
          <ol className="space-y-2 text-midnight/70 text-lg">
            {t.guideSteps.map((step: string, i: number) => (
              <li key={i} className="flex items-center gap-2 justify-center">
                <span className="bg-rose text-snow w-6 h-6 rounded-full flex items-center justify-center text-sm">{i+1}</span>
                <DualText en={step} he={t.guideStepsHe[i]} preferredLang={preferredLang} containerClassName="inline-flex gap-2" />
              </li>
            ))}
          </ol>
        </div>
      </AnimatedSection>

      {/* Calculator, Calendar, Newsletter */}
      <AnimatedSection className="py-20 bg-snow">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-cloud p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-center text-midnight"><DualText en={t.calculatorTitle} he={t.calculatorTitle} preferredLang={preferredLang} /></h3>
            <CostCalculator t={t} preferredLang={preferredLang} />
          </div>
          <div className="bg-cloud p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-center text-midnight"><DualText en={t.calendarTitle} he={t.calendarTitle} preferredLang={preferredLang} /></h3>
            <Calendar t={t} />
          </div>
          <div className="bg-cloud p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-center text-midnight"><DualText en={t.newsletterTitle} he={t.newsletterTitle} preferredLang={preferredLang} /></h3>
            <Newsletter t={t} />
          </div>
        </div>
      </AnimatedSection>

      {/* News */}
      <AnimatedSection className="py-16 bg-cloud">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-6 text-midnight"><DualText en={t.newsTitle} he={t.newsTitle} preferredLang={preferredLang} /></h3>
          <ul className="space-y-3 text-center">
            {t.newsItems.map((item: string, i: number) => (
              <li key={i} className="bg-snow p-3 rounded-xl shadow-sm text-midnight/80"><DualText en={item} he={item} preferredLang={preferredLang} /></li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* Contact */}
      <AnimatedSection className="py-20 bg-midnight text-snow">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <DualText en={t.contactTitle} he={t.contactTitle} as="h2" classNameEn="text-3xl md:text-4xl font-bold mb-6" classNameHe="text-3xl md:text-4xl font-bold mb-6" preferredLang={preferredLang} />
          <DualText en={t.contactText} he={t.contactText} classNameEn="text-xl mb-8 text-cloud" classNameHe="text-xl mb-8 text-cloud" preferredLang={preferredLang} />
          <a href="mailto:hello@tanami360.com" className="ripple inline-flex items-center gap-2 bg-rose text-snow px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose/90 transition-colors shadow-xl">
            hello@tanami360.com
          </a>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-cloud py-8 text-center text-midnight/60 text-sm">
        <DualText en={t.footer} he={t.footer} preferredLang={preferredLang} />
      </footer>
    </div>
  );
}

// ============ Helper Components ============
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

function CostCalculator({ t, preferredLang }: { t: any; preferredLang: LangPref }) {
  const [hours, setHours] = useState(20);
  const [rate, setRate] = useState(150);
  return (
    <div className="text-center">
      <label className="block mb-2 text-midnight"><DualText en={t.calcHoursLabel} he={t.calcHoursLabel} preferredLang={preferredLang} /></label>
      <input type="number" value={hours} onChange={e => setHours(+e.target.value)} className="w-full p-2 rounded mb-4" />
      <label className="block mb-2 text-midnight"><DualText en={t.calcRateLabel} he={t.calcRateLabel} preferredLang={preferredLang} /></label>
      <input type="number" value={rate} onChange={e => setRate(+e.target.value)} className="w-full p-2 rounded mb-4" />
      <div className="text-2xl font-bold text-rose"><DualText en={`${t.calcResult}${hours * rate}`} he={`${t.calcResult}${hours * rate}`} preferredLang={preferredLang} /></div>
    </div>
  );
}

function Calendar({ t }: { t: any }) {
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

function Newsletter({ t }: { t: any }) {
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