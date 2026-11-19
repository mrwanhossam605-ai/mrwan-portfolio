import React, { useEffect, useState, useCallback } from 'react';
import { Target, AlertTriangle, Lightbulb, CheckCircle2, CheckCircle, ArrowRight, X } from 'lucide-react';
import { CASE_STUDIES } from '../caseStudies';
import { EMAIL, WHATSAPP_URL } from '../config';

/* ================================================================
   LIGHTBOX: Simple fullscreen image viewer (Escape to close)
   ================================================================ */
function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[10001] bg-black/80 flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white border-[3px] border-[#18181B] shadow-[3px_3px_0px_#18181B] flex items-center justify-center text-[#18181B] hover:bg-[#FFD200] transition-colors cursor-pointer"
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5 stroke-[3]" />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-[90vh] object-contain rounded-[18px] border-[3px] border-[#18181B] shadow-[8px_8px_0px_#18181B]"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/* ================================================================
   HELPER: Section Icon Resolver
   ================================================================ */
function renderSectionIcon(iconName) {
  switch (iconName) {
    case 'Target':
      return <Target className="w-6 h-6 text-[#2F5BFF] stroke-[2.5]" />;
    case 'AlertTriangle':
      return <AlertTriangle className="w-6 h-6 text-[#2F5BFF] stroke-[2.5]" />;
    case 'Lightbulb':
      return <Lightbulb className="w-6 h-6 text-[#2F5BFF] stroke-[2.5]" />;
    case 'CheckCircle2':
      return <CheckCircle2 className="w-6 h-6 text-[#2F5BFF] stroke-[2.5]" />;
    default:
      return <Target className="w-6 h-6 text-[#2F5BFF] stroke-[2.5]" />;
  }
}

/* ================================================================
   MAIN CASE STUDY DETAIL COMPONENT
   ================================================================ */
export default function CaseStudyDetail({ slug, onBack, onSelectProject }) {
  const caseStudy = CASE_STUDIES[slug] || CASE_STUDIES.wakandarides;
  const [lightboxImg, setLightboxImg] = useState(null);

  const closeLightbox = useCallback(() => setLightboxImg(null), []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleNextClick = () => {
    if (caseStudy.nextProject && onSelectProject) {
      onSelectProject(caseStudy.nextProject.slug);
    }
  };

  // Check if meta has at least one non-empty value
  const hasMeta = Boolean(
    caseStudy.meta &&
      (caseStudy.meta.client ||
        caseStudy.meta.role ||
        caseStudy.meta.timeline ||
        caseStudy.meta.platform ||
        caseStudy.meta.scope)
  );

  return (
    <article className="min-h-screen bg-page-bg text-[#18181B] pb-24 selection:bg-secondary selection:text-[#18181B]">
      {/* Lightbox modal */}
      {lightboxImg && (
        <Lightbox src={lightboxImg.src} alt={lightboxImg.alt} onClose={closeLightbox} />
      )}

      {/* ════════════════════════════════════════════════════
          1. TOP BAR: solid #F8F6FF background, 3px bottom border, no blur
         ════════════════════════════════════════════════════ */}
      <header
        className="sticky top-0 z-30 bg-[#F8F6FF] border-b-[3px] border-[#18181B] py-3.5 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#F8F6FF', backdropFilter: 'none', WebkitBackdropFilter: 'none' }}
      >
        <div className="max-w-container mx-auto flex items-center justify-between gap-4">
          {/* Back button: single arrow "← Selected work" */}
          <button
            type="button"
            onClick={onBack}
            className="neo-btn bg-white text-[#18181B] font-body font-extrabold text-sm sm:text-base px-5 py-2.5 rounded-full border-[3px] border-[#18181B] shadow-[3px_3px_0px_#18181B] hover:bg-[#FFD200] hover:shadow-[5px_5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center cursor-pointer select-none min-h-[44px]"
            aria-label="Return to portfolio selected work"
          >
            <span>← Selected work</span>
          </button>

          {/* Project Title Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 bg-[#FFD200] border-2 border-[#18181B] rounded-full shadow-[2px_2px_0px_#18181B] text-xs font-mono font-bold text-[#18181B] select-none truncate max-w-[220px] sm:max-w-none">
            <span>✦</span>
            <span>Case Study · {caseStudy.title}</span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 flex flex-col gap-10 sm:gap-14">

        {/* ════════════════════════════════════════════════════
            2. HERO (Two columns on desktop, stacked on mobile)
           ════════════════════════════════════════════════════ */}
        <section
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          aria-label={`${caseStudy.title} overview`}
        >
          {/* LEFT: Hero Tag, Title, Summary, Meta Row, Action Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start gap-5 sm:gap-6 min-w-0 w-full">
            {caseStudy.heroTag && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFD200] border-2 border-[#18181B] rounded-full text-xs font-mono font-extrabold text-[#18181B] shadow-[2px_2px_0px_#18181B] select-none">
                <span>✦</span>
                <span>{caseStudy.heroTag}</span>
              </div>
            )}

            <h1
              className="font-heading font-extrabold text-[#18181B] tracking-tight w-full"
              style={{
                fontSize: 'clamp(40px, 5.2vw, 84px)',
                lineHeight: 1,
                overflowWrap: 'anywhere',
              }}
            >
              {caseStudy.slug === 'wakandarides' ? (
                <>Wakanda<wbr />Rides</>
              ) : caseStudy.slug === 'flaride' ? (
                <>Fla<wbr />Ride</>
              ) : (
                caseStudy.title
              )}
            </h1>

            {caseStudy.summary && (
              <p className="font-body text-base sm:text-lg text-[#52525B] font-medium leading-relaxed max-w-2xl">
                {caseStudy.summary}
              </p>
            )}

            {/* Meta Row: Only render pairs where value is non-empty */}
            {hasMeta && (
              <div className="w-full flex flex-wrap gap-4 sm:gap-6 py-4 border-y-2 border-[#18181B]/15">
                {caseStudy.meta.client && (
                  <div className="min-w-[100px]">
                    <span className="font-mono text-xs uppercase font-extrabold text-[#52525B] block mb-0.5">
                      Client
                    </span>
                    <span className="font-body font-bold text-sm sm:text-base text-[#18181B]">
                      {caseStudy.meta.client}
                    </span>
                  </div>
                )}
                {caseStudy.meta.role && (
                  <div className="min-w-[100px]">
                    <span className="font-mono text-xs uppercase font-extrabold text-[#52525B] block mb-0.5">
                      Role
                    </span>
                    <span className="font-body font-bold text-sm sm:text-base text-[#18181B]">
                      {caseStudy.meta.role}
                    </span>
                  </div>
                )}
                {caseStudy.meta.timeline && (
                  <div className="min-w-[100px]">
                    <span className="font-mono text-xs uppercase font-extrabold text-[#52525B] block mb-0.5">
                      Timeline
                    </span>
                    <span className="font-body font-bold text-sm sm:text-base text-[#18181B]">
                      {caseStudy.meta.timeline}
                    </span>
                  </div>
                )}
                {caseStudy.meta.platform && (
                  <div className="min-w-[100px]">
                    <span className="font-mono text-xs uppercase font-extrabold text-[#52525B] block mb-0.5">
                      Platform
                    </span>
                    <span className="font-body font-bold text-sm sm:text-base text-[#18181B]">
                      {caseStudy.meta.platform}
                    </span>
                  </div>
                )}
                {caseStudy.meta.scope && (
                  <div className="min-w-[100px]">
                    <span className="font-mono text-xs uppercase font-extrabold text-[#52525B] block mb-0.5">
                      Scope
                    </span>
                    <span className="font-body font-bold text-sm sm:text-base text-[#18181B]">
                      {caseStudy.meta.scope}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons: Google Play & Website (only shown if URLs exist) */}
            {(caseStudy.playStoreUrl || caseStudy.websiteUrl || caseStudy.behanceUrl || caseStudy.liveUrl) && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto pt-1">
                {caseStudy.playStoreUrl && (
                  <a
                    href={caseStudy.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get ${caseStudy.title} on Google Play (opens in a new tab)`}
                    className="neo-btn bg-[#2F5BFF] text-white h-12 px-6 font-bold text-sm sm:text-base rounded-full border-[3px] border-[#18181B] shadow-[4px_4px_0px_#18181B] hover:shadow-[6px_6px_0px_#18181B] flex items-center justify-center gap-2 select-none w-full sm:w-auto"
                  >
                    <svg className="w-4 h-4 fill-white flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Get it on Google Play</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
                {caseStudy.websiteUrl && (
                  <a
                    href={caseStudy.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${caseStudy.title} website (opens in a new tab)`}
                    className="neo-btn bg-white text-[#18181B] h-12 px-6 font-bold text-sm sm:text-base rounded-full border-[3px] border-[#18181B] shadow-[4px_4px_0px_#18181B] hover:bg-[#F8F6FF] hover:shadow-[6px_6px_0px_#18181B] flex items-center justify-center gap-1.5 select-none w-full sm:w-auto"
                  >
                    <span>Visit website</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
                {caseStudy.behanceUrl && (
                  <a
                    href={caseStudy.behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn bg-[#2F5BFF] text-white h-12 px-6 font-bold text-sm sm:text-base rounded-full border-[3px] border-[#18181B] shadow-[4px_4px_0px_#18181B] hover:shadow-[6px_6px_0px_#18181B] flex items-center justify-center gap-1.5 select-none w-full sm:w-auto"
                  >
                    <span>View on Behance</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
                {caseStudy.liveUrl && (
                  <a
                    href={caseStudy.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn bg-white text-[#18181B] h-12 px-6 font-bold text-sm sm:text-base rounded-full border-[3px] border-[#18181B] shadow-[4px_4px_0px_#18181B] hover:bg-[#F8F6FF] hover:shadow-[6px_6px_0px_#18181B] flex items-center justify-center gap-1.5 select-none w-full sm:w-auto"
                  >
                    <span>Live site</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Main Mockup in thick-bordered frame with project color background */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div
              className="w-full border-[3px] border-[#18181B] rounded-[28px] sm:rounded-[36px] shadow-[8px_8px_0px_#18181B] p-4 sm:p-6 lg:p-8 overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: caseStudy.color }}
            >
              <div className="w-full aspect-[16/10] bg-white/40 border-2 border-[#18181B] rounded-[18px] overflow-hidden flex items-center justify-center relative shadow-inner">
                <img
                  src={caseStudy.mockupImage}
                  srcSet={caseStudy.mockupSrcSet}
                  sizes="(max-width: 1024px) 100vw, 600px"
                  alt={`${caseStudy.title} interface showcase`}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            3. NUMBERED SECTIONS (The Goal, The Challenge, My Solution, The Result)
           ════════════════════════════════════════════════════ */}
        {(() => {
          const visibleSections = (caseStudy.sections || []).filter((section) => {
            const isChallenge = section.title.toLowerCase().includes('challenge');
            const isResult = section.title.toLowerCase().includes('result');
            const hasText = Boolean(section.text && section.text.trim() !== '');
            const hasImages = Boolean(section.images && section.images.length > 0);
            const hasProblems = Boolean(isChallenge && caseStudy.problems && caseStudy.problems.length > 0);
            const hasDeliverables = Boolean(isResult && caseStudy.deliverables && caseStudy.deliverables.length > 0);

            return hasText || hasImages || hasProblems || hasDeliverables;
          });

          return visibleSections.map((section, idx) => {
            const isChallenge = section.title.toLowerCase().includes('challenge');
            const isResult = section.title.toLowerCase().includes('result');
            const hasText = Boolean(section.text && section.text.trim() !== '');
            const hasImages = Boolean(section.images && section.images.length > 0);
            const hasProblems = Boolean(isChallenge && caseStudy.problems && caseStudy.problems.length > 0);
            const hasDeliverables = Boolean(isResult && caseStudy.deliverables && caseStudy.deliverables.length > 0);
            const sequenceNumber = String(idx + 1).padStart(2, '0');

            return (
              <section
                key={section.title || idx}
                className="bg-white border-[3px] border-[#18181B] rounded-[28px] shadow-[8px_8px_0px_#18181B] p-6 sm:p-10 relative overflow-hidden flex flex-col gap-6"
                aria-label={`${section.title} section`}
              >
                {/* Round Number Badge in top-right corner: numbered in sequence based on visible sections */}
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-12 h-12 rounded-full bg-[#FFD200] border-[3px] border-[#18181B] shadow-[3px_3px_0px_#18181B] flex items-center justify-center font-heading font-extrabold text-lg text-[#18181B] select-none">
                  {sequenceNumber}
                </div>

                {/* Heading with small icon */}
                <div className="flex items-center gap-3 pr-16">
                  <div className="w-10 h-10 rounded-xl bg-[#F8F6FF] border-2 border-[#18181B] shadow-[2px_2px_0px_#18181B] flex items-center justify-center flex-shrink-0">
                    {renderSectionIcon(section.icon)}
                  </div>
                  <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#18181B]">
                    {section.title}
                  </h2>
                </div>

                {/* Paragraph */}
                {hasText && (
                  <p className="max-w-[70ch] text-base sm:text-[18px] text-[#18181B]/85 font-body font-medium leading-[1.7]">
                    {section.text}
                  </p>
                )}

                {/* The Challenge: Key Problems Solved (3-column grid on desktop, 1 on mobile) */}
                {hasProblems && (
                  <div className="flex flex-col gap-3 pt-2">
                    <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#18181B]">
                      Key Problems Solved
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {caseStudy.problems.map((prob) => (
                        <div
                          key={prob.number}
                          className="bg-[#F8F6FF] border-[3px] border-[#18181B] rounded-[18px] p-5 shadow-[4px_4px_0px_#18181B] flex flex-col gap-2.5"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#FFD200] border-2 border-[#18181B] shadow-[2px_2px_0px_#18181B] flex items-center justify-center font-heading font-extrabold text-xs text-[#18181B] select-none">
                            {prob.number}
                          </div>
                          <h4 className="font-heading font-extrabold text-base text-[#18181B] leading-snug">
                            {prob.title}
                          </h4>
                          <p className="font-body text-xs sm:text-sm text-[#52525B] font-medium leading-relaxed">
                            {prob.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Full-width Image Panel (shown if images[] has 1 or more items) */}
                {hasImages && (
                  <div
                    className="w-full border-[3px] border-[#18181B] rounded-[20px] p-6 flex flex-col items-center justify-center"
                    style={{ backgroundColor: caseStudy.color }}
                  >
                    <div
                      className={`w-full ${
                        section.images.length >= 2
                          ? 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'
                          : 'flex justify-center'
                      }`}
                    >
                      {section.images.map((img, imgIdx) => (
                        <button
                          key={imgIdx}
                          type="button"
                          onClick={() =>
                            setLightboxImg({
                              src: img,
                              alt: section.caption || `${section.title} visual ${imgIdx + 1}`,
                            })
                          }
                          className="overflow-hidden rounded-[14px] border-2 border-[#18181B] shadow-[4px_4px_0px_#18181B] hover:shadow-[6px_6px_0px_#18181B] hover:-translate-y-0.5 transition-all cursor-zoom-in group"
                        >
                          <img
                            src={img}
                            alt={section.caption || `${section.title} screen`}
                            className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-200"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                    {section.caption && (
                      <p className="font-mono text-xs font-bold text-[#18181B] mt-3 text-center">
                        {section.caption}
                      </p>
                    )}
                  </div>
                )}

                {/* The Result: What I Delivered (Checklist of pills) */}
                {hasDeliverables && (
                  <div className="flex flex-col gap-3 pt-2">
                    <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#18181B]">
                      What I Delivered
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {caseStudy.deliverables.map((item, dIdx) => (
                        <span
                          key={dIdx}
                          className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#F8F6FF] border-2 border-[#18181B] rounded-full font-body font-bold text-xs sm:text-sm text-[#18181B] shadow-[2px_2px_0px_#18181B] select-none"
                        >
                          <CheckCircle className="w-4 h-4 text-[#2F5BFF] stroke-[2.5]" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );
          });
        })()}

        {/* ════════════════════════════════════════════════════
            4. CLOSING CTA: Big Yellow Card
           ════════════════════════════════════════════════════ */}
        <section
          className="bg-[#FFD200] border-[3px] border-[#18181B] rounded-[28px] shadow-[8px_8px_0px_#18181B] p-8 sm:p-12 text-center flex flex-col items-center gap-6"
          aria-label="Contact call to action"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-[#18181B] rounded-full text-xs font-mono font-extrabold text-[#18181B] shadow-[2px_2px_0px_#18181B] select-none">
            <span>✦</span>
            <span>Available For Projects</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#18181B] tracking-tight">
            Let's work together
          </h2>

          <p className="font-body text-base sm:text-lg text-[#18181B] font-bold max-w-xl leading-relaxed">
            Mobile apps, websites and design systems for English and Arabic audiences.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Email Button (Electric Blue) */}
            <a
              href={`mailto:${EMAIL}?subject=Project%20inquiry%20from%20your%20portfolio`}
              className="neo-btn bg-[#2F5BFF] text-white px-7 py-3.5 rounded-full border-[3px] border-[#18181B] shadow-[4px_4px_0px_#18181B] hover:shadow-[6px_6px_0px_#18181B] font-bold text-base min-h-[44px] w-full sm:w-auto"
            >
              <span>Email</span>
              <span>✉</span>
            </a>

            {/* WhatsApp Button (Green #25D366) */}
            {WHATSAPP_URL && (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn bg-[#25D366] text-[#18181B] px-7 py-3.5 rounded-full border-[3px] border-[#18181B] shadow-[4px_4px_0px_#18181B] hover:shadow-[6px_6px_0px_#18181B] font-bold text-base min-h-[44px] w-full sm:w-auto"
              >
                <span>WhatsApp</span>
                <span>💬</span>
              </a>
            )}

            {/* See All Projects Button (White, links to /#work) */}
            <a
              href="/#work"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
              className="neo-btn bg-white text-[#18181B] px-7 py-3.5 rounded-full border-[3px] border-[#18181B] shadow-[4px_4px_0px_#18181B] hover:bg-[#F8F6FF] font-bold text-base min-h-[44px] w-full sm:w-auto"
            >
              <span>See all projects</span>
              <span>→</span>
            </a>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            5. NEXT CASE STUDY (Keep existing one)
           ════════════════════════════════════════════════════ */}
        {caseStudy.nextProject && (
          <section className="pt-2">
            <div
              onClick={handleNextClick}
              className="group w-full bg-white border-[3px] border-[#18181B] rounded-[28px] shadow-[8px_8px_0px_#18181B] hover:shadow-[12px_12px_0px_#18181B] hover:-translate-y-1 p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 cursor-pointer transition-all duration-200"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNextClick()}
              aria-label={`Navigate to next case study: ${caseStudy.nextProject.title}`}
            >
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="text-xs font-mono font-extrabold text-[#52525B] uppercase tracking-wider mb-2">
                  Next Case Study
                </span>
                <span className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#18181B] group-hover:text-[#2F5BFF] transition-colors">
                  {caseStudy.nextProject.title} ↗
                </span>
                <span className="font-body text-sm font-bold text-[#52525B] mt-1">
                  {caseStudy.nextProject.category}
                </span>
              </div>

              <div className="w-14 h-14 rounded-full bg-[#2F5BFF] text-white border-[3px] border-[#18181B] shadow-[4px_4px_0px_#18181B] flex items-center justify-center group-hover:translate-x-2 transition-transform">
                <ArrowRight className="w-7 h-7 stroke-[3]" />
              </div>
            </div>
          </section>
        )}
      </main>
    </article>
  );
}
