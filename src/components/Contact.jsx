import React, { useState } from 'react';
import { Mail, Download, ArrowUpRight, Copy, Check } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { StarburstSticker, SmileySticker } from './Stickers';
import { EMAIL, LINKEDIN_URL, BEHANCE_URL, CV_PATH, WHATSAPP_URL } from '../config';

function LinkedinIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function BehanceIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.085 0-6.625-2.825-6.625-6.643 0-4.041 2.766-6.857 6.666-6.857 4.143 0 6.009 3.008 5.766 6.814h-9.576c.071 2.313 1.651 3.936 3.992 3.936 1.764 0 2.809-.785 3.328-1.75h1.55zm-8.898-5.308h6.732c-.085-2.18-1.353-3.692-3.32-3.692-2.128 0-3.256 1.543-3.412 3.692zm-8.828 7.308h-6v-14h6.059c3.082 0 5.441 1.394 5.441 4.417 0 1.637-.88 2.894-2.146 3.55 1.725.688 2.646 2.197 2.646 4.073 0 3.235-2.583 4.96-6 4.96zm-3.529-8.471h3.333c1.684 0 2.696-.803 2.696-2.261 0-1.393-.976-2.19-2.585-2.19h-3.444v4.451zm0 6.393h3.582c1.792 0 3.018-.897 3.018-2.523 0-1.684-1.294-2.529-3.095-2.529h-3.505v5.052z" />
    </svg>
  );
}

function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.196 8.196 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.17 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.32" />
    </svg>
  );
}

export default function Contact() {
  const [cardRef, cardInView] = useInView({ threshold: 0.2 });
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

  return (
    <section
      id="contact"
      className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-[120px] relative"
      aria-label="Contact Section"
    >
      {/* Outer Wrapper with room for floating stickers */}
      <div className="relative mx-auto max-w-4xl pt-6 pb-6">
        
        {/* Floating Sticker 1: Starburst (Top Right) */}
        <div
          className="absolute -top-3 -right-2 sm:-top-5 sm:-right-6 z-20 pointer-events-none select-none"
          aria-hidden="true"
        >
          <StarburstSticker />
        </div>

        {/* Floating Sticker 2: Smiley (Top Left) */}
        <div
          className="absolute -top-5 -left-3 sm:-top-6 sm:-left-6 z-20 pointer-events-none select-none"
          aria-hidden="true"
        >
          <SmileySticker />
        </div>

        {/* Floating Sticker 3: "say hi 👋" tag pill */}
        <div
          className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-4 z-20 select-none animate-sticker-pill"
          aria-hidden="true"
        >
          <div className="px-4 py-2 bg-card-bg text-stroke font-heading font-extrabold text-sm sm:text-base border-3 border-stroke rounded-full shadow-neo rotate-6 hover:rotate-0 transition-transform">
            say hi 👋
          </div>
        </div>

        {/* Floating Sticker 4: Hand-drawn arrow pointing at buttons */}
        <div
          className="hidden md:flex absolute -bottom-6 left-6 z-20 flex-col items-center select-none pointer-events-none -rotate-12 animate-sticker-arrow"
          aria-hidden="true"
        >
          <span className="bg-card-bg text-stroke text-xs font-bold px-2 py-0.5 border-2 border-stroke rounded-md shadow-[2px_2px_0_#18181B] font-heading mb-1">
            drop a line! 📬
          </span>
          <svg
            width="55"
            height="45"
            viewBox="0 0 55 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-stroke"
          >
            <path
              d="M8 5C14 14 28 15 40 24C45 28 46 32 42 38"
              stroke="#18181B"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M32 34L43 38L47 27"
              stroke="#18181B"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Big Centered Yellow Card */}
        <div
          ref={cardRef}
          className={`relative bg-secondary border-3 border-stroke rounded-[28px] shadow-[8px_8px_0_#18181B] hover:shadow-[10px_10px_0_#18181B] hover:-translate-y-1 transition-all duration-300 p-8 sm:p-12 md:p-16 text-center overflow-hidden ${
            cardInView ? 'reveal-heading' : 'opacity-0'
          }`}
          style={{
            backgroundImage: 'radial-gradient(rgba(24, 24, 27, 0.12) 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px',
          }}
        >
          {/* Header Pill */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-card-bg text-stroke border-3 border-stroke rounded-full shadow-neo font-bold text-sm sm:text-base mb-6 select-none hover:-rotate-1 transition-transform">
            <span className="text-primary font-black">✦</span>
            <span>Contact</span>
          </div>

          {/* Heading */}
          <h2 className="font-heading font-extrabold text-stroke text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 max-w-2xl mx-auto leading-tight">
            Let's build something great together.
          </h2>

          {/* Subtitle */}
          <p className="font-body text-stroke/85 text-lg sm:text-xl font-medium max-w-xl mx-auto mb-8">
            Have a project in mind? I'd love to hear about it.
          </p>

          {/* Action Pill Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-6">
            {/* Email me */}
            <a
              href={`mailto:${EMAIL}?subject=Project%20inquiry%20from%20your%20portfolio`}
              className="neo-btn bg-primary text-white text-base sm:text-lg px-7 py-3.5 sm:px-8 sm:py-4 font-extrabold w-full sm:w-auto"
            >
              <Mail className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
              <span>Email me</span>
            </a>

            {/* WhatsApp – visible with real WhatsApp URL */}
            {WHATSAPP_URL && (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn bg-[#25D366] text-black border-3 border-black text-base sm:text-lg px-7 py-3.5 sm:px-8 sm:py-4 font-extrabold hover:bg-[#20ba5a] w-full sm:w-auto"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            )}

            {/* LinkedIn */}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn bg-card-bg text-stroke text-base sm:text-lg px-7 py-3.5 sm:px-8 sm:py-4 font-extrabold hover:bg-page-bg w-full sm:w-auto"
            >
              <LinkedinIcon className="w-5 h-5" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
            </a>

            {/* Behance */}
            <a
              href={BEHANCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn bg-card-bg text-stroke text-base sm:text-lg px-7 py-3.5 sm:px-8 sm:py-4 font-extrabold hover:bg-page-bg w-full sm:w-auto"
            >
              <BehanceIcon className="w-5 h-5" />
              <span>Behance</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
            </a>
          </div>

          {/* Plain visible email text with Copy email button */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 bg-card-bg border-3 border-stroke rounded-full px-5 py-2.5 shadow-neo mb-4 select-none">
            <span className="font-mono font-bold text-sm sm:text-base text-stroke select-all">
              {EMAIL}
            </span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-3.5 py-1.5 bg-page-bg hover:bg-secondary text-stroke text-xs sm:text-sm font-bold border-2 border-stroke rounded-full shadow-[2px_2px_0_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10B981] stroke-[3]" />
                  <span className="text-[#10B981] font-extrabold">Copied ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Copy email</span>
                </>
              )}
            </button>
          </div>

          {/* Reply time note */}
          <p className="text-sm text-stroke/70 font-medium mb-8">Usually reply within 24 hours</p>

          {/* Also: Download CV button */}
          <div className="pt-6 border-t-2 border-stroke/20 flex justify-center">
            <a
              href={CV_PATH}
              download="Mrwan-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn bg-card-bg text-stroke text-sm sm:text-base px-6 py-2.5 font-bold hover:bg-page-bg"
              aria-label="Download CV as PDF"
            >
              <Download className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
