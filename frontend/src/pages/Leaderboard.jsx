import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpeditionAscentMap from '../components/ExpeditionAscentMap';
import { 
  Trophy, 
  Award, 
  Search, 
  Sparkles, 
  Shield, 
  Crown, 
  Medal, 
  ChevronRight, 
  Compass, 
  ExternalLink,
  Users,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { ancientSoundscape } from '../utils/ancientSoundscape';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedStageFilter, setSelectedStageFilter] = useState('ALL');
  const [inspectedTeam, setInspectedTeam] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/event/leaderboard`);
        if (res.data.success && res.data.data.length > 0) {
          setLeaderboard(res.data.data);
        } else {
          throw new Error('Fallback to seeded data');
        }
      } catch (error) {
        // High fidelity expedition squads
        setLeaderboard([
          { _id: '1', teamName: 'Vedic Ciphers', track: 'AI & Computational Archaeology', score: 98, stage: 5, round: 'Stage 5: Celestial Citadel', altitude: '6,200m', status: 'CROWNED', avatar: '🔱', members: ['Aarav Patel', 'Sanya Sharma', 'Rohan Iyer'] },
          { _id: '2', teamName: 'Harappan Hydraulics', track: 'Clean Hydraulics & Logistics', score: 95, stage: 4, round: 'Stage 4: High Gates', altitude: '4,850m', status: 'FINALIST', avatar: '🌊', members: ['Kavya Nair', 'Arjun Mehta', 'Mira Sen'] },
          { _id: '3', teamName: 'Demo Warriors', track: 'Both Wings (Avinyotsav + Hackathon)', score: 94, stage: 4, round: 'Stage 4: High Gates', altitude: '4,850m', status: 'FINALIST', avatar: '🛡️', members: ['John Doe', 'Jane Smith'] },
          { _id: '4', teamName: 'Atlas Pozzolan', track: 'Sustainable Civil Engineering', score: 89, stage: 3, round: 'Stage 3: Sun Citadel', altitude: '3,650m', status: 'ASCENDED', avatar: '🏛️', members: ['Leo Vance', 'Chloe Dubois'] },
          { _id: '5', teamName: 'Silk Route Ledger', track: 'Decentralized Trust Networks', score: 87, stage: 3, round: 'Stage 3: Sun Citadel', altitude: '3,580m', status: 'ASCENDED', avatar: '📜', members: ['Tariq Al-Mansoor', 'Li Wei'] },
          { _id: '6', teamName: 'Celestia Maya', track: 'Astronomical Generative AI', score: 85, stage: 3, round: 'Stage 3: Sun Citadel', altitude: '3,520m', status: 'ASCENDED', avatar: '☀️', members: ['Elena Rostova', 'Mateo Cruz'] },
          { _id: '7', teamName: 'Anasazi Thermals', track: 'Passive Cooling Architectures', score: 79, stage: 2, round: 'Stage 2: Mist Chasm', altitude: '2,200m', status: 'QUALIFIED', avatar: '🦅', members: ['Devon Cole', 'Nadia Youssef'] },
          { _id: '8', teamName: 'Babylonian Claybot', track: 'Multimodal Script OCR', score: 78, stage: 2, round: 'Stage 2: Mist Chasm', altitude: '2,150m', status: 'QUALIFIED', avatar: '🏺', members: ['Samira Khan', 'Kenji Sato'] },
          { _id: '9', teamName: 'Spartan Monolith', track: 'Interlocking Structural Masonry', score: 72, stage: 1, round: 'Stage 1: Basecamp Jungle', altitude: '1,100m', status: 'IN TRIAL', avatar: '⚔️', members: ['Nikos Alexiou', 'Dimitri Petrakis'] }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const filteredTeams = leaderboard.filter(t => {
    const matchesSearch = t.teamName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      (t.track && t.track.toLowerCase().includes(filterQuery.toLowerCase()));
    
    if (selectedStageFilter === 'ALL') return matchesSearch;
    if (selectedStageFilter === 'STAGE 5') return matchesSearch && t.stage === 5;
    if (selectedStageFilter === 'STAGE 4') return matchesSearch && t.stage === 4;
    if (selectedStageFilter === 'STAGE 3') return matchesSearch && t.stage === 3;
    if (selectedStageFilter === 'STAGE 2') return matchesSearch && t.stage === 2;
    if (selectedStageFilter === 'STAGE 1') return matchesSearch && t.stage === 1;
    return matchesSearch;
  });

  const top3 = leaderboard.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#030305] text-gray-200 pt-20 pb-28 select-none">
      
      {/* 1. Interactive Mountain Ascent Tournament Arena */}
      <ExpeditionAscentMap />

      {/* 2. Granite Obelisk of Champions: Top 3 Podium */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/40 bg-black/60 text-[#ffd700] text-xs font-ancient tracking-[0.25em] uppercase mb-3">
            <Crown size={14} />
            <span>SUMMIT HERALDRY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-ancient font-black text-white uppercase tracking-wider text-gold-chiseled">
            THE SUMMIT PODIUM
          </h2>
        </div>

        {/* Podium Dais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto">
          
          {/* #2 Silver (Left) */}
          {top3[1] && (
            <div 
              onClick={() => { ancientSoundscape.playStoneClick(); setInspectedTeam(top3[1]); }}
              className="p-6 rounded-2xl border border-gray-400/40 bg-gradient-to-b from-[#14181c]/90 to-black/90 backdrop-blur-xl text-center shadow-2xl cursor-pointer hover:border-white transition-all transform hover:-translate-y-2 order-2 md:order-1"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-gray-300 bg-gray-300/10 flex items-center justify-center text-gray-200 text-lg font-bold font-ancient shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                2
              </div>
              <div className="text-2xl mb-1">{top3[1].avatar || '🌊'}</div>
              <h3 className="font-ancient text-lg font-bold text-white uppercase truncate mb-1">
                {top3[1].teamName}
              </h3>
              <div className="text-xs text-[#d4af37] font-ancient font-bold mb-2">
                {top3[1].score} PTS • {top3[1].altitude}
              </div>
              <span className="px-2.5 py-0.5 rounded-full border border-blue-400/50 bg-blue-400/10 text-blue-300 text-[10px] font-ancient font-bold uppercase">
                {top3[1].status}
              </span>
            </div>
          )}

          {/* #1 Gold (Center, Elevated) */}
          {top3[0] && (
            <div 
              onClick={() => { ancientSoundscape.playTempleBell(); setInspectedTeam(top3[0]); }}
              className="p-8 rounded-3xl border-2 border-[#ffd700] bg-gradient-to-b from-[#1c1608]/95 to-black/95 backdrop-blur-xl text-center shadow-[0_0_50px_rgba(255,215,0,0.3)] cursor-pointer hover:scale-105 transition-all transform md:-translate-y-4 order-1 md:order-2"
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-[#ffd700] bg-[#ffd700]/20 flex items-center justify-center text-[#ffd700] text-2xl font-black font-ancient shadow-[0_0_25px_#ffd700]">
                👑
              </div>
              <div className="text-3xl mb-1">{top3[0].avatar || '🔱'}</div>
              <h3 className="font-ancient text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-1 text-gold-chiseled truncate">
                {top3[0].teamName}
              </h3>
              <div className="text-sm text-[#ffd700] font-ancient font-black mb-3">
                {top3[0].score} PTS • {top3[0].altitude}
              </div>
              <span className="px-3 py-1 rounded-full border border-[#ffd700] bg-[#ffd700]/20 text-[#ffd700] text-xs font-ancient font-black tracking-widest uppercase animate-pulse">
                {top3[0].status}
              </span>
            </div>
          )}

          {/* #3 Bronze (Right) */}
          {top3[2] && (
            <div 
              onClick={() => { ancientSoundscape.playStoneClick(); setInspectedTeam(top3[2]); }}
              className="p-6 rounded-2xl border border-amber-600/40 bg-gradient-to-b from-[#1c140a]/90 to-black/90 backdrop-blur-xl text-center shadow-2xl cursor-pointer hover:border-amber-500 transition-all transform hover:-translate-y-2 order-3"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-amber-600 bg-amber-600/10 flex items-center justify-center text-amber-500 text-lg font-bold font-ancient shadow-[0_0_15px_rgba(217,119,6,0.3)]">
                3
              </div>
              <div className="text-2xl mb-1">{top3[2].avatar || '🛡️'}</div>
              <h3 className="font-ancient text-lg font-bold text-white uppercase truncate mb-1">
                {top3[2].teamName}
              </h3>
              <div className="text-xs text-[#d4af37] font-ancient font-bold mb-2">
                {top3[2].score} PTS • {top3[2].altitude}
              </div>
              <span className="px-2.5 py-0.5 rounded-full border border-amber-500/50 bg-amber-500/10 text-amber-400 text-[10px] font-ancient font-bold uppercase">
                {top3[2].status}
              </span>
            </div>
          )}

        </div>
      </div>

      {/* 3. The Grand Granite Obelisk Table & Stage Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl border border-[#d4af37]/35 bg-[#08080c]/90 backdrop-blur-xl shadow-2xl">
          
          {/* Controls Bar: Search + Stage Filter Pills */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#d4af37]/30">
            <div>
              <h3 className="font-ancient text-2xl font-black text-white uppercase tracking-wider text-gold-gradient">
                THE GRANITE STELE OF RANKINGS
              </h3>
              <p className="text-xs text-gray-400 font-ancient tracking-widest uppercase mt-0.5">
                Authentic Stage Progression Registry
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Search Input */}
              <div className="relative min-w-[220px]">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter team or track..."
                  value={filterQuery}
                  onChange={e => setFilterQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#d4af37]/40 bg-black/60 text-xs text-white placeholder-gray-500 outline-none focus:border-[#ffd700]"
                />
              </div>

              {/* Stage Filter Buttons */}
              {['ALL', 'STAGE 5', 'STAGE 4', 'STAGE 3', 'STAGE 2', 'STAGE 1'].map(st => (
                <button
                  key={st}
                  onClick={() => { setSelectedStageFilter(st); ancientSoundscape.playStoneClick(); }}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-ancient font-bold tracking-wider uppercase transition-all ${
                    selectedStageFilter === st
                      ? 'border border-[#ffd700] bg-[#ffd700]/20 text-[#ffd700]'
                      : 'border border-gray-800 bg-black/40 text-gray-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Stele Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#d4af37]/25 text-[11px] font-ancient tracking-[0.2em] text-[#d4af37] uppercase">
                  <th className="py-4 px-4">RANK</th>
                  <th className="py-4 px-4">EXPEDITION SQUAD</th>
                  <th className="py-4 px-4">TRACK / DOMAIN</th>
                  <th className="py-4 px-4">ALTITUDE REACHED</th>
                  <th className="py-4 px-4 text-center">TRIAL SCORE</th>
                  <th className="py-4 px-4 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d4af37]/15 text-xs sm:text-sm font-ancient">
                {filteredTeams.map((team, idx) => (
                  <tr 
                    key={team._id || idx}
                    onClick={() => { ancientSoundscape.playStoneClick(); setInspectedTeam(team); }}
                    className="hover:bg-[#ffd700]/5 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-4 font-mono font-bold">
                      <div className="flex items-center gap-2">
                        {idx === 0 && <span className="text-[#ffd700]">🥇</span>}
                        {idx === 1 && <span className="text-gray-300">🥈</span>}
                        {idx === 2 && <span className="text-amber-500">🥉</span>}
                        <span className={idx < 3 ? 'text-white font-black' : 'text-gray-400'}>
                          #{idx + 1}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{team.avatar || '⚔️'}</span>
                        <div>
                          <div className="font-bold text-white group-hover:text-[#ffd700] transition-colors">
                            {team.teamName}
                          </div>
                          <div className="text-[10px] text-gray-400 font-mono">
                            {team.members?.join(' • ') || 'Expedition Cohort'}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-gray-300 text-xs">
                      {team.track || team.participationType}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#ffd700] font-bold text-xs">
                          {team.altitude || '3,600m'}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          ({team.round || 'Stage 3'})
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className="font-mono font-black text-white text-base">
                        {team.score || 85}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">/100</span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-ancient font-bold tracking-wider uppercase border ${
                        team.status === 'CROWNED' ? 'border-[#ffd700] bg-[#ffd700]/20 text-[#ffd700]' :
                        team.status === 'FINALIST' ? 'border-purple-400/60 bg-purple-400/10 text-purple-300' :
                        team.status === 'ASCENDED' ? 'border-blue-400/60 bg-blue-400/10 text-blue-300' :
                        'border-green-500/60 bg-green-500/10 text-green-400'
                      }`}>
                        {team.status || 'QUALIFIED'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* Team Inspection Drawer Modal */}
      {inspectedTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-md w-full rounded-2xl border border-[#ffd700] bg-gradient-to-b from-[#141008] to-[#09090c] p-6 shadow-2xl">
            <button 
              onClick={() => setInspectedTeam(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{inspectedTeam.avatar || '⚔️'}</div>
              <h3 className="font-ancient text-2xl font-black text-white uppercase text-gold-chiseled">
                {inspectedTeam.teamName}
              </h3>
              <p className="text-xs text-[#ffd700] font-ancient tracking-widest mt-1">
                {inspectedTeam.altitude} • {inspectedTeam.round}
              </p>
            </div>

            <div className="space-y-3 text-xs font-ancient mb-6 bg-black/50 p-4 rounded-xl border border-[#d4af37]/30">
              <div className="flex justify-between">
                <span className="text-gray-400">Domain:</span>
                <span className="text-white font-bold">{inspectedTeam.track}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Jury Trial Score:</span>
                <span className="text-[#ffd700] font-black">{inspectedTeam.score} / 100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tournament Status:</span>
                <span className="text-green-400 font-bold">{inspectedTeam.status}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">Squad Members:</span>
                <div className="text-white font-mono text-[11px]">
                  {inspectedTeam.members?.join(', ') || 'Expedition Members'}
                </div>
              </div>
            </div>

            <button
              onClick={() => setInspectedTeam(null)}
              className="btn-gold-epic w-full !py-2.5 !text-xs"
            >
              <span>RETURN TO LEADERBOARD</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Leaderboard;
