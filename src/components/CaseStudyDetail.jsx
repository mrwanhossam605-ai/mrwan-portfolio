import React, { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Layers, X } from 'lucide-react';
import { CASE_STUDIES } from '../data/caseStudies';

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
        className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white border-[3px] border-black shadow-[3px_3px_0px_#000000] flex items-center justify-center text-black hover:bg-[#FFD200] transition-colors cursor-pointer"
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5 stroke-[3]" />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-[90vh] object-contain rounded-[18px] border-[3px] border-black shadow-[8px_8px_0px_#000000]"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/* ================================================================
   MAIN COMPONENT
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

  // Determine hero text color class
  const heroText = caseStudy.heroTextColor || 'text-white';
  const isHeroDark = heroText === 'text-black';

  return (
    <article className="min-h-screen bg-page-bg text-black pb-24 selection:bg-secondary selection:text-black">
      {/* Lightbox */}
      {lightboxImg && (
        <Lightbox src={lightboxImg.src} alt={lightboxImg.alt} onClose={closeLightbox} />
      )}

      {/* ── Sticky Header ── solid bg, no blur ── */}
      <header
        className="sticky top-0 z-30 bg-[#F8F6FF] border-b-[3px] border-black py-4 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#F8F6FF', backdropFilter: 'none', WebkitBackdropFilter: 'none' }}
      >
        <div className="max-w-container mx-auto flex items-center justify-between">
          {/* Back button – single arrow */}
          <button
            type="button"
            onClick={onBack}
            className="neo-btn bg-white text-black font-body font-extrabold text-sm sm:text-base px-5 py-2.5 rounded-full border-[3px] border-black shadow-[3px_3px_0px_#000000] hover:bg-[#FFD200] hover:shadow-[5px_5px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center cursor-pointer select-none min-h-[44px]"
            aria-label="Return to portfolio selected work"
          >
            <span>← Selected work</span>
          </button>

          {/* Project Title Badge */}
          <div className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD200] border-[2px] border-black rounded-full shadow-[2px_2px_0px_#000000] text-xs font-mono font-bold select-none">
            <span>✦</span>
            <span>Case Study</span>
            <span>·</span>
            <span>{caseStudy.title}</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 flex flex-col gap-6 lg:gap-16">

        {/* ════════════════════════════════════════════════════
            HERO CARD BANNER – per-project color
           ════════════════════════════════════════════════════ */}
        <section
          className={`relative w-full ${heroText} border-[3px] border-black rounded-[28px] sm:rounded-[36px] shadow-[8px_8px_0px_#000000] p-6 sm:p-10 md:p-14 overflow-hidden`}
          style={{ backgroundColor: caseStudy.color }}
          aria-label={`${caseStudy.title} overview`}
        >
          {/* Decorative starburst */}
          <div
            className="absolute -top-8 -right-8 w-36 h-36 bg-[#FFD200] border-[3px] border-black rounded-full rotate-12 opacity-95 pointer-events-none hidden sm:flex items-center justify-center text-4xl"
            aria-hidden="true"
          >
            ✦
          </div>

          <div className="relative z-10 max-w-4xl lg:max-w-5xl flex flex-col items-start gap-4 sm:gap-6">
            {/* Subtitle Tags */}
            <div
              className={`inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 border-2 border-black rounded-full text-xs sm:text-sm font-mono font-extrabold shadow-[3px_3px_0px_${isHeroDark ? '#000000' : '#FFFFFF'}] select-none ${
                isHeroDark
                  ? 'bg-black text-[#FFD200]'
                  : 'bg-black text-[#FFD200]'
              }`}
            >
              <span>✦</span>
              <span>{caseStudy.heroTag}</span>
            </div>

            {/* Bold Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight drop-shadow-sm">
              {caseStudy.title}
            </h1>

            {/* Description Summary */}
            <p className={`font-body text-lg sm:text-xl md:text-2xl leading-relaxed font-medium ${isHeroDark ? 'text-black/90' : 'text-white/95'}`}>
              {caseStudy.summary}
            </p>

            {/* Metrics Grid */}
            {caseStudy.metrics.length > 0 && (
              <div className={`w-full grid grid-cols-1 ${caseStudy.metrics.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-3 sm:gap-4 lg:gap-5 pt-4 sm:pt-6`}>
                {caseStudy.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="bg-white text-black border-[3px] border-black rounded-[20px] p-4 sm:p-5 lg:p-6 shadow-[4px_4px_0px_#000000] flex flex-col justify-between overflow-hidden min-w-0 flex-1"
                  >
                    <span
                      style={{ textWrap: 'balance' }}
                      className="font-heading font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#3B82F6] tracking-tight leading-none break-words"
                    >
                      {metric.value}
                    </span>
                    <div className="mt-3">
                      <span
                        style={{ textWrap: 'balance' }}
                        className="block font-heading font-extrabold text-sm sm:text-base text-black leading-snug break-words"
                      >
                        {metric.label}
                      </span>
                      {metric.detail && (
                        <span className="block font-mono text-xs font-bold text-[#52525B] mt-1 leading-snug break-words">
                          {metric.detail}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            VISUAL SHOWCASE: Main Mockup
           ════════════════════════════════════════════════════ */}
        <section className="flex flex-col gap-6" aria-label="Visual showcase">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 bg-[#FFD200] border-[3px] border-black rounded-full shadow-[3px_3px_0px_#000000] text-xs font-mono font-extrabold">
              01 · VISUAL SHOWCASE
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-black">
              Production Interface
            </h2>
          </div>

          <div className="w-full bg-white border-[3px] border-black rounded-[24px] sm:rounded-[32px] shadow-[8px_8px_0px_#000000] p-4 sm:p-8 overflow-hidden flex items-center justify-center group">
            <div className="w-full aspect-[16/10] bg-[#F1EEFC] border-2 border-black rounded-[18px] overflow-hidden flex items-center justify-center relative shadow-inner">
              <img
                src={caseStudy.mockupImage}
                srcSet={caseStudy.mockupSrcSet}
                sizes="(max-width: 1024px) 100vw, 1200px"
                alt={`${caseStudy.title} high fidelity interface showcase`}
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                loading="eager"
              />
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-white border-2 border-black rounded-full text-xs font-mono font-bold text-black shadow-[2px_2px_0px_#000000]">
                {caseStudy.title} · Final design
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            PROCESS & SCREENS GALLERY (hidden when empty)
           ════════════════════════════════════════════════════ */}
        {caseStudy.gallery && caseStudy.gallery.length > 0 && (
          <section className="flex flex-col gap-6" aria-label="Process and screens gallery">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 bg-[#FFD200] border-[3px] border-black rounded-full shadow-[3px_3px_0px_#000000] text-xs font-mono font-extrabold">
                02 · PROCESS
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-black">
                Process & Screens
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {caseStudy.gallery.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setLightboxImg({ src: item.image, alt: item.caption || `${caseStudy.title} process screen ${idx + 1}` })}
                  className="group/gal bg-white border-[3px] border-black rounded-[20px] shadow-[5px_5px_0px_#000000] hover:shadow-[7px_7px_0px_#000000] hover:-translate-y-0.5 transition-all overflow-hidden cursor-zoom-in"
                >
                  <div className="w-full aspect-[16/10] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.caption || `${caseStudy.title} screen ${idx + 1}`}
                      className="w-full h-full object-cover object-center group-hover/gal:scale-[1.03] transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  {item.caption && (
                    <div className="px-4 py-3 border-t-[3px] border-black">
                      <span className="font-body font-bold text-sm text-black">{item.caption}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════
            DESIGN SYSTEM SUBSECTION (hidden when empty)
           ════════════════════════════════════════════════════ */}
        {caseStudy.designSystem && caseStudy.designSystem.length > 0 && (
          <section className="flex flex-col gap-6" aria-label="Design system showcase">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 bg-[#3B82F6] text-white border-[3px] border-black rounded-full shadow-[3px_3px_0px_#000000] text-xs font-mono font-extrabold">
                SYSTEM
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-black">
                Design System
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {caseStudy.designSystem.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setLightboxImg({ src: item.image, alt: item.caption || `Design system ${idx + 1}` })}
                  className="group/ds bg-white border-[3px] border-black rounded-[20px] shadow-[5px_5px_0px_#000000] hover:shadow-[7px_7px_0px_#000000] hover:-translate-y-0.5 transition-all overflow-hidden cursor-zoom-in"
                >
                  <div className="w-full aspect-[16/10] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.caption || `Design system asset ${idx + 1}`}
                      className="w-full h-full object-cover object-center group-hover/ds:scale-[1.03] transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  {item.caption && (
                    <div className="px-4 py-3 border-t-[3px] border-black">
                      <span className="font-body font-bold text-sm text-black">{item.caption}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════
            ARABIC RTL SHOWCASE (Al-Masilah only, hidden when null/empty)
           ════════════════════════════════════════════════════ */}
        {caseStudy.rtlShowcase && caseStudy.rtlShowcase.heading && (
          <section className="flex flex-col gap-6" aria-label="Arabic RTL showcase">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 bg-[#E9E4FF] border-[3px] border-black rounded-full shadow-[3px_3px_0px_#000000] text-xs font-mono font-extrabold text-black">
                RTL
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-black">
                Arabic RTL Showcase
              </h2>
            </div>

            <div className="bg-white border-[3px] border-black rounded-[24px] shadow-[6px_6px_0px_#000000] p-6 sm:p-10 overflow-hidden" dir="rtl">
              <h3
                className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-black tracking-tight leading-tight mb-4"
                style={{ fontFamily: "'Cairo', 'Noto Sans Arabic', sans-serif" }}
              >
                {caseStudy.rtlShowcase.heading}
              </h3>
              <p
                className="text-lg sm:text-xl text-black/80 font-medium leading-relaxed"
                style={{ fontFamily: "'Cairo', 'Noto Sans Arabic', sans-serif" }}
              >
                {caseStudy.rtlShowcase.body}
              </p>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════
            OVERVIEW & PROBLEM BREAKDOWN (Two Columns Desktop, Single Column Mobile)
           ════════════════════════════════════════════════════ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start" aria-label="Project details and problem solving">

          {/* Left Sidebar: Metadata Card - strictly static below 1024px, sticky on desktop */}
          <aside className="case-study-specs static lg:sticky lg:top-28 lg:col-span-4 bg-white border-[3px] border-black rounded-[24px] shadow-[6px_6px_0px_#000000] p-6 sm:p-8 flex flex-col gap-6">
            <div className="border-b-2 border-black pb-4">
              <span className="font-heading font-extrabold text-lg text-black">
                Project Specs
              </span>
            </div>

            <div className="flex flex-col gap-5 text-sm">
              <div>
                <span className="font-mono text-xs uppercase font-extrabold text-[#52525B] block mb-1">
                  Role
                </span>
                <span className="font-heading font-extrabold text-base text-black">
                  {caseStudy.sidebar.role}
                </span>
              </div>

              {/* Scope (longer title) */}
              {caseStudy.sidebar.scope && (
                <div>
                  <span className="font-mono text-xs uppercase font-extrabold text-[#52525B] block mb-1">
                    Scope
                  </span>
                  <span className="font-body font-bold text-base text-black">
                    {caseStudy.sidebar.scope}
                  </span>
                </div>
              )}

              {/* Client – only render if value exists */}
              {caseStudy.sidebar.client && (
                <div>
                  <span className="font-mono text-xs uppercase font-extrabold text-[#52525B] block mb-1">
                    Client
                  </span>
                  <span className="font-body font-bold text-base text-black">
                    {caseStudy.sidebar.client}
                  </span>
                </div>
              )}

              {/* Timeline – only render if value exists */}
              {caseStudy.sidebar.timeline && (
                <div>
                  <span className="font-mono text-xs uppercase font-extrabold text-[#52525B] block mb-1">
                    Timeline
                  </span>
                  <span className="font-body font-bold text-base text-black">
                    {caseStudy.sidebar.timeline}
                  </span>
                </div>
              )}

              <div>
                <span className="font-mono text-xs uppercase font-extrabold text-[#52525B] block mb-1">
                  Platform
                </span>
                <span className="font-body font-bold text-base text-black">
                  {caseStudy.sidebar.platform}
                </span>
              </div>

              <div>
                <span className="font-mono text-xs uppercase font-extrabold text-[#52525B] block mb-2">
                  Tools &amp; Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {caseStudy.sidebar.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 bg-[#F8F6FF] border-2 border-black rounded-lg text-xs font-mono font-bold text-black"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Content: Overview + Numbered Problem Cards */}
          <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-8">
            {/* Overview Card */}
            <div className="bg-white border-[3px] border-black rounded-[24px] shadow-[6px_6px_0px_#000000] p-6 sm:p-8">
              <span className="px-3 py-1 bg-[#3B82F6] text-white border-2 border-black rounded-full text-xs font-mono font-bold inline-block mb-4 shadow-[2px_2px_0px_#000000]">
                PROJECT CONTEXT
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-black mb-4">
                The Challenge &amp; Vision
              </h2>
              <p className="font-body text-black/85 text-base sm:text-lg leading-relaxed font-medium">
                {caseStudy.overview}
              </p>
            </div>

            {/* Numbered Problem Cards */}
            <div className="flex flex-col gap-4">
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-black mb-1">
                Key Problems Solved
              </h3>

              {caseStudy.problems.map((problem) => (
                <div
                  key={problem.number}
                  className="bg-white border-[3px] border-black rounded-[20px] shadow-[5px_5px_0px_#000000] hover:shadow-[7px_7px_0px_#000000] hover:-translate-y-0.5 transition-all p-5 sm:p-7 flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FFD200] border-[3px] border-black rounded-xl shadow-[3px_3px_0px_#000000] flex items-center justify-center font-heading font-extrabold text-xl text-black select-none">
                    {problem.number}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="font-heading font-extrabold text-lg sm:text-xl text-black">
                      {problem.title}
                    </h4>
                    <p className="font-body text-black/80 text-sm sm:text-base leading-relaxed font-medium">
                      {problem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Deliverables Badges */}
            <div className="bg-white border-[3px] border-black rounded-[24px] shadow-[6px_6px_0px_#000000] p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-[#3B82F6] stroke-[2.5]" />
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-black">
                  What I Delivered
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {caseStudy.deliverables.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#F8F6FF] border-[2px] border-black rounded-full font-body font-bold text-xs sm:text-sm text-black shadow-[2px_2px_0px_#000000] hover:bg-[#FFD200] transition-colors select-none"
                  >
                    <CheckCircle className="w-4 h-4 text-[#10B981] stroke-[2.5]" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            NEXT PROJECT FOOTER
           ════════════════════════════════════════════════════ */}
        {caseStudy.nextProject && (
          <section className="pt-6 sm:pt-10">
            <div
              onClick={handleNextClick}
              className="group w-full bg-white border-[3px] border-black rounded-[28px] shadow-[8px_8px_0px_#000000] hover:shadow-[12px_12px_0px_#000000] hover:-translate-y-1 p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 cursor-pointer transition-all duration-200"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNextClick()}
              aria-label={`Navigate to next case study: ${caseStudy.nextProject.title}`}
            >
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="text-xs font-mono font-extrabold text-[#52525B] uppercase tracking-wider mb-2">
                  Next Case Study
                </span>
                <span className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-black group-hover:text-[#3B82F6] transition-colors">
                  {caseStudy.nextProject.title} ↗
                </span>
                <span className="font-body text-sm font-bold text-[#52525B] mt-1">
                  {caseStudy.nextProject.category}
                </span>
              </div>

              <div className="w-14 h-14 rounded-full bg-[#3B82F6] text-white border-[3px] border-black shadow-[4px_4px_0px_#000000] flex items-center justify-center group-hover:translate-x-2 transition-transform">
                <ArrowRight className="w-7 h-7 stroke-[3]" />
              </div>
            </div>
          </section>
        )}
      </main>
    </article>
  );
}
