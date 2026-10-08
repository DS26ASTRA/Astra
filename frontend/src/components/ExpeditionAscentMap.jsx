import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  MapPin, 
  Trophy, 
  Sparkles, 
  ChevronRight, 
  Shield, 
  Zap, 
  Flame, 
  ArrowUpRight, 
  Layers, 
  Search, 
  Eye, 
  Award,
  Users,
  Code2,
  ExternalLink
} from 'lucide-react';
import { soundFX } from '../utils/audioFX';

// Realistic Expedition Teams Database
const initialTeams = [
  {
    id: 'team-01',
    name: 'Vedic Ciphers',
    track: 'AI & Computational Archaeology',
    stage: 4,
    altitude: '4,850m',
    score: 96,
    members: ['Aarav Patel (Lead)', 'Sanya Sharma (AI)', 'Rohan Iyer (Arch)'],
    artifacts: ['Indus Script Latent Embedder', 'Palm-Leaf OCR Model'],
    avatar: '🔱',
    status: 'FINALIST'
  },
  {
    id: 'team-02',
    name: 'Harappan Hydraulics',
    track: 'Ancient Logistics & Clean Hydraulics',
    stage: 4,
    altitude: '4,820m',
    score: 94,
    members: ['Kavya Nair (Lead)', 'Arjun Mehta (Hardware)', 'Mira Sen (Fluid Eng)'],
    artifacts: ['Stepwell Passive Gravity Siphon', 'Baoli Reservoir IoT'],
    avatar: '🌊',
    status: 'FINALIST'
  },
  {
    id: 'team-03',
    name: 'Atlas Pozzolan',
    track: 'Ancient Civil Engineering & Sustainable Tech',
    stage: 3,
    altitude: '3,650m',
    score: 89,
    members: ['Leo Vance', 'Chloe Dubois', 'Vikram Rao'],
    artifacts: ['Volcanic Ash Concrete Mix Generator', 'Seismic Interlocking Masonry CAD'],
    avatar: '🏛️',
    status: 'ASCENDED'
  },
  {
    id: 'team-04',
    name: 'Silk Route Ledger',
    track: 'Trade Networks & Decentralized Protocols',
    stage: 3,
    altitude: '3,580m',
    score: 87,
    members: ['Tenzin Norbu', 'Fatima Al-Mansoor', 'Devansh Joshi'],
    artifacts: ['Zero-Knowledge Caravan Provenance', 'Decentralized Antiquity Token'],
    avatar: '📜',
    status: 'ASCENDED'
  },
  {
    id: 'team-05',
    name: 'Celestia Maya',
    track: 'Open Innovation & Astronomical Precision',
    stage: 3,
    altitude: '3,520m',
    score: 86,
    members: ['Elena Rostova', 'Diego Hernandez', 'Ananya Gupta'],
    artifacts: ['Equinox Solar Tracking Heuristic', 'Mesoamerican Horizon Astrolabe'],
    avatar: '☀️',
    status: 'ASCENDED'
  },
  {
    id: 'team-06',
    name: 'Anasazi Thermals',
    track: 'Ancient Logistics & Clean Hydraulics',
    stage: 2,
    altitude: '2,200m',
    score: 79,
    members: ['Samira Khan', 'Nikhil Varma', 'Tara Brooks'],
    artifacts: ['Cliff Palace Airflow Simulator'],
    avatar: '🏜️',
    status: 'QUALIFIED'
  },
  {
    id: 'team-07',
    name: 'Babylonian Claybot',
    track: 'AI & Computational Archaeology',
    stage: 2,
    altitude: '2,150m',
    score: 78,
    members: ['Zayd Qasim', 'Pooja Reddy', 'Marcus Aurel'],
    artifacts: ['Cuneiform Tablet 3D Mesh Rebuilder'],
    avatar: '🏺',
    status: 'QUALIFIED'
  },
  {
    id: 'team-08',
    name: 'Spartan Monolith',
    track: 'Trade Networks & Decentralized Protocols',
    stage: 1,
    altitude: '1,100m',
    score: 72,
    members: ['Rishi Singhania', 'Aditi Roy'],
    artifacts: ['Basecamp Protocol v1'],
    avatar: '⚔️',
    status: 'IN TRIAL'
  }
];

