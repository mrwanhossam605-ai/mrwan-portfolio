import React from 'react';
import { useInView } from '../hooks/useInView';

export default function Skills() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [cardsRef, cardsInView] = useInView({ threshold: 0.2 });

  const skillGroups = [
    {
      title: 'Core Skills',
      tagBg: 'bg-secondary text-stroke',
      revealClass: 'reveal-service-1',
      skills: [
        'UI/UX Design',
        'Wireframing',
        'Prototyping',
        'User Research',
        'UX Documentation',
        'Design Systems',
        'Arabic RTL Design',
      ],
    },
    {
      title: 'Tools',
      tagBg: 'bg-primary text-white',
      revealClass: 'reveal-service-2',
      skills: [
        'Figma',
        'FigJam',
        'Framer',
        'ProtoPie',
        'After Effects',
        'Miro',
        'Notion',
      ],
    },
    {
      title: 'Also',
      tagBg: 'bg-secondary text-stroke',
      revealClass: 'reveal-service-3',
      skills: [
        'Responsive Web Design',
        'Motion Graphics',
        'AI-Assisted Workflows',
        'Prompt Engineering',
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-28"
      aria-label="Skills & Tools"
    >
      {/* Header with Scroll Reveal */}
      <div ref={headerRef} className="flex flex-col items-start mb-16">
        {/* Blue sticker pill: "✦ Skills" */}
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary text-white border-3 border-stroke rounded-full shadow-neo font-bold text-sm sm:text-base mb-4 select-none hover:-rotate-1 transition-transform ${
            headerInView ? 'reveal-pill' : 'opacity-0'
          }`}
        >
          <span>✦</span>
          <span>Skills</span>
        </div>

        <h2
          className={`font-heading font-extrabold text-stroke text-3xl sm:text-4xl md:text-5xl tracking-tight mb-3 ${
            headerInView ? 'reveal-heading' : 'opacity-0'
          }`}
        >
          What's in my toolkit
        </h2>

        <p
          className={`font-body text-muted text-lg sm:text-xl font-medium max-w-xl ${
            headerInView ? 'reveal-subtitle' : 'opacity-0'
          }`}
        >
          Battle-tested methods and modern tools I use daily.
        </p>
      </div>

      {/* Three White Cards in a Row */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {skillGroups.map((group, idx) => (
          <div
            key={group.title}
            className={`bg-card-bg border-3 border-stroke rounded-[24px] shadow-[6px_6px_0_#18181B] hover:shadow-[9px_9px_0_#18181B] hover:-translate-y-1.5 transition-all duration-200 p-6 sm:p-8 flex flex-col justify-between ${
              cardsInView ? group.revealClass : 'opacity-0'
            }`}
          >
            <div>
              {/* Colored Header Tag */}
              <div className="mb-6">
                <span
                  className={`inline-block px-3.5 py-1.5 text-sm font-bold font-heading border-2 border-stroke rounded-full shadow-[2px_2px_0_#18181B] select-none ${group.tagBg}`}
                >
                  {group.title}
                </span>
              </div>

              {/* Wrap of Pill Tags (3px border, hover bounce) */}
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="pill-tag px-3.5 py-1.5 bg-page-bg text-stroke text-xs sm:text-sm font-bold border-3 border-stroke rounded-full shadow-[2px_2px_0_#18181B] select-none hover:bg-secondary cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t-2 border-stroke/10 flex items-center justify-between text-xs font-mono font-bold text-muted">
              <span>{group.skills.length} competencies</span>
              <span>✦</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
