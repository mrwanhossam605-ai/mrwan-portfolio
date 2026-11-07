import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { EMAIL, WHATSAPP_URL, LINKEDIN_URL, BEHANCE_URL, CV_PATH } from '../config';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // Dynamically detect if #skills exists in DOM
  const [hasSkills, setHasSkills] = useState(() =>
    typeof document !== 'undefined' ? Boolean(document.getElementById('skills')) : false
  );

  const navRef = useRef(null);
  const linksContainerRef = useRef(null);
  const linkRefs = useRef({});
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef(null);

  // Sections in exact order
  const validSectionIds = ['work', 'services', 'about', ...(hasSkills ? ['skills'] : []), 'contact'];

  const navLinks = [
    { label: 'Work', id: 'work', href: '#work' },
    { label: 'Services', id: 'services', href: '#services' },
    { label: 'About', id: 'about', href: '#about' },
    ...(hasSkills ? [{ label: 'Skills', id: 'skills', href: '#skills' }] : []),
    { label: 'Contact', id: 'contact', href: '#contact' },
  ];

  // Verify skills section presence on mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const skillsEl = document.getElementById('skills');
      if (Boolean(skillsEl) !== hasSkills) {
        setHasSkills(Boolean(skillsEl));
      }
    }
  }, [hasSkills]);

  // Compute active section based on scroll position and reference line
  const computeActiveSection = useCallback(() => {
    if (isClickScrollingRef.current) return;

    if (typeof document === 'undefined') return;

    // 3. If page is scrolled to bottom, force last section (Contact) to be active
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    );

    const availableSections = ['work', 'services', 'about', ...(document.getElementById('skills') ? ['skills'] : []), 'contact'].filter(
      (id) => Boolean(document.getElementById(id))
    );

    if (availableSections.length === 0) {
      setActiveSection(null);
      return;
    }

    if (scrollY + windowHeight >= documentHeight - 4) {
      setActiveSection(availableSections[availableSections.length - 1]);
      return;
    }

    // 2. Reference line at navbarHeight + 40px from top of viewport
    const navEl = navRef.current || document.querySelector('header nav');
    const navRect = navEl ? navEl.getBoundingClientRect() : null;
    const navbarHeight = navRect ? navRect.bottom : 80;
    // Section headers use scroll-mt-[120px], so landing position is 120px. Ensure referenceLine accommodates this.
    const referenceLine = Math.max(124, Math.round(navbarHeight + 40));

    // The active section is the LAST one whose getBoundingClientRect().top <= referenceLine
    let currentActive = null;
    for (const id of availableSections) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top;
        if (top <= referenceLine) {
          currentActive = id;
        }
      }
    }

    // If none qualifies (e.g. inside hero or marquee), currentActive is null
    setActiveSection(currentActive);
  }, []);

  // 4. Handle click on nav link: immediately activate and ignore scroll updates for 800ms
  const handleNavClick = useCallback((sectionId) => {
    setActiveSection(sectionId);
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
      computeActiveSection();
    }, 800);
  }, [computeActiveSection]);

  // "Let's talk" action: close mobile overlay, unlock body scroll, scroll to #contact
  const handleLetsTalkClick = useCallback((e) => {
    if (e && e.cancelable) {
      e.preventDefault();
    }
    setMobileMenuOpen(false);
    document.body.style.overflow = 'unset';

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      handleNavClick('contact');
    } else {
      window.location.href = '/#contact';
    }
  }, [handleNavClick]);

  // Main scroll & resize event handling (requestAnimationFrame-throttled, passive listener)
  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        computeActiveSection();
        rafId = null;
      });
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && validSectionIds.includes(hash)) {
        handleNavClick(hash);
      } else {
        computeActiveSection();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('load', computeActiveSection);
    window.addEventListener('popstate', computeActiveSection);

    // Initial check on mount
    const hash = window.location.hash.replace('#', '');
    if (hash && validSectionIds.includes(hash)) {
      handleNavClick(hash);
    } else {
      computeActiveSection();
    }

    // Staggered re-evaluations for initial layout/hash landing
    const t1 = setTimeout(computeActiveSection, 100);
    const t2 = setTimeout(computeActiveSection, 350);
    const t3 = setTimeout(computeActiveSection, 700);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('load', computeActiveSection);
      window.removeEventListener('popstate', computeActiveSection);
    };
  }, [computeActiveSection, handleNavClick]);

  // Update sliding blue indicator position when activeSection changes or window resizes
  useEffect(() => {
    if (!activeSection) {
      setIndicatorStyle({ left: 0, width: 0 });
      return;
    }

    const updateIndicator = () => {
      const activeEl = linkRefs.current[activeSection];
      const containerEl = linksContainerRef.current;
      if (activeEl && containerEl) {
        const containerRect = containerEl.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        setIndicatorStyle({
          left: activeRect.left - containerRect.left,
          width: activeRect.width,
        });
      }
    };

    updateIndicator();
    const rafId = requestAnimationFrame(updateIndicator);
    const timer = setTimeout(updateIndicator, 50);
    window.addEventListener('resize', updateIndicator);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeSection, hasSkills]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Outer fixed wrapper: transparent, no border, no background, no box-shadow, pointer-events: none */}
      <header
        className="fixed top-4 sm:top-6 left-0 right-0 z-40 flex justify-center pointer-events-none bg-transparent border-0 shadow-none m-0 p-0"
        style={{
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          visibility: mobileMenuOpen ? 'hidden' : 'visible',
        }}
      >
        {/* Floating White Pill: max-width calc(100% - 32px), 3px border, hard shadow, overflow visible */}
        <nav
          ref={navRef}
          className={`pointer-events-auto w-[calc(100%-32px)] max-w-container bg-card-bg border-3 border-stroke rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 shadow-neo transition-transform duration-300 ${
            scrolled ? 'scale-[0.96]' : 'scale-100'
          }`}
          style={{
            overflow: 'visible',
            transformOrigin: 'center center',
          }}
          aria-label="Main Navigation"
        >
          {/* Logo on the left: Always visible, single line (font-size ~20px on mobile) */}
          <a
            href="#"
            onClick={() => {
              setActiveSection(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Mrwan H. - Back to top"
            className="flex items-center gap-1.5 font-heading font-extrabold text-[20px] min-[900px]:text-2xl text-stroke tracking-tight hover:opacity-90 transition-opacity select-none group flex-shrink-0 whitespace-nowrap"
          >
            <span>Mrwan H.</span>
            <span
              className="text-primary text-[20px] min-[900px]:text-2xl group-hover:rotate-45 transition-transform duration-300 inline-block"
              aria-hidden="true"
            >
              ✦
            </span>
          </a>

          {/* Desktop Nav Links (Center): Visible only at 900px and above */}
          <div
            ref={linksContainerRef}
            className="relative hidden min-[900px]:flex items-center gap-1 font-body font-bold text-base p-1 rounded-full overflow-hidden border-0 border-none"
            style={{ position: 'relative' }}
          >
            {/* Sliding Blue Indicator: animates smoothly to active link, hides when none */}
            <span
              className={`absolute top-1 bottom-1 bg-primary border-2 border-stroke rounded-full shadow-[2px_2px_0_#18181B] pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                activeSection && indicatorStyle.width > 0 ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
              }}
              aria-hidden="true"
            />

            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  ref={(el) => (linkRefs.current[link.id] = el)}
                  href={link.href}
                  onClick={() => handleNavClick(link.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative z-10 px-5 py-1.5 rounded-full transition-colors duration-200 select-none ${
                    isActive ? 'text-white' : 'text-stroke hover:text-primary'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right side CTA & Mobile Menu Trigger (min 12px gap from logo via gap-3) */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Desktop "Let's talk" button: Visible ONLY at 900px and above, real anchor to #contact */}
            <a
              href="#contact"
              onClick={handleLetsTalkClick}
              onTouchEnd={handleLetsTalkClick}
              className="relative z-10 pointer-events-auto hidden min-[900px]:inline-flex items-center gap-1.5 animate-wiggle-periodic neo-btn bg-primary text-white text-sm sm:text-base px-5 py-2 font-bold select-none min-h-[44px]"
            >
              <span>Let's talk</span>
              <span className="text-xs" aria-hidden="true">💬</span>
            </a>

            {/* Mobile Hamburger button: Visible below 900px - 44px tap target */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="relative z-10 pointer-events-auto min-[900px]:hidden neo-btn bg-secondary text-stroke p-2.5 w-11 h-11 flex items-center justify-center select-none"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen Mobile Overlay: Below 900px, 100% OPAQUE with grid pattern */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 h-[100dvh] w-full overflow-y-auto min-[900px]:hidden animate-mobile-overlay"
          style={{
            backgroundColor: '#F8F6FF',
            backgroundImage: `
              linear-gradient(to right, rgba(24, 24, 27, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(24, 24, 27, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
            padding: '20px',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="flex flex-col min-h-full max-w-md mx-auto">
            {/* Top Bar with Logo and Close Button */}
            <div className="flex items-center justify-between w-full mb-6">
              <a
                href="#"
                onClick={() => {
                  setActiveSection(null);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                aria-label="Mrwan H. - Back to top"
                className="flex items-center gap-1.5 font-heading font-extrabold text-[22px] text-stroke tracking-tight whitespace-nowrap select-none"
              >
                <span>Mrwan H.</span>
                <span className="text-primary text-[22px]">✦</span>
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-12 h-12 rounded-full bg-card-bg border-3 border-stroke shadow-neo flex items-center justify-center text-stroke hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-transform cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6 stroke-[3]" />
              </button>
            </div>

            {/* Stacked White Link Cards spaced 14px apart */}
            <div className="flex flex-col gap-[14px] w-full">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => {
                      handleNavClick(link.id);
                      setMobileMenuOpen(false);
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    style={{ animationDelay: `${idx * 60}ms` }}
                    className={`animate-mobile-card group flex items-center justify-between p-4 border-3 border-stroke rounded-[18px] shadow-neo font-heading font-extrabold text-2xl text-stroke active:scale-[0.98] transition-all duration-200 ${
                      isActive
                        ? 'bg-secondary ring-2 ring-stroke'
                        : 'bg-card-bg hover:bg-secondary'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 border-2 border-stroke rounded-full transition-colors ${
                          isActive ? 'bg-primary text-white' : 'bg-page-bg text-stroke'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span>{link.label}</span>
                    </div>
                    <ArrowUpRight
                      className={`w-6 h-6 text-stroke transition-transform ${
                        isActive ? 'translate-x-1 -translate-y-1' : 'group-hover:translate-x-1 group-hover:-translate-y-1'
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* Mobile Bottom CTA in normal flow below links with 24px margin-top */}
            <div
              className="animate-mobile-card mt-6 flex flex-col items-center w-full pb-6"
              style={{ animationDelay: `${navLinks.length * 60}ms` }}
            >
              <a
                href="#contact"
                onClick={handleLetsTalkClick}
                onTouchEnd={handleLetsTalkClick}
                className="relative z-10 pointer-events-auto neo-btn bg-primary text-white text-lg py-4 w-full text-center font-extrabold shadow-neo active:scale-[0.98] min-h-[44px] flex items-center justify-center gap-2 select-none"
              >
                <span>Let's talk 🚀</span>
              </a>
              <div className="flex items-center justify-center gap-3 mt-4 text-xs font-bold text-stroke">
                <a
                  href={`mailto:${EMAIL}?subject=Project%20inquiry%20from%20your%20portfolio`}
                  className="hover:underline hover:text-primary"
                >
                  Email
                </a>
                <span>·</span>
                {WHATSAPP_URL && (
                  <>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-primary"
                    >
                      WhatsApp
                    </a>
                    <span>·</span>
                  </>
                )}
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-primary"
                >
                  LinkedIn
                </a>
                <span>·</span>
                <a
                  href={CV_PATH}
                  download="Mrwan-CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-primary"
                >
                  CV
                </a>
              </div>
              <p className="text-center text-xs font-bold text-muted mt-3">
                Cairo, Egypt 🇪🇬 · Open for freelance &amp; contracts
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
