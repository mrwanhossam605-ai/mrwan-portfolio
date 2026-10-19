import React, { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';

// Reusable count-up number hook/component
function AnimatedCounter({ end, suffix = '', inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(end);
      return;
    }

    let startTime = null;
    const duration = 1200; // ms

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, inView]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [statsRef, statsInView] = useInView({ threshold: 0.2 });

  const stats = [
    {
      emoji: '📁',
      value: 3,
      suffix: '',
      label: 'Featured Case Studies',
      bg: 'bg-secondary text-stroke',
      tilt: '-rotate-2',
    },
    {
      emoji: '📱',
      value: 150,
      suffix: '+',
      label: 'Screens Designed',
      bg: 'bg-card-bg text-stroke',
      tilt: 'rotate-2',
    },
    {
      emoji: '🗣️',
      value: 2,
      suffix: '',
      label: 'Languages (Arabic native, English professional)',
      bg: 'bg-primary text-white',
      tilt: 'rotate-2',
    },
    {
      emoji: '🎨',
      value: 1,
      suffix: '',
      label: 'Full Design System per project',
      bg: 'bg-card-bg text-stroke',
      tilt: '-rotate-2',
    },
  ];

  return (
    <section
      id="about"
      className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-28"
      aria-label="About Me"
    >
      {/* Header with Scroll Reveal */}
      <div ref={headerRef} className="flex flex-col items-start mb-16">
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-secondary border-3 border-stroke rounded-full shadow-neo text-stroke font-bold text-sm sm:text-base mb-4 select-none hover:-rotate-1 transition-transform ${
            headerInView ? 'reveal-pill' : 'opacity-0'
          }`}
        >
          <span>✦</span>
          <span>About Me</span>
        </div>

        <h2
          className={`font-heading font-extrabold text-stroke text-3xl sm:text-4xl md:text-5xl tracking-tight mb-3 ${
            headerInView ? 'reveal-heading' : 'opacity-0'
          }`}
        >
          A little about me
        </h2>

        <p
          className={`font-body text-muted text-lg sm:text-xl font-medium max-w-xl ${
            headerInView ? 'reveal-subtitle' : 'opacity-0'
          }`}
        >
          The person behind the pixels.
        </p>
      </div>

      {/* Two Columns: Bio (Left) & Stats Grid (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Bio Card + 3 Sticker Pills */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-card-bg border-3 border-stroke rounded-[24px] shadow-[6px_6px_0_#18181B] hover:shadow-[9px_9px_0_#18181B] hover:-translate-y-1 transition-all duration-200 p-6 sm:p-8 md:p-10">
            {/* Window control mini bar */}
            <div className="flex items-center justify-between border-b-2 border-stroke/15 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary border-2 border-stroke inline-block" />
                <span className="w-3 h-3 rounded-full bg-secondary border-2 border-stroke inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#52525B] border-2 border-stroke inline-block" />
              </div>
              <span className="text-xs font-mono font-bold text-muted">bio.txt</span>
            </div>

            <p className="font-body text-stroke text-base sm:text-lg md:text-xl leading-relaxed font-medium">
              I'm Mrwan, a UI/UX designer from Cairo with a business background and a love for
              turning messy problems into clear, usable products. I work end to end: research,
              wireframes, UI, design systems and prototypes, and I design for both English and
              Arabic (RTL) audiences. My goal is simple: make interfaces people understand instantly
              and enjoy using.
            </p>
          </div>

          {/* Row of 3 Sticker Pills below bio */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="pill-tag inline-flex items-center gap-1.5 px-4 py-2 bg-card-bg text-stroke text-xs sm:text-sm font-bold border-2 border-stroke rounded-full shadow-[2px_2px_0_#18181B] select-none hover:bg-secondary cursor-default">
              <span>🇪🇬</span>
              <span>Based in Cairo</span>
            </span>

            <span className="pill-tag inline-flex items-center gap-1.5 px-4 py-2 bg-card-bg text-stroke text-xs sm:text-sm font-bold border-2 border-stroke rounded-full shadow-[2px_2px_0_#18181B] select-none hover:bg-secondary cursor-default">
              <span>💬</span>
              <span>Arabic &amp; English</span>
            </span>

            <span className="pill-tag inline-flex items-center gap-1.5 px-4 py-2 bg-card-bg text-stroke text-xs sm:text-sm font-bold border-2 border-stroke rounded-full shadow-[2px_2px_0_#18181B] select-none hover:bg-secondary cursor-default">
              <span>🎯</span>
              <span>Open to projects</span>
            </span>
          </div>
        </div>

        {/* Right Column: 2x2 Stats Grid with tilt and count-up */}
        <div ref={statsRef} className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-5 sm:p-6 border-3 border-stroke rounded-[20px] shadow-[6px_6px_0_#18181B] hover:shadow-[9px_9px_0_#18181B] hover:-translate-y-1 hover:rotate-0 transition-all duration-200 flex flex-col justify-between ${
                stat.bg
              } ${stat.tilt}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl sm:text-3xl select-none" role="img" aria-hidden="true">
                  {stat.emoji}
                </span>
                <span className="text-xs font-mono font-bold opacity-60">0{i + 1}</span>
              </div>

              <div>
                <div className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} inView={statsInView} />
                </div>
                <p className="font-body text-xs sm:text-sm font-bold leading-snug opacity-90">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
