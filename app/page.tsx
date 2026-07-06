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

// ============ Bilingual Content (split labels) ============
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
    aboutText: 'We are a digital studio based in Herzliya, Israel...',
    aboutTextHe: 'אנחנו סטודיו דיגיטלי בהרצליה, ישראל...',
    servicesTitle: 'What We Do',
    servicesTitleHe: 'מה אנחנו עושים',
    services: [
      { icon: '🛠️', title: 'Build', titleHe: 'פיתוח', desc: 'Custom platforms with Next.js, Supabase, and AI.', descHe: 'פלטפורמות מותאמות עם Next.js, Supabase ו-AI.' },
      { icon: '☁️', title: 'Host', titleHe: 'אחסון', desc: 'Fast, secure hosting on Vercel...', descHe: 'אחסון מהיר ומאובטח ב-Vercel...' },
      { icon: '🔧', title: 'Maintain', titleHe: 'תחזוקה', desc: 'Monthly updates, daily backups...', descHe: 'עדכונים חודשיים, גיבויים יומיים...' },
    ],
    guideTitle: 'How It Works',
    guideTitleHe: 'איך זה עובד',
    guideSteps: ['Choose platform type.', 'Select features.', 'Define scope.', 'Leave details.'],
    guideStepsHe: ['בחר/י סוג פלטפורמה.', 'בחר/י תכונות.', 'הגדר/י היקף.', 'השאר/י פרטים.'],
    stepTitles: ['Platform Type', 'Features', 'Scope', 'Your Details'],
    stepTitlesHe: ['סוג פלטפורמה', 'תכונות', 'היקף', 'הפרטים שלך'],
    platforms: [
      { icon: '🌐', value: 'webapp', label: 'Web Application', labelHe: 'אפליקציית ווב', desc: 'Responsive web app...', descHe: 'אפליקציה רספונסיבית...' },
      { icon: '📦', value: 'saas', label: 'SaaS Product', labelHe: 'מערכת SaaS', desc: 'Subscription-based...', descHe: 'שירות מבוסס מנוי...' },
      { icon: '📊', value: 'dashboard', label: 'Dashboard / Admin', labelHe: 'לוח בקרה / אדמין', desc: 'Internal tools...', descHe: 'כלים פנימיים...' },
      { icon: '⚙️', value: 'custom', label: 'Fully Custom', labelHe: 'מערכת מותאמת אישית', desc: 'Unique platform...', descHe: 'פלטפורמה ייחודית...' },
    ],
    features: [
      { icon: '👤', value: 'auth', label: 'User Authentication', labelHe: 'אימות משתמשים', desc: 'Login, registration...', descHe: 'כניסה, הרשמה...' },
      { icon: '💳', value: 'payments', label: 'Payments (Stripe)', labelHe: 'תשלומים (Stripe)', desc: 'Subscription billing...', descHe: 'חיובי מנוי...' },
      { icon: '⚙️', value: 'admin', label: 'Admin Panel', labelHe: 'לוח בקרה', desc: 'Manage users...', descHe: 'ניהול משתמשים...' },
      { icon: '🔗', value: 'api', label: 'API Integration', labelHe: 'חיבור API', desc: 'REST/GraphQL...', descHe: 'ממשקי API...' },
      { icon: '🤖', value: 'automation', label: 'Automations', labelHe: 'אוטומציות', desc: 'Workflows...', descHe: 'תהליכים אוטומטיים...' },
      { icon: '🧠', value: 'ai', label: 'AI Features', labelHe: 'תכונות AI', desc: 'Chatbots...', descHe: 'צ׳אטבוטים...' },
    ],
    scopes: [
      { icon: '🚀', value: 'mvp', label: 'Quick MVP (2 weeks)', labelHe: 'MVP מהיר (שבועיים)', desc: 'Functional prototype...', descHe: 'אב-טיפוס פונקציונלי...' },
      { icon: '🏗️', value: 'full', label: 'Full Product (1-2 months)', labelHe: 'מוצר מלא (1-2 חודשים)', desc: 'Production-ready...', descHe: 'פלטפורמה מלאה...' },
      { icon: '🔄', value: 'maintenance', label: 'Monthly Maintenance', labelHe: 'תחזוקה חודשית', desc: 'Ongoing support...', descHe: 'עדכונים, גיבויים...' },
    ],
    namePlaceholder: 'Full Name / שם מלא',
    emailPlaceholder: 'Email / אימייל',
    phonePlaceholder: 'Phone (optional) / טלפון (רשות)',
    backBtn: 'Back',
    backBtnHe: 'חזור',
    nextBtn: 'Next',
    nextBtnHe: 'המשך',
    sendBtn: 'Send Request',
    sendBtnHe: 'שלח בקשה',
    sendingText: 'Sending...',
    sendingTextHe: 'שולח...',
    successTitle: 'Request Sent!',
    successTitleHe: 'הבקשה נשלחה!',
    successText: 'We will review...',
    successTextHe: 'נבחן את הבחירות...',
    summaryTitle: 'Your Selection',
    summaryTitleHe: 'הבחירה שלך',
    calendarTitle: 'Today & Holidays',
    calendarTitleHe: 'היום וחגים',
    holidays: [
      { en: 'Tu B\'Av – Aug 2', he: 'ט"ו באב – 2 באוג׳' },
      { en: 'Rosh Hashanah – Sep 15', he: 'ראש השנה – 15 בספט׳' },
      { en: 'Yom Kippur – Sep 24', he: 'יום כיפור – 24 בספט׳' },
      { en: 'Sukkot – Sep 29', he: 'סוכות – 29 בספט׳' },
    ],
    newsTitle: 'In the News',
    newsTitleHe: 'בחדשות',
    newsItems: [
      { en: 'Israel GDP grew 2.5%', he: 'התוצר הישראלי צמח ב-2.5%' },
      { en: 'Tech stocks surge', he: 'עליות במניות הטכנולוגיה' },
      { en: 'Shekel strengthens', he: 'השקל מתחזק' },
    ],
    calculatorTitle: 'Cost Estimator',
    calculatorTitleHe: 'אומדן עלויות',
    calcHoursLabel: 'Hours',
    calcHoursLabelHe: 'שעות',
    calcRateLabel: 'Rate ($/₪)',
    calcRateLabelHe: 'תעריף',
    calcResultPrefix: 'Estimate: ',
    calcResultPrefixHe: 'אומדן: ',
    newsletterTitle: 'Stay Updated',
    newsletterTitleHe: 'הישאר מעודכן',
    newsletterPlaceholder: 'Your email',
    newsletterPlaceholderHe: 'האימייל שלך',
    subscribeBtn: 'Subscribe',
    subscribeBtnHe: 'הרשם',
    contactTitle: 'Let’s Talk',
    contactTitleHe: 'בואו נדבר',
    contactText: 'Ready to build?',
    contactTextHe: 'מוכנים לבנות?',
    footer: '© 2026 Tanami360 — Herzliya, Israel',
    footerHe: '© 2026 Tanami360 — הרצליה, ישראל',
  },
};

