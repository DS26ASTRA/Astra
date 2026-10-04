import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const FacultyDashboard = () => {
  const { user } = useAuth(); // contains faculty profile
  const [activeTab, setActiveTab] = useState('dashboard');
  const [teams, setTeams] = useState([]);
  const [evaluations, setEvaluations] = useState([]); // if we had an endpoint for history, currently empty
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check-In State
  const [checkInTeamId, setCheckInTeamId] = useState('');
  
  // Evaluation State
  const [evalTeam, setEvalTeam] = useState(null);
  const [evalScores, setEvalScores] = useState({
    innovation: 0,
    technical: 0,
    creativity: 0,
    impact: 0,
    presentation: 0
  });
  const [evalRemarks, setEvalRemarks] = useState({ strengths: '', improvement: '', overall: '' });

  // Filtering for Teams Tab
  const [teamSearch, setTeamSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState('All');

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/faculty/teams`);
      if (res.data.success) {
        setTeams(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching teams", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // Stats Calculation
  const totalAssigned = teams.length;
  const checkedIn = teams.filter(t => t.checkInStatus === 'CHECKED_IN').length;
  // Approximation for evaluated vs pending (since we don't have evaluationStatus in Team model natively yet, we can default to pending)
  const pendingEval = teams.filter(t => t.evaluationStatus !== 'EVALUATED').length; 
  const completedEval = teams.filter(t => t.evaluationStatus === 'EVALUATED').length;

  // Handlers
  const handleCheckIn = async (e) => {
    e.preventDefault();
    if (!checkInTeamId) return;
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/faculty/check-in`, { teamId: checkInTeamId });
      if (res.data.success) {
        alert('✓ Team checked in successfully!');
        setCheckInTeamId('');
        fetchTeams();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error checking in team');
    }
  };

  const handleEvaluationSubmit = async (e) => {
    e.preventDefault();
    if (!evalTeam) return;
    if (!window.confirm("Are you sure you want to submit this evaluation?")) return;
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/faculty/evaluation`, {
        teamId: evalTeam._id,
        roundId: 'Round1', // Mocking for now as we don't have active round context
        criteria: evalScores,
        remarks: `Strengths: ${evalRemarks.strengths}\nImprovements: ${evalRemarks.improvement}\nOverall: ${evalRemarks.overall}`
      });
      if (res.data.success) {
        alert('✓ Evaluation Submitted');
        setEvalTeam(null);
        fetchTeams(); // refresh list to update evaluation status
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting evaluation');
    }
  };

  // Render Functions
  const renderSidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#080808] border-r border-[#222] transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
      <div className="p-6">
        <h2 className="font-ancient text-3xl text-[#d4af37] tracking-widest uppercase mb-8">ASTRA</h2>
        <ul className="space-y-2">
          {['dashboard', 'my_teams', 'check_in', 'evaluations', 'schedule', 'notifications', 'profile'].map((tab) => (
            <li 
              key={tab}
              onClick={() => { setActiveTab(tab); setIsMobileMenuOpen(false); }}
              className={`px-4 py-3 rounded cursor-pointer transition-all duration-300 font-bold uppercase text-xs tracking-wider flex items-center gap-3
                ${activeTab === tab ? 'bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37]' : 'text-gray-400 hover:text-white hover:bg-[#111]'}`}
            >
              {tab.replace('_', ' ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-ancient text-white mb-2">Welcome back, {user?.name ? `Dr. ${user.name.split(' ')[0]}` : 'Faculty'}</h1>
        <p className="text-gray-400">Manage your assigned teams and evaluations.</p>
      </div>

      {loading ? (
        <p className="text-[#d4af37]">Loading data...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-black/40 border border-[#333] p-6 rounded-lg backdrop-blur-sm relative overflow-hidden group hover:border-[#d4af37]/50 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#d4af37]/5 rounded-bl-full"></div>
              <p className="text-4xl font-bold text-white mb-1">{totalAssigned}</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Assigned Teams</p>
            </div>
            <div className="bg-black/40 border border-[#333] p-6 rounded-lg backdrop-blur-sm relative overflow-hidden group hover:border-[#d4af37]/50 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full"></div>
              <p className="text-4xl font-bold text-blue-400 mb-1">{checkedIn}</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Checked In</p>
            </div>
            <div className="bg-black/40 border border-[#333] p-6 rounded-lg backdrop-blur-sm relative overflow-hidden group hover:border-[#d4af37]/50 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/5 rounded-bl-full"></div>
              <p className="text-4xl font-bold text-orange-400 mb-1">{pendingEval}</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Pending Evaluation</p>
            </div>
            <div className="bg-black/40 border border-[#333] p-6 rounded-lg backdrop-blur-sm relative overflow-hidden group hover:border-[#d4af37]/50 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/5 rounded-bl-full"></div>
              <p className="text-4xl font-bold text-green-400 mb-1">{completedEval}</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Evaluated</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-[#d4af37] mb-4 mt-12 border-b border-[#222] pb-2">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button onClick={() => setActiveTab('my_teams')} className="p-4 bg-[#111] border border-[#222] hover:border-[#d4af37] text-white rounded transition-colors text-left uppercase text-xs tracking-widest font-bold">View My Teams</button>
            <button onClick={() => setActiveTab('check_in')} className="p-4 bg-[#111] border border-[#222] hover:border-[#d4af37] text-white rounded transition-colors text-left uppercase text-xs tracking-widest font-bold">Check-In</button>
            <button onClick={() => setActiveTab('evaluations')} className="p-4 bg-[#111] border border-[#222] hover:border-[#d4af37] text-white rounded transition-colors text-left uppercase text-xs tracking-widest font-bold">Start Evaluation</button>
            <button onClick={() => setActiveTab('schedule')} className="p-4 bg-[#111] border border-[#222] hover:border-[#d4af37] text-white rounded transition-colors text-left uppercase text-xs tracking-widest font-bold">View Schedule</button>
          </div>
        </>
      )}
    </div>
  );

  const renderMyTeams = () => {
    const filteredTeams = teams.filter(t => {
      const matchSearch = t.teamName.toLowerCase().includes(teamSearch.toLowerCase()) || t.teamId.toLowerCase().includes(teamSearch.toLowerCase());
      if (!matchSearch) return false;
      if (teamFilter === 'Checked In') return t.checkInStatus === 'CHECKED_IN';
      if (teamFilter === 'Not Checked In') return t.checkInStatus !== 'CHECKED_IN';
      if (teamFilter === 'Pending Evaluation') return t.evaluationStatus !== 'EVALUATED';
      if (teamFilter === 'Evaluated') return t.evaluationStatus === 'EVALUATED';
      return true;
    });

    return (
      <div className="animate-fade-in">
        <h1 className="text-3xl font-ancient text-white mb-6">My Assigned Teams</h1>
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <input 
            type="text" 
            placeholder="Search Team Name or ID..." 
            className="bg-[#0a0a0a] border border-[#333] text-white p-3 rounded focus:outline-none focus:border-[#d4af37] w-full md:w-1/3"
            value={teamSearch}
            onChange={(e) => setTeamSearch(e.target.value)}
          />
          <select 
            className="bg-[#0a0a0a] border border-[#333] text-white p-3 rounded focus:outline-none focus:border-[#d4af37]"
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
          >
            <option>All</option>
            <option>Checked In</option>
            <option>Not Checked In</option>
            <option>Pending Evaluation</option>
            <option>Evaluated</option>
          </select>
        </div>

        <div className="bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#111] border-b border-[#222]">
                  <th className="p-4 text-xs tracking-widest uppercase text-gray-400 font-bold">Team ID</th>
                  <th className="p-4 text-xs tracking-widest uppercase text-gray-400 font-bold">Team Name</th>
                  <th className="p-4 text-xs tracking-widest uppercase text-gray-400 font-bold">Participation</th>
                  <th className="p-4 text-xs tracking-widest uppercase text-gray-400 font-bold">Members</th>
                  <th className="p-4 text-xs tracking-widest uppercase text-gray-400 font-bold">Check-In</th>
                  <th className="p-4 text-xs tracking-widest uppercase text-gray-400 font-bold">Evaluation</th>
                  <th className="p-4 text-xs tracking-widest uppercase text-gray-400 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeams.length === 0 ? (
                  <tr><td colSpan="7" className="p-8 text-center text-gray-500">No teams found matching criteria.</td></tr>
                ) : (
                  filteredTeams.map(t => (
                    <tr key={t._id} className="border-b border-[#222] hover:bg-[#111] transition-colors">
                      <td className="p-4 font-mono text-[#d4af37]">{t.teamId}</td>
                      <td className="p-4 text-white font-bold">{t.teamName}</td>
                      <td className="p-4 text-gray-300 text-sm">{t.participationType}</td>
                      <td className="p-4 text-gray-300 text-sm">{1 + (t.members?.length || 0)}</td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded font-bold ${t.checkInStatus === 'CHECKED_IN' ? 'bg-blue-900/30 text-blue-400 border border-blue-500/30' : 'bg-[#222] text-gray-400'}`}>
                          {t.checkInStatus === 'CHECKED_IN' ? 'Checked In' : 'Pending'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded font-bold ${t.evaluationStatus === 'EVALUATED' ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-orange-900/30 text-orange-400 border border-orange-500/30'}`}>
                          {t.evaluationStatus === 'EVALUATED' ? 'Evaluated' : 'Pending'}
                        </span>
                      </td>
                      <td className="p-4 flex gap-2">
                        <button className="text-xs bg-[#222] hover:bg-[#333] text-white px-3 py-1 rounded transition-colors">VIEW</button>
                        <button 
                          onClick={() => { setEvalTeam(t); setActiveTab('evaluations'); }}
                          className="text-xs bg-[#d4af37] hover:bg-[#b8962e] text-black font-bold px-3 py-1 rounded transition-colors"
                        >
                          EVALUATE
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderCheckIn = () => (
    <div className="animate-fade-in max-w-2xl mx-auto mt-10">
      <div className="bg-[#0a0a0a] border border-[#333] rounded-lg p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-bl-full"></div>
        <h1 className="text-3xl font-ancient text-white mb-2 uppercase tracking-widest text-center">Team Check-In</h1>
        <p className="text-gray-400 text-center mb-8 text-sm">Verify and authorize team entry to the venue.</p>

        <div className="bg-[#111] border border-[#222] p-8 flex flex-col items-center justify-center rounded-lg mb-6 border-dashed">
          <div className="w-24 h-24 bg-[#050505] border border-[#333] rounded mb-4 flex items-center justify-center">
            <span className="text-4xl">📱</span>
          </div>
          <button className="bg-[#222] hover:bg-[#333] text-white px-6 py-2 rounded text-sm uppercase tracking-widest font-bold transition-colors">
            SCAN QR CODE
          </button>
        </div>
        
        <div className="flex items-center text-gray-500 mb-6">
          <div className="flex-1 border-t border-[#333]"></div>
          <span className="px-3 text-xs uppercase tracking-widest font-bold">OR</span>
          <div className="flex-1 border-t border-[#333]"></div>
        </div>

        <form onSubmit={handleCheckIn}>
          <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2 text-center">Enter Team ID</label>
          <input 
            type="text" 
            placeholder="e.g. AC26-001" 
            required
            value={checkInTeamId}
            onChange={(e) => setCheckInTeamId(e.target.value)}
            className="w-full bg-[#050505] border border-[#333] text-white p-4 rounded text-center text-xl font-mono focus:outline-none focus:border-[#d4af37] mb-4"
          />
          <button type="submit" className="w-full bg-[#d4af37] hover:bg-[#b8962e] text-black font-bold py-4 rounded transition-colors uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            CHECK IN TEAM
          </button>
        </form>
      </div>
    </div>
  );

  const renderEvaluations = () => {
    if (evalTeam) {
      const totalScore = Object.values(evalScores).reduce((a, b) => a + b, 0);
      return (
        <div className="animate-fade-in max-w-3xl mx-auto">
          <button onClick={() => setEvalTeam(null)} className="text-gray-400 hover:text-white mb-6 text-sm font-bold tracking-widest uppercase">
            ← Back to List
          </button>
          
          <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-6 md:p-8">
            <div className="border-b border-[#222] pb-6 mb-6">
              <h1 className="text-2xl font-ancient text-[#d4af37] uppercase tracking-widest mb-1">Evaluate Team</h1>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white font-bold text-xl">{evalTeam.teamName}</p>
                  <p className="text-gray-400 font-mono text-sm">{evalTeam.teamId} • {evalTeam.college}</p>
                </div>
                <div className="text-right bg-[#111] px-4 py-2 rounded border border-[#333]">
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Total Score</p>
                  <p className="text-3xl font-bold text-white">{totalScore} <span className="text-lg text-gray-500">/ 100</span></p>
                </div>
              </div>
            </div>

            <form onSubmit={handleEvaluationSubmit} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest border-b border-[#222] pb-2">Scoring Criteria</h3>
                {[
                  { key: 'innovation', label: 'Innovation', max: 25 },
                  { key: 'technical', label: 'Technical Implementation', max: 25 },
                  { key: 'creativity', label: 'Creativity', max: 20 },
                  { key: 'impact', label: 'Impact', max: 15 },
                  { key: 'presentation', label: 'Presentation', max: 15 }
                ].map((crit) => (
                  <div key={crit.key} className="flex items-center justify-between bg-[#050505] p-4 rounded border border-[#111] hover:border-[#333] transition-colors">
                    <label className="text-gray-300">{crit.label}</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        min="0" max={crit.max}
                        value={evalScores[crit.key] || ''}
                        onChange={(e) => setEvalScores({...evalScores, [crit.key]: Number(e.target.value)})}
                        className="w-20 bg-[#111] border border-[#333] text-white p-2 rounded text-center text-lg focus:outline-none focus:border-[#d4af37]"
                      />
                      <span className="text-gray-500 text-sm w-12">/ {crit.max}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest border-b border-[#222] pb-2">Remarks</h3>
                <textarea placeholder="Strengths" value={evalRemarks.strengths} onChange={e => setEvalRemarks({...evalRemarks, strengths: e.target.value})} className="w-full bg-[#050505] border border-[#222] text-white p-4 rounded focus:outline-none focus:border-[#d4af37] resize-none h-24"></textarea>
                <textarea placeholder="Areas for Improvement" value={evalRemarks.improvement} onChange={e => setEvalRemarks({...evalRemarks, improvement: e.target.value})} className="w-full bg-[#050505] border border-[#222] text-white p-4 rounded focus:outline-none focus:border-[#d4af37] resize-none h-24"></textarea>
                <textarea placeholder="Overall Feedback" value={evalRemarks.overall} onChange={e => setEvalRemarks({...evalRemarks, overall: e.target.value})} className="w-full bg-[#050505] border border-[#222] text-white p-4 rounded focus:outline-none focus:border-[#d4af37] resize-none h-24"></textarea>
              </div>

              <div className="flex gap-4 pt-4 border-t border-[#222]">
                <button type="button" className="flex-1 bg-[#111] hover:bg-[#222] text-white font-bold py-4 rounded transition-colors uppercase tracking-widest text-sm border border-[#333]">
                  SAVE DRAFT
                </button>
                <button type="submit" className="flex-1 bg-[#d4af37] hover:bg-[#b8962e] text-black font-bold py-4 rounded transition-colors uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  SUBMIT EVALUATION
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div className="animate-fade-in">
        <h1 className="text-3xl font-ancient text-white mb-2">Evaluations</h1>
        <p className="text-gray-400 mb-8">Select a team to begin the evaluation process.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(t => (
            <div key={t._id} className="bg-[#0a0a0a] border border-[#222] p-6 rounded-lg hover:border-[#d4af37]/50 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[#d4af37] text-sm">{t.teamId}</span>
                  <span className={`text-xs px-2 py-1 rounded font-bold ${t.evaluationStatus === 'EVALUATED' ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-orange-900/30 text-orange-400 border border-orange-500/30'}`}>
                    {t.evaluationStatus === 'EVALUATED' ? 'Evaluated' : 'Pending'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{t.teamName}</h3>
                <p className="text-gray-400 text-sm mb-6">{t.participationType}</p>
              </div>
              <button 
                onClick={() => setEvalTeam(t)}
                className="w-full bg-[#111] hover:bg-[#222] border border-[#333] text-white font-bold py-2 rounded transition-colors uppercase tracking-widest text-xs"
              >
                START EVALUATION
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSchedule = () => (
    <div className="animate-fade-in max-w-4xl">
      <h1 className="text-3xl font-ancient text-white mb-8">Faculty Schedule</h1>
      <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-6 md:p-8">
        <div className="space-y-6">
          {[
            { time: '09:00 AM', title: 'Team Check-In & Setup', desc: 'Verify all teams in your assigned classroom.' },
            { time: '10:00 AM', title: 'Event Commencement', desc: 'Opening ceremony and brief instructions.' },
            { time: '01:00 PM', title: 'Evaluation Round 1', desc: 'First round of evaluations focusing on idea and prototype.' },
            { time: '03:00 PM', title: 'Evaluation Round 2', desc: 'Final round of evaluations focusing on presentation.' },
          ].map((ev, i) => (
            <div key={i} className="flex gap-6 border-b border-[#111] pb-6 last:border-0 last:pb-0">
              <div className="w-24 flex-shrink-0 text-[#d4af37] font-mono font-bold">{ev.time}</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">{ev.title}</h3>
                <p className="text-gray-400 text-sm">{ev.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="animate-fade-in max-w-3xl">
      <div className="flex justify-between items-end mb-6">
        <h1 className="text-3xl font-ancient text-white">Notifications</h1>
        <button className="text-xs text-gray-400 hover:text-white uppercase tracking-widest font-bold">Mark All as Read</button>
      </div>
      <div className="space-y-3">
        {[
          { text: 'Your classroom assignment has been updated to Lab 1.', time: '2 hours ago', unread: true },
          { text: 'Evaluation Round 1 starts at 1:00 PM.', time: '5 hours ago', unread: true },
          { text: 'Team Phoenix has been assigned to you.', time: '1 day ago', unread: false },
        ].map((notif, i) => (
          <div key={i} className={`p-4 rounded-lg border flex gap-4 ${notif.unread ? 'bg-[#111] border-[#333]' : 'bg-[#050505] border-[#111]'}`}>
            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notif.unread ? 'bg-[#d4af37]' : 'bg-transparent'}`}></div>
            <div>
              <p className="text-white text-sm mb-1">{notif.text}</p>
              <p className="text-xs text-gray-500">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="animate-fade-in max-w-2xl">
      <h1 className="text-3xl font-ancient text-white mb-6">My Profile</h1>
      <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <span className="text-xs px-3 py-1 bg-green-900/30 text-green-400 border border-green-500/30 rounded-full font-bold uppercase tracking-widest">
            ✓ VERIFIED FACULTY
          </span>
        </div>
        <div className="w-20 h-20 bg-[#111] border border-[#333] rounded-full flex items-center justify-center text-2xl text-[#d4af37] font-bold mb-6">
          {user?.name?.charAt(0)}
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Name</p>
              <p className="text-white">{user?.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Faculty ID</p>
              <p className="text-white font-mono">{user?.facultyId || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Email</p>
              <p className="text-white">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Department</p>
              <p className="text-white">{user?.department}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] flex mt-16 font-sans">
      {renderSidebar()}
      
      {/* Mobile Header overlay for hamburger */}
      <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-[#050505] border-b border-[#222] p-4 flex justify-between items-center">
        <span className="font-ancient text-[#d4af37] text-xl">ASTRA</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      <div className="flex-1 md:ml-64 p-4 md:p-10 mt-12 md:mt-0 max-w-7xl">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'my_teams' && renderMyTeams()}
        {activeTab === 'check_in' && renderCheckIn()}
        {activeTab === 'evaluations' && renderEvaluations()}
        {activeTab === 'schedule' && renderSchedule()}
        {activeTab === 'notifications' && renderNotifications()}
        {activeTab === 'profile' && renderProfile()}
      </div>
    </div>
  );
};

export default FacultyDashboard;
