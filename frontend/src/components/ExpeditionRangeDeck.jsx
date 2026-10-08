import React, { useState } from 'react';
import { 
  Compass, 
  Scroll, 
  Layers, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Castle, 
  X, 
  ArrowRight, 
  CheckCircle, 
  Flame, 
  ExternalLink 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ancientSoundscape } from '../utils/ancientSoundscape';

const milestonesData = [
  {
    id: '01',
    key: 'forest',
    title: 'FOREST ENTRANCE',
    subtitle: 'The Gateway to Astra',
    image: '/milestones/01_forest.jpg',
    icon: Compass,
    tagline: 'The sacred starting trail into the wilderness of innovation.',
    details: {
      overview: 'Every grand journey begins at the threshold. ASTRA invites ambitious engineers and designers to step beyond conventional boundaries into a 36-hour crucible of deep technology, ancient heuristics, and resilient engineering.',
      stats: [
        { label: 'HACKATHON DURATION', value: '36 Hours Offline' },
        { label: 'NATIONAL PARTICIPANTS', value: '500+ Builders' },
        { label: 'TOTAL PRIZE POOL', value: '₹10,00,000+' }
      ],
      highlights: [
        'National-level technical crucible bridging ancient architectural principles with modern AI',
        '24/7 high-speed fiber infrastructure, hardware labs, and cloud compute credits',
        'Direct access to national industry mentors and venture capital scouts'
      ],
      ctaText: 'START REGISTRATION',
      ctaLink: '/login'
    }
  },
  {
    id: '02',
    key: 'about',
    title: 'ABOUT ASTRA',
    subtitle: 'The Inscribed Stone Monolith',
    image: '/milestones/02_about.jpg',
    icon: Scroll,
    tagline: 'Millennia of ancient heuristics translated into modern technology.',
    details: {
      overview: 'ASTRA is a premier national-level agathon inspired by the enduring resilience of ancient Indian architecture and timeless algorithmic heuristics. Bright minds unite to solve real-world problems and forge scalable technological solutions for tomorrow.',
      stats: [
        { label: 'ORGANIZED BY', value: 'ASTRA Council' },
        { label: 'ELIGIBILITY', value: 'UG / PG Students' },
        { label: 'SELECTION RATIO', value: 'Top 15% Squads' }
      ],
      highlights: [
        'Interdisciplinary problem statements addressing critical civilizational challenges',
        'Emphasis on system resilience, fault tolerance, and elegant computational architecture',
        'Comprehensive evaluation by industry leaders and academic pioneers'
      ],
      ctaText: 'EXPLORE DOSSIER',
      ctaLink: '/about'
    }
  },
  {
    id: '03',
    key: 'themes',
    title: 'THEMES',
    subtitle: 'The Sacred Banners Along the Trail',
    image: '/milestones/03_themes.jpg',
    icon: Layers,
    tagline: '5 multi-domain challenge tracks across frontier technology.',
    details: {
      overview: 'Expedition squads may choose from 5 rigorous challenge domains, each anchored in real-world industrial and ecological imperatives.',
      tracks: [
        { name: 'AI & Ancient Heuristics', desc: 'Autonomous agentic systems, neuro-symbolic reasoning, and resilient self-healing algorithms.' },
        { name: 'Climate & Nature Resilience', desc: 'Sustainable energy dispatch, clean water automation, and ecological telemetry.' },
        { name: 'Cryptography & Cyber Systems', desc: 'Zero-knowledge proofs, resilient consensus, and high-assurance security infrastructure.' },
        { name: 'Bio-Engineering & Health', desc: 'Predictive clinical diagnostic tools, edge sensor telemetry, and bio-informatics.' },
        { name: 'Smart Infrastructure & Cities', desc: 'Adaptive urban logistics, smart grid monitoring, and disaster mitigation systems.' }
      ],
      ctaText: 'VIEW PROBLEM STATEMENTS',
      ctaLink: '/themes'
    }
  },
  {
    id: '04',
    key: 'rules',
    title: 'RULES',
    subtitle: '"The Code" Carved in the Cavern',
    image: '/milestones/04_rules.jpg',
    icon: ShieldCheck,
    tagline: 'The unbreakable ethical and technical guidelines of the agathon.',
    details: {
      overview: 'Integrity and originality form the bedrock of ASTRA. All participants must abide by the ancient code governing team formation, code originality, and intellectual property.',
      rulesList: [
        'Team Composition: Each squad must consist of 2 to 4 registered undergraduate or postgraduate students.',
        'Code Originality: All project source code must be written during the 36-hour hackathon period.',
        'Open Source & APIs: Pre-existing open-source libraries and public APIs are permitted with full disclosure.',
        'Code of Conduct: Absolute zero tolerance for plagiarism, harassment, or unauthorized access.',
        'Intellectual Property: Squads retain 100% ownership of all intellectual property created during ASTRA.'
      ],
      ctaText: 'READ FULL CODE',
      ctaLink: '/rules'
    }
  },
  {
    id: '05',
    key: 'schedule',
    title: 'SCHEDULE',
    subtitle: 'Wayposts on the Mountain Path',
    image: '/milestones/05_schedule.jpg',
    icon: Calendar,
    tagline: 'From registration deadline to the 36-hour final sprint.',
    details: {
      overview: 'The complete expedition timeline mapping out critical milestones from initial registration to the grand championship pitch.',
      phases: [
        { time: 'T-Minus 14 Days', title: 'Registration Closes & Synopsis Submission', desc: 'Portal cutoff for all team dossiers and problem selections.' },
        { time: 'T-Minus 7 Days', title: 'Expedition Passes Issued', desc: 'Announcement of the top shortlisted teams qualified for offline hack.' },
        { time: 'Day 1 • 09:00 AM', title: 'Sacred Shankha Fanfare & Hacking Begins', desc: 'The 36-hour continuous build clock starts.' },
        { time: 'Day 1 • 08:00 PM', title: 'Round 1 Mentorship Checkpoint', desc: 'Architecture review and technical viability inspection.' },
        { time: 'Day 2 • 09:00 PM', title: 'Code Freeze & Final Repository Submission', desc: 'Hard lock on all GitHub repos and deployment links.' },
        { time: 'Day 3 • 11:00 AM', title: 'Mainstage Pitches & Award Ceremony', desc: 'Top finalists pitch before grand jury at the Final Citadel.' }
      ],
      ctaText: 'EXPEDITION TIMELINE',
      ctaLink: '/schedule'
    }
  },
  {
    id: '06',
    key: 'journey',
    title: 'COMPETITION JOURNEY',
    subtitle: 'The Carved Boulder Roadmap',
    image: '/milestones/06_journey.jpg',
    icon: MapPin,
    tagline: '5 progressive stages from Ideation to Citadel Victory.',
    details: {
      overview: 'The five sequential rounds of the ASTRA competition represented physically as waypoints across the ancient terrain.',
      stages: [
        { step: 'ROUND 1', name: 'The Awakening', desc: 'Problem definition, architectural blueprint, and technical viability freeze.' },
        { step: 'ROUND 2', name: 'The Hidden Caves', desc: 'MVP prototype construction, core algorithm execution, and database setup.' },
        { step: 'ROUND 3', name: 'The Mountain Trail', desc: 'Stress testing, user experience polish, and deployment verification.' },
        { step: 'SEMIFINAL', name: 'Lost Civilization', desc: 'Live technical demonstration and Q&A before expert evaluator panels.' },
        { step: 'FINAL', name: 'The Ancient Citadel', desc: 'Grand keynote pitch on the mainstage before venture investors and industry luminaries.' }
      ],
      ctaText: 'VIEW ROADMAP',
      ctaLink: '/journey'
    }
  },
  {
    id: '07',
    key: 'teams',
    title: 'TEAMS',
    subtitle: 'The Expedition Base Camp at Dusk',
    image: '/milestones/07_teams.jpg',
    icon: Users,
    tagline: 'Squad directory, matchmaking, and mentor base camp.',
    details: {
      overview: 'Assemble your fellowship of innovators. Discover compatible teammates across engineering, design, and product strategy, or manage your registered expedition squad.',
      features: [
        'Teammate Matchmaking: Search for builders by skill (AI/ML, Fullstack, Systems, UI/UX)',
        'Squad Portal: Manage squad profile, member invites, and mentor requests',
        'Mentor Office Hours: Book 1-on-1 consultations with domain experts during the trek'
      ],
      ctaText: 'EXPLORE SQUAD HUB',
      ctaLink: '/teams'
    }
  },
  {
    id: '08',
    key: 'leaderboard',
    title: 'LEADERBOARD',
    subtitle: 'The Black Granite Obelisk',
    image: '/milestones/08_leaderboard.jpg',
    icon: Trophy,
    tagline: 'Real-time expedition standings, milestone XP, and scores.',
    details: {
      overview: 'The ancient black granite obelisk records the deeds of all participating squads in real time, scoring milestones, code quality, and peer reviews.',
      stats: [
        { label: 'EVALUATION FACTORS', value: '4 Pillars' },
        { label: 'LIVE STANDINGS', value: 'Updated Hourly' },
        { label: 'TOP QUALIFIERS', value: 'Top 10 Finalists' }
      ],
      highlights: [
        'Milestone XP awarded for checkpoint completion and technical execution',
        'Dynamic ranking algorithms balancing innovation, technical complexity, and real impact',
        'Public scoreboard visible to scouting recruiters and venture sponsors'
      ],
      ctaText: 'LIVE STANDINGS',
      ctaLink: '/leaderboard'
    }
  },
  {
    id: '09',
    key: 'citadel',
    title: 'FINAL CITADEL',
    subtitle: 'Grand Championship & Victory Awards',
    image: '/milestones/09_citadel.jpg',
    icon: Castle,
    tagline: '₹10,00,000+ prize pool, trophies, and incubation grants.',
    details: {
      overview: 'Perched high on the ancient cliffs above cascading waterfalls, the Final Citadel is the destination where champions are crowned and transformative projects receive funding.',
      awards: [
        { place: 'CHAMPION', prize: '₹4,00,000', perk: 'Astra Gold Crest + Fast-Track Incubation + VC Scout Pitch' },
        { place: 'RUNNER-UP', prize: '₹2,50,000', perk: 'Astra Silver Shield + Cloud Credits + Direct Interviews' },
        { place: 'THIRD PLACE', prize: '₹1,50,000', perk: 'Astra Bronze Crest + Hardware Kit + Mentorship Grant' },
        { place: '5 TRACK WINNERS', prize: '₹50,000 Each', perk: 'Category Excellence Trophy & Venture Spotlight' }
      ],
      ctaText: 'CLAIM YOUR PLACE',
      ctaLink: '/login'
    }
  }
];

