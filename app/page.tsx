'use client';

import { useState, useEffect, useRef } from 'react';

// ============ Types ============
type Step = 1 | 2 | 3 | 4;
type Language = 'en' | 'he';

interface SelectionData {
  platform: string;
  features: string[];
  scope: string;
  name: string;
  email: string;
  phone: string;
}

// ============ Bilingual Content ============
const content = {
  en: {
    heroTitle: '360° Platforms — Built, Hosted, Maintained.',
    heroSub: 'From idea to live product, Tanami360 handles it all.',
    startCta: 'Get Started',
    aboutTitle: 'About Tanami360',
    aboutText: 'We are a digital studio based in Herzliya, Israel. We design, develop, host, and maintain custom web platforms — all under a predictable monthly plan.',
    servicesTitle: 'What We Do',
    services: [
      { title: 'Build', desc: 'Custom platforms with Next.js, Supabase, and AI.' },
      { title: 'Host', desc: 'Fast, secure hosting on Vercel with automatic SSL.' },
      { title: 'Maintain', desc: 'Monthly updates, daily backups, and priority support.' },
    ],
    guideTitle: 'How It Works',
    guideText: '1. Choose your platform type. 2. Select features. 3. Define scope. 4. We build, host, and maintain it.',
    calculatorTitle: 'Project Cost Estimator',
    calcLabel1: 'Hours of work',
    calcLabel2: 'Hourly rate ($)',
    calcResult: 'Estimated: $',
    newsletterTitle: 'Stay Updated',
    newsletterPlaceholder: 'Your email',
    subscribeBtn: 'Subscribe',
    calendarTitle: 'Today',
    hebrewDate: 'Hebrew date:',
    holidaysTitle: 'Upcoming Holidays',
    holidays: ['Tu B\'Av – Aug 2', 'Rosh Hashanah – Sep 15', 'Yom Kippur – Sep 24', 'Sukkot – Sep 29'],
    newsTitle: 'In the News',
    newsItems: [
      'Israel GDP grew 2.5% in Q2 2026',
      'Tech stocks surge as AI regulation eases',
      'Shekel strengthens against dollar',
    ],
    contactTitle: 'Let’s Talk',
    contactText: 'Ready to build something great?',
    footer: '© 2026 Tanami360 — Herzliya, Israel',
    wizard: {
      step1Title: '1. Choose Platform Type',
      step2Title: '2. Select Features',
      step3Title: '3. Project Scope',
      step4Title: '4. Your Details',
      platforms: ['Web Application', 'SaaS Product', 'Dashboard / Admin', 'Fully Custom'],
      features: ['User Authentication', 'Payments (Stripe)', 'Admin Panel', 'API Integration', 'Automations', 'AI Features'],
      scopes: ['Quick MVP (2 weeks)', 'Full Product (1-2 months)', 'Monthly Maintenance'],
      namePlaceholder: 'Full Name',
      emailPlaceholder: 'Email Address',
      phonePlaceholder: 'Phone (optional)',
      back: 'Back',
      next: 'Next',
      send: 'Send Request',
      sending: 'Sending...',
      successTitle: 'Request Sent!',
      successText: 'We will review your choices and get back to you within 24 hours.',
      summaryTitle: 'Summary',
      platformLabel: 'Platform:',
      featuresLabel: 'Features:',
      scopeLabel: 'Scope:',
    },
  },
  he: {
    heroTitle: 'פלטפורמות 360° — פיתוח, אחסון, תחזוקה.',
    heroSub: 'מרעיון ועד למוצר חי, Tanami360 מטפלת בהכול.',
    startCta: 'התחל עכשיו',
    aboutTitle: 'על Tanami360',
    aboutText: 'אנחנו סטודיו דיגיטלי בהרצליה, ישראל. אנחנו מתכננים, מפתחים, מאחסנים ומתחזקים פלטפורמות ווב מותאמות אישית — במחיר חודשי קבוע.',
    servicesTitle: 'מה אנחנו עושים',
    services: [
      { title: 'פיתוח', desc: 'פלטפורמות מותאמות עם Next.js, Supabase ו-AI.' },
      { title: 'אחסון', desc: 'אחסון מהיר ומאובטח ב-Vercel עם SSL אוטומטי.' },
      { title: 'תחזוקה', desc: 'עדכונים חודשיים, גיבויים יומיים, ותמיכה טכנית.' },
    ],
    guideTitle: 'איך זה עובד',
    guideText: '1. בחר סוג פלטפורמה. 2. בחר תכונות. 3. הגדר היקף. 4. אנחנו בונים, מאחסנים ומתחזקים.',
    calculatorTitle: 'אומדן עלות פרויקט',
    calcLabel1: 'שעות עבודה',
    calcLabel2: 'תעריף שעתי (₪)',
    calcResult: 'אומדן: ₪',
    newsletterTitle: 'הישאר מעודכן',
    newsletterPlaceholder: 'האימייל שלך',
    subscribeBtn: 'הרשם',
    calendarTitle: 'היום',
    hebrewDate: 'תאריך עברי:',
    holidaysTitle: 'חגים קרובים',
    holidays: ['ט"ו באב – 2 באוג׳', 'ראש השנה – 15 בספט׳', 'יום כיפור – 24 בספט׳', 'סוכות – 29 בספט׳'],
    newsTitle: 'בחדשות',
    newsItems: [
      'התוצר הישראלי צמח ב-2.5% ברבעון השני',
      'עליות חדות במניות הטכנולוגיה בעולם',
      'השקל מתחזק מול הדולר',
    ],
    contactTitle: 'בואו נדבר',
    contactText: 'מוכנים לבנות משהו גדול?',
    footer: '© 2026 Tanami360 — הרצליה, ישראל',
    wizard: {
      step1Title: '1. בחר/י סוג פלטפורמה',
      step2Title: '2. בחר/י תכונות',
      step3Title: '3. היקף הפרויקט',
      step4Title: '4. הפרטים שלך',
      platforms: ['אפליקציית ווב', 'מערכת SaaS', 'לוח בקרה / אדמין', 'מערכת מותאמת אישית'],
      features: ['אימות משתמשים', 'תשלומים (Stripe)', 'לוח בקרה', 'חיבור API', 'אוטומציות', 'תכונות AI'],
      scopes: ['MVP מהיר (שבועיים)', 'מוצר מלא (1-2 חודשים)', 'תחזוקה חודשית'],
      namePlaceholder: 'שם מלא',
      emailPlaceholder: 'כתובת אימייל',
      phonePlaceholder: 'טלפון (רשות)',
      back: 'חזור',
      next: 'המשך',
      send: 'שלח בקשה',
      sending: 'שולח...',
      successTitle: 'הבקשה נשלחה!',
      successText: 'נבחן את הבחירות שלך ונחזור אליך תוך 24 שעות.',
      summaryTitle: 'סיכום',
      platformLabel: 'פלטפורמה:',
      featuresLabel: 'תכונות:',
      scopeLabel: 'היקף:',
    },
  },
};

