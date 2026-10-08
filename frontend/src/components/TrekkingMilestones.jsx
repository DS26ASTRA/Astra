import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ancientSoundscape } from '../utils/ancientSoundscape';

const TrekkingMilestones = ({ scrollProgress = 0, onTrekTo }) => {
  // Opening Vista Intro: Fades smoothly as soon as trekking begins (0 to 0.08)
  const startOpacity = Math.max(0, 1 - scrollProgress * 12.0);

  const handleBeginJourney = () => {
    ancientSoundscape.playStoneImpact();
    setTimeout(() => {
      ancientSoundscape.playTempleBell();
    }, 300);
    if (onTrekTo) onTrekTo(0.20); // Smoothly treks toward the stone and gateway
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center overflow-hidden select-none">
      
      {/* =========================================================
          HERO INTRO MATCHING REFERENCE IMAGE
          (Subtle center typography that fades out on first scroll)
          ========================================================= */}
      {startOpacity > 0.01 && (
        <div 
          className="absolute inset-0 px-6 flex flex-col justify-between py-12 sm:py-16 transition-opacity duration-500"
          style={{ 
            opacity: startOpacity, 
            pointerEvents: startOpacity > 0.3 ? 'auto' : 'none' 
          }}
        >
          {/* Center Title Block */}
          <div className="max-w-md mx-auto text-center mt-28 sm:mt-32">
            <span className="font-ancient text-[10px] sm:text-[11px] font-semibold tracking-[0.32em] text-[#d4af37] uppercase block mb-1.5 drop-shadow-md">
              NATIONAL LEVEL AGATHON
            </span>

            <h1 className="font-ancient text-4xl sm:text-5xl font-black text-white tracking-[0.22em] leading-tight mb-2 text-gold-chiseled drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              ASTRA
            </h1>

            <div className="font-ancient text-[10px] sm:text-[11px] text-[#e8dcc4] tracking-[0.28em] uppercase mb-6 flex items-center justify-center gap-2.5 drop-shadow-md">
              <span>EXPLORE</span>
              <span className="text-[#ffd700]">•</span>
              <span>INNOVATE</span>
              <span className="text-[#ffd700]">•</span>
              <span>BUILD</span>
            </div>

            <button
              onClick={handleBeginJourney}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#d4af37]/70 bg-black/40 text-[#ffd700] font-ancient text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#d4af37] hover:text-black transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] cursor-pointer"
            >
              <span>BEGIN THE JOURNEY</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Bottom subtle scroll prompt matching reference image */}
          <div className="self-center flex flex-col items-center gap-1.5 text-[#d4af37]/80 font-ancient text-[9px] sm:text-[10px] tracking-[0.25em] uppercase pb-2">
            {/* Minimalist mouse scroll wheel icon */}
            <div className="w-3.5 h-5 rounded-full border border-[#d4af37]/70 flex items-start justify-center p-0.5">
              <div className="w-0.5 h-1 bg-[#ffd700] rounded-full animate-bounce" />
            </div>
            <span>SCROLL TO CONTINUE</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default TrekkingMilestones;
