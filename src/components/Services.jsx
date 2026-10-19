import React from 'react';
import { useInView } from '../hooks/useInView';

export default function Services() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [cardsRef, cardsInView] = useInView({ threshold: 0.2 });

  const services = [
    {
      icon: '📱',
      badge: '01 / Mobile & Web',
      // Starts yellow, swaps to blue on card hover
      badgeBase: 'bg-secondary text-stroke group-hover:bg-primary group-hover:text-white',
      revealClass: 'reveal-service-1',
      title: 'UI/UX & Mobile App Design',
      description: 'From research and wireframes to polished, tested prototypes.',
      tags: ['Wireframing', 'Prototyping', 'Figma'],
    },
    {
      icon: '🌐',
      badge: '02 / Development',
      // Starts blue, swaps to yellow on card hover
      badgeBase: 'bg-primary text-white group-hover:bg-secondary group-hover:text-stroke',
      revealClass: 'reveal-service-2',
      title: 'Web Design & Development',
      description: 'Responsive websites designed and built to look sharp on every screen.',
      tags: ['Responsive', 'Framer', 'Arabic RTL'],
    },
    {
      icon: '🎨',
      badge: '03 / Branding',
      // Starts yellow, swaps to blue on card hover
      badgeBase: 'bg-secondary text-stroke group-hover:bg-primary group-hover:text-white',
      revealClass: 'reveal-service-3',
      title: 'Brand Identity & Design Systems',
      description: 'Visual identities and scalable component libraries for consistent products.',
      tags: ['Logos', 'Visual Systems', 'Design Systems'],
    },
  ];

  return (
    <section
      id="services"
      className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-28 relative"
      aria-label="Services and Capabilities"
    >
      {/* Section Header with Hand-Drawn Arrow Sticker & Scroll Reveal */}
      <div ref={headerRef} className="relative flex flex-col items-start mb-16">
        {/* Yellow sticker pill */}
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-secondary border-3 border-stroke rounded-full shadow-neo text-stroke font-bold text-sm sm:text-base mb-4 select-none hover:-rotate-1 transition-transform ${
            headerInView ? 'reveal-pill' : 'opacity-0'
          }`}
        >
          <span>✦</span>
          <span>What I Do</span>
        </div>

        {/* Heading & Doodle Arrow container */}
        <div className="relative w-full flex items-center justify-between">
          <div>
            <h2
              className={`font-heading font-extrabold text-stroke text-3xl sm:text-4xl md:text-5xl tracking-tight mb-3 ${
                headerInView ? 'reveal-heading' : 'opacity-0'
              }`}
            >
              How I can help
            </h2>
            <p
              className={`font-body text-muted text-lg sm:text-xl font-medium max-w-xl ${
                headerInView ? 'reveal-subtitle' : 'opacity-0'
              }`}
            >
              Design that looks good and works even better.
            </p>
          </div>

          {/* Small hand-drawn arrow sticker near section header */}
          <div
            className={`hidden md:flex flex-col items-center select-none pointer-events-none rotate-6 ${
              headerInView ? 'reveal-pill' : 'opacity-0'
            }`}
            aria-hidden="true"
          >
            <span className="bg-secondary text-stroke text-xs font-bold px-2.5 py-1 border-2 border-stroke rounded-md shadow-[2px_2px_0_#18181B] -rotate-3 font-heading mb-1">
              let's collaborate! 🤝
            </span>
            <svg
              width="50"
              height="45"
              viewBox="0 0 50 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-stroke -scale-x-100 rotate-12"
            >
              <path
                d="M6 5C12 14 26 13 36 22C40 25 41 30 38 35"
                stroke="#18181B"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <path
                d="M28 32L39 36L42 25"
                stroke="#18181B"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 3-Column Grid of Services Cards (staggered up from 40px, 120ms apart) */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-8 items-stretch">
        {services.map((svc, i) => (
          <div
            key={i}
            className={`group relative bg-card-bg border-3 border-stroke rounded-[24px] shadow-[6px_6px_0_#18181B] hover:shadow-[9px_9px_0_#18181B] hover:-translate-y-1 transition-all duration-200 p-6 sm:p-8 flex flex-col justify-between ${
              cardsInView ? svc.revealClass : 'opacity-0'
            }`}
          >
            <div>
              {/* Colored Header Tag on top of each card (swaps color yellow <-> blue on card hover) */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className={`inline-block px-3 py-1 text-xs font-bold font-mono border-2 border-stroke rounded-full shadow-[2px_2px_0_#18181B] select-none transition-colors duration-200 ${svc.badgeBase}`}
                >
                  {svc.badge}
                </span>

                {/* Big Emoji Icon with hover wiggle/bounce */}
                <span
                  className="text-3xl sm:text-4xl animate-emoji-hover inline-block select-none cursor-default"
                  role="img"
                  aria-label={svc.title}
                >
                  {svc.icon}
                </span>
              </div>

              {/* Title (Syne 800) */}
              <h3 className="font-heading font-extrabold text-stroke text-xl sm:text-2xl tracking-tight mb-4 leading-snug">
                {svc.title}
              </h3>

              {/* Short Description */}
              <p className="font-body text-muted text-base sm:text-lg leading-relaxed mb-6 font-medium">
                {svc.description}
              </p>
            </div>

            {/* 3 Small Pill Tags (bounce up 2px on hover) */}
            <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-stroke/10">
              {svc.tags.map((tag) => (
                <span
                  key={tag}
                  className="pill-tag px-3 py-1 bg-page-bg text-stroke text-xs font-bold border-2 border-stroke rounded-full shadow-[2px_2px_0_#18181B] select-none hover:bg-secondary cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
