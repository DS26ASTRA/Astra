import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Compass, Mountain, Feather } from 'lucide-react';

const CinematicAtmosphere = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  // Altitude elevation calculation: 1,100m -> 6,200m
  const altitude = useTransform(smoothProgress, [0, 1], [1100, 6200]);
  const [displayAltitude, setDisplayAltitude] = useState(1100);
  const [currentStageName, setCurrentStageName] = useState('BASECAMP JUNGLE');

  useEffect(() => {
    const unsubscribe = altitude.on('change', (latest) => {
      const val = Math.round(latest);
      setDisplayAltitude(val);
      if (val < 2000) setCurrentStageName('BASECAMP JUNGLE');
      else if (val < 3200) setCurrentStageName('MIST CHASM');
      else if (val < 4500) setCurrentStageName('SUN CITADEL');
      else if (val < 5700) setCurrentStageName('HIGH GATES');
      else setCurrentStageName('GOLDEN SUMMIT');
    });
    return () => unsubscribe();
  }, [altitude]);

  // Scroll parallax for tree foliage layers
  const treeLeftY = useTransform(scrollY, [0, 8000], [0, -180]);
  const treeRightY = useTransform(scrollY, [0, 8000], [0, -220]);
  const vineSwayY = useTransform(scrollY, [0, 8000], [0, 80]);
  const eagleScrollX = useTransform(scrollYProgress, [0, 1], [-100, window.innerWidth || 1400]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none">
      
      {/* =========================================================
          1. PERSISTENT SOARING EAGLES & MOUNTAIN BIRDS (ALL ELEVATIONS)
          ========================================================= */}
      
      {/* Eagle 1: High-Altitude Grand Eagle gliding from upper left */}
      <div className="bird-flight-1 absolute top-[12vh] -left-20 pointer-events-none">
        <svg className="w-14 h-14 text-[#1a1710] drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)] filter" viewBox="0 0 64 64" fill="currentColor">
          <path className="animate-bird-wings" d="M32 28 C22 18, 8 16, 2 20 C10 24, 20 25, 29 32 C20 37, 8 40, 4 45 C12 42, 24 38, 32 34 C40 38, 52 42, 60 45 C56 40, 44 37, 35 32 C44 25, 54 24, 62 20 C56 16, 42 18, 32 28 Z" />
        </svg>
      </div>

      {/* Eagle 2: Mid-Elevation Mountain Raptor circling chasm */}
      <div className="bird-flight-2 absolute top-[45vh] -left-24 pointer-events-none">
        <svg className="w-10 h-10 text-[#221c14] drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)] filter" viewBox="0 0 64 64" fill="currentColor">
          <path className="animate-bird-wings-fast" d="M32 28 C22 18, 8 16, 2 20 C10 24, 20 25, 29 32 C20 37, 8 40, 4 45 C12 42, 24 38, 32 34 C40 38, 52 42, 60 45 C56 40, 44 37, 35 32 C44 25, 54 24, 62 20 C56 16, 42 18, 32 28 Z" />
        </svg>
      </div>

      {/* Eagle 3: Lower-Canopy Eagle banking dynamically */}
      <div className="bird-flight-4 absolute top-[72vh] -left-20 pointer-events-none">
        <svg className="w-9 h-9 text-[#1c160e] drop-shadow-[0_3px_8px_rgba(0,0,0,0.75)] filter" viewBox="0 0 64 64" fill="currentColor">
          <path className="animate-bird-wings" d="M32 28 C22 18, 8 16, 2 20 C10 24, 20 25, 29 32 C20 37, 8 40, 4 45 C12 42, 24 38, 32 34 C40 38, 52 42, 60 45 C56 40, 44 37, 35 32 C44 25, 54 24, 62 20 C56 16, 42 18, 32 28 Z" />
        </svg>
      </div>

      {/* Flock of 5 Mountain Swallows sweeping across sky */}
      <div className="bird-flight-3 absolute top-[30vh] -left-36 pointer-events-none">
        <div className="relative">
          <svg className="w-5 h-5 text-black/80 absolute -top-4 left-0" viewBox="0 0 64 64" fill="currentColor">
            <path className="animate-bird-wings-fast" d="M32 28 C20 18, 6 18, 2 22 C10 24, 22 26, 32 34 C42 26, 54 24, 62 22 C58 18, 44 18, 32 28 Z" />
          </svg>
          <svg className="w-4 h-4 text-black/75 absolute top-3 left-9" viewBox="0 0 64 64" fill="currentColor">
            <path className="animate-bird-wings-fast" d="M32 28 C20 18, 6 18, 2 22 C10 24, 22 26, 32 34 C42 26, 54 24, 62 22 C58 18, 44 18, 32 28 Z" />
          </svg>
          <svg className="w-4 h-4 text-black/70 absolute -top-2 left-18" viewBox="0 0 64 64" fill="currentColor">
            <path className="animate-bird-wings" d="M32 28 C20 18, 6 18, 2 22 C10 24, 22 26, 32 34 C42 26, 54 24, 62 22 C58 18, 44 18, 32 28 Z" />
          </svg>
          <svg className="w-3.5 h-3.5 text-black/60 absolute top-6 left-26" viewBox="0 0 64 64" fill="currentColor">
            <path className="animate-bird-wings" d="M32 28 C20 18, 6 18, 2 22 C10 24, 22 26, 32 34 C42 26, 54 24, 62 22 C58 18, 44 18, 32 28 Z" />
          </svg>
          <svg className="w-3.5 h-3.5 text-black/60 absolute -top-5 left-32" viewBox="0 0 64 64" fill="currentColor">
            <path className="animate-bird-wings-fast" d="M32 28 C20 18, 6 18, 2 22 C10 24, 22 26, 32 34 C42 26, 54 24, 62 22 C58 18, 44 18, 32 28 Z" />
          </svg>
        </div>
      </div>

      {/* =========================================================
          2. CONTINUOUS JUNGLE TREES & CANOPY FRAMING (FULL SCREEN HEIGHT)
          ========================================================= */}

      {/* --- LEFT FLANK: TOP CANOPY OVERHANG --- */}
      <motion.div 
        style={{ y: treeLeftY }}
        className="absolute top-0 -left-4 sm:left-0 w-56 sm:w-80 md:w-96 pointer-events-none opacity-45"
      >
        <svg viewBox="0 0 400 650" fill="none" className="w-full h-auto text-[#080d08] filter drop-shadow-[6px_8px_20px_rgba(0,0,0,0.95)]">
          {/* Main Overhanging Branch */}
          <path d="M-40,0 Q120,40 260,110 Q180,140 80,130 Q-20,100 -40,120 Z" fill="#040604" />
          <path d="M80,110 Q160,170 230,250 Q160,230 70,180 Z" fill="#060906" />
          
          {/* Detailed Palm Fronds & Fern Leaf Silhouettes */}
          <g fill="#070c07">
            <path d="M260,110 Q320,80 370,120 Q310,130 260,110 Z" />
            <path d="M260,110 Q340,120 380,170 Q310,160 260,110 Z" />
            <path d="M260,110 Q330,160 360,220 Q290,190 260,110 Z" />
            <path d="M260,110 Q310,190 320,260 Q270,210 260,110 Z" />
            <path d="M260,110 Q280,220 270,300 Q240,230 260,110 Z" />
          </g>

          <g fill="#050805">
            <path d="M230,250 Q290,220 340,260 Q280,270 230,250 Z" />
            <path d="M230,250 Q300,270 330,320 Q270,310 230,250 Z" />
            <path d="M230,250 Q280,310 300,370 Q250,330 230,250 Z" />
            <path d="M230,250 Q250,340 250,410 Q220,350 230,250 Z" />
          </g>

          {/* Hanging Creeping Liana Vines */}
          <path d="M140,120 Q160,240 150,340 Q135,440 155,540" stroke="#050805" strokeWidth="2.5" fill="none" />
          <path d="M200,130 Q185,250 205,370 Q220,470 195,570" stroke="#060906" strokeWidth="2" fill="none" />
          <path d="M90,120 Q70,220 85,320 Q95,420 80,500" stroke="#050805" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      {/* --- LEFT FLANK: MID-SCROLL JUNGLE BANYAN TREE & VINES --- */}
      <motion.div 
        style={{ y: vineSwayY }}
        className="absolute top-[38vh] -left-8 sm:left-0 w-48 sm:w-72 pointer-events-none opacity-40"
      >
        <svg viewBox="0 0 350 700" fill="none" className="w-full h-auto text-[#070b07] filter drop-shadow-[6px_8px_20px_rgba(0,0,0,0.9)]">
          {/* Ancient Curved Tree Trunk Emerging from Left Border */}
          <path d="M-20,50 Q80,120 70,280 Q60,420 120,550 Q-20,600 -40,300 Z" fill="#040604" />
          
          {/* Outstretching Banyan Branches */}
          <path d="M70,200 Q150,180 230,210 Q160,240 70,220 Z" fill="#060906" />
          <path d="M80,330 Q180,310 260,350 Q170,380 75,350 Z" fill="#050805" />
          <path d="M90,460 Q170,440 240,490 Q160,510 85,480 Z" fill="#060a06" />

          {/* Lush Green Leaf Clusters */}
          <g fill="#070c07">
            <ellipse cx="230" cy="205" rx="45" ry="25" />
            <ellipse cx="260" cy="345" rx="55" ry="30" />
            <ellipse cx="240" cy="485" rx="48" ry="26" />
            <ellipse cx="180" cy="260" rx="35" ry="20" />
          </g>

          {/* Hanging Aerial Roots */}
          <path d="M120,210 Q130,340 125,480 Q120,600 135,680" stroke="#050805" strokeWidth="2" fill="none" />
          <path d="M190,215 Q180,320 195,440" stroke="#060906" strokeWidth="1.5" fill="none" />
          <path d="M210,350 Q200,450 205,580" stroke="#050805" strokeWidth="1.8" fill="none" />
        </svg>
      </motion.div>

      {/* --- LEFT FLANK: LOWER-SCROLL MOSSY FERNS & UNDERGROWTH --- */}
      <div className="absolute bottom-0 -left-6 sm:left-0 w-52 sm:w-80 pointer-events-none opacity-45">
        <svg viewBox="0 0 380 400" fill="none" className="w-full h-auto text-[#070b07] filter drop-shadow-[4px_6px_16px_rgba(0,0,0,0.95)]">
          <g fill="#050805">
            {/* Fern fronds shooting upward */}
            <path d="M0,400 Q80,280 160,200 Q100,260 0,400 Z" />
            <path d="M0,400 Q110,250 220,160 Q130,240 0,400 Z" />
            <path d="M0,400 Q130,220 270,140 Q150,220 0,400 Z" />
            <path d="M0,400 Q150,270 310,210 Q160,290 0,400 Z" />
            <path d="M0,400 Q170,330 330,310 Q160,350 0,400 Z" />
          </g>
          {/* Individual Leaf leaflets */}
          <g fill="#070c07">
            <ellipse cx="140" cy="210" rx="20" ry="10" transform="rotate(-30 140 210)" />
            <ellipse cx="190" cy="180" rx="22" ry="11" transform="rotate(-35 190 180)" />
            <ellipse cx="240" cy="155" rx="24" ry="12" transform="rotate(-40 240 155)" />
            <ellipse cx="270" cy="225" rx="22" ry="11" transform="rotate(-25 270 225)" />
          </g>
        </svg>
      </div>

      {/* --- RIGHT FLANK: TOP CANOPY OVERHANG --- */}
      <motion.div 
        style={{ y: treeRightY }}
        className="absolute top-0 -right-4 sm:right-0 w-56 sm:w-80 md:w-96 pointer-events-none opacity-45"
      >
        <svg viewBox="0 0 400 650" fill="none" className="w-full h-auto text-[#080d08] filter drop-shadow-[-6px_8px_20px_rgba(0,0,0,0.95)]">
          {/* Main Branch */}
          <path d="M440,0 Q280,40 140,110 Q220,140 320,130 Q420,100 440,120 Z" fill="#040604" />
          <path d="M320,110 Q240,170 170,250 Q240,230 330,180 Z" fill="#060906" />

          {/* Fronds */}
          <g fill="#070c07">
            <path d="M140,110 Q80,80 30,120 Q90,130 140,110 Z" />
            <path d="M140,110 Q60,120 20,170 Q90,160 140,110 Z" />
            <path d="M140,110 Q70,160 40,220 Q110,190 140,110 Z" />
            <path d="M140,110 Q90,190 80,260 Q130,210 140,110 Z" />
            <path d="M140,110 Q120,220 130,300 Q160,230 140,110 Z" />
          </g>

          <g fill="#050805">
            <path d="M170,250 Q110,220 60,260 Q120,270 170,250 Z" />
            <path d="M170,250 Q100,270 70,320 Q130,310 170,250 Z" />
            <path d="M170,250 Q120,310 100,370 Q150,330 170,250 Z" />
          </g>

          {/* Hanging Vines */}
          <path d="M260,120 Q240,240 250,340 Q265,440 245,540" stroke="#050805" strokeWidth="2.5" fill="none" />
          <path d="M200,130 Q215,250 195,370 Q180,470 205,570" stroke="#060a06" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      {/* --- RIGHT FLANK: MID-SCROLL ANCIENT MOUNTAIN PINE & MOSS --- */}
      <motion.div 
        style={{ y: vineSwayY }}
        className="absolute top-[42vh] -right-8 sm:right-0 w-48 sm:w-72 pointer-events-none opacity-40"
      >
        <svg viewBox="0 0 350 700" fill="none" className="w-full h-auto text-[#070b07] filter drop-shadow-[-6px_8px_20px_rgba(0,0,0,0.9)]">
          {/* Main Pine Trunk */}
          <path d="M370,50 Q270,120 280,280 Q290,420 230,550 Q370,600 390,300 Z" fill="#040604" />
          
          {/* Pine Shelves */}
          <path d="M280,200 Q200,180 120,210 Q190,240 280,220 Z" fill="#060906" />
          <path d="M270,330 Q170,310 90,350 Q180,380 275,350 Z" fill="#050805" />
          <path d="M260,460 Q180,440 110,490 Q190,510 265,480 Z" fill="#060a06" />

          {/* Needles & foliage clumps */}
          <g fill="#070c07">
            <ellipse cx="120" cy="205" rx="45" ry="25" />
            <ellipse cx="90" cy="345" rx="55" ry="30" />
            <ellipse cx="110" cy="485" rx="48" ry="26" />
            <ellipse cx="170" cy="260" rx="35" ry="20" />
          </g>

          {/* Hanging Creeper Vines */}
          <path d="M230,210 Q220,340 225,480 Q230,600 215,680" stroke="#050805" strokeWidth="2" fill="none" />
          <path d="M160,215 Q170,320 155,440" stroke="#060906" strokeWidth="1.5" fill="none" />
          <path d="M140,350 Q150,450 145,580" stroke="#050805" strokeWidth="1.8" fill="none" />
        </svg>
      </motion.div>

      {/* --- RIGHT FLANK: LOWER-SCROLL TROPICAL PALM CANOPY --- */}
      <div className="absolute bottom-0 -right-6 sm:right-0 w-52 sm:w-80 pointer-events-none opacity-45">
        <svg viewBox="0 0 380 400" fill="none" className="w-full h-auto text-[#070b07] filter drop-shadow-[-4px_6px_16px_rgba(0,0,0,0.95)]">
          <g fill="#050805">
            <path d="M380,400 Q300,280 220,200 Q280,260 380,400 Z" />
            <path d="M380,400 Q270,250 160,160 Q250,240 380,400 Z" />
            <path d="M380,400 Q250,220 110,140 Q230,220 380,400 Z" />
            <path d="M380,400 Q230,270 70,210 Q220,290 380,400 Z" />
          </g>
          <g fill="#070c07">
            <ellipse cx="240" cy="210" rx="20" ry="10" transform="rotate(30 240 210)" />
            <ellipse cx="190" cy="180" rx="22" ry="11" transform="rotate(35 190 180)" />
            <ellipse cx="140" cy="155" rx="24" ry="12" transform="rotate(40 140 155)" />
            <ellipse cx="110" cy="225" rx="22" ry="11" transform="rotate(25 110 225)" />
          </g>
        </svg>
      </div>

      {/* =========================================================
          3. DRIFTING ROLLING MIST & FOG BANKS (MULTI-DEPTH)
          ========================================================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[12vh] -left-[100px] w-[130vw] h-48 bg-gradient-to-r from-transparent via-white/[0.035] to-transparent blur-3xl animate-mist-slow" />
        <div className="absolute top-[38vh] -left-[150px] w-[140vw] h-56 bg-gradient-to-r from-transparent via-[#ffd700]/[0.025] to-transparent blur-3xl animate-mist-reverse" />
        <div className="absolute top-[65vh] -left-[120px] w-[135vw] h-52 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent blur-3xl animate-mist-slow" />
        <div className="absolute top-[88vh] -left-[140px] w-[140vw] h-44 bg-gradient-to-r from-transparent via-[#ffd700]/[0.02] to-transparent blur-3xl animate-mist-reverse" />
      </div>

      {/* =========================================================
          4. CINEMATIC MOUNTAIN EXPEDITION ALTIMETER HUD (LEFT FLANK)
          ========================================================= */}
      <div className="hidden lg:flex fixed left-5 top-1/2 -translate-y-1/2 z-30 pointer-events-auto flex-col items-center">
        <div className="p-3 rounded-2xl border border-[#ffd700]/40 bg-[#08080a]/85 backdrop-blur-md shadow-[0_0_25px_rgba(212,175,55,0.2)] flex flex-col items-center gap-3">
          
          {/* Compass Icon with Rotating Needle */}
          <div className="relative w-8 h-8 rounded-full border border-[#ffd700]/60 flex items-center justify-center text-[#ffd700]">
            <Compass size={18} className="animate-spin-slow" />
          </div>

          {/* Elevation Bar */}
          <div className="w-1.5 h-36 bg-black/60 rounded-full border border-[#d4af37]/30 relative overflow-hidden">
            <motion.div 
              style={{ height: useTransform(smoothProgress, [0, 1], ['10%', '100%']) }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#d4af37] to-[#ffd700] rounded-full shadow-[0_0_10px_#ffd700]"
            />
          </div>

          {/* Altitude Number & Current Tier */}
          <div className="flex flex-col items-center text-center">
            <span className="font-ancient text-[11px] font-extrabold text-[#ffd700] tracking-wider font-mono">
              {displayAltitude}m
            </span>
            <span className="font-ancient text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 max-w-[65px] leading-tight">
              {currentStageName}
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default CinematicAtmosphere;
