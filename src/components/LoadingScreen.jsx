import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef(null);
  const exitTimeoutRef = useRef(null);

  const startLoading = () => {
    setIsFinished(false);
    setIsExiting(false);
    setProgress(0);

    const startTime = Date.now();
    const duration = 2000; // 2 seconds

    if (timerRef.current) clearInterval(timerRef.current);
    if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      // Realistic easing: swift start, brief pause around 75%, fast to 100%
      let displayProgress = rawProgress;
      if (rawProgress < 30) {
        displayProgress = Math.floor(rawProgress * 1.2);
      } else if (rawProgress < 75) {
        displayProgress = 36 + Math.floor((rawProgress - 30) * 0.9);
      } else {
        displayProgress = 76 + Math.floor((rawProgress - 75) * 0.96);
      }
      displayProgress = Math.min(100, Math.max(0, displayProgress));

      setProgress(displayProgress);

      if (elapsed >= duration) {
        setProgress(100);
        clearInterval(timerRef.current);

        // Brief pause at 100% before slick slide-up transition
        exitTimeoutRef.current = setTimeout(() => {
          setIsExiting(true);
          // Wait for 700ms slide-up animation to complete
          setTimeout(() => {
            setIsFinished(true);
          }, 700);
        }, 300);
      }
    }, 25);
  };

  useEffect(() => {
    startLoading();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Fullscreen Neubrutalist Loading Overlay */}
      {!isFinished && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 select-none transition-transform duration-700 ${
            isExiting ? '-translate-y-full' : 'translate-y-0'
          }`}
          style={{
            backgroundColor: '#F8F6FF',
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
            transitionTimingFunction: 'cubic-bezier(0.85, 0, 0.15, 1)',
          }}
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          {/* Striking Vibrant Orange Neubrutalist Hero Container */}
          <div
            className="w-full max-w-lg bg-[#FF4800] border-[3px] border-black rounded-[28px] shadow-[8px_8px_0px_#000000] p-6 sm:p-8 flex flex-col items-center gap-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-300"
          >
            {/* Decorative background geometric stickers */}
            <div
              className="absolute -top-6 -right-6 w-24 h-24 bg-[#FFD200] border-[3px] border-black rounded-full rotate-12 opacity-90 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-6 -left-6 w-20 h-20 bg-[#3B82F6] border-[3px] border-black rounded-2xl -rotate-12 opacity-80 pointer-events-none"
              aria-hidden="true"
            />

            {/* Top Category Badge */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <span className="px-3 py-1 bg-black text-white text-xs font-mono font-bold rounded-full border border-black shadow-[2px_2px_0px_#FFFFFF]">
                PORTFOLIO · V2026
              </span>
              <span className="px-3 py-1 bg-[#FFD200] text-black text-xs font-mono font-extrabold rounded-full border-2 border-black shadow-[2px_2px_0px_#000000] rotate-2">
                CAIRO, EGYPT 📍
              </span>
            </div>

            {/* Centered Branding: White rounded badge card with black border & logo */}
            <div className="relative z-10 bg-white border-[3px] border-black rounded-full px-6 sm:px-8 py-3.5 shadow-[5px_5px_0px_#000000] flex items-center gap-3 hover:-rotate-1 transition-transform">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-black tracking-tight">
                Mrwan H.
              </span>
              <Sparkles
                className="w-7 h-7 sm:w-8 sm:h-8 text-[#FFD200] fill-[#FFD200] stroke-black stroke-[2.5] animate-pulse"
                aria-hidden="true"
              />
              <span className="hidden sm:inline-block px-2.5 py-0.5 bg-[#3B82F6] text-white border-2 border-black rounded-full text-xs font-mono font-bold shadow-[2px_2px_0px_#000000]">
                UI/UX
              </span>
            </div>

            {/* Terminal Loading Element: Solid black border, white bg, exact status line */}
            <div className="relative z-10 w-full bg-white border-[3px] border-black rounded-[20px] shadow-[6px_6px_0px_#000000] p-4 sm:p-6 flex flex-col gap-4 text-black font-mono">
              {/* Terminal Window Header Bar */}
              <div className="flex items-center justify-between border-b-[2px] border-black pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FF4800] border-2 border-black inline-block" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FFD200] border-2 border-black inline-block" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-black inline-block" />
                </div>
                <span className="text-xs font-bold text-black/70 tracking-wider">
                  figma-loader.sh
                </span>
                <span className="text-xs font-extrabold text-[#3B82F6] font-mono">
                  {progress}%
                </span>
              </div>

              {/* Exact Monospace Status Line */}
              <div className="flex items-center gap-2 font-mono text-sm sm:text-base font-bold text-black">
                <span className="text-[#3B82F6] font-extrabold select-none">&gt;</span>
                <span className="truncate">Opening marwan-portfolio.fig...</span>
                <span className="w-2 h-4 bg-black animate-pulse inline-block ml-0.5" />
              </div>

              {/* Chunky Neubrutalist Animated Progress Bar */}
              <div className="w-full bg-[#F8F6FF] border-[3px] border-black rounded-full h-7 sm:h-8 p-1 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.15)] overflow-hidden relative">
                <div
                  className="h-full bg-[#3B82F6] border-2 border-black rounded-full transition-all duration-75 ease-out flex items-center justify-end pr-2 relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  {/* Chunky Neubrutalist Diagonal Stripes */}
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

              {/* Footer status line inside terminal */}
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-black/70 pt-0.5">
                <span className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full border border-black ${
                      progress === 100 ? 'bg-[#10B981]' : 'bg-[#FFD200] animate-ping'
                    }`}
                  />
                  {progress === 100 ? 'Loaded successfully!' : 'Compiling design tokens...'}
                </span>
                <span className="font-mono text-black font-extrabold">
                  {progress === 100 ? 'READY' : `${progress}/100`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Replay Floating Pill Button in Corner */}
      <button
        type="button"
        onClick={startLoading}
        className="fixed bottom-5 right-5 z-40 bg-[#FFD200] text-black font-body font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-full border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all flex items-center gap-2 cursor-pointer select-none group"
        title="Replay Loading Screen"
        aria-label="Replay intro loading animation"
      >
        <RotateCcw className="w-4 h-4 stroke-[2.8] group-hover:-rotate-90 transition-transform duration-300" />
        <span>Replay Intro</span>
        <span className="px-1.5 py-0.2 bg-black text-white text-[10px] font-mono font-bold rounded-full">
          ⚡
        </span>
      </button>
    </>
  );
}
