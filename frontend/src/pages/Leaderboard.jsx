import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // We will call the public/admin leaderboard endpoint
        // For now, let's assume we have an endpoint that returns sorted teams by score
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/event/leaderboard`);
        if (res.data.success) {
          setLeaderboard(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching leaderboard", error);
        // Fallback dummy data for demo purposes
        setLeaderboard([
          { _id: '1', teamName: 'Team Alpha', participationType: 'BOTH', score: 92, round: 'Round 1', status: 'QUALIFIED' },
          { _id: '2', teamName: 'Team Beta', participationType: 'HACKATHON', score: 88, round: 'Round 1', status: 'PENDING' },
          { _id: '3', teamName: 'Team Gamma', participationType: 'AVINYOTSAV', score: 84, round: 'Round 1', status: 'PENDING' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8 pt-12">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-ancient text-center mb-8 text-white">Live Leaderboard</h1>
        <div className="h-1 w-32 bg-[#cd853f] mx-auto mb-12"></div>
        
        <div className="premium-card bg-transparent p-6 md:p-10">
          {loading ? (
            <p className="text-center text-gray-400">Calculating scores...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-[var(--color-card-border-hover)]ollapse">
                <thead>
                  <tr className="border-[var(--color-card-border)]-2 border-[#8b5a2b] text-[#ffdf00] font-ancient text-lg">
                    <th className="p-4">Rank</th>
                    <th className="p-4">Team</th>
                    <th className="p-4">Participation</th>
                    <th className="p-4">Score</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((team, index) => (
                    <tr 
                      key={team._id} 
                      className={`border-[var(--color-card-border)] border-[var(--color-card-border)] hover:bg-[#fff5e1] transition-colors ${index < 3 ? 'font-bold' : ''}`}
                    >
                      <td className="p-4">
                        {index === 0 && <span className="text-[#d4af37] text-gray-300xl mr-2">🥇</span>}
                        {index === 1 && <span className="text-gray-400 text-gray-300xl mr-2">🥈</span>}
                        {index === 2 && <span className="text-orange-700 text-gray-300xl mr-2">🥉</span>}
                        {index > 2 && <span className="px-3">{index + 1}</span>}
                      </td>
                      <td className="p-4 text-lg">{team.teamName}</td>
                      <td className="p-4"><span className="text-xs tracking-wider uppercase text-gray-400">{team.participationType}</span></td>
                      <td className="p-4 text-[#ffdf00] text-xl">{team.score}</td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded ${team.status === 'QUALIFIED' ? 'bg-green-100 text-green-800' : 'bg-[#1a1a1a] text-gray-800'}`}>
                          {team.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
