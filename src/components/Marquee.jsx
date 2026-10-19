import React from 'react';

export default function Marquee() {
  const items = [
    'UI/UX',
    'Mobile Apps',
    'Websites',
    'Design Systems',
    'Branding',
  ];

  // Repeat sequence multiple times for smooth infinite scroll
  const repeated = Array(6).fill(items).flat();

  return (
    <div
      className="marquee-container w-full bg-secondary border-y-3 border-stroke overflow-hidden py-3 select-none relative z-10 cursor-default"
      aria-label="Skill highlights ticker"
    >
      <div className="marquee-track flex items-center whitespace-nowrap">
        {repeated.map((text, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-4 px-3 font-heading font-extrabold text-stroke text-sm sm:text-base md:text-lg tracking-wider uppercase"
          >
            <span>{text}</span>
            <span className="text-primary text-base sm:text-xl drop-shadow-none" aria-hidden="true">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