// ============ DualTextInline (for buttons/links) ============
function DualTextInline({
  en,
  he,
  preferredLang,
  classNameEn = '',
  classNameHe = '',
}: {
  en: string;
  he: string;
  preferredLang: LangPref;
  classNameEn?: string;
  classNameHe?: string;
}) {
  const isEn = preferredLang === 'en';
  return (
    <>
      <span className={`${isEn ? 'font-bold' : 'text-sm opacity-50'} ${classNameEn}`}>{en}</span>
      <span className="mx-1 opacity-50">/</span>
      <span className={`${isEn ? 'text-sm opacity-50' : 'font-bold'} ${classNameHe}`}>{he}</span>
    </>
  );
}

// ============ DualText (full for sections) ============
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
  as?: React.ElementType;
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
      <Tag className={`${isEn ? primaryClass : secondaryClass} ${classNameEn} w-full md:w-1/2 text-left md:text-right`}>{en}</Tag>
      <Tag className={`${isEn ? secondaryClass : primaryClass} ${classNameHe} w-full md:w-1/2 text-right`} dir="rtl">{he}</Tag>
    </div>
  );
}

// ============ AnimatedSection ============
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.unobserve(node); }
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

// ============ Accessibility Widget ============
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
        if (s.highContrast) { setHighContrast(true); document.documentElement.classList.add('high-contrast'); }
      }
    } catch {}
  }, []);
  const update = (fs: number, hc: boolean) => {
    setFontSize(fs); setHighContrast(hc);
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
    platform: '', features: [], scope: '', name: '', email: '', phone: '',
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

  const t = content.en;
  const selectPlatform = (p: string) => { setSelection(prev => ({ ...prev, platform: p })); setStep(1); };
  const toggleFeature = (f: string) => setSelection(prev => ({
    ...prev,
    features: prev.features.includes(f) ? prev.features.filter(x => x !== f) : [...prev.features, f],
  }));
  const selectScope = (s: string) => { setSelection(prev => ({ ...prev, scope: s })); setStep(3); };
  const submit = async () => {
    setSending(true);
    try { await fetch('/api/lead', { method: 'POST', body: JSON.stringify({ ...selection, preferredLang }) }); } catch {}
    setSending(false); setSent(true);
  };
  const reset = () => {
    setStep(0); setSent(false);
    setSelection({ platform: '', features: [], scope: '', name: '', email: '', phone: '' });
  };

  const renderCard = (item: any, onSelect: (val: string) => void, isSelected: boolean) => (
    <button
      onClick={() => onSelect(item.value)}
      className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
        isSelected ? 'border-rose bg-rose/10 shadow-xl scale-[1.02]' : 'border-cloud hover:border-rose/50 hover:shadow-lg'
      }`}
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl">{item.icon}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xl text-midnight">
              {preferredLang === 'en' ? item.label : item.labelHe}
            </span>
            {isSelected && <span className="text-rose text-2xl">✓</span>}
          </div>
          <p className="text-xs text-midnight/50 mb-2">
            {preferredLang === 'en' ? (item.labelHe || '') : (item.label || '')}
          </p>
          <p className="text-sm text-midnight/70 mt-2">
            {preferredLang === 'en' ? item.desc : item.descHe}
          </p>
        </div>
      </div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-snow to-cloud/50">
      <ScrollProgress />
      <AccessibilityWidget />

      {/* Lang Preference Switcher */}
      <div className="flex justify-end gap-2 p-4 max-w-7xl mx-auto items-center">
        <span className="text-xs text-midnight/40">Lang:</span>
        <button onClick={() => updatePref('en')} className={`px-3 py-1 rounded-full text-xs font-semibold transition ${preferredLang === 'en' ? 'bg-rose text-snow' : 'bg-cloud text-midnight'}`}>EN</button>
        <button onClick={() => updatePref('he')} className={`px-3 py-1 rounded-full text-xs font-semibold transition ${preferredLang === 'he' ? 'bg-rose text-snow' : 'bg-cloud text-midnight'}`}>ע</button>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-midnight via-midnight to-rose/30 text-snow">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-rose/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-36 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
            <DualText en={t.heroTitle} he={t.heroTitleHe} preferredLang={preferredLang} containerClassName="flex-col md:flex-row" />
          </h1>
          <DualText en={t.heroSub} he={t.heroSubHe} classNameEn="text-xl md:text-2xl mb-12 text-cloud/80" classNameHe="text-xl md:text-2xl mb-12 text-cloud/80" preferredLang={preferredLang} />
          {/* FIXED: No div inside button */}
          <button
            onClick={() => { setStep(0); setSent(false); }}
            className="ripple inline-flex items-center gap-3 bg-rose text-snow px-10 py-5 rounded-full text-xl font-semibold hover:bg-rose/90 transition-all shadow-2xl hover:scale-105"
          >
            <DualTextInline en={t.startCta} he={t.startCtaHe} preferredLang={preferredLang} />
            <span className="text-2xl">→</span>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative w-full h-24 md:h-36 animate-wave" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none">
            <path d="M0 70C240 30 480 100 720 60C960 20 1200 100 1440 50V100H0V70Z" fill="#F7F7F9" />
          </svg>
        </div>
      </section>

      {/* Wizard */}
      <section className="py-20 bg-transparent relative -mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50">
            {!sent ? (
              <>
                <div className="flex flex-wrap justify-between mb-12 gap-2">
                  {t.stepTitles.map((title: string, idx: number) => (
                    <div key={idx} className={`flex-1 min-w-[100px] text-center pb-2 border-b-4 transition-colors ${idx <= step ? 'border-rose' : 'border-cloud'}`}>
                      <span className={`block font-bold text-sm md:text-base ${idx <= step ? 'text-rose' : 'text-midnight/40'}`}>
                        {preferredLang === 'en' ? title : t.stepTitlesHe[idx]}
                      </span>
                      <span className="block text-xs text-midnight/30 mt-1">
                        {preferredLang === 'en' ? t.stepTitlesHe[idx] : title}
                      </span>
                    </div>
                  ))}
                </div>

                {step === 0 && (
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-midnight">
                      <DualText en={t.stepTitles[0]} he={t.stepTitlesHe[0]} preferredLang={preferredLang} />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {t.platforms.map((p: any) => renderCard(p, selectPlatform, selection.platform === p.value))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-midnight">
                      <DualText en={t.stepTitles[1]} he={t.stepTitlesHe[1]} preferredLang={preferredLang} />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {t.features.map((f: any) => renderCard(f, toggleFeature, selection.features.includes(f.value)))}
                    </div>
                    <div className="flex justify-between mt-12">
                      <button onClick={() => setStep(0)} className="text-midnight/60 hover:text-midnight font-medium inline-flex items-center gap-1">
                        <DualTextInline en={t.backBtn} he={t.backBtnHe} preferredLang={preferredLang} />
                      </button>
                      <button onClick={() => setStep(2)} className="bg-rose text-snow px-8 py-3 rounded-full font-semibold hover:bg-rose/90 transition shadow-lg inline-flex items-center gap-1">
                        <DualTextInline en={t.nextBtn} he={t.nextBtnHe} preferredLang={preferredLang} />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-midnight">
                      <DualText en={t.stepTitles[2]} he={t.stepTitlesHe[2]} preferredLang={preferredLang} />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {t.scopes.map((s: any) => renderCard(s, selectScope, selection.scope === s.value))}
                    </div>
                    <div className="flex justify-between mt-12">
                      <button onClick={() => setStep(1)} className="text-midnight/60 hover:text-midnight font-medium inline-flex items-center gap-1">
                        <DualTextInline en={t.backBtn} he={t.backBtnHe} preferredLang={preferredLang} />
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-midnight">
                      <DualText en={t.stepTitles[3]} he={t.stepTitlesHe[3]} preferredLang={preferredLang} />
                    </h2>
                    <div className="max-w-lg mx-auto space-y-6">
                      <input type="text" placeholder={t.namePlaceholder} value={selection.name} onChange={e => setSelection(prev => ({ ...prev, name: e.target.value }))} className="w-full p-4 bg-white/70 backdrop-blur border border-cloud rounded-xl focus:border-rose outline-none text-lg" />
                      <input type="email" placeholder={t.emailPlaceholder} value={selection.email} onChange={e => setSelection(prev => ({ ...prev, email: e.target.value }))} className="w-full p-4 bg-white/70 backdrop-blur border border-cloud rounded-xl focus:border-rose outline-none text-lg" />
                      <input type="tel" placeholder={t.phonePlaceholder} value={selection.phone} onChange={e => setSelection(prev => ({ ...prev, phone: e.target.value }))} className="w-full p-4 bg-white/70 backdrop-blur border border-cloud rounded-xl focus:border-rose outline-none text-lg" />
                    </div>
                    <div className="flex justify-between mt-12">
                      <button onClick={() => setStep(2)} className="text-midnight/60 hover:text-midnight font-medium inline-flex items-center gap-1">
                        <DualTextInline en={t.backBtn} he={t.backBtnHe} preferredLang={preferredLang} />
                      </button>
                      <button onClick={submit} disabled={sending} className="bg-rose text-snow px-10 py-4 rounded-full font-bold text-lg hover:bg-rose/90 transition shadow-xl disabled:opacity-50 inline-flex items-center gap-1">
                        <DualTextInline en={sending ? t.sendingText : t.sendBtn} he={sending ? t.sendingTextHe : t.sendBtnHe} preferredLang={preferredLang} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10">
                <h2 className="text-3xl font-bold text-midnight mb-6"><DualText en={t.successTitle} he={t.successTitleHe} preferredLang={preferredLang} /></h2>
                <p className="text-midnight/70 mb-8"><DualText en={t.successText} he={t.successTextHe} preferredLang={preferredLang} /></p>
                <div className="bg-cloud p-6 rounded-2xl max-w-sm mx-auto text-left text-sm space-y-3">
                  <p className="font-bold text-lg">{preferredLang === 'en' ? t.platforms.find((p:any) => p.value === selection.platform)?.label : t.platforms.find((p:any) => p.value === selection.platform)?.labelHe}</p>
                  <p><span className="font-medium">Features:</span> {selection.features.map(f => preferredLang === 'en' ? t.features.find((x:any) => x.value === f)?.label : t.features.find((x:any) => x.value === f)?.labelHe).join(', ')}</p>
                  <p><span className="font-medium">Scope:</span> {preferredLang === 'en' ? t.scopes.find((s:any) => s.value === selection.scope)?.label : t.scopes.find((s:any) => s.value === selection.scope)?.labelHe}</p>
                </div>
                <button onClick={reset} className="mt-8 text-rose font-semibold text-lg">Close / סגור</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About */}
      <AnimatedSection className="py-20 bg-gradient-to-b from-cloud to-snow">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <DualText en={t.aboutTitle} he={t.aboutTitleHe} as="h2" classNameEn="text-4xl md:text-5xl font-extrabold mb-10 text-midnight" classNameHe="text-4xl md:text-5xl font-extrabold mb-10 text-midnight" preferredLang={preferredLang} />
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-rose/10 rounded-full blur-xl" />
            <DualText en={t.aboutText} he={t.aboutTextHe} classNameEn="text-xl text-midnight/80 leading-relaxed" classNameHe="text-xl text-midnight/80 leading-relaxed" preferredLang={preferredLang} />
          </div>
        </div>
      </AnimatedSection>

      {/* Services */}
      <AnimatedSection className="py-20 bg-snow">
        <div className="max-w-7xl mx-auto px-6">
          <DualText en={t.servicesTitle} he={t.servicesTitleHe} as="h2" classNameEn="text-4xl md:text-5xl font-extrabold text-center mb-16" classNameHe="text-4xl md:text-5xl font-extrabold text-center mb-16" preferredLang={preferredLang} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {t.services.map((s: any, i: number) => (
              <div key={i} className="group relative bg-gradient-to-br from-cloud to-snow p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-cloud/50">
                <div className="text-5xl mb-6">{s.icon}</div>
                <DualText en={s.title} he={s.titleHe} as="h3" classNameEn="text-2xl font-bold mb-4 text-rose" classNameHe="text-2xl font-bold mb-4 text-rose" preferredLang={preferredLang} />
                <DualText en={s.desc} he={s.descHe} classNameEn="text-midnight/70" classNameHe="text-midnight/70" preferredLang={preferredLang} />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Guide */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-midnight to-rose/20 text-snow">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <DualText en={t.guideTitle} he={t.guideTitleHe} as="h2" classNameEn="text-4xl font-extrabold mb-12" classNameHe="text-4xl font-extrabold mb-12" preferredLang={preferredLang} />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {t.guideSteps.map((step: string, i: number) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-rose rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">{i+1}</div>
                <DualText en={step} he={t.guideStepsHe[i]} preferredLang={preferredLang} containerClassName="flex-col gap-2" />
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ---- REDESIGNED SECTIONS ---- */}
      <AnimatedSection className="py-20 bg-cloud">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Calculator with glassmorphism */}
          <div className="bg-white/80 backdrop-blur p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-4xl">🧮</span>
              <h3 className="text-2xl font-bold text-midnight">
                <DualText en={t.calculatorTitle} he={t.calculatorTitleHe} preferredLang={preferredLang} />
              </h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-midnight font-medium">
                  <DualText en={t.calcHoursLabel} he={t.calcHoursLabelHe} preferredLang={preferredLang} />
                </label>
                <input type="number" defaultValue={20} className="w-full p-3 rounded-xl border border-cloud bg-snow/50 focus:border-rose outline-none" />
              </div>
              <div>
                <label className="block mb-2 text-midnight font-medium">
                  <DualText en={t.calcRateLabel} he={t.calcRateLabelHe} preferredLang={preferredLang} />
                </label>
                <input type="number" defaultValue={150} className="w-full p-3 rounded-xl border border-cloud bg-snow/50 focus:border-rose outline-none" />
              </div>
              <div className="pt-4 border-t border-rose/20">
                <p className="text-3xl font-extrabold text-rose">
                  <DualText en={`${t.calcResultPrefix}3000`} he={`${t.calcResultPrefixHe}3000`} preferredLang={preferredLang} />
                </p>
              </div>
            </div>
          </div>

          {/* Calendar with rich styling */}
          <div className="bg-white/80 backdrop-blur p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-4xl">📅</span>
              <h3 className="text-2xl font-bold text-midnight">
                <DualText en={t.calendarTitle} he={t.calendarTitleHe} preferredLang={preferredLang} />
              </h3>
            </div>
            <div className="space-y-6">
              <div className="bg-snow/50 p-4 rounded-2xl">
                <p className="text-3xl font-bold text-midnight">
                  {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
                <p className="text-lg text-rose mt-1">
                  {new Intl.DateTimeFormat('he-IL-u-ca-hebrew', { dateStyle: 'full' }).format(new Date())}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-midnight mb-3 flex items-center gap-2">
                  <span>🎌</span> Upcoming / קרובים
                </h4>
                <ul className="space-y-2 text-sm text-midnight/70">
                  {t.holidays.map((h: any, i: number) => (
                    <li key={i} className="bg-snow/50 p-2 rounded-lg">
                      <DualText en={h.en} he={h.he} preferredLang={preferredLang} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter with elegant design */}
          <div className="bg-gradient-to-br from-rose/5 to-snow/80 backdrop-blur p-8 rounded-3xl shadow-xl border border-rose/20 hover:shadow-2xl transition">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-4xl">💌</span>
              <h3 className="text-2xl font-bold text-midnight">
                <DualText en={t.newsletterTitle} he={t.newsletterTitleHe} preferredLang={preferredLang} />
              </h3>
            </div>
            <div className="space-y-6">
              <input
                type="email"
                placeholder={preferredLang === 'en' ? t.newsletterPlaceholder : t.newsletterPlaceholderHe}
                className="w-full p-4 rounded-xl border border-rose/20 bg-white/70 focus:border-rose outline-none"
              />
              <button className="w-full bg-rose text-snow py-4 rounded-xl font-bold text-lg hover:bg-rose/90 transition shadow-lg">
                <DualText en={t.subscribeBtn} he={t.subscribeBtnHe} preferredLang={preferredLang} />
              </button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* News redesigned */}
      <AnimatedSection className="py-16 bg-snow">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="text-5xl">📰</span>
            <h3 className="text-4xl font-extrabold text-midnight">
              <DualText en={t.newsTitle} he={t.newsTitleHe} preferredLang={preferredLang} />
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.newsItems.map((item: any, i: number) => (
              <div key={i} className="group bg-gradient-to-br from-cloud to-snow p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-1 border border-cloud/50">
                <p className="text-midnight/80 font-medium">
                  <DualText en={item.en} he={item.he} preferredLang={preferredLang} />
                </p>
                <div className="mt-4 w-8 h-1 bg-rose rounded-full group-hover:w-12 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Contact */}
      <AnimatedSection className="py-20 bg-gradient-to-br from-midnight to-rose/30 text-snow">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <DualText en={t.contactTitle} he={t.contactTitleHe} as="h2" classNameEn="text-4xl md:text-5xl font-extrabold mb-8" classNameHe="text-4xl md:text-5xl font-extrabold mb-8" preferredLang={preferredLang} />
          <DualText en={t.contactText} he={t.contactTextHe} classNameEn="text-2xl mb-12 text-cloud/80" classNameHe="text-2xl mb-12 text-cloud/80" preferredLang={preferredLang} />
          <a href="mailto:hello@tanami360.com" className="ripple inline-flex items-center gap-3 bg-rose text-snow px-10 py-5 rounded-full text-xl font-semibold hover:bg-rose/90 transition shadow-2xl">
            hello@tanami360.com
          </a>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-midnight text-snow/60 py-8 text-center text-sm">
        <DualText en={t.footer} he={t.footerHe} preferredLang={preferredLang} />
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
