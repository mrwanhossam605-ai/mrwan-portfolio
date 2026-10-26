import React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { CASE_STUDY_LINKS, BEHANCE_URL } from '../config';

function ProjectCard({ proj, idx, onOpenCaseStudy }) {
  const [cardRef, cardInView] = useInView({ threshold: 0.2 });
  const isEven = idx % 2 === 0;
  const isThumbnailLeft = proj.thumbnailSide ? proj.thumbnailSide === 'left' : isEven;

  const handleCardClick = (e) => {
    // Only navigate if user didn't click an interactive link/button inside
    if (onOpenCaseStudy) {
      onOpenCaseStudy(proj.slug);
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (onOpenCaseStudy) {
      onOpenCaseStudy(proj.slug);
    }
  };

  return (
    <article
      ref={cardRef}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${proj.title} case study`}
      className={`group bg-card-bg border-3 border-stroke rounded-[24px] shadow-[6px_6px_0_#18181B] hover:shadow-[9px_9px_0_#18181B] hover:-translate-y-1 transition-all duration-200 p-5 sm:p-7 md:p-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 cursor-pointer select-none focus:outline-none focus:ring-4 focus:ring-[#3B82F6] ${
        cardInView
          ? isEven
            ? 'reveal-project-left'
            : 'reveal-project-right'
          : 'opacity-0'
      }`}
    >
      {/* Thumbnail Frame (Left or Right on desktop based on side alignment) */}
      <div
        className={`relative w-full lg:w-1/2 aspect-[16/11] sm:aspect-[16/10] ${proj.bgColor} border-3 border-stroke rounded-[18px] overflow-hidden flex items-center justify-center p-4 sm:p-6 shadow-inner ${
          isThumbnailLeft ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        {/* Mockup Image container with soft neo-brutal styling & thumbnail hover zoom to 1.05 */}
        <div className="w-full h-full relative rounded-xl overflow-hidden border-2 border-stroke/20 bg-card-bg/40 flex items-center justify-center">
          <img
            src={proj.image}
            srcSet={proj.srcSet}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
            width="640"
            height="440"
            loading="lazy"
            alt={proj.alt}
            className={`w-full h-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105 ${
              cardInView ? 'reveal-thumb-scale' : 'scale-105'
            }`}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Decorative badge overlay */}
          <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-card-bg/90 border-2 border-stroke rounded-md text-[11px] font-mono font-bold text-stroke shadow-sm select-none">
            {proj.title}
          </div>
        </div>
      </div>

      {/* Text & Content Block */}
      <div
        className={`w-full lg:w-1/2 flex flex-col items-start justify-center text-left ${
          isThumbnailLeft ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        {/* Project Title */}
        <h3 className="font-heading font-extrabold text-stroke text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-3 group-hover:text-[#3B82F6] transition-colors">
          {proj.title}
        </h3>

        {/* Tagline */}
        <p className="font-body text-muted text-base sm:text-lg leading-relaxed mb-6 font-medium">
          {proj.tagline}
        </p>

        {/* Pill Tags (bounces up 2px on hover) */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-8">
          {proj.tags.map((tag) => (
            <span
              key={tag}
              className="pill-tag px-3 py-1 bg-page-bg text-stroke text-xs sm:text-sm font-bold border-2 border-stroke rounded-full shadow-[2px_2px_0_#18181B] select-none hover:bg-secondary cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View Case Study Button (flush left alignment, vertical-only hover shadow) */}
        <button
          type="button"
          onClick={handleButtonClick}
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm sm:text-base px-6 py-3.5 font-bold rounded-full border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:shadow-[4px_6px_0px_#000000] hover:-translate-y-1 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000000] transition-all flex items-center gap-2 cursor-pointer select-none group/btn self-start m-0"
          aria-label={`View case study for ${proj.title}`}
        >
          <span>View Case Study ↗</span>
        </button>
      </div>
    </article>
  );
}

export default function Projects({ onOpenCaseStudy }) {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });

  const projects = [
    {
      id: '01',
      slug: 'wakandarides',
      title: 'WakandaRides',
      tagline: 'A carpooling platform for Canada, from ID verification to live trips.',
      tags: ['Mobile App', 'Website', 'Design System', '70+ Screens'],
      bgType: 'yellow',
      bgColor: 'bg-secondary',
      badgeBg: 'bg-card-bg text-stroke',
      image: '/wakanda.webp',
      srcSet: '/wakanda-640.webp 640w, /wakanda.webp 1024w',
      alt: 'WakandaRides - Carpooling Platform UI/UX Mockup',
      link: CASE_STUDY_LINKS.wakandarides,
    },
    {
      id: '02',
      slug: 'flaride',
      title: 'FlaRide',
      tagline: 'An African super app combining ride-hailing, food delivery and parcel shipping.',
      tags: ['Mobile App', 'Super App', 'Design System', '80+ Screens'],
      bgType: 'blue',
      bgColor: 'bg-primary',
      badgeBg: 'bg-secondary text-stroke',
      image: '/flaride.webp',
      srcSet: '/flaride-640.webp 640w, /flaride.webp 1024w',
      alt: 'FlaRide - Super App UI/UX Mockup',
      link: CASE_STUDY_LINKS.flaride,
    },
    {
      id: '03',
      slug: 'almasilah',
      title: 'Al-Masilah',
      tagline: 'A corporate website for a Kuwait-based elevator company, designed in Arabic RTL.',
      tags: ['Website', 'Arabic RTL', 'Corporate'],
      bgType: 'lavender',
      bgColor: 'bg-[#EAE5FC]',
      badgeBg: 'bg-card-bg text-stroke',
      image: '/almasilah.webp',
      srcSet: '/almasilah-640.webp 640w, /almasilah.webp 1024w',
      alt: 'Al-Masilah - Corporate Arabic RTL Website Mockup',
      link: CASE_STUDY_LINKS.almasilah,
    },
  ];

  return (
    <section
      id="work"
      className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-28"
      aria-label="Selected Projects"
    >
      {/* Section Header with Scroll Reveal */}
      <div ref={headerRef} className="flex flex-col items-start mb-16">
        {/* Small yellow sticker pill */}
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-secondary border-3 border-stroke rounded-full shadow-neo text-stroke font-bold text-sm sm:text-base mb-4 select-none hover:-rotate-1 transition-transform ${
            headerInView ? 'reveal-pill' : 'opacity-0'
          }`}
        >
          <span>✦</span>
          <span>Selected Work</span>
        </div>

        {/* Big Syne 800 Heading */}
        <h2
          className={`font-heading font-extrabold text-stroke text-3xl sm:text-4xl md:text-5xl tracking-tight mb-3 ${
            headerInView ? 'reveal-heading' : 'opacity-0'
          }`}
        >
          Projects I'm proud of
        </h2>

        {/* Muted Subtitle */}
        <p
          className={`font-body text-muted text-lg sm:text-xl font-medium max-w-xl ${
            headerInView ? 'reveal-subtitle' : 'opacity-0'
          }`}
        >
          Real products, real clients, designed end to end.
        </p>
      </div>

      {/* Large Horizontal Cards Stacked Vertically */}
      <div className="flex flex-col gap-12 sm:gap-14">
        {projects.map((proj, idx) => (
          <ProjectCard
            key={proj.id}
            proj={proj}
            idx={idx}
            onOpenCaseStudy={onOpenCaseStudy}
          />
        ))}
      </div>

      {/* Centered Behance Link Button */}
      <div className="mt-14 sm:mt-16 flex justify-center">
        <a
          href={BEHANCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="neo-btn bg-card-bg text-stroke text-base sm:text-lg px-8 py-4 font-bold border-3 border-stroke shadow-neo hover:bg-secondary transition-colors text-center"
        >
          <span>See all projects on Behance</span>
          <ExternalLink className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
