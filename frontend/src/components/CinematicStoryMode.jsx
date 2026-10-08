import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ArrowRight,
  Compass,
  Film
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { soundFX } from '../utils/audioFX';

const scenes = [
  {
    id: 1,
    act: "ACT I",
    title: "THE CALL OF THE ANCIENTS",
    location: "VALLEY OF WHISPERS • ELEVATION 0M",
    image: "/images/hero-lost-city.jpg",
    narrative: "For five thousand years, the monumental citadels of the ancients slept veiled in morning mist. Today, the golden seal is broken. A summons has echoed across colleges and labs nationwide, calling the boldest engineers and visionaries to an expedition of a lifetime.",
    quote: "“The wisdom of millennia does not fade; it awaits those brave enough to decipher it.”"
  },
  {
    id: 2,
    act: "ACT II",
    title: "THE EVERPEAK MAP UNFOLDS",
    location: "THE CARTOGRAPHER'S BASECAMP • ELEVATION 1,100M",
    image: "/images/adventure-map-mountain.jpg",
    narrative: "At the foot of the mountain, 128 squads unroll the sacred cartographer's parchment. Armed with ancient epigraphic treatises and cutting-edge neural architectures, each squad maps their route across 4 perilous domains: AI Archaeology, Clean Hydraulics, Decentralized Ledgers, and Celestial Precision.",
    quote: "“No expedition begins with code. It begins with listening to the ancient stone.”"
  },
  {
    id: 3,
    act: "ACT III",
    title: "THE 24-HOUR CHASM CRUCIBLE",
    location: "THE HANGING CITADEL • ELEVATION 3,600M",
    image: "/images/card-build.jpg",
    narrative: "Night engulfs the mountain. Across towering stone archways and flickering fire braziers, the 24-hour sprint ignites. Teams wrestle with production APIs, hardware prototypes, and relentless mentor evaluations. Every passing hour separates good ideas from enduring technology.",
    quote: "“Under the stars of the lost city, ideas become iron and stone.”"
  },
  {
    id: 4,
    act: "ACT IV",
    title: "THE ASCENT OF CHAMPIONS",
    location: "THE HIGH GATES • ELEVATION 4,850M",
    image: "/images/card-exploration.jpg",
    narrative: "From 128 squads to 64... then 24... down to 8 grand finalists. With every stage trial conquered, teams physically ascend the mountain tiers. Leveling up their stamina, unlocking sacred artifacts, and approaching the final defense before the Arch-Jury.",
    quote: "“Only those who master both ancient philosophy and modern precision scale the high pass.”"
  },
  {
    id: 5,
    act: "ACT V",
    title: "THE THRONE OF ASTRA",
    location: "THE CELESTIAL SANCTUM • SUMMIT 6,200M",
    image: "/images/summit-throne.jpg",
    narrative: "At 6,200 meters, high above the clouds, the grand dome of the Celestial Sanctum welcomes the victors. Bathed in radiant sunbeams, the podium laureates claim ₹1,50,000+ in bounties, incubator fast-tracks, and immortal recognition etched into the annals of Astra.",
    quote: "“Your expedition is not the end. It is the beginning of tomorrow.”"
  }
];

