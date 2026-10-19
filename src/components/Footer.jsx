import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { EMAIL, LINKEDIN_URL, BEHANCE_URL, CV_PATH } from '../config';

export default function Footer() {
  const [wordmarkRef, wordmarkInView] = useInView({ threshold: 0.15 });
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const [fontSize, setFontSize] = useState(120);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const letters = ['M', 'r', 'w', 'a', 'n'];

  // Auto-fit wordmark to the container's inner width
  useEffect(() => {
    const updateFontSize = () => {
      if (!containerRef.current || !measureRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const measuredWidth = measureRef.current.getBoundingClientRect().width;
      if (measuredWidth > 0 && containerWidth > 0) {
        // (container width / text width at 100px * 100px)
        const targetSize = (containerWidth / measuredWidth) * 100;
        setFontSize(targetSize);
      }
    };

    updateFontSize();

    // Re-run on font load
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateFontSize);
    }

    // Re-run on resize using ResizeObserver
    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateFontSize();
      });
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateFontSize);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', updateFontSize);
    };
  }, []);

  return (
    <footer className="w-full px-4 sm:px-6 lg:px-8 mb-8" aria-label="Site Footer">
      {/* Full-width dark card inside page margins */}
      <div
        className="w-full max-w-container mx-auto bg-[#18181B] border-3 border-[#18181B] rounded-[32px] p-6 sm:p-10 md:p-12 relative overflow-hidden text-[#F8F6FF] select-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(248, 246, 255, 0.08) 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px',
        }}
      >
        {/* Hidden measurement span: text width at 100px */}
        <span
          ref={measureRef}
          aria-hidden="true"
          className="font-heading font-extrabold whitespace-nowrap"
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '-9999px',
            visibility: 'hidden',
            fontSize: '100px',
            lineHeight: 0.8,
            letterSpacing: '-0.04em',
            pointerEvents: 'none',
          }}
        >
          Mrwan
        </span>

        {/* TOP ROW: Two columns on desktop, stacked on mobile */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-10 mb-10 sm:mb-14 relative z-10 font-body font-medium">
          {/* Left Column */}
          <div className="flex flex-col gap-3 max-w-sm">
            <div className="flex items-center gap-1.5 font-heading font-extrabold text-xl text-[#F8F6FF]">
              <span>© 2026 Mrwan H.</span>
              <span className="text-secondary text-lg" aria-hidden="true">
                ✦
              </span>
            </div>
            <p className="text-[#F8F6FF]/80 text-sm sm:text-base leading-relaxed">
              UI/UX designer in Cairo, designing for English and Arabic audiences.
            </p>
            <div className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F8F6FF] mt-1">
              <span>Cairo, Egypt</span>
              <span>📍</span>
            </div>
          </div>

          {/* Right Column: Links + Back to top button */}
          <div className="flex flex-col sm:flex-row md:flex-row items-start sm:items-start gap-8 sm:gap-12 w-full md:w-auto justify-between">
            {/* Say Hello Links */}
            <div className="flex flex-col items-start gap-2.5">
              <span className="font-heading font-extrabold text-base sm:text-lg text-[#F8F6FF]">
                Say hello
              </span>
              <div className="flex flex-col items-start gap-2 text-sm sm:text-base">
                <a
                  href={`mailto:${EMAIL}?subject=Hello%20Mrwan`}
                  className="underline underline-offset-4 text-[#F8F6FF] hover:text-secondary hover:translate-x-1 transition-all duration-200"
                >
                  Email
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 text-[#F8F6FF] hover:text-secondary hover:translate-x-1 transition-all duration-200"
                >
                  LinkedIn
                </a>
                <a
                  href={BEHANCE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 text-[#F8F6FF] hover:text-secondary hover:translate-x-1 transition-all duration-200"
                >
                  Behance
                </a>
                <a
                  href={CV_PATH}
                  download="Mrwan-CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 text-[#F8F6FF] hover:text-secondary hover:translate-x-1 transition-all duration-200"
                  aria-label="Download CV as PDF"
                >
                  Download CV
                </a>
              </div>
            </div>

            {/* Back to top ↑ pill button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="neo-btn bg-secondary text-stroke text-sm sm:text-base px-5 py-2.5 font-bold border-3 border-[#F8F6FF] shadow-[4px_4px_0_#F8F6FF] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#F8F6FF] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all self-start sm:self-auto cursor-pointer"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4 stroke-[3]" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* GIANT WORDMARK CONTAINER (Measured for Auto-Fit) */}
        <div
          ref={(node) => {
            containerRef.current = node;
            wordmarkRef.current = node;
          }}
          className="relative w-full mt-6 sm:mt-10 overflow-visible select-none"
        >
          {/* Overlapping Stickers on Top-Right of Wordmark (anchored at right: 24px, top: -28px) */}
          <div
            className="absolute z-20 flex items-center gap-2 select-none pointer-events-none"
            style={{
              position: 'absolute',
              top: '-28px',
              right: '24px',
            }}
            aria-hidden="true"
          >
            {/* Small blue ✦ star sticker with gentle float */}
            <div className="animate-sticker-1 inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-primary text-white border-3 border-stroke rounded-xl shadow-neo rotate-[-10deg]">
              <span className="text-lg sm:text-xl font-black">✦</span>
            </div>

            {/* Yellow "H." pill sticker with gentle float */}
            <div className="animate-sticker-2 inline-flex items-center px-3 sm:px-4 py-0.5 sm:py-1 bg-secondary text-stroke font-heading font-extrabold text-sm sm:text-lg border-3 border-stroke rounded-full shadow-neo rotate-[6deg]">
              <span>H.</span>
            </div>
          </div>

          {/* Auto-fit Wordmark "Mrwan" left-aligned with card padding, clipped only at the bottom */}
          <div
            className="w-full text-left font-heading font-extrabold text-[#F8F6FF] whitespace-nowrap translate-y-[9%]"
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: 0.8,
              letterSpacing: '-0.04em',
            }}
          >
            {letters.map((char, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <span
                  className={`inline-block transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    wordmarkInView ? 'translate-y-0' : 'translate-y-full'
                  }`}
                  style={{
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  {char}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
