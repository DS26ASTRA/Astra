import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ShieldCheck, Sparkles, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChapterModal = ({ isOpen, onClose, chapter }) => {
  if (!isOpen || !chapter) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-[#d4af37]/60 bg-[#0a0a0c] p-0 shadow-[0_0_50px_rgba(212,175,55,0.25)] z-10"
        >
          {/* Top Banner with Image */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden">
            <img
              src={chapter.image}
              alt={chapter.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0a0a0c]/70" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 rounded-full border border-[#d4af37]/40 bg-black/60 p-2 text-gray-300 transition-colors hover:border-[#ffd700] hover:text-[#ffd700]"
            >
              <X size={20} />
            </button>

            {/* Badge */}
            <div className="absolute bottom-4 left-6 z-10 flex items-center gap-3">
              <span className="rounded border border-[#ffd700]/70 bg-black/80 px-2.5 py-1 font-ancient text-sm font-bold text-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                {chapter.num}
              </span>
              <span className="font-ancient text-xs tracking-[0.25em] text-[#d4af37] uppercase">
                PHASE MISSION
              </span>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-ancient text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
                {chapter.title}
              </h3>
              <p className="mt-2 text-gray-300 font-ancient text-sm tracking-wide">
                {chapter.desc}
              </p>
            </div>

            {/* Deep Lore & Objectives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="rounded-lg border border-[#d4af37]/20 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-[#ffd700] font-ancient text-xs tracking-widest uppercase mb-2">
                  <Compass size={16} />
                  <span>Key Objectives</span>
                </div>
                <ul className="space-y-1.5 text-xs text-gray-400">
                  {chapter.objectives?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#d4af37] mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-[#d4af37]/20 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-[#ffd700] font-ancient text-xs tracking-widest uppercase mb-2">
                  <Sparkles size={16} />
                  <span>Deliverables & Focus</span>
                </div>
                <ul className="space-y-1.5 text-xs text-gray-400">
                  {chapter.deliverables?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#d4af37] mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Lore Quote */}
            <div className="border-l-2 border-[#d4af37] pl-4 italic text-sm text-gray-400 font-serif">
              "{chapter.lore}"
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--color-card-border)]">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <ShieldCheck size={16} className="text-[#d4af37]" />
                <span>Eligibility: Open to all registered ASTRA teams</span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded border border-gray-700 text-xs font-ancient tracking-widest text-gray-300 hover:border-gray-500 uppercase"
                >
                  Close
                </button>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="w-full sm:w-auto btn-gold-epic !py-2.5 !px-6 !text-xs whitespace-nowrap"
                >
                  Join Expedition <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ChapterModal;