const CinematicStoryMode = ({ isOpen, onClose }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const scene = scenes[currentSceneIndex];

  // Auto-play timer
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setInterval(() => {
      setCurrentSceneIndex(prev => {
        const next = (prev + 1) % scenes.length;
        if (next === 0) {
          soundFX.playCinematicBoom();
        } else {
          soundFX.playTrailSparkle();
        }
        return next;
      });
    }, 7000);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying]);

  // Audio cue on scene change
  const goToScene = (index) => {
    setCurrentSceneIndex(index);
    soundFX.playWhoosh();
  };

  const handleNext = () => {
    const next = (currentSceneIndex + 1) % scenes.length;
    goToScene(next);
  };

  const handlePrev = () => {
    const prev = (currentSceneIndex - 1 + scenes.length) % scenes.length;
    goToScene(prev);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden select-none">
        
        {/* Anamorphic 21:9 Letterbox Top Bar */}
        <div className="relative z-30 w-full h-14 sm:h-16 bg-black/95 border-b border-[#d4af37]/30 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Film size={18} className="text-[#ffd700]" />
            <span className="font-ancient text-xs sm:text-sm font-bold tracking-[0.25em] text-[#ffd700] uppercase">
              ASTRA CINEMATIC ODYSSEY • 21:9 WIDESCREEN
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                const muted = soundFX.toggleMute();
                setIsMuted(muted);
              }}
              className="p-2 rounded border border-[#d4af37]/30 text-[#d4af37] hover:text-[#ffd700] hover:border-[#ffd700]"
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            {/* Close Cinema Mode */}
            <button
              onClick={onClose}
              className="p-2 rounded border border-gray-700 text-gray-400 hover:text-white hover:border-white transition-colors"
              title="Exit Cinema Mode"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Central Movie Screen Scene */}
        <div className="relative flex-grow w-full overflow-hidden flex items-center justify-center">
          
          {/* Animated Background Scene with Ken Burns Effect */}
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1.04 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-0"
            >
              <img
                src={scene.image}
                alt={scene.title}
                className="w-full h-full object-cover object-center brightness-90 filter"
              />
              {/* Cinematic Vignettes & Fog */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />
            </motion.div>
          </AnimatePresence>

          {/* Subtitle / Narrative Caption Box (Bottom Center) */}
          <div className="relative z-20 max-w-4xl mx-auto px-6 text-center mt-auto mb-10 sm:mb-14">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                {/* Act & Location */}
                <div className="flex items-center justify-center gap-3">
                  <span className="px-3 py-0.5 rounded-full border border-[#ffd700] bg-black/80 text-[#ffd700] font-ancient text-[10px] font-bold tracking-[0.3em] uppercase shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                    {scene.act}
                  </span>
                  <span className="font-ancient text-xs tracking-[0.25em] text-gray-400 uppercase">
                    {scene.location}
                  </span>
                </div>

                {/* Grand Scene Title */}
                <h2 className="font-ancient text-3xl sm:text-5xl font-black text-white uppercase tracking-wider text-gold-chiseled drop-shadow-2xl">
                  {scene.title}
                </h2>

                {/* Narrative Text */}
                <p className="font-ancient text-sm sm:text-base text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-lg bg-black/50 p-4 rounded-xl border border-[#d4af37]/20 backdrop-blur-sm">
                  {scene.narrative}
                </p>

                {/* Ancient Quote */}
                <div className="italic text-xs text-[#ffd700]/90 font-serif tracking-wider">
                  {scene.quote}
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Left / Right Nav Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-[#d4af37]/40 bg-black/60 text-[#ffd700] hover:bg-[#ffd700] hover:text-black transition-all shadow-xl"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-[#d4af37]/40 bg-black/60 text-[#ffd700] hover:bg-[#ffd700] hover:text-black transition-all shadow-xl"
          >
            <ChevronRight size={24} />
          </button>

        </div>

        {/* Anamorphic 21:9 Letterbox Bottom Controller */}
        <div className="relative z-30 w-full bg-black/95 border-t border-[#d4af37]/30 px-4 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Play/Pause & Scrubber */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-lg border border-[#ffd700]/60 bg-[#ffd700]/10 text-[#ffd700] hover:bg-[#ffd700] hover:text-black transition-all"
              title={isPlaying ? "Pause Movie" : "Play Movie"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            {/* Scene Markers */}
            <div className="flex items-center gap-2">
              {scenes.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => goToScene(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSceneIndex === idx
                      ? 'w-10 bg-[#ffd700] shadow-[0_0_10px_#ffd700]'
                      : 'w-4 bg-gray-700 hover:bg-gray-500'
                  }`}
                  title={s.title}
                />
              ))}
            </div>

            <span className="text-[11px] font-ancient text-gray-400 tracking-widest uppercase">
              SCENE 0{currentSceneIndex + 1} / 0{scenes.length}
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a
              href="#stages"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-700 text-xs font-ancient tracking-widest uppercase text-gray-300 hover:border-[#ffd700] hover:text-[#ffd700]"
            >
              View Mountain Map
            </a>

            <Link
              to="/register"
              onClick={onClose}
              className="btn-gold-epic !py-2 !px-5 !text-xs flex items-center gap-2"
            >
              <span>Join Odyssey</span>
              <ArrowRight size={13} />
            </Link>
          </div>

        </div>

      </div>
    </AnimatePresence>
  );
};

export default CinematicStoryMode;