// ============ Intersection Observer Hook ============
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(node);
      }
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useInView({ threshold: 0.1 });
  return (
    <div ref={ref} className={`animate-on-scroll ${isVisible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

function DualText({ en, he, as: Tag = 'p', classNameEn = '', classNameHe = '', containerClassName = '' }: any) {
  return (
    <div className={`flex flex-col md:flex-row md:gap-6 items-center md:items-baseline justify-center ${containerClassName}`}>
      <Tag className={`text-left md:text-right w-full md:w-1/2 ${classNameEn}`}>{en}</Tag>
      <Tag className={`text-right w-full md:w-1/2 ${classNameHe}`} dir="rtl">{he}</Tag>
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

// ============ Calculator Component ============
function Calculator({ t }: { t: any }) {
  const [hours, setHours] = useState(20);
  const [rate, setRate] = useState(150);
  return (
    <div className="bg-cloud p-6 rounded-2xl max-w-md mx-auto text-center">
      <label className="block mb-2 text-midnight">{t.calcLabel1}</label>
      <input type="number" value={hours} onChange={e => setHours(+e.target.value)} className="w-full p-2 rounded mb-4" />
      <label className="block mb-2 text-midnight">{t.calcLabel2}</label>
      <input type="number" value={rate} onChange={e => setRate(+e.target.value)} className="w-full p-2 rounded mb-4" />
      <div className="text-2xl font-bold text-rose">{t.calcResult}{hours * rate}</div>
    </div>
  );
}

// ============ Newsletter Component ============
function Newsletter({ t }: { t: any }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const handleSubscribe = () => {
    // יישלח ל-API
    fetch('/api/lead', { method: 'POST', body: JSON.stringify({ type: 'newsletter', email }) });
    setSubscribed(true);
  };
  return (
    <div className="bg-cloud p-6 rounded-2xl text-center">
      {subscribed ? (
        <p className="text-rose font-semibold">Thanks! / תודה!</p>
      ) : (
        <div className="flex gap-2 justify-center">
          <input type="email" placeholder={t.newsletterPlaceholder} value={email} onChange={e => setEmail(e.target.value)} className="p-2 rounded" />
          <button onClick={handleSubscribe} className="bg-rose text-snow px-4 py-2 rounded-full">{t.subscribeBtn}</button>
        </div>
      )}
    </div>
  );
}

// ============ Calendar Component ============
function Calendar({ t }: { t: any }) {
  const today = new Date();
  const hebrewDate = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', { dateStyle: 'full' }).format(today);
  return (
    <div className="bg-cloud p-6 rounded-2xl text-center">
      <h3 className="text-xl font-bold mb-2 text-midnight">{t.calendarTitle}</h3>
      <p className="text-sm text-midnight/70">{today.toDateString()}</p>
      <p className="text-sm text-rose">{t.hebrewDate} {hebrewDate}</p>
      <div className="mt-4">
        <h4 className="font-semibold">{t.holidaysTitle}</h4>
        <ul className="text-sm text-midnight/70">
          {t.holidays.map((h: string) => <li key={h}>{h}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const [showWizard, setShowWizard] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [selection, setSelection] = useState<SelectionData>({
    platform: '', features: [], scope: '', name: '', email: '', phone: '',
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

  const handleSelectPlatform = (p: string) => { setSelection(prev => ({ ...prev, platform: p })); setTimeout(() => setStep(2), 300); };
  const toggleFeature = (f: string) => {
    setSelection(prev => ({
      ...prev,
      features: prev.features.includes(f) ? prev.features.filter(x => x !== f) : [...prev.features, f],
    }));
  };
  const handleSelectScope = (s: string) => { setSelection(prev => ({ ...prev, scope: s })); setTimeout(() => setStep(4), 300); };
  const handleSubmit = async () => {
    setSending(true);
    const body = JSON.stringify({ ...selection, language: lang, type: 'wizard' });
    try { await fetch('/api/lead', { method: 'POST', body }); } catch {}
    setSending(false);
    setSent(true);
  };
  const resetWizard = () => {
    setShowWizard(false); setStep(1);
    setSelection({ platform: '', features: [], scope: '', name: '', email: '', phone: '' });
    setSent(false);
  };

  return (
    <div className="min-h-screen">
      {/* Language Switcher */}
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
          <button onClick={() => setShowWizard(true)} className="ripple inline-flex items-center gap-2 bg-rose text-snow px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose/90 transition-colors shadow-xl">
            {t.startCta} <span className="text-xl">→</span>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative w-full h-24 md:h-32 animate-wave" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none">
            <path d="M0 50C240 0 480 100 720 50C960 0 1200 100 1440 50V100H0V50Z" fill="var(--color-cloud)" />
          </svg>
        </div>
      </section>

      {/* Wizard Modal */}
      {showWizard && (
        <div className="fixed inset-0 bg-midnight/80 z-50 flex items-center justify-center p-4">
          <div className="bg-snow rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-10 max-h-[90vh] overflow-y-auto">
            <button onClick={resetWizard} className="text-midnight/50 hover:text-midnight float-right text-2xl">&times;</button>
            {!sent ? (
              <>
                <div className="w-full bg-cloud rounded-full h-2 mb-6"><div className="bg-rose h-2 rounded-full transition-all duration-500" style={{ width: `${(step/4)*100}%` }} /></div>
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-midnight">{t.wizard.step1Title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {t.wizard.platforms.map(p => (
                        <button key={p} onClick={() => handleSelectPlatform(p)} className="p-4 border border-cloud rounded-xl hover:border-rose hover:bg-rose/5 transition text-midnight font-medium">{p}</button>
                      ))}
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-midnight">{t.wizard.step2Title}</h2>
                    <div className="flex flex-wrap gap-3">
                      {t.wizard.features.map(f => (
                        <button key={f} onClick={() => toggleFeature(f)} className={`px-4 py-2 rounded-full border font-medium transition ${selection.features.includes(f) ? 'bg-rose text-snow border-rose' : 'bg-cloud text-midnight border-cloud'}`}>{f}</button>
                      ))}
                    </div>
                    <div className="flex justify-between mt-8">
                      <button onClick={() => setStep(1)} className="text-midnight/60 hover:text-midnight">{t.wizard.back}</button>
                      <button onClick={() => setStep(3)} className="bg-rose text-snow px-6 py-2 rounded-full">{t.wizard.next}</button>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-midnight">{t.wizard.step3Title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {t.wizard.scopes.map(s => (
                        <button key={s} onClick={() => handleSelectScope(s)} className="p-4 border border-cloud rounded-xl hover:border-rose hover:bg-rose/5 transition text-midnight font-medium">{s}</button>
                      ))}
                    </div>
                    <div className="flex justify-between mt-8">
                      <button onClick={() => setStep(2)} className="text-midnight/60 hover:text-midnight">{t.wizard.back}</button>
                    </div>
                  </div>
                )}
                {step === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-midnight">{t.wizard.step4Title}</h2>
                    <div className="space-y-4">
                      <input type="text" placeholder={t.wizard.namePlaceholder} value={selection.name} onChange={e => setSelection(prev => ({ ...prev, name: e.target.value }))} className="w-full p-3 border border-cloud rounded-xl focus:border-rose outline-none" />
                      <input type="email" placeholder={t.wizard.emailPlaceholder} value={selection.email} onChange={e => setSelection(prev => ({ ...prev, email: e.target.value }))} className="w-full p-3 border border-cloud rounded-xl focus:border-rose outline-none" />
                      <input type="tel" placeholder={t.wizard.phonePlaceholder} value={selection.phone} onChange={e => setSelection(prev => ({ ...prev, phone: e.target.value }))} className="w-full p-3 border border-cloud rounded-xl focus:border-rose outline-none" />
                    </div>
                    <div className="flex justify-between mt-8">
                      <button onClick={() => setStep(3)} className="text-midnight/60 hover:text-midnight">{t.wizard.back}</button>
                      <button onClick={handleSubmit} disabled={sending} className="bg-rose text-snow px-6 py-2 rounded-full disabled:opacity-50">{sending ? t.wizard.sending : t.wizard.send}</button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10">
                <h2 className="text-2xl font-bold text-midnight mb-4">{t.wizard.successTitle}</h2>
                <p className="text-midnight/70 mb-4">{t.wizard.successText}</p>
                <div className="bg-cloud p-4 rounded-xl text-left text-sm space-y-2">
                  <p><strong>{t.wizard.platformLabel}</strong> {selection.platform}</p>
                  <p><strong>{t.wizard.featuresLabel}</strong> {selection.features.join(', ') || '-'}</p>
                  <p><strong>{t.wizard.scopeLabel}</strong> {selection.scope}</p>
                </div>
                <button onClick={resetWizard} className="mt-6 text-rose font-semibold">Close</button>
              </div>
            )}
          </div>
        </div>
      )}

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
            {t.services.map((s, i) => (
              <ServiceCard key={i} titleEn={s.title} titleHe={s.title} descEn={s.desc} descHe={s.desc} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Guide */}
      <AnimatedSection className="py-16 bg-cloud">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <DualText en={t.guideTitle} he={t.guideTitle} as="h2" classNameEn="text-3xl font-bold mb-6" classNameHe="text-3xl font-bold mb-6" />
          <DualText en={t.guideText} he={t.guideText} classNameEn="text-lg text-midnight/70" classNameHe="text-lg text-midnight/70" />
        </div>
      </AnimatedSection>

      {/* Calculator + Calendar + Newsletter */}
      <AnimatedSection className="py-20 bg-snow">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-center mb-4 text-midnight">{t.calculatorTitle}</h3>
            <Calculator t={t} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-center mb-4 text-midnight">{t.calendarTitle}</h3>
            <Calendar t={t} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-center mb-4 text-midnight">{t.newsletterTitle}</h3>
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