const stagesConfig = [
  {
    stageNum: 1,
    name: 'The Valley Basecamp',
    subtitle: 'Camp of 128 Expeditions',
    altitude: '1,100m',
    desc: 'All enrolled teams register, pitch baseline blueprints, and establish camp in the Valley of Whispers.',
    teamsCount: '128 Teams',
    icon: '⛺'
  },
  {
    stageNum: 2,
    name: 'The Sunless Chasm',
    subtitle: 'Round 1: First Ascent',
    altitude: '2,200m',
    desc: 'Crossing the high rope bridges. Judges evaluate problem validity and algorithmic feasibility.',
    teamsCount: '64 Teams Shortlisted',
    icon: '🌉'
  },
  {
    stageNum: 3,
    name: 'The Hanging Citadel',
    subtitle: 'Round 2: 24H Code Sprint',
    altitude: '3,600m',
    desc: 'The crucible of creation. Teams code through the night amidst intense mentor checkpoints and testing.',
    teamsCount: '24 Teams Advancing',
    icon: '🏰'
  },
  {
    stageNum: 4,
    name: 'The High Gates',
    subtitle: 'Round 3: Final Jury Defense',
    altitude: '4,850m',
    desc: 'The final gauntlet before the summit. Top squads demonstrate functioning prototypes to the Arch-Jury.',
    teamsCount: '8 Finalists',
    icon: '⛩️'
  },
  {
    stageNum: 5,
    name: 'The Celestial Sanctum',
    subtitle: 'Summit: Crown of Astra',
    altitude: '6,200m',
    desc: 'The golden temple summit. Champion teams are immortalized, awarded ₹1,50,000+ prizes, and granted incubation.',
    teamsCount: 'Podium Laureates',
    icon: '👑'
  }
];