const ExpeditionRangeDeck = ({ activeIndex = 0, onSelectMilestone }) => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const handleCardClick = (m, idx) => {
    ancientSoundscape.playStoneClick();
    setSelectedMilestone(m);
    if (onSelectMilestone) onSelectMilestone(idx);
  };

  const handleCloseModal = () => {
    ancientSoundscape.playStoneClick();
    setSelectedMilestone(null);
  };

  return (
    <>
      {/* =========================================================
          THE RANGE UI: 9-MILESTONE EXPEDITION STRIP (Matching Storyboard)
          ========================================================= */}
      <section 
        aria-label="Expedition Range Selector"
        className="relative z-30 w-full bg-gradient-to-t from-black via-black/95 to-transparent pt-6 pb-8 border-t border-[#d4af37]/20 select-none"
      >
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6">
          
          {/* Subtle header label */}
          <div className="flex items-center justify-between mb-3.5 px-1">
            <div className="flex items-center gap-2">
              <span className="text-[#ffd700] text-xs">▲</span>
              <span className="font-ancient text-[11px] sm:text-xs tracking-[0.25em] text-[#d4af37] uppercase font-bold">
                EXPEDITION RANGE • 9 STATIONS
              </span>
            </div>
            <span className="text-gray-400 font-ancient text-[10px] tracking-[0.2em] uppercase hidden sm:inline">
              SELECT ANY STATION TO EXPLORE DETAILS
            </span>
          </div>

          {/* Row 1: Milestones 01 to 05 (5 columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 mb-2.5">
            {milestonesData.slice(0, 5).map((m, idx) => {
              const isActive = activeIndex === idx;

              return (
                <button
                  key={m.id}
                  onClick={() => handleCardClick(m, idx)}
                  className={`relative group overflow-hidden rounded-md border text-left transition-all duration-300 cursor-pointer h-24 sm:h-28 flex flex-col justify-between p-2.5 ${
                    isActive
                      ? 'border-[#ffd700] shadow-[0_0_18px_rgba(255,215,0,0.35)] scale-[1.01]'
                      : 'border-white/10 hover:border-[#d4af37]/60 hover:shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                  }`}
                >
                  {/* Background thumbnail */}
                  <img
                    src={m.image}
                    alt={m.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />

                  {/* Card Content */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-ancient text-xs sm:text-sm font-bold text-[#ffd700] tracking-wider drop-shadow-md">
                      {m.id}
                    </span>
                    <m.icon size={12} className="text-gray-300 group-hover:text-[#ffd700] transition-colors" />
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-ancient text-[10px] sm:text-[11px] font-bold tracking-[0.16em] text-white uppercase group-hover:text-[#ffd700] transition-colors line-clamp-1 drop-shadow-md">
                      {m.title}
                    </h3>
                  </div>

                  {/* Active bottom gold bar */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffd700]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Row 2: Milestones 06 to 09 (4 columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
            {milestonesData.slice(5, 9).map((m, idx) => {
              const actualIdx = idx + 5;
              const isActive = activeIndex === actualIdx;

              return (
                <button
                  key={m.id}
                  onClick={() => handleCardClick(m, actualIdx)}
                  className={`relative group overflow-hidden rounded-md border text-left transition-all duration-300 cursor-pointer h-24 sm:h-28 flex flex-col justify-between p-2.5 ${
                    isActive
                      ? 'border-[#ffd700] shadow-[0_0_18px_rgba(255,215,0,0.35)] scale-[1.01]'
                      : 'border-white/10 hover:border-[#d4af37]/60 hover:shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                  }`}
                >
                  {/* Background thumbnail */}
                  <img
                    src={m.image}
                    alt={m.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />

                  {/* Card Content */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-ancient text-xs sm:text-sm font-bold text-[#ffd700] tracking-wider drop-shadow-md">
                      {m.id}
                    </span>
                    <m.icon size={12} className="text-gray-300 group-hover:text-[#ffd700] transition-colors" />
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-ancient text-[10px] sm:text-[11px] font-bold tracking-[0.16em] text-white uppercase group-hover:text-[#ffd700] transition-colors line-clamp-1 drop-shadow-md">
                      {m.title}
                    </h3>
                  </div>

                  {/* Active bottom gold bar */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffd700]" />
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================
          INTERACTIVE MILESTONE DETAIL MODAL / DOSSIER
          ========================================================= */}
      {selectedMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0d120e] border border-[#d4af37]/50 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col">
            
            {/* Modal Header with Banner */}
            <div className="relative h-44 sm:h-52 w-full overflow-hidden">
              <img 
                src={selectedMilestone.image} 
                alt={selectedMilestone.title} 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d120e] via-[#0d120e]/60 to-transparent" />
              
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-gray-300 hover:text-white border border-white/10 hover:border-[#d4af37] transition-all cursor-pointer z-10"
              >
                <X size={18} />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-ancient text-xs font-bold text-[#ffd700] tracking-[0.25em]">
                    STATION {selectedMilestone.id}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="font-ancient text-[11px] text-gray-300 tracking-wider">
                    {selectedMilestone.subtitle}
                  </span>
                </div>
                <h2 className="font-ancient text-2xl sm:text-3xl font-bold text-white tracking-[0.14em]">
                  {selectedMilestone.title}
                </h2>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-gray-200">
              
              <p className="text-sm sm:text-base leading-relaxed text-gray-300 font-serif">
                {selectedMilestone.details.overview}
              </p>

              {/* Stats Grid if present */}
              {selectedMilestone.details.stats && (
                <div className="grid grid-cols-3 gap-3 p-3.5 rounded-lg bg-black/40 border border-white/5">
                  {selectedMilestone.details.stats.map((s, idx) => (
                    <div key={idx} className="text-center">
                      <span className="text-[9px] font-ancient text-gray-400 tracking-wider block mb-0.5 uppercase">
                        {s.label}
                      </span>
                      <span className="font-ancient text-xs sm:text-sm font-bold text-[#ffd700]">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Themes Tracks if present */}
              {selectedMilestone.details.tracks && (
                <div className="space-y-2.5">
                  <h4 className="font-ancient text-xs font-bold text-[#ffd700] tracking-[0.2em] uppercase">
                    OFFICIAL CHALLENGE DOMAINS:
                  </h4>
                  {selectedMilestone.details.tracks.map((t, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-black/30 border border-white/5">
                      <h5 className="font-ancient text-xs font-bold text-white mb-0.5">{t.name}</h5>
                      <p className="text-xs text-gray-400">{t.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Rules List if present */}
              {selectedMilestone.details.rulesList && (
                <div className="space-y-2">
                  <h4 className="font-ancient text-xs font-bold text-[#ffd700] tracking-[0.2em] uppercase">
                    THE FIVE STATUTES OF THE CODE:
                  </h4>
                  {selectedMilestone.details.rulesList.map((r, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <CheckCircle size={14} className="text-[#ffd700] shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Schedule Phases if present */}
              {selectedMilestone.details.phases && (
                <div className="space-y-2.5">
                  <h4 className="font-ancient text-xs font-bold text-[#ffd700] tracking-[0.2em] uppercase">
                    KEY MILESTONES:
                  </h4>
                  {selectedMilestone.details.phases.map((p, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2.5 rounded bg-black/30 border border-white/5">
                      <span className="font-ancient text-[10px] font-bold text-[#ffd700] shrink-0 w-28 uppercase">
                        {p.time}
                      </span>
                      <div>
                        <h5 className="font-ancient text-xs font-semibold text-white">{p.title}</h5>
                        <p className="text-[11px] text-gray-400">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Journey Steps if present */}
              {selectedMilestone.details.stages && (
                <div className="space-y-2.5">
                  <h4 className="font-ancient text-xs font-bold text-[#ffd700] tracking-[0.2em] uppercase">
                    THE 5 ROADMAP STAGES:
                  </h4>
                  {selectedMilestone.details.stages.map((st, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2.5 rounded bg-black/30 border border-white/5">
                      <span className="font-ancient text-[10px] font-bold text-[#ffd700] shrink-0 w-20">
                        {st.step}
                      </span>
                      <div>
                        <h5 className="font-ancient text-xs font-semibold text-white">{st.name}</h5>
                        <p className="text-[11px] text-gray-400">{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Awards Breakdown if present */}
              {selectedMilestone.details.awards && (
                <div className="space-y-2">
                  <h4 className="font-ancient text-xs font-bold text-[#ffd700] tracking-[0.2em] uppercase">
                    CHAMPIONSHIP PURSE:
                  </h4>
                  {selectedMilestone.details.awards.map((a, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded bg-black/40 border border-[#d4af37]/20">
                      <div>
                        <span className="font-ancient text-xs font-bold text-white block">{a.place}</span>
                        <span className="text-[11px] text-gray-400">{a.perk}</span>
                      </div>
                      <span className="font-ancient text-sm font-bold text-[#ffd700] shrink-0 ml-3">
                        {a.prize}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* General Highlights */}
              {selectedMilestone.details.highlights && (
                <div className="space-y-2">
                  <h4 className="font-ancient text-xs font-bold text-[#ffd700] tracking-[0.2em] uppercase">
                    EXPEDITION HIGHLIGHTS:
                  </h4>
                  {selectedMilestone.details.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <CheckCircle size={14} className="text-[#ffd700] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 bg-black/70 border-t border-white/10 flex items-center justify-between">
              <span className="font-ancient text-[10px] text-gray-400 tracking-wider uppercase">
                STATION {selectedMilestone.id} OF 09
              </span>
              <Link
                to={selectedMilestone.details.ctaLink}
                onClick={handleCloseModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d4af37] text-black font-ancient text-xs font-bold tracking-[0.16em] uppercase hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                <span>{selectedMilestone.details.ctaText}</span>
                <ArrowRight size={13} />
              </Link>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ExpeditionRangeDeck;
