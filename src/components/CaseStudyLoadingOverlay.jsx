import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

export default function CaseStudyLoadingOverlay({ active, projectTitle, figmaFile, onPrepareReveal, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!active) {
      setProgress(0);
      setIsSlidingOut(false);
      return;
    }

    setProgress(0);
    setIsSlidingOut(false);
    const startTime = Date.now();
    const duration = 1200; // 1.2s to reach 100%, 300ms pause = 1.5s total

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const raw = Math.min(100, Math.floor((elapsed / duration) * 100));

      let display = raw;
      if (raw < 40) display = Math.floor(raw * 1.3);
      else if (raw < 80) display = 52 + Math.floor((raw - 40) * 0.8);
      else display = 84 + Math.floor((raw - 80) * 0.8);

      display = Math.min(100, Math.max(0, display));
      setProgress(display);

      if (elapsed >= duration) {
        setProgress(100);
        clearInterval(intervalRef.current);

        // At 1.5s, slide out
        timeoutRef.current = setTimeout(() => {
          if (onPrepareReveal) onPrepareReveal();
          setIsSlidingOut(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
        }, 300);
      }
    }, 25);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [active, onPrepareReveal, onComplete]);

  if (!active) return null;

  const displayFile = figmaFile || `${(projectTitle || 'project').toLowerCase().replace(/\s+/g, '-')}.fig`;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 select-none transition-transform duration-500 ${
        isSlidingOut ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{
        backgroundColor: '#FF4800',
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '28px 28px',
        transitionTimingFunction: 'cubic-bezier(0.85, 0, 0.15, 1)',
      }}
      role="alert"
      aria-live="assertive"
      aria-label={`Opening ${projectTitle} case study`}
    >
      {/* Central Terminal Card */}
      <div className="w-full max-w-md bg-white border-[3px] border-black rounded-[24px] shadow-[8px_8px_0px_#000000] p-6 flex flex-col gap-4 text-black animate-in fade-in zoom-in-95 duration-200">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#FF4800] border-2 border-black inline-block" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFD200] border-2 border-black inline-block" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-black inline-block" />
          </div>
          <span className="text-xs font-mono font-bold text-black/70 tracking-wider">
            figma-case-study
          </span>
          <span className="text-xs font-mono font-extrabold text-[#3B82F6]">
            {progress}%
          </span>
        </div>

        {/* Monospace exact status line */}
        <div className="flex items-center gap-2 font-mono text-sm sm:text-base font-bold text-black">
          <span className="text-[#3B82F6] font-extrabold select-none">&gt;</span>
          <span className="truncate">Opening {displayFile}...</span>
          <span className="w-2 h-4 bg-black animate-pulse inline-block ml-0.5" />
        </div>

        {/* Chunky Animated Progress Bar */}
        <div className="w-full bg-[#F8F6FF] border-[3px] border-black rounded-full h-7 p-1 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.15)] overflow-hidden relative">
          <div
            className="h-full bg-[#3B82F6] border-2 border-black rounded-full transition-all duration-75 ease-out flex items-center justify-end pr-2 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            {/* Chunky Neubrutalist diagonal stripes */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)',
                backgroundSize: '16px 16px',
              }}
            />
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs font-mono font-bold text-black/70 pt-1">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD200] fill-[#FFD200] stroke-black" />
            <span>{progress === 100 ? 'Rendering canvas...' : 'Fetching Figma vector assets'}</span>
          </span>
          <span className="text-black font-extrabold">
            {progress === 100 ? 'READY' : `${progress}/100`}
          </span>
        </div>
      </div>
    </div>
  );
}
