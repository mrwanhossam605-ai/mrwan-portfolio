import React, { useState } from 'react';
import { Download, ArrowDown, Sparkles } from 'lucide-react';
import { CV_PATH } from '../config';
import {
  StarburstSticker,
  SmileySticker,
  HandDrawnArrow,
  CairoPill,
} from './Stickers';

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="hero"
      className="relative w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-[120px] sm:pt-[135px] lg:pt-[150px] pb-16 sm:pb-24 scroll-mt-28"
      aria-label="Hero Section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* =========================================
            LEFT COLUMN: Headline, Badges, Bio, CTAs
           ========================================= */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          {/* Small yellow sticker badge above headline */}
          <div className="animate-hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 bg-secondary border-3 border-stroke rounded-full shadow-neo text-stroke font-bold text-sm sm:text-base mb-6 select-none hover:-rotate-1 transition-transform">
            <span>👋</span>
            <span>Hi, I'm Mrwan</span>
          </div>

          {/* Headline: "UI/UX Designer" */}
          <h1 className="font-heading font-extrabold text-stroke text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[54px] leading-[1.18] tracking-tight mb-6">
            <span className="relative inline-block mt-1 mb-[8px]">
              {/* Blue marker-style background block */}
              <span
                aria-hidden="true"
                className="animate-marker-swipe absolute -inset-1.5 sm:-inset-2 bg-primary rounded-xl -rotate-2 border-3 border-stroke shadow-neo -z-10"
              />
              <span className="relative z-10 text-white">UI/UX</span>
            </span>
            <br />
            <span className="animate-fade-up-designer inline-flex items-center">
              <span>Designer</span>
              <Sparkles
                className="animate-twinkle inline-block text-secondary fill-secondary stroke-stroke stroke-[2.5] w-7 h-7 sm:w-8 sm:h-8 ml-2.5 rotate-12"
                aria-hidden="true"
              />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up-subtitle font-body text-muted text-lg sm:text-xl md:text-[22px] leading-relaxed max-w-2xl mb-8 sm:mb-10 font-medium">
            I design clean, user-first mobile apps and websites that turn complex ideas into simple experiences, from research and wireframes to polished Figma systems and live sites.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto">
            {/* Primary: View My Work */}
            <a
              href="#work"
              className="animate-btn-primary neo-btn bg-primary text-white text-base sm:text-lg px-7 py-3.5 sm:px-8 sm:py-4 font-extrabold tracking-wide w-full sm:w-auto text-center"
            >
              <span>View My Work</span>
              <ArrowDown className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
            </a>

            {/* Secondary: Download CV */}
            <a
              href={CV_PATH}
              download="Mrwan-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="animate-btn-secondary neo-btn bg-secondary text-stroke text-base sm:text-lg px-7 py-3.5 sm:px-8 sm:py-4 font-extrabold tracking-wide w-full sm:w-auto text-center"
              aria-label="Download CV as PDF"
            >
              <span>Download CV</span>
              <Download className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* =========================================
            RIGHT COLUMN: Card & Cute Floating Stickers
           ========================================= */}
        <div className="lg:col-span-5 flex justify-center items-center relative mt-6 lg:mt-0">
          {/* Outer Relative Wrap with boundary for floating stickers */}
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[420px] mx-auto py-6">
            
            {/* Sticker 1: Starburst (Overlaps only the card's top-right corner, safely below navbar) */}
            <div className="absolute top-2 -right-4 sm:top-2 sm:-right-6 z-20">
              <StarburstSticker />
            </div>

            {/* Sticker 2: Hand-drawn arrow pointing at card (Top Left) */}
            <div className="absolute top-6 -left-7 sm:top-8 sm:-left-11 z-20">
              <HandDrawnArrow />
            </div>

            {/* Sticker 3: Smiley Emoji Sticker (Bottom Right) */}
            <div className="absolute -bottom-4 -right-2 sm:-bottom-5 sm:-right-4 z-20">
              <SmileySticker />
            </div>

            {/* Sticker 4: Floating Pill "Cairo, Egypt 📍" (Bottom Left) */}
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-6 z-20">
              <CairoPill />
            </div>

            {/* Central Rounded White Card with thick border & hard shadow */}
            <div className="animate-hero-card neo-card bg-card-bg p-3.5 sm:p-4 transition-transform hover:-translate-y-1 duration-200">
              {/* Inner frame with subtle pastel background */}
              <div className="relative w-full aspect-[4/4.6] bg-[#F1EEFC] border-3 border-stroke rounded-[14px] overflow-hidden flex flex-col items-center justify-between">
                
                {/* Mini card tag / window control bar */}
                <div className="w-full bg-card-bg border-b-3 border-stroke py-1.5 px-3 pr-14 sm:pr-16 flex items-center justify-between gap-2 overflow-hidden">
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="w-3 h-3 rounded-full bg-primary border-2 border-stroke inline-block" />
                    <span className="w-3 h-3 rounded-full bg-secondary border-2 border-stroke inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#52525B] border-2 border-stroke inline-block" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-muted uppercase tracking-wider truncate flex-shrink min-w-0">
                    mrwan.design
                  </span>
                </div>

                {/* Portrait Image or Illustration Fallback */}
                <div className="relative w-full flex-1 flex items-center justify-center p-2 overflow-hidden">
                  {!imgError ? (
                    <img
                      src="/profile.webp"
                      srcSet="/profile-640.webp 640w, /profile.webp 1024w"
                      sizes="(max-width: 640px) 340px, (max-width: 1024px) 400px, 420px"
                      width="400"
                      height="460"
                      fetchPriority="high"
                      alt="Mrwan H. - UI/UX Designer in Cairo"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover object-top rounded-lg filter contrast-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                      <div className="w-24 h-24 rounded-full bg-secondary border-3 border-stroke flex items-center justify-center text-4xl shadow-neo mb-3">
                        👨‍💻
                      </div>
                      <p className="font-heading font-extrabold text-stroke text-lg">
                        Mrwan H.
                      </p>
                      <p className="font-body text-xs font-bold text-muted">
                        UI/UX &amp; Product Designer
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom status badge inside the card */}
                <div className="w-full p-2.5 bg-card-bg border-t-3 border-stroke flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-stroke">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] border border-stroke animate-pulse inline-block" />
                    Available for projects
                  </span>
                  <span className="font-mono text-muted text-[11px]">2026</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
