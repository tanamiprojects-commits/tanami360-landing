'use client';

import { useRef, useState, useEffect, useCallback, type ElementType } from 'react';

// ============ Accessibility Context ============
type A11ySettings = {
  fontSize: number;       // percentage, 100 = normal
  highContrast: boolean;
};

const defaultSettings: A11ySettings = { fontSize: 100, highContrast: false };

function loadSettings(): A11ySettings {
  if (typeof window === 'undefined') return defaultSettings;
  try {
    const saved = localStorage.getItem('tanami360-a11y');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

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

// ============ Animated Section ============
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useInView({ threshold: 0.1 });
  return (
    <div ref={ref} className={`animate-on-scroll ${isVisible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

// ============ Dual Language Text ============
function DualText({
  en, he, as: Tag = 'p', classNameEn = '', classNameHe = '', containerClassName = ''
}: {
  en: string; he: string; as?: ElementType;
  classNameEn?: string; classNameHe?: string; containerClassName?: string;
}) {
  return (
    <div className={`flex flex-col md:flex-row md:gap-6 items-center md:items-baseline justify-center ${containerClassName}`}>
      <Tag className={`text-left md:text-right w-full md:w-1/2 ${classNameEn}`}>{en}</Tag>
      <Tag className={`text-right w-full md:w-1/2 ${classNameHe}`} dir="rtl">{he}</Tag>
    </div>
  );
}

// ============ Service Card ============
function ServiceCard({ titleEn, titleHe, descEn, descHe }: { titleEn: string; titleHe: string; descEn: string; descHe: string }) {
  return (
    <div className="bg-cloud rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ripple">
      <DualText en={titleEn} he={titleHe} as="h3" classNameEn="text-2xl font-bold mb-4 text-rose" classNameHe="text-2xl font-bold mb-4 text-rose" />
      <DualText en={descEn} he={descHe} classNameEn="text-midnight/70" classNameHe="text-midnight/70" />
    </div>
  );
}

// ============ Accessibility Widget ============
function AccessibilityWidget() {
  const [settings, setSettings] = useState<A11ySettings>(loadSettings);
  const [open, setOpen] = useState(false);

  const applySettings = useCallback((s: A11ySettings) => {
    const html = document.documentElement;
    html.style.fontSize = `${s.fontSize}%`;
    if (s.highContrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }
    localStorage.setItem('tanami360-a11y', JSON.stringify(s));
  }, []);

  useEffect(() => {
    applySettings(settings);
  }, [settings, applySettings]);

  const increaseFont = () => setSettings(prev => {
    const newSize = Math.min(prev.fontSize + 10, 200);
    return { ...prev, fontSize: newSize };
  });
  const decreaseFont = () => setSettings(prev => {
    const newSize = Math.max(prev.fontSize - 10, 60);
    return { ...prev, fontSize: newSize };
  });
  const toggleContrast = () => setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  const reset = () => setSettings(defaultSettings);

  return (
    <>
      <button
        className="a11y-btn"
        onClick={() => setOpen(prev => !prev)}
        aria-label="Accessibility menu"
        title="Accessibility"
      >
        ♿
      </button>
      {open && (
        <div className="a11y-panel">
          <p className="font-bold mb-2 text-midnight">Accessibility / נגישות</p>
          <div className="flex flex-col gap-2 text-sm">
            <button onClick={increaseFont} className="bg-cloud text-midnight px-3 py-1 rounded hover:bg-rose/20 transition">A+ Increase</button>
            <button onClick={decreaseFont} className="bg-cloud text-midnight px-3 py-1 rounded hover:bg-rose/20 transition">A- Decrease</button>
            <button onClick={toggleContrast} className="bg-cloud text-midnight px-3 py-1 rounded hover:bg-rose/20 transition">
              {settings.highContrast ? 'Standard Contrast' : 'High Contrast'}
            </button>
            <button onClick={reset} className="bg-cloud text-midnight px-3 py-1 rounded hover:bg-rose/20 transition">Reset</button>
          </div>
        </div>
      )}
    </>
  );
}

// ============ Scroll Progress Bar ============
function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setWidth(scrolled);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div id="scroll-progress" style={{ width: `${width}%` }} />;
}

// ============ Ripple CTA Button ============
function CTAButton({ text }: { text: string }) {
  return (
    <a
      href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@tanami360.com"
      target="_blank"
      rel="noopener noreferrer"
      className="ripple inline-flex items-center gap-2 bg-rose text-snow px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose/90 transition-colors shadow-xl"
    >
      {text} <span className="text-xl">→</span>
    </a>
  );
}

// ============ Main Page ============
export default function Home() {
  return (
    <>
      <ScrollProgress />
      <AccessibilityWidget />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative overflow-hidden bg-midnight text-snow">
          <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight flex flex-col md:flex-row md:justify-center md:gap-6">
              <span>360° Platforms — Built, Hosted, Maintained.</span>
              <span dir="rtl">פלטפורמות 360° — פיתוח, אחסון, תחזוקה.</span>
            </h1>

            <DualText
              en="From idea to live product, Tanami360 handles it all."
              he="מרעיון ועד למוצר חי, Tanami360 מטפלת בהכול."
              classNameEn="text-xl md:text-2xl mb-10 text-cloud/90"
              classNameHe="text-xl md:text-2xl mb-10 text-cloud/90"
            />

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <CTAButton text="Start Your Project" />
              <CTAButton text="התחל את הפרויקט שלך" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
              className="relative w-full h-24 md:h-32 animate-wave"
              viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none"
            >
              <path d="M0 50C240 0 480 100 720 50C960 0 1200 100 1440 50V100H0V50Z" fill="var(--color-cloud)" />
            </svg>
          </div>
        </section>

        {/* About */}
        <AnimatedSection className="py-20 bg-cloud">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <DualText
              en="About Tanami360" he="על Tanami360"
              as="h2"
              classNameEn="text-3xl md:text-4xl font-bold mb-6 text-midnight"
              classNameHe="text-3xl md:text-4xl font-bold mb-6 text-midnight"
            />
            <DualText
              en="We are a digital studio based in Herzliya, Israel. We design, develop, host, and maintain custom web platforms. Our clients get a dedicated subdomain, SSL, backups, and ongoing support — all under a predictable monthly plan."
              he="אנחנו סטודיו דיגיטלי בהרצליה, ישראל. אנחנו מתכננים, מפתחים, מאחסנים ומתחזקים פלטפורמות ווב מותאמות אישית. כל לקוח מקבל תת-דומיין ייעודי, SSL, גיבויים ותמיכה שוטפת — במחיר חודשי קבוע."
              classNameEn="text-lg text-midnight/80 leading-relaxed max-w-2xl mx-auto"
              classNameHe="text-lg text-midnight/80 leading-relaxed max-w-2xl mx-auto"
            />
          </div>
        </AnimatedSection>

        {/* Services */}
        <AnimatedSection className="py-20 bg-snow">
          <div className="max-w-6xl mx-auto px-6">
            <DualText
              en="What We Do" he="מה אנחנו עושים"
              as="h2"
              classNameEn="text-3xl md:text-4xl font-bold text-center mb-12"
              classNameHe="text-3xl md:text-4xl font-bold text-center mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ServiceCard
                titleEn="Build" titleHe="פיתוח"
                descEn="Custom platforms with Next.js, Supabase, and AI — tailored to your business."
                descHe="פלטפורמות מותאמות עם Next.js, Supabase ו-AI — בדיוק לצרכים שלך."
              />
              <ServiceCard
                titleEn="Host" titleHe="אחסון"
                descEn="Fast, secure hosting on Vercel with automatic SSL and 99.9% uptime."
                descHe="אחסון מהיר ומאובטח ב-Vercel עם SSL אוטומטי וזמינות של 99.9%."
              />
              <ServiceCard
                titleEn="Maintain" titleHe="תחזוקה"
                descEn="Monthly updates, daily backups, and priority support. We take care of everything."
                descHe="עדכונים חודשיים, גיבויים יומיים, ותמיכה טכנית. אנחנו דואגים להכול."
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Contact */}
        <AnimatedSection className="py-20 bg-midnight text-snow">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <DualText
              en="Let’s Talk" he="בואו נדבר"
              as="h2"
              classNameEn="text-3xl md:text-4xl font-bold mb-6"
              classNameHe="text-3xl md:text-4xl font-bold mb-6"
            />
            <DualText
              en="Ready to build something great? Drop us a message."
              he="מוכנים לבנות משהו גדול? שלחו לנו הודעה."
              classNameEn="text-xl mb-8 text-cloud"
              classNameHe="text-xl mb-8 text-cloud"
            />
            <CTAButton text="hello@tanami360.com" />
          </div>
        </AnimatedSection>

        {/* Footer */}
        <footer className="bg-cloud py-8 text-center text-midnight/60 text-sm">
          <p>© 2026 Tanami360 — Herzliya, Israel &nbsp;|&nbsp; הרצליה, ישראל</p>
          <p className="mt-2 text-xs">
            By using this site you agree to our standard terms. Tanami360 is not liable for external content or services.
          </p>
        </footer>
      </div>
    </>
  );
}