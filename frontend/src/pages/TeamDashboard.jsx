import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TeamAvatar3D from '../components/TeamAvatar3D';
import QualificationCelebrationModal from '../components/QualificationCelebrationModal';
import { 
  Shield, 
  Sparkles, 
  Compass, 
  MapPin, 
  Users, 
  Award, 
  FileCode, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Send,
  Flame,
  Key,
  BookOpen,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { ancientSoundscape } from '../utils/ancientSoundscape';

const stagesInfo = [
  { num: 1, name: 'Stage 1: Sacred Forest Basecamp', altitude: '1,100m Basecamp', round: 'ROUND 1: ENTRANCE TRIAL' },
  { num: 2, name: 'Stage 2: Subterranean Rune Cavern', altitude: '2,200m Mist Caverns', round: 'ROUND 2: HEURISTIC DECODE' },
  { num: 3, name: 'Stage 3: Mountain Suspension Pass', altitude: '3,600m High Pass', round: 'ROUND 3: PROTOTYPE ASCENT' },
  { num: 4, name: 'Stage 4: Ancient Temple & High Gates', altitude: '4,850m Temple Gates', round: 'ROUND 4: CITADEL SIEGE' },
  { num: 5, name: 'Stage 5: Celestial Citadel Summit', altitude: '6,200m Golden Summit', round: 'ROUND 5: GRAND JURY SUMMIT' },
];

const TeamDashboard = () => {
  const { user } = useAuth();
  const [isQualModalOpen, setIsQualModalOpen] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Dynamic progression state (reactive to backend or live simulation)
  const [currentStageIdx, setCurrentStageIdx] = useState(3); // Default Stage 4
  const [qualificationStatus, setQualificationStatus] = useState(user?.qualificationStatus || 'QUALIFIED');
  const [currentScore, setCurrentScore] = useState(94);
  const [currentRank, setCurrentRank] = useState(4);

  useEffect(() => {
    // Attempt to pull real team progress from backend
    const fetchTeamTelemetry = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/event/leaderboard`);
        if (res.data.success && res.data.data.length > 0) {
          const matched = res.data.data.find(t => t.teamId === user?.teamId || t.teamName === user?.teamName);
          if (matched) {
            setCurrentScore(matched.score || 94);
            setCurrentStageIdx((matched.stage || 4) - 1);
            setQualificationStatus(matched.status === 'ELIMINATED' ? 'ELIMINATED' : 'QUALIFIED');
          }
        }
      } catch (err) {
        // Retain initial dynamic state
      }
    };
    fetchTeamTelemetry();
  }, [user]);

  const activeStage = stagesInfo[currentStageIdx] || stagesInfo[0];

  const teamData = {
    teamName: user?.teamName || 'Demo Warriors',
    teamId: user?.teamId || 'TEAM-DEMO-001',
    participationType: user?.participationType || 'BOTH (Avinyotsav + Hackathon)',
    paymentStatus: user?.paymentStatus || 'PAID',
    qualificationStatus: qualificationStatus,
    currentRound: activeStage.round,
    stageNumber: activeStage.num,
    altitude: activeStage.altitude,
    rank: currentRank,
    score: currentScore,
    college: user?.college || 'Demo Institute of Technology',
    assignedFaculty: 'Dr. Vikramaditya Rao (Head of AI & Heritage)',
    venue: user?.classroomId?.venue || 'Citadel Assembly Hall — Lab 301'
  };

  const handleArtifactSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    ancientSoundscape.playStoneClick();
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      ancientSoundscape.playTempleBell();
    }, 1000);
  };

  const handleAdvanceStage = () => {
    if (currentStageIdx < stagesInfo.length - 1) {
      const nextIdx = currentStageIdx + 1;
      setCurrentStageIdx(nextIdx);
      setQualificationStatus('QUALIFIED');
      setCurrentScore(prev => Math.min(100, prev + 5));
      setCurrentRank(prev => Math.max(1, prev - 1));
      ancientSoundscape.playTempleBell();
      setIsQualModalOpen(true);
    }
  };

  const handleToggleElimination = () => {
    ancientSoundscape.playStoneImpact();
    setQualificationStatus(prev => prev === 'ELIMINATED' ? 'QUALIFIED' : 'ELIMINATED');
  };

  return (
    <div className="min-h-screen relative bg-[#040406] text-gray-200 py-24 px-4 sm:px-6 lg:px-8 select-none">
      
      {/* Cinematic Encampment Scenery Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/images/ancient-library.jpg"
          alt="Expedition Encampment"
          className="w-full h-full object-cover filter brightness-[0.45] contrast-110 saturate-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040406] via-black/55 to-[#040406]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#ffd700]/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        
        {/* =========================================================
            COMPETITION PROGRESSION & JURY TELEMETRY SIMULATOR BAR
            ========================================================= */}
        <div className="p-4 rounded-2xl border border-[#d4af37]/40 bg-[#08080c]/90 backdrop-blur-xl shadow-[0_0_35px_rgba(212,175,55,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#ffd700]/15 border border-[#ffd700]/50 text-[#ffd700]">
              <Compass size={18} className="animate-spin-slow" />
            </div>
            <div>
              <span className="text-[10px] font-ancient tracking-[0.25em] text-[#d4af37] uppercase">
                EXPEDITION TELEMETRY & PROGRESSION ENGINE
              </span>
              <div className="text-xs font-ancient font-bold text-white uppercase">
                CURRENT STAGE: <span className="text-[#ffd700]">{activeStage.name}</span>
              </div>
            </div>
          </div>

          {/* Quick interactive progression buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAdvanceStage}
              disabled={currentStageIdx >= stagesInfo.length - 1}
              className="px-3.5 py-1.5 rounded-lg border border-[#ffd700]/70 bg-[#ffd700]/20 hover:bg-[#ffd700] hover:text-black transition-all text-xs font-ancient font-bold text-[#ffd700] flex items-center gap-1.5 disabled:opacity-40"
              title="Advance team to next elevation stage"
            >
              <TrendingUp size={13} />
              <span>ADVANCE ROUND ({currentStageIdx + 1}/5)</span>
            </button>

            <button
              onClick={handleToggleElimination}
              className={`px-3.5 py-1.5 rounded-lg border transition-all text-xs font-ancient font-bold flex items-center gap-1.5 ${
                qualificationStatus === 'ELIMINATED'
                  ? 'border-green-500/60 bg-green-500/20 text-green-300 hover:bg-green-500 hover:text-black'
                  : 'border-red-500/60 bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white'
              }`}
              title="Toggle team qualification or elimination state"
            >
              <AlertTriangle size={13} />
              <span>{qualificationStatus === 'ELIMINATED' ? 'RESTORE QUALIFICATION' : 'SIMULATE ELIMINATION'}</span>
            </button>

            <button
              onClick={() => {
                setCurrentStageIdx(0);
                setQualificationStatus('QUALIFIED');
                setCurrentScore(72);
                setCurrentRank(9);
                ancientSoundscape.playStoneClick();
              }}
              className="p-1.5 rounded-lg border border-gray-700 bg-black/60 text-gray-400 hover:text-white transition-colors"
              title="Reset to Stage 1 Basecamp"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* Camp Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-[#d4af37]/35 bg-[#0a0a0c]/85 backdrop-blur-xl shadow-[0_0_40px_rgba(212,175,55,0.15)]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-ancient tracking-[0.3em] text-[#ffd700] uppercase mb-1">
              <Flame size={14} className="text-[#ffd700] animate-bounce" />
              <span>EXPEDITION ENCAMPMENT • {teamData.altitude}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-ancient font-black text-white uppercase tracking-wider text-gold-chiseled">
              {teamData.teamName}
            </h1>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              TEAM PASSPORT: <span className="text-[#ffd700]">{teamData.teamId}</span> • {teamData.college}
            </p>
          </div>

          {/* Quick Action: Trigger Gate Unlock Ceremony */}
          <button
            onClick={() => {
              ancientSoundscape.playStoneClick();
              setIsQualModalOpen(true);
            }}
            className="btn-gold-epic !py-3 !px-5 !text-xs flex items-center gap-2 self-start md:self-auto shadow-[0_0_25px_rgba(255,215,0,0.3)]"
          >
            <Sparkles size={14} className="animate-pulse" />
            <span>OPEN QUALIFICATION GATE</span>
          </button>
        </div>

        {/* Main 3-Column Civilization Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (4 cols): 3D Team Avatar Sanctuary */}
          <div className="lg:col-span-4 space-y-6">
            <TeamAvatar3D
              teamName={teamData.teamName}
              teamId={teamData.teamId}
              qualificationStatus={teamData.qualificationStatus}
              altitude={teamData.altitude}
            />

            {/* Stage Progress Card */}
            <div className="p-5 rounded-2xl border border-[#d4af37]/30 bg-[#08080b]/90 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="font-ancient text-xs font-bold text-[#ffd700] uppercase tracking-wider flex items-center gap-1.5">
                  <Flame size={14} />
                  <span>ASCENT PROGRESS</span>
                </span>
                <span className="font-mono text-xs text-white font-bold">STAGE {teamData.stageNumber} OF 5</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-black/60 rounded-full border border-[#d4af37]/25 overflow-hidden mb-3">
                <div 
                  className={`h-full transition-all duration-700 ${
                    qualificationStatus === 'ELIMINATED'
                      ? 'bg-gradient-to-r from-red-600 to-gray-600'
                      : 'bg-gradient-to-r from-[#d4af37] to-[#ffd700] shadow-[0_0_10px_#ffd700]'
                  }`}
                  style={{ width: `${(teamData.stageNumber / 5) * 100}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1">
                <div className="p-2 rounded-lg bg-black/40 border border-[#d4af37]/20">
                  <div className="text-[10px] text-gray-400 font-ancient">LEADERBOARD RANK</div>
                  <div className="text-base font-ancient font-black text-[#ffd700]">#{teamData.rank}</div>
                </div>
                <div className="p-2 rounded-lg bg-black/40 border border-[#d4af37]/20">
                  <div className="text-[10px] text-gray-400 font-ancient">TOTAL SCORE</div>
                  <div className="text-base font-ancient font-black text-white">{teamData.score}/100</div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column (5 cols): The Royal Stele & Mission Directive */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* The Royal Stele of Record */}
            <div className="p-6 rounded-2xl border border-[#d4af37]/35 bg-[#09090c]/90 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#d4af37]/25">
                <h3 className="font-ancient text-sm font-bold text-[#ffd700] uppercase tracking-widest flex items-center gap-2">
                  <Shield size={16} />
                  <span>THE ROYAL STELE OF RECORD</span>
                </h3>
                <span className="px-2.5 py-0.5 rounded-full border border-green-500/50 bg-green-500/10 text-green-400 font-mono text-[10px] font-bold">
                  {teamData.paymentStatus} ✓
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-ancient mb-4">
                <div>
                  <span className="text-gray-400 text-[10px] uppercase">EXPEDITION DOMAIN</span>
                  <div className="font-bold text-white mt-0.5">{teamData.participationType}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase">ALLOCATED VENUE</span>
                  <div className="font-bold text-[#ffd700] mt-0.5">{teamData.venue}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase">CHIEF JURY MENTOR</span>
                  <div className="font-bold text-white mt-0.5">{teamData.assignedFaculty}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase">CURRENT ASCENT TIER</span>
                  <div className={`font-bold mt-0.5 ${qualificationStatus === 'ELIMINATED' ? 'text-red-400' : 'text-green-400'}`}>
                    {teamData.currentRound}
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Directive & Inscribed Problem Statement */}
            <div className="p-6 rounded-2xl border border-[#d4af37]/35 bg-[#09090c]/90 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-3 text-[#ffd700] font-ancient text-xs font-bold tracking-widest uppercase">
                <BookOpen size={16} />
                <span>EXPEDITION MISSION DIRECTIVE</span>
              </div>
              <h4 className="font-ancient text-lg font-bold text-white uppercase mb-2">
                THE RESILIENT CITY: ANCIENT HYDRAULIC AI
              </h4>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                Decipher Harappan municipal stepwell (Baoli) passive gravity water flows and build an autonomous IoT + AI distribution architecture for drought-stressed modern metropolitan hubs.
              </p>
              <div className="p-3.5 rounded-xl bg-black/60 border border-[#d4af37]/25 text-xs text-amber-200/90 font-mono">
                ✦ <strong>Round {teamData.stageNumber} Deliverable:</strong> Deploy production API + interactive visual telemetry dashboard before the Grand Jury.
              </div>
            </div>

            {/* Artifact Submission Terminal */}
            <div className="p-6 rounded-2xl border border-[#d4af37]/35 bg-[#09090c]/90 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-3 text-[#ffd700] font-ancient text-xs font-bold tracking-widest uppercase">
                <FileCode size={16} />
                <span>ARTIFACT REPOSITORY SUBMISSION</span>
              </div>

              {submissionSuccess && (
                <div className="p-3 rounded-lg border border-green-500/60 bg-green-950/60 text-green-300 text-xs font-ancient mb-4 flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>ARTIFACT COMMITTED TO ANCIENT ARCHIVES SUCCESSFULLY!</span>
                </div>
              )}

              <form onSubmit={handleArtifactSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-ancient tracking-wider text-gray-300 uppercase mb-1">
                    GitHub Code Repository URL
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/your-team/astra-civilization"
                    value={repoUrl}
                    onChange={e => setRepoUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#d4af37]/30 bg-black/60 text-white text-xs outline-none focus:border-[#ffd700]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-ancient tracking-wider text-gray-300 uppercase mb-1">
                    Live Demo / Video Pitch Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://demo.astra-expedition.live"
                    value={demoUrl}
                    onChange={e => setDemoUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#d4af37]/30 bg-black/60 text-white text-xs outline-none focus:border-[#ffd700]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold-epic w-full !py-3 !text-xs flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  <span>{isSubmitting ? 'COMMITTING ARTIFACT...' : 'SUBMIT EXPEDITION ARTIFACT'}</span>
                </button>
              </form>
            </div>

          </div>

          {/* Right Column (3 cols): Roster of Companions */}
          <div className="lg:col-span-3 space-y-6">
            <div className="p-6 rounded-2xl border border-[#d4af37]/35 bg-[#09090c]/90 backdrop-blur-xl">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#d4af37]/25 text-[#ffd700] font-ancient text-xs font-bold tracking-widest uppercase">
                <Users size={16} />
                <span>ROSTER OF COMPANIONS</span>
              </div>

              {/* Leader */}
              <div className="p-3.5 rounded-xl border border-[#ffd700]/40 bg-[#ffd700]/5 mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-ancient text-xs font-bold text-white uppercase">
                    {user?.leader?.name || 'John Doe'}
                  </span>
                  <span className="px-1.5 py-0.5 rounded border border-[#ffd700]/60 bg-black/60 text-[9px] font-ancient font-bold text-[#ffd700]">
                    LEADER
                  </span>
                </div>
                <div className="text-[11px] text-gray-400 font-mono truncate">{user?.leader?.email || 'leader@demo.test'}</div>
                <div className="text-[10px] text-gray-500 font-mono mt-0.5">ROLL: {user?.leader?.rollNumber || 'CS123'}</div>
              </div>

              {/* Members */}
              <div className="space-y-2.5">
                {(user?.members && user.members.length > 0 ? user.members : [
                  { name: 'Jane Smith', email: 'jane@demo.test', rollNumber: 'CS124' }
                ]).map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-gray-800 bg-black/40">
                    <div className="font-ancient text-xs font-bold text-gray-200 uppercase mb-0.5">
                      {m.name}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono truncate">{m.email}</div>
                    <div className="text-[9px] text-gray-500 font-mono">ROLL: {m.rollNumber}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ancient Laws & Code of Conduct */}
            <div className="p-5 rounded-2xl border border-gray-800 bg-black/50 text-xs">
              <div className="font-ancient text-[#d4af37] font-bold uppercase tracking-wider mb-2">
                ⚖️ ANCIENT EXPEDITION LAWS
              </div>
              <ul className="space-y-1.5 text-gray-400 text-[11px] leading-relaxed">
                <li>• All code must be original and authored during sprint.</li>
                <li>• Respect the sanctity of the physical venue bays.</li>
                <li>• Mentors will evaluate at the High Citadel stage.</li>
              </ul>
            </div>

          </div>

        </div>

      </div>

      {/* Qualification Celebration Modal */}
      <QualificationCelebrationModal
        isOpen={isQualModalOpen}
        onClose={() => setIsQualModalOpen(false)}
        teamName={teamData.teamName}
        unlockedRound={teamData.currentRound}
        stageName={activeStage.name}
        elevation={teamData.altitude}
        artifactReward="Solar Chariot Astra Sigil"
      />

    </div>
  );
};

export default TeamDashboard;
