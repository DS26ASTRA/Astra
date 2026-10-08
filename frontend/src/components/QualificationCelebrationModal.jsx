import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Crown, ArrowRight, Award, Zap, X } from 'lucide-react';
import { ancientSoundscape } from '../utils/ancientSoundscape';

const QualificationCelebrationModal = ({
  isOpen = false,
  onClose,
  teamName = 'Demo Warriors',
  unlockedRound = 'ROUND 4',
  stageName = 'THE HIGH CITADEL GATES',
  elevation = '4,850m',
  artifactReward = 'Solar Chariot Astra Sigil'
}) => {
  useEffect(() => {
    if (isOpen) {
      ancientSoundscape.playStoneImpact();
      setTimeout(() => {
        ancientSoundscape.playShankhaFanfare();
      }, 350);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
        {/* Darkened Backdrop with Ambient Glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-2xl"
        />

        {/* Central Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 40 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-xl w-full rounded-3xl border-2 border-[#ffd700] bg-gradient-to-b from-[#161208] via-[#0d0a06] to-[#050505] p-8 sm:p-10 shadow-[0_0_80px_rgba(255,215,0,0.35)] text-center overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full border border-gray-700 bg-black/60 text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>

          {/* Golden Volumetric God Rays Animation behind Torana */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#ffd700]/25 rounded-full blur-[100px] pointer-events-none animate-pulse" />

          {/* Ancient Temple Gate Opening Visual Representation */}
          <div className="relative mb-6 flex items-center justify-center">
            {/* Left Gate Door */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: -35 }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              className="w-16 h-28 border-2 border-[#d4af37]/60 bg-[#120f0a] rounded-l-xl flex items-center justify-center shadow-2xl"
            >
              <div className="text-[#ffd700] text-xs font-ancient tracking-widest -rotate-90">GATE I</div>
            </motion.div>

            {/* Radiant Center Light Pouring Through */}
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-[#ffd700] to-[#fff3b0] shadow-[0_0_50px_#ffd700] flex items-center justify-center text-black z-10"
            >
              <Crown size={28} className="animate-bounce" />
            </motion.div>

            {/* Right Gate Door */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: 35 }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              className="w-16 h-28 border-2 border-[#d4af37]/60 bg-[#120f0a] rounded-r-xl flex items-center justify-center shadow-2xl"
            >
              <div className="text-[#ffd700] text-xs font-ancient tracking-widest rotate-90">GATE II</div>
            </motion.div>
          </div>

          {/* Subtitle Heraldry */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#ffd700]/60 bg-black/60 text-[#ffd700] font-ancient text-xs tracking-[0.3em] uppercase mb-4 shadow-[0_0_15px_rgba(255,215,0,0.3)]">
            <Sparkles size={14} />
            <span>TRIUMPH OF ASCENT</span>
          </div>

          {/* Main Unlocked Banner */}
          <h2 className="text-3xl sm:text-5xl font-ancient font-black uppercase tracking-[0.1em] text-gold-chiseled mb-2">
            {unlockedRound} UNLOCKED
          </h2>

          <div className="font-ancient text-sm sm:text-base font-bold text-[#ffd700] tracking-[0.25em] uppercase mb-4">
            {stageName}
          </div>

          <p className="text-gray-300 font-ancient text-xs sm:text-sm leading-relaxed mb-6 max-w-md mx-auto">
            Hark, <strong>{teamName}</strong>! The Jury Council and the Ancient Masters have decreed your engineering worthy. Your team ascends to <strong className="text-white">{elevation}</strong>.
          </p>

          {/* Unlocked Artifact Reward Pill */}
          <div className="p-4 rounded-2xl border border-[#d4af37]/40 bg-black/60 mb-8 flex items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl border border-[#ffd700]/60 bg-[#ffd700]/15 text-[#ffd700]">
                <Award size={20} />
              </div>
              <div>
                <span className="text-[10px] font-ancient tracking-widest text-[#d4af37] uppercase">
                  UNLOCKED STAGE ARTIFACT:
                </span>
                <div className="font-ancient text-xs sm:text-sm font-bold text-white uppercase">
                  {artifactReward}
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="font-mono text-xs font-bold text-[#ffd700]">{elevation}</span>
              <div className="text-[9px] text-gray-400 font-ancient">ALTITUDE</div>
            </div>
          </div>

          {/* Action CTA */}
          <button
            onClick={onClose}
            className="btn-gold-epic w-full !py-3.5 !text-sm flex items-center justify-center gap-2 shadow-[0_0_35px_rgba(255,215,0,0.4)]"
          >
            <span>ENTER THE NEW ENVIRONMENT</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QualificationCelebrationModal;
