import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle, Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';
import { CASE_STUDIES } from '../data/caseStudies';

export default function CaseStudyDetail({ slug, onBack, onSelectProject }) {
  const caseStudy = CASE_STUDIES[slug] || CASE_STUDIES.wakandarides;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleNextClick = () => {
    if (caseStudy.nextProject && onSelectProject) {
      onSelectProject(caseStudy.nextProject.slug);
    }
  };

  return (
    <article className="min-h-screen bg-page-bg text-black pb-24 selection:bg-secondary selection:text-black">
      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#F8F6FF]/90 backdrop-blur-md border-b-[3px] border-black py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-container mx-auto flex items-center justify-between">
          {/* Back Navigation Button */}
          <button
            type="button"
            onClick={onBack}
            className="neo-btn bg-white text-black font-body font-extrabold text-sm sm:text-base px-5 py-2.5 rounded-full border-[3px] border-black shadow-[3px_3px_0px_#000000] hover:bg-[#FFD200] hover:shadow-[5px_5px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer select-none"
            aria-label="Return to portfolio selected work"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
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
      <main className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 flex flex-col gap-12 sm:gap-16">
        
        {/* ========================================================
            HERO CARD BANNER: Vibrant Orange (#FF4800) Container
           ======================================================== */}
        <section
          className="relative w-full bg-[#FF4800] text-white border-[3px] border-black rounded-[28px] sm:rounded-[36px] shadow-[8px_8px_0px_#000000] p-6 sm:p-10 md:p-14 overflow-hidden"
          aria-label={`${caseStudy.title} overview`}
        >
          {/* Decorative Neubrutalist Starburst in Top Right */}
          <div
            className="absolute -top-8 -right-8 w-36 h-36 bg-[#FFD200] border-[3px] border-black rounded-full rotate-12 opacity-95 pointer-events-none hidden sm:flex items-center justify-center text-4xl"
            aria-hidden="true"
          >
            ✦
          </div>

          <div className="relative z-10 max-w-3xl flex flex-col items-start gap-4 sm:gap-6">
            {/* Subtitle Tags */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 bg-black text-[#FFD200] border-2 border-black rounded-full text-xs sm:text-sm font-mono font-extrabold shadow-[3px_3px_0px_#FFFFFF] select-none">
              <span>✦</span>
              <span>{caseStudy.heroTag}</span>
            </div>

            {/* Bold Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-white drop-shadow-sm">
              {caseStudy.title}
            </h1>

            {/* Description Summary */}
            <p className="font-body text-white/95 text-lg sm:text-xl md:text-2xl leading-relaxed font-medium">
              {caseStudy.summary}
            </p>

            {/* Metrics Grid (3 Columns) */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 sm:pt-6">
              {caseStudy.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-white text-black border-[3px] border-black rounded-[20px] p-4 sm:p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between"
                >
                  <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#3B82F6] tracking-tight">
                    {metric.value}
                  </span>
                  <div className="mt-2">
                    <span className="block font-heading font-extrabold text-sm sm:text-base text-black">
                      {metric.label}
                    </span>
                    <span className="block font-mono text-xs font-bold text-muted">
                      {metric.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            VISUAL SHOWCASES: High-Res UI Mockup Cards
           ======================================================== */}
        <section className="flex flex-col gap-6" aria-label="Visual showcase">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 bg-[#FFD200] border-[3px] border-black rounded-full shadow-[3px_3px_0px_#000000] text-xs font-mono font-extrabold">
              01 · VISUAL SHOWCASE
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-black">
              Production Interface
            </h2>
          </div>

          {/* Main Visual Display Frame */}
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
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm border-2 border-black rounded-full text-xs font-mono font-bold text-black shadow-[2px_2px_0px_#000000]">
                {caseStudy.title} · Live Prototype
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            OVERVIEW & PROBLEM BREAKDOWN (Two Columns)
           ======================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start" aria-label="Project details and problem solving">
          
          {/* Left Sidebar: Metadata Card */}
          <div className="lg:col-span-4 bg-white border-[3px] border-black rounded-[24px] shadow-[6px_6px_0px_#000000] p-6 sm:p-8 flex flex-col gap-6 sticky top-24">
            <div className="flex items-center justify-between border-b-2 border-black pb-4">
              <span className="font-heading font-extrabold text-lg text-black">
                Project Specs
              </span>
              <span className="px-2.5 py-0.5 bg-[#FFD200] border-2 border-black rounded-full text-xs font-mono font-bold">
                VERIFIED
              </span>
            </div>

            <div className="flex flex-col gap-5 text-sm">
              <div>
                <span className="font-mono text-xs uppercase font-extrabold text-muted block mb-1">
                  Role
                </span>
                <span className="font-heading font-extrabold text-base text-black">
                  {caseStudy.sidebar.role}
                </span>
              </div>

              <div>
                <span className="font-mono text-xs uppercase font-extrabold text-muted block mb-1">
                  Client
                </span>
                <span className="font-body font-bold text-base text-black">
                  {caseStudy.sidebar.client}
                </span>
              </div>

              <div>
                <span className="font-mono text-xs uppercase font-extrabold text-muted block mb-1">
                  Timeline
                </span>
                <span className="font-body font-bold text-base text-black">
                  {caseStudy.sidebar.timeline}
                </span>
              </div>

              <div>
                <span className="font-mono text-xs uppercase font-extrabold text-muted block mb-1">
                  Platform
                </span>
                <span className="font-body font-bold text-base text-black">
                  {caseStudy.sidebar.platform}
                </span>
              </div>

              <div>
                <span className="font-mono text-xs uppercase font-extrabold text-muted block mb-2">
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
          </div>

          {/* Right Content: Overview + Numbered Problem Cards */}
          <div className="lg:col-span-8 flex flex-col gap-8">
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

            {/* Numbered Problem Cards (01, 02, 03) */}
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

            {/* Deliverables Badges ("What I delivered") */}
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

        {/* ========================================================
            NEXT PROJECT FOOTER: Bottom Navigation Card Button
           ======================================================== */}
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
                <span className="text-xs font-mono font-extrabold text-muted uppercase tracking-wider mb-2">
                  Next Case Study
                </span>
                <span className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-black group-hover:text-[#3B82F6] transition-colors">
                  {caseStudy.nextProject.title} ↗
                </span>
                <span className="font-body text-sm font-bold text-muted mt-1">
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
