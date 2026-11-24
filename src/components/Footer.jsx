import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, Copy, Check } from 'lucide-react';
import { EMAIL, LINKEDIN_URL, BEHANCE_URL, CV_PATH, WHATSAPP_URL } from '../config';

export default function Footer() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isReplaying, setIsReplaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFooterInView, setIsFooterInView] = useState(false);
  const [waveActive, setWaveActive] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tappedIndex, setTappedIndex] = useState(null);

  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const footerRef = useRef(null);
  const entranceTimerRef = useRef(null);
  const touchTimerRef = useRef(null);

  const [fontSize, setFontSize] = useState(120);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(EMAIL);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = EMAIL;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

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

  // IntersectionObserver: trigger entrance once at threshold 0.3, track in-view for wave pausing
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsFooterInView(inView);
        if (inView && !hasEntered) {
          setHasEntered(true);
          setIsAnimating(true);
          entranceTimerRef.current = setTimeout(() => {
            setWaveActive(true);
            setIsAnimating(false);
          }, 1150);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasEntered]);

  // Replay entrance animation when "H." sticker button is clicked/tapped
  const replayAnimation = () => {
    if (isReplaying) return;
    setWaveActive(false);
    setIsAnimating(true);
    setIsReplaying(true);

    if (entranceTimerRef.current) clearTimeout(entranceTimerRef.current);

    setTimeout(() => {
      setIsReplaying(false);
      entranceTimerRef.current = setTimeout(() => {
        setWaveActive(true);
        setIsAnimating(false);
      }, 1150);
    }, 40);
  };

  // Touch tap on letters triggers hover effect for 500ms
  const handleLetterTouch = (index) => {
    setTappedIndex(index);
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    touchTimerRef.current = setTimeout(() => {
      setTappedIndex(null);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (entranceTimerRef.current) clearTimeout(entranceTimerRef.current);
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    };
  }, []);

  return (
    <footer ref={footerRef} className="w-full px-4 sm:px-6 lg:px-8 mb-8" aria-label="Site Footer">
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
          {letters.map((char, i) => (
            <span key={i} style={{ display: 'inline-block' }}>
              {char}
            </span>
          ))}
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

            {/* Plain visible email with Copy email button */}
            <div className="flex flex-wrap items-center gap-2.5 mt-2 pt-3 border-t border-[#F8F6FF]/15">
              <span className="font-mono text-xs sm:text-sm text-[#F8F6FF] select-all font-bold">
                {EMAIL}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-2.5 py-1 bg-[#27272A] hover:bg-secondary hover:text-stroke text-xs font-bold border border-[#3F3F46] rounded-md transition-all cursor-pointer flex items-center gap-1.5 text-[#F8F6FF]"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#10B981] stroke-[3]" />
                    <span className="text-[#10B981]">Copied ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy email</span>
                  </>
                )}
              </button>
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
                  href={`mailto:${EMAIL}?subject=Project%20inquiry%20from%20your%20portfolio`}
                  className="underline underline-offset-4 text-[#F8F6FF] hover:text-secondary hover:translate-x-1 transition-all duration-200"
                >
                  Email
                </a>
                {WHATSAPP_URL && (
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 text-[#F8F6FF] hover:text-secondary hover:translate-x-1 transition-all duration-200"
                  >
                    WhatsApp
                  </a>
                )}
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
          ref={containerRef}
          className="relative w-full mt-6 sm:mt-10 overflow-visible select-none"
        >
          {/* Overlapping Stickers on Top-Right of Wordmark (anchored at right: 24px, top: -28px) */}
          <div
            className="absolute z-20 flex items-center gap-2 select-none"
            style={{
              position: 'absolute',
              top: '-28px',
              right: '24px',
            }}
          >
            {/* Small blue ✦ star sticker rotates slowly (360deg over 18s, linear) */}
            <div
              className="footer-sticker-star inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-primary text-white border-3 border-stroke rounded-xl shadow-neo select-none pointer-events-none"
              aria-hidden="true"
            >
              <span className="text-lg sm:text-xl font-black">✦</span>
            </div>

            {/* Yellow "H." pill button: floats 6px, wiggles on hover, replays entrance animation */}
            <button
              type="button"
              onClick={replayAnimation}
              aria-label="Replay footer animation"
              className="footer-sticker-h inline-flex items-center px-3 sm:px-4 py-0.5 sm:py-1 bg-secondary text-stroke font-heading font-extrabold text-sm sm:text-lg border-3 border-stroke rounded-full shadow-neo cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181B] select-none"
            >
              <span>H.</span>
            </button>
          </div>

          {/* Auto-fit Wordmark "Mrwan", clipped only at the bottom edge */}
          <div
            role="img"
            aria-label="Mrwan"
            className="wordmark-container w-full text-left font-heading font-extrabold text-[#F8F6FF] whitespace-nowrap translate-y-[9%]"
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: 0.8,
              letterSpacing: '-0.04em',
            }}
          >
            {letters.map((char, i) => {
              const isHovered = hoveredIndex === i || tappedIndex === i;
              const hoverRotation = i % 2 === 0 ? 4 : -4;

              return (
                <span
                  key={i}
                  aria-hidden="true"
                  className="wordmark-letter-col inline-block"
                  style={{
                    display: 'inline-block',
                    willChange: isAnimating ? 'transform' : 'auto',
                    transform: (!hasEntered || isReplaying)
                      ? 'translateY(110%) rotate(8deg)'
                      : 'translateY(0) rotate(0deg)',
                    opacity: (!hasEntered || isReplaying) ? 0 : 1,
                    transition: (!hasEntered || isReplaying)
                      ? 'none'
                      : 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transitionDelay: (!hasEntered || isReplaying) ? '0ms' : `${i * 70}ms`,
                    animation: waveActive ? 'footerLetterWave 3.6s ease-in-out infinite' : 'none',
                    animationDelay: waveActive ? `${i * 120}ms` : '0ms',
                    animationPlayState:
                      !isFooterInView || hoveredIndex !== null || tappedIndex !== null
                        ? 'paused'
                        : 'running',
                  }}
                >
                  <span
                    className="wordmark-letter-char inline-block cursor-pointer select-none"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onTouchStart={() => handleLetterTouch(i)}
                    style={{
                      display: 'inline-block',
                      transform: isHovered
                        ? `translateY(-12%) rotate(${hoverRotation}deg)`
                        : 'translateY(0) rotate(0deg)',
                      color: isHovered ? '#FFD200' : '#F8F6FF',
                      transition:
                        'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.35s ease',
                      willChange: isHovered ? 'transform' : 'auto',
                    }}
                  >
                    {char}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
