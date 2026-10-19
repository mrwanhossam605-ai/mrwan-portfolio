import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const linksContainerRef = useRef(null);
  const linkRefs = useRef({});

  const navLinks = [
    { label: 'Work', id: 'work', href: '#work' },
    { label: 'Services', id: 'services', href: '#services' },
    { label: 'About', id: 'about', href: '#about' },
    { label: 'Contact', id: 'contact', href: '#contact' },
  ];

  // Detect scroll state for scaling pill
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // At the top of the page (hero in view), no link is active
      const workEl = document.getElementById('work');
      const workTop = workEl ? workEl.offsetTop : 800;
      if (window.scrollY < workTop - window.innerHeight * 0.4) {
        setActiveSection(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver with rootMargin '-40% 0px -50% 0px' for active section detection
  useEffect(() => {
    const sectionIds = ['work', 'services', 'about', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Update sliding blue pill position when activeSection changes or window resizes
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
    window.addEventListener('resize', updateIndicator);
    const timer = setTimeout(updateIndicator, 150);
    return () => {
      window.removeEventListener('resize', updateIndicator);
      clearTimeout(timer);
    };
  }, [activeSection]);

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
          className={`pointer-events-auto w-[calc(100%-32px)] max-w-container bg-card-bg border-3 border-stroke rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-neo transition-transform duration-300 ${
            scrolled ? 'scale-[0.96]' : 'scale-100'
          }`}
          style={{
            overflow: 'visible',
            transformOrigin: 'center center',
          }}
          aria-label="Main Navigation"
        >
          {/* Logo on the left: Always visible, single line, font-size around 22px */}
          <a
            href="#"
            aria-label="Mrwan H. - Back to top"
            className="flex items-center gap-1.5 font-heading font-extrabold text-[22px] min-[900px]:text-2xl text-stroke tracking-tight hover:opacity-90 transition-opacity select-none group flex-shrink-0 whitespace-nowrap"
          >
            <span>Mrwan H.</span>
            <span
              className="text-primary text-[22px] min-[900px]:text-2xl group-hover:rotate-45 transition-transform duration-300 inline-block"
              aria-hidden="true"
            >
              ✦
            </span>
          </a>

          {/* Desktop Nav Links (Center): Visible only at 900px and above, no border on container */}
          <div
            ref={linksContainerRef}
            className="relative hidden min-[900px]:flex items-center gap-1 font-body font-bold text-base p-1 rounded-full overflow-hidden border-0 border-none"
            style={{ position: 'relative' }}
          >
            {/* Sliding Blue Indicator: completely hidden at top of page, appears only when a section is active */}
            {activeSection && indicatorStyle.width > 0 ? (
              <span
                className="absolute top-1 bottom-1 bg-primary border-2 border-stroke rounded-full shadow-[2px_2px_0_#18181B] pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{
                  transform: `translateX(${indicatorStyle.left}px)`,
                  width: `${indicatorStyle.width}px`,
                  opacity: 1,
                }}
                aria-hidden="true"
              />
            ) : null}

            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  ref={(el) => (linkRefs.current[link.id] = el)}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative z-10 px-4 py-1.5 rounded-full transition-colors duration-200 select-none ${
                    isActive ? 'text-white' : 'text-stroke hover:text-primary'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right side CTA & Mobile Menu Trigger */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Desktop "Let's talk" button: Visible ONLY at 900px and above */}
            <a
              href="#contact"
              className="hidden min-[900px]:inline-flex animate-wiggle-periodic neo-btn bg-primary text-white text-sm sm:text-base px-5 py-2 font-bold select-none"
            >
              <span>Let's talk</span>
              <span className="text-xs" aria-hidden="true">💬</span>
            </a>

            {/* Mobile Hamburger button: Visible below 900px - 44px tap target */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="min-[900px]:hidden neo-btn bg-secondary text-stroke p-2.5 w-11 h-11 flex items-center justify-center select-none"
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
            {/* Top Bar with Logo and Close Button (48x48 white circle with 3px border and hard shadow) */}
            <div className="flex items-center justify-between w-full mb-6">
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
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

            {/* 4 Stacked White Link Cards spaced 14px apart, starting under header */}
            <div className="flex flex-col gap-[14px] w-full">
              {navLinks.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${idx * 60}ms` }}
                  className="animate-mobile-card group flex items-center justify-between p-4 bg-card-bg border-3 border-stroke rounded-[18px] shadow-neo font-heading font-extrabold text-2xl text-stroke hover:bg-secondary active:scale-[0.98] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 bg-page-bg border-2 border-stroke rounded-full">
                      0{idx + 1}
                    </span>
                    <span>{link.label}</span>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-stroke group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              ))}
            </div>

            {/* Mobile Bottom CTA in normal flow below links with 24px margin-top */}
            <div
              className="animate-mobile-card mt-6 flex flex-col items-center w-full pb-6"
              style={{ animationDelay: `${navLinks.length * 60}ms` }}
            >
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="neo-btn bg-primary text-white text-lg py-4 w-full text-center font-extrabold shadow-neo active:scale-[0.98]"
              >
                Let's talk 🚀
              </a>
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
