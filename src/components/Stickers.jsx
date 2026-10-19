import React from 'react';

// Cute Starburst Sticker (Soft Neo-Brutalism)
export function StarburstSticker({ className = '' }) {
  return (
    <div
      style={{ '--sticker-rot': '-8deg' }}
      className={`animate-sticker-starburst select-none pointer-events-none drop-shadow-none ${className}`}
      aria-hidden="true"
    >
      {/* Container rotates slowly 360deg over 20s */}
      <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-secondary border-3 border-stroke rounded-2xl shadow-neo transition-transform hover:scale-110">
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 sm:w-12 sm:h-12 text-stroke fill-stroke animate-slow-spin"
        >
          <path d="M12 0L14.59 7.41L22 6L16.59 12L22 18L14.59 16.59L12 24L9.41 16.59L2 18L7.41 12L2 6L9.41 7.41L12 0Z" />
        </svg>
        <span className="absolute text-[10px] sm:text-xs font-black uppercase tracking-wider text-stroke font-heading pointer-events-none">
          NEW
        </span>
      </div>
    </div>
  );
}

// Smiling Emoji Sticker ☺
export function SmileySticker({ className = '' }) {
  return (
    <div
      style={{ '--sticker-rot': '12deg' }}
      className={`animate-sticker-smiley select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#FFE17D] border-3 border-stroke rounded-full shadow-neo rotate-[12deg]">
        <svg
          viewBox="0 0 40 40"
          className="w-10 h-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Eyes */}
          <circle cx="14" cy="15" r="3" fill="#18181B" />
          <circle cx="26" cy="15" r="3" fill="#18181B" />
          {/* Blush marks */}
          <circle cx="10" cy="22" r="2.5" fill="#2F5BFF" />
          <circle cx="30" cy="22" r="2.5" fill="#2F5BFF" />
          {/* Smile */}
          <path
            d="M13 22C14.5 27 25.5 27 27 22"
            stroke="#18181B"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

// Hand-Drawn Arrow Sticker pointing at the portrait
export function HandDrawnArrow({ className = '' }) {
  return (
    <div
      style={{ '--sticker-rot': '-4deg' }}
      className={`animate-sticker-arrow select-none pointer-events-none flex flex-col items-center ${className}`}
      aria-hidden="true"
    >
      <span className="bg-card-bg text-stroke text-xs font-bold px-2 py-0.5 border-2 border-stroke rounded-md shadow-[2px_2px_0_#18181B] -rotate-6 font-heading mb-1">
        that's me! ✨
      </span>
      <svg
        width="65"
        height="55"
        viewBox="0 0 65 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-stroke"
      >
        <path
          d="M8 6C15 16 35 15 48 26C53 30 54 36 50 42"
          stroke="#18181B"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="1 0"
        />
        <path
          d="M38 38L51 43L55 30"
          stroke="#18181B"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// Floating Pill: "Cairo, Egypt 📍"
export function CairoPill({ className = '' }) {
  return (
    <div
      style={{ '--sticker-rot': '4deg' }}
      className={`animate-sticker-pill select-none ${className}`}
    >
      <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-card-bg text-stroke font-bold text-sm sm:text-base border-3 border-stroke rounded-full shadow-neo rotate-[4deg] hover:rotate-0 transition-transform cursor-default">
        <span>Cairo, Egypt</span>
        <span className="text-base">📍</span>
      </div>
    </div>
  );
}