const ExpeditionAscentMap = () => {
  const [activeStage, setActiveStage] = useState(3);
  const [viewMode, setViewMode] = useState('MAP'); // 'MAP' | 'STAGES' | 'SUMMIT'
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [isAscendingAnimation, setIsAscendingAnimation] = useState(false);
  const [teams, setTeams] = useState(initialTeams);

  // Trigger Stage Climb VFX sequence
  const handleSimulateAscent = () => {
    setIsAscendingAnimation(true);
    soundFX.playCinematicBoom();

    setTimeout(() => {
      soundFX.playLevelUpChime();
      // Level up teams
      setTeams(prev => prev.map(t => {
        if (t.stage < 4) {
          return {
            ...t,
            stage: t.stage + 1,
            score: t.score + Math.floor(Math.random() * 6 + 3),
            status: t.stage + 1 >= 4 ? 'FINALIST' : 'ASCENDED'
          };
        } else if (t.stage === 4) {
          return {
            ...t,
            stage: 5,
            score: t.score + 5,
            status: 'CROWNED'
          };
        }
        return t;
      }));
      setActiveStage(prev => Math.min(prev + 1, 5));
      setIsAscendingAnimation(false);
    }, 1200);
  };

  const handleStageClick = (s) => {
    setActiveStage(s);
    soundFX.playTrailSparkle();
  };

  const filteredTeams = teams.filter(t => 
    (t.name.toLowerCase().includes(searchFilter.toLowerCase()) || 
     t.track.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <section id="stages" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Cinematic Mountain Arena Full-Section Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/adventure-map-mountain.jpg"
          alt="Ancient Mountain Peaks"
          className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-105 saturate-115 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/25" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#ffd700]/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-amber-900/15 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/40 bg-black/60 text-[#ffd700] text-xs font-ancient tracking-[0.25em] uppercase mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Compass size={14} />
            <span>THE EXPEDITION TOURNAMENT ARENA</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-ancient font-black text-white uppercase tracking-wider mb-4 text-gold-chiseled">
            THE MOUNTAIN ASCENT
          </h2>
          
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent mx-auto mb-4" />
          
          <p className="text-gray-300 font-ancient text-sm sm:text-base leading-relaxed">
            Every round is a perilous ascent up the mountain tiers. Teams that survive each jury trial unlock sacred artifacts, level up their altitude, and advance toward the Celestial Sanctum.
          </p>
        </div>

        {/* View Mode Switcher & Ascent Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-3 rounded-xl border border-[#d4af37]/30 bg-black/60 backdrop-blur-md">
          
          {/* Mode Tabs */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => { setViewMode('MAP'); soundFX.playWhoosh(); }}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-ancient text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                viewMode === 'MAP'
                  ? 'border border-[#ffd700] bg-[#ffd700]/15 text-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>🗺️ Interactive Map</span>
            </button>

            <button
              onClick={() => { setViewMode('STAGES'); soundFX.playWhoosh(); }}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-ancient text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                viewMode === 'STAGES'
                  ? 'border border-[#ffd700] bg-[#ffd700]/15 text-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>⛰️ Level Stages</span>
            </button>

            <button
              onClick={() => { setViewMode('SUMMIT'); soundFX.playWhoosh(); }}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-ancient text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                viewMode === 'SUMMIT'
                  ? 'border border-[#ffd700] bg-[#ffd700]/15 text-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>👑 Summit Podium</span>
            </button>
          </div>

          {/* Simulate Ascent Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleSimulateAscent}
              disabled={isAscendingAnimation}
              className="btn-gold-epic !py-2 !px-5 !text-xs w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Zap size={14} className={isAscendingAnimation ? "animate-spin text-white" : "text-[#ffd700]"} />
              <span>{isAscendingAnimation ? "ASCENDING..." : "CLIMB NEXT STAGE"}</span>
            </button>
          </div>

        </div>

        {/* =========================================================
            VIEW MODE 1: INTERACTIVE MOUNTAIN MAP VIEW
            ========================================================= */}
        {viewMode === 'MAP' && (
          <div className="relative rounded-2xl border border-[#d4af37]/40 bg-[#060608] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            
            {/* Mountain Map Image Canvas */}
            <div className="relative w-full aspect-[16/9] min-h-[420px] max-h-[680px] overflow-hidden select-none">
              <img
                src="/images/adventure-map-mountain.jpg"
                alt="Everpeak Mountain Ascent Map"
                className={`w-full h-full object-cover object-center transition-all duration-1000 ${
                  isAscendingAnimation ? 'scale-105 brightness-125 filter' : 'scale-100'
                }`}
              />

              {/* Fog Layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-black/30 pointer-events-none" />

              {/* Glowing SVG Energy Trail overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1000 600" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="goldGlowGrad" x1="0%" y1="100%" x2="50%" y2="0%">
                    <stop offset="0%" stopColor="#ffd700" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#ffd700" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#fff8dc" stopOpacity="1" />
                  </linearGradient>
                  <filter id="glowBlur" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Animated Golden Trail Path */}
                <path
                  d="M 180,520 Q 300,480 370,410 T 500,290 T 570,180 T 560,80"
                  fill="none"
                  stroke="url(#goldGlowGrad)"
                  strokeWidth="3.5"
                  strokeDasharray="8 6"
                  filter="url(#glowBlur)"
                  className="animate-pulse"
                />
              </svg>

              {/* 5 Map Checkpoint Hotspots positioned across the mountain */}
              {[
                { stageNum: 1, top: '82%', left: '18%', label: 'Level 1: Basecamp' },
                { stageNum: 2, top: '65%', left: '38%', label: 'Level 2: Chasm Bridge' },
                { stageNum: 3, top: '48%', left: '50%', label: 'Level 3: Citadel' },
                { stageNum: 4, top: '28%', left: '57%', label: 'Level 4: High Gates' },
                { stageNum: 5, top: '12%', left: '56%', label: 'Summit: Sanctum' }
              ].map((pin) => {
                const isSelected = activeStage === pin.stageNum;
                const stageTeams = teams.filter(t => t.stage === pin.stageNum);

                return (
                  <motion.div
                    key={pin.stageNum}
                    style={{ top: pin.top, left: pin.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                    onClick={() => handleStageClick(pin.stageNum)}
                    whileHover={{ scale: 1.15 }}
                  >
                    {/* Pulsing Aura */}
                    <div className={`absolute -inset-3 rounded-full transition-opacity duration-300 ${
                      isSelected ? 'bg-[#ffd700]/40 animate-ping' : 'bg-black/30 group-hover:bg-[#ffd700]/20'
                    }`} />

                    {/* Checkpoint Node */}
                    <div className={`relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 transition-all shadow-xl ${
                      isSelected 
                        ? 'border-[#ffd700] bg-gradient-to-tr from-[#1a1505] to-[#3a2e0a] text-[#ffd700] shadow-[0_0_25px_#ffd700]' 
                        : 'border-[#d4af37]/60 bg-black/80 text-gray-300 hover:border-[#ffd700] hover:text-[#ffd700]'
                    }`}>
                      <span className="font-ancient text-xs sm:text-sm font-bold">
                        {pin.stageNum === 5 ? '👑' : `0${pin.stageNum}`}
                      </span>

                      {/* Small badge count */}
                      <span className="absolute -top-1 -right-1 bg-[#ffd700] text-black text-[9px] font-bold px-1 rounded-full">
                        {stageTeams.length}
                      </span>
                    </div>

                    {/* Tooltip Label */}
                    <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded border border-[#d4af37]/50 bg-black/90 text-[10px] font-ancient tracking-wider text-gray-200 pointer-events-none shadow-md">
                      {pin.label}
                    </div>
                  </motion.div>
                );
              })}

              {/* Floating Active Stage Badge Overlay */}
              <div className="absolute top-4 left-4 z-20 max-w-xs p-3.5 rounded-xl border border-[#d4af37]/40 bg-black/85 backdrop-blur-md shadow-lg hidden sm:block">
                <div className="text-[10px] font-ancient tracking-[0.2em] text-[#ffd700] uppercase mb-1">
                  CURRENT ELEVATION FOCUS
                </div>
                <div className="font-ancient text-lg font-bold text-white uppercase">
                  {stagesConfig[activeStage - 1].name}
                </div>
                <div className="text-xs text-[#d4af37] font-mono">
                  Elevation: {stagesConfig[activeStage - 1].altitude} • {stagesConfig[activeStage - 1].teamsCount}
                </div>
              </div>

            </div>

            {/* Bottom Strip: Teams at the selected Stage */}
            <div className="p-5 border-t border-[#d4af37]/30 bg-[#08080c]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h4 className="font-ancient text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="text-xl">{stagesConfig[activeStage - 1].icon}</span>
                    <span>TEAMS ASCENDING AT {stagesConfig[activeStage - 1].name} ({stagesConfig[activeStage - 1].altitude})</span>
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {stagesConfig[activeStage - 1].desc}
                  </p>
                </div>

                <span className="text-xs font-ancient tracking-widest text-[#ffd700] uppercase border border-[#d4af37]/40 px-3 py-1 rounded bg-black/40">
                  {teams.filter(t => t.stage === activeStage).length} Squads at this Altitude
                </span>
              </div>

              {/* Squad cards at this level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {teams.filter(t => t.stage === activeStage).map((team) => (
                  <motion.div
                    key={team.id}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedTeam(team)}
                    className="p-4 rounded-xl border border-[#d4af37]/30 bg-black/50 hover:border-[#ffd700] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{team.avatar}</span>
                        <span className="font-ancient text-xs font-bold text-[#ffd700] px-2 py-0.5 rounded border border-[#ffd700]/30 bg-black/60">
                          {team.score} XP
                        </span>
                      </div>
                      <h5 className="font-ancient text-base font-bold text-white uppercase tracking-wide truncate">
                        {team.name}
                      </h5>
                      <p className="text-[11px] text-[#d4af37] truncate mt-0.5">
                        {team.track}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-gray-800 flex items-center justify-between text-[10px] font-ancient text-gray-400 uppercase">
                      <span>Inspect Dossier</span>
                      <ArrowUpRight size={13} className="text-[#ffd700]" />
                    </div>
                  </motion.div>
                ))}

                {teams.filter(t => t.stage === activeStage).length === 0 && (
                  <div className="col-span-full py-8 text-center text-gray-500 font-ancient text-sm">
                    No teams have ascended to this level yet. Advance the stage or select another altitude!
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* =========================================================
            VIEW MODE 2: STAGE-BY-STAGE ASCENT BRACKETS
            ========================================================= */}
        {viewMode === 'STAGES' && (
          <div className="space-y-6">
            {stagesConfig.slice().reverse().map((st) => {
              const stageTeams = teams.filter(t => t.stage === st.stageNum);
              const isCurrent = activeStage === st.stageNum;

              return (
                <motion.div
                  key={st.stageNum}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl border p-6 transition-all duration-300 ${
                    st.stageNum === 5 
                      ? 'border-[#ffd700] bg-gradient-to-r from-[#181408] via-[#0d0c07] to-[#181408] shadow-[0_0_35px_rgba(255,215,0,0.25)]'
                      : isCurrent
                      ? 'border-[#d4af37]/70 bg-[#0a0a0f] shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                      : 'border-[#d4af37]/25 bg-[#060608]/80'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--color-card-border)]">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl border border-[#ffd700]/50 bg-black/60 flex items-center justify-center text-3xl shadow-inner">
                        {st.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-ancient text-xs font-bold text-[#ffd700] tracking-widest uppercase">
                            LEVEL 0{st.stageNum} • {st.altitude}
                          </span>
                        </div>
                        <h3 className="font-ancient text-2xl font-bold text-white uppercase tracking-wider">
                          {st.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 max-w-2xl">
                          {st.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-ancient text-xs font-bold px-3 py-1.5 rounded-full border border-[#d4af37]/40 bg-black/60 text-[#ffd700] tracking-wider uppercase">
                        {stageTeams.length} Squads Active
                      </span>
                    </div>
                  </div>

                  {/* Squads in this Level */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stageTeams.map((team) => (
                      <div
                        key={team.id}
                        onClick={() => setSelectedTeam(team)}
                        className="p-4 rounded-xl border border-gray-800 bg-black/50 hover:border-[#ffd700] transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{team.avatar}</span>
                          <span className="font-ancient text-xs text-[#ffd700] font-bold">
                            {team.score} XP
                          </span>
                        </div>
                        <h4 className="font-ancient text-base font-bold text-white uppercase group-hover:text-[#ffd700] transition-colors">
                          {team.name}
                        </h4>
                        <div className="text-[11px] text-[#d4af37] truncate mt-0.5">
                          {team.track}
                        </div>
                        <div className="mt-3 pt-2 border-t border-gray-800/80 flex items-center justify-between text-[10px] text-gray-400">
                          <span>{team.altitude}</span>
                          <span className="text-green-400 font-bold uppercase">{team.status}</span>
                        </div>
                      </div>
                    ))}

                    {stageTeams.length === 0 && (
                      <div className="col-span-full py-6 text-center text-gray-500 font-ancient text-xs">
                        Stage locked. Teams must qualify from the previous trial to reach this altitude.
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* =========================================================
            VIEW MODE 3: SUMMIT SANCTUARY / PODIUM
            ========================================================= */}
        {viewMode === 'SUMMIT' && (
          <div className="relative rounded-2xl border border-[#ffd700]/70 bg-[#08080a] overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.2)]">
            
            {/* Throne Room Backdrop Image */}
            <div className="relative w-full aspect-[16/9] min-h-[380px] max-h-[550px] overflow-hidden">
              <img
                src="/images/summit-throne.jpg"
                alt="Summit Sanctuary of Astra"
                className="w-full h-full object-cover object-center brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/40 to-transparent" />

              {/* Top Banner */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#ffd700] bg-black/80 text-[#ffd700] font-ancient text-xs tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                  <Award size={14} />
                  <span>THE SANCTUARY OF CHAMPIONS</span>
                </div>
                <h3 className="font-ancient text-2xl sm:text-4xl font-black text-white uppercase tracking-wider mt-2 text-gold-chiseled">
                  THE THRONE OF ASTRA
                </h3>
              </div>

              {/* 3 Champion Podium Cards */}
              <div className="absolute bottom-6 left-0 right-0 px-4 sm:px-12 flex flex-col sm:flex-row items-end justify-center gap-4 z-20">
                
                {/* 2nd Place */}
                <div 
                  onClick={() => setSelectedTeam(teams[1])}
                  className="w-full sm:w-1/3 rounded-xl border border-gray-400/50 bg-black/85 backdrop-blur-md p-5 text-center cursor-pointer hover:border-gray-300 transition-all shadow-xl"
                >
                  <div className="text-3xl mb-1">🥈</div>
                  <div className="font-ancient text-xs tracking-widest text-gray-400 uppercase font-bold">SILVER LAUREATE</div>
                  <div className="font-ancient text-xl font-bold text-white uppercase mt-1">{teams[1]?.name}</div>
                  <div className="text-xs text-[#ffd700] font-mono mt-0.5">{teams[1]?.score} XP • {teams[1]?.track}</div>
                </div>

                {/* 1st Place (Center / Taller) */}
                <div 
                  onClick={() => setSelectedTeam(teams[0])}
                  className="w-full sm:w-1/3 rounded-xl border-2 border-[#ffd700] bg-gradient-to-b from-[#201a08]/90 to-black/95 backdrop-blur-md p-6 text-center cursor-pointer hover:shadow-[0_0_35px_rgba(255,215,0,0.5)] transition-all shadow-2xl -translate-y-3"
                >
                  <div className="text-4xl mb-1">👑</div>
                  <div className="font-ancient text-xs tracking-[0.25em] text-[#ffd700] uppercase font-bold">GRAND CHAMPION OF ASTRA</div>
                  <div className="font-ancient text-2xl font-black text-white uppercase mt-1 text-gold-gradient">{teams[0]?.name}</div>
                  <div className="text-xs text-[#ffd700] font-mono mt-1">{teams[0]?.score} XP • {teams[0]?.track}</div>
                  <div className="mt-3 px-3 py-1 rounded bg-[#ffd700]/20 text-[#ffd700] font-ancient text-[11px] font-bold uppercase tracking-wider inline-block">
                    ₹1,00,000 Grand Prize
                  </div>
                </div>

                {/* 3rd Place */}
                <div 
                  onClick={() => setSelectedTeam(teams[2])}
                  className="w-full sm:w-1/3 rounded-xl border border-amber-600/50 bg-black/85 backdrop-blur-md p-5 text-center cursor-pointer hover:border-amber-500 transition-all shadow-xl"
                >
                  <div className="text-3xl mb-1">🥉</div>
                  <div className="font-ancient text-xs tracking-widest text-amber-500 uppercase font-bold">BRONZE LAUREATE</div>
                  <div className="font-ancient text-xl font-bold text-white uppercase mt-1">{teams[2]?.name}</div>
                  <div className="text-xs text-[#ffd700] font-mono mt-0.5">{teams[2]?.score} XP • {teams[2]?.track}</div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* =========================================================
          TEAM DOSSIER MODAL
          ========================================================= */}
      <AnimatePresence>
        {selectedTeam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTeam(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="relative w-full max-w-xl rounded-2xl border border-[#ffd700]/70 bg-[#0c0c10] p-6 sm:p-8 shadow-[0_0_40px_rgba(212,175,55,0.3)] z-10"
            >
              <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <span className="text-4xl p-2 rounded-xl bg-black border border-[#d4af37]/40">{selectedTeam.avatar}</span>
                  <div>
                    <span className="font-ancient text-xs text-[#ffd700] font-bold tracking-widest uppercase">
                      LEVEL 0{selectedTeam.stage} • {selectedTeam.altitude}
                    </span>
                    <h3 className="font-ancient text-2xl font-bold text-white uppercase">
                      {selectedTeam.name}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-ancient text-2xl font-black text-gold-gradient">
                    {selectedTeam.score} XP
                  </div>
                  <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">
                    {selectedTeam.status}
                  </span>
                </div>
              </div>

              {/* Track */}
              <div className="mb-4">
                <span className="text-xs font-ancient tracking-widest text-gray-400 uppercase block mb-1">
                  Designated Track:
                </span>
                <span className="text-sm font-ancient text-[#ffd700] font-semibold">
                  {selectedTeam.track}
                </span>
              </div>

              {/* Members */}
              <div className="mb-5">
                <span className="text-xs font-ancient tracking-widest text-gray-400 uppercase block mb-2">
                  Squad Adventurers:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedTeam.members.map((m, i) => (
                    <span key={i} className="px-3 py-1 rounded-full border border-gray-700 bg-black/50 text-xs text-gray-200">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Artifacts Unlocked */}
              <div className="mb-6 p-4 rounded-xl border border-[#d4af37]/30 bg-black/60">
                <div className="flex items-center gap-2 text-xs font-ancient text-[#ffd700] font-bold tracking-widest uppercase mb-2">
                  <Sparkles size={14} />
                  <span>Sacred Artifacts & Tech Forged:</span>
                </div>
                <ul className="space-y-1 text-xs text-gray-300">
                  {selectedTeam.artifacts.map((a, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#ffd700]">✦</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="px-5 py-2.5 rounded border border-gray-700 font-ancient text-xs tracking-widest text-gray-300 hover:border-gray-500 uppercase"
                >
                  Close
                </button>
                <a
                  href="#challenge"
                  onClick={() => setSelectedTeam(null)}
                  className="btn-gold-epic !py-2.5 !px-5 !text-xs"
                >
                  <span>Review Codebase</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ExpeditionAscentMap;
