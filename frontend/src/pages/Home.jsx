import React, { useState, useRef, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, Award, Shield, Calendar, Users, Trophy, ExternalLink, Sparkles } from 'lucide-react';

import Ancient3DWorld from '../components/Ancient3DWorld';
import TrekkingMilestones from '../components/TrekkingMilestones';
import { ancientSoundscape } from '../utils/ancientSoundscape';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [scrollProgressVal, setScrollProgressVal] = useState(0);
  const [currentZoneTitle, setCurrentZoneTitle] = useState('Ancient Forest Trail');
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (val) => {
      setScrollProgressVal(val);
    });
    return () => unsub();
  }, [scrollYProgress]);

  // Handle URL query parameter ?trek=0.xx
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const trekParam = searchParams.get('trek');
    if (trekParam) {
      const targetProgress = parseFloat(trekParam);
      if (!isNaN(targetProgress)) {
        setTimeout(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          window.scrollTo({ top: targetProgress * maxScroll, behavior: 'smooth' });
        }, 300);
      }
    }
  }, [location.search]);

  const handleZoneChange = (zoneId, title) => {
    setCurrentZoneTitle(title);
    ancientSoundscape.setZone(zoneId);
  };

  const handleTrekTo = (targetProgress) => {
    ancientSoundscape.playStoneClick();
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = targetProgress * maxScroll;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  // Continuous Expedition Stations
  const verticalSliceStations = [
    { id: 'entrance', label: '01 ANCIENT FOREST', progress: 0.00, elevation: '280M' },
    { id: 'about', label: '02 SACRED MONUMENT', progress: 0.28, elevation: '350M' },
    { id: 'forest', label: '03 DEEP FOREST', progress: 0.56, elevation: '410M' },
    { id: 'ruins', label: '04 ANCIENT RUINS', progress: 0.82, elevation: '490M' },
    { id: 'vista', label: '05 CITADEL RIDGE', progress: 1.00, elevation: '560M' },
  ];

  const currentStationIdx = 
    scrollProgressVal < 0.20 ? 0 :
    scrollProgressVal < 0.44 ? 1 :
    scrollProgressVal < 0.70 ? 2 :
    scrollProgressVal < 0.88 ? 3 : 4;

  return (
    <div ref={containerRef} className="relative bg-[#040805] text-gray-200 select-none overflow-x-hidden min-h-screen">
      
      {/* =========================================================
          1. FULLSCREEN TRUE 3D WEBGL ENGINE WITH GLB ASSETS
          ========================================================= */}
      <Ancient3DWorld 
        scrollProgress={scrollProgressVal}
        onZoneChange={handleZoneChange}
        onOpenAboutModal={() => {
          ancientSoundscape.playTempleBell();
          setIsAboutModalOpen(true);
        }}
      />

      {/* =========================================================
          2. MINIMAL OPENING HERO TYPOGRAPHY OVERLAY (FADES OUT ON SCROLL)
          ========================================================= */}
      <TrekkingMilestones 
        scrollProgress={scrollProgressVal}
        onTrekTo={handleTrekTo}
      />

      {/* =========================================================
          3. EXPEDITION TELEMETRY HUD FOOTER (TACTICAL, SLEEK, MINIMAL)
          ========================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-auto bg-gradient-to-t from-black/95 via-black/60 to-transparent pt-6 pb-4 px-6 sm:px-12 backdrop-blur-[3px] border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Expedition Sector, Bearing & Elevation Telemetry */}
          <div className="flex items-center gap-4">
            {/* Pulsing Waypoint Beacon */}
            <div className="relative flex items-center justify-center w-7 h-7 rounded-full border border-[#d4af37]/40 bg-black/60">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-[#ffd700]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-ancient text-[9px] tracking-[0.25em] text-[#d4af37] uppercase">
                  EXPEDITION TRAIL
                </span>
                <span className="text-white/20">•</span>
                <span className="font-ancient text-[9px] tracking-[0.2em] text-gray-400">
                  {Math.round(scrollProgressVal * 100)}% TRAVERSED
                </span>
              </div>
              <div className="font-ancient text-xs sm:text-sm font-bold text-white tracking-[0.18em] uppercase">
                {currentZoneTitle}
              </div>
            </div>

            <div className="h-6 w-px bg-white/10 mx-1 hidden sm:block" />

            {/* Compass & Elevation */}
            <div className="hidden sm:flex items-center gap-4">
              <div>
                <div className="font-ancient text-[8px] tracking-[0.2em] text-gray-400 uppercase">
                  BEARING
                </div>
                <div className="font-ancient text-[11px] text-gray-200 font-semibold tracking-wider">
                  {`0${Math.round(38 + scrollProgressVal * 14)}° NE`}
                </div>
              </div>
              <div>
                <div className="font-ancient text-[8px] tracking-[0.2em] text-gray-400 uppercase">
                  ALTITUDE
                </div>
                <div className="font-ancient text-[11px] text-[#d4af37] font-semibold tracking-wider">
                  {verticalSliceStations[currentStationIdx]?.elevation || '350M'}
                </div>
              </div>
            </div>
          </div>

          {/* Center: Expedition Waypoint Markers */}
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
            {verticalSliceStations.map((stn, idx) => {
              const isActive = idx === currentStationIdx;
              return (
                <button
                  key={stn.id}
                  onClick={() => handleTrekTo(stn.progress)}
                  className={`px-3 py-1.5 rounded-md font-ancient text-[10px] tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'border border-[#d4af37] bg-gradient-to-r from-[#d4af37]/25 to-[#d4af37]/10 text-[#ffd700] shadow-[0_0_14px_rgba(212,175,55,0.25)] font-bold'
                      : 'border border-white/10 bg-black/50 text-gray-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#ffd700]' : 'bg-gray-600'}`} />
                  <span>{stn.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Expedition Portal */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-1.5 rounded border border-[#d4af37]/70 bg-gradient-to-r from-[#d4af37]/20 to-transparent hover:from-[#d4af37]/40 text-[#ffd700] font-ancient text-[10px] tracking-[0.2em] uppercase transition-all cursor-pointer shadow-[0_0_12px_rgba(212,175,55,0.15)]"
            >
              PORTAL →
            </button>
          </div>

        </div>
      </div>

      {/* =========================================================
          4. IN-WORLD PHYSICAL DOSSIER MODAL (ABOUT STONE INSCRIPTION)
          ========================================================= */}
      {isAboutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0e1610] border border-[#d4af37]/60 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.2)] overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#d4af37]/20 bg-black/40">
              <div className="flex items-center gap-2.5">
                <span className="font-ancient text-sm text-[#ffd700]">▲</span>
                <div>
                  <h3 className="font-ancient text-sm font-bold tracking-[0.2em] text-white uppercase">
                    THE SACRED INSCRIPTION STONE
                  </h3>
                  <span className="font-ancient text-[10px] tracking-[0.15em] text-[#d4af37] uppercase">
                    CHRONICLES OF ASTRA MMXXVI
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsAboutModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Lore Quote */}
              <div className="p-4 rounded-lg bg-black/50 border border-[#d4af37]/30 text-center">
                <p className="font-ancient text-sm text-[#ffd700] tracking-widest italic mb-1">
                  “Where ancient discipline unlocks tomorrow’s boundless frontiers.”
                </p>
                <span className="font-ancient text-[10px] text-gray-400 tracking-[0.2em] uppercase">
                  Engraved upon the Granite Stele • Sage Vaidya Province
                </span>
              </div>

              {/* Hackathon Overview */}
              <div>
                <h4 className="font-ancient text-xs font-bold text-[#d4af37] tracking-[0.2em] uppercase mb-2">
                  THE EXPEDITION
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed font-light">
                  ASTRA is a premier national-level hackathon designed as a 36-hour physical and intellectual expedition. Teams from across the nation converge to engineer groundbreaking solutions across frontier domains, navigating through structured milestones to conquer the Final Citadel.
                </p>
              </div>

              {/* Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Trophy size={16} className="text-[#ffd700]" />
                    <span className="font-ancient text-xs font-bold text-white tracking-wider">₹1,00,000+ BOUNTY</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Grand prizes awarded at the Citadel summit for Champion, Runner-up, and Track Pioneers.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Calendar size={16} className="text-[#ffd700]" />
                    <span className="font-ancient text-xs font-bold text-white tracking-wider">36 HOURS ENDURANCE</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Continuous coding, live checkpoints, mentor reviews, and midnight prototyping.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles size={16} className="text-[#ffd700]" />
                    <span className="font-ancient text-xs font-bold text-white tracking-wider">6 FRONTIER TRACKS</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Autonomous AI Agents, Bio-Intelligence, Distributed Systems, Space Tech, and Open Innovation.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Users size={16} className="text-[#ffd700]" />
                    <span className="font-ancient text-xs font-bold text-white tracking-wider">TEAM DYNAMICS</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Squads of 2 to 4 adventurers with access to real-time qualification stages and live standings.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    setIsAboutModalOpen(false);
                    navigate('/login');
                  }}
                  className="w-full sm:w-auto flex-1 py-3 px-6 rounded-lg bg-[#d4af37] text-black font-ancient font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#ffe58f] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] text-center cursor-pointer"
                >
                  Join Expedition Portal
                </button>
                <button
                  onClick={() => {
                    setIsAboutModalOpen(false);
                    handleTrekTo(0.85); // Journey forward to the Ancient Ruins
                  }}
                  className="w-full sm:w-auto py-3 px-6 rounded-lg border border-[#d4af37]/50 text-[#ffd700] font-ancient text-xs tracking-[0.2em] uppercase hover:bg-white/5 transition-all text-center cursor-pointer"
                >
                  Travel To Ancient Ruins →
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* =========================================================
          5. CONTINUOUS SCROLL EXPEDITION TRAIL (400vh)
          ========================================================= */}
      <div className="relative w-full h-[400vh] pointer-events-none" />

    </div>
  );
};

export default Home;
