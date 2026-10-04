import React from 'react';
import { useAuth } from '../context/AuthContext';

const TeamDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-ancient text-white">Team Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="premium-card p-6 bg-transparent">
              <h2 className="text-xl font-bold mb-4 border-[var(--color-card-border)] pb-2 text-[#8b5a2b]">Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Team Name</p>
                  <p className="font-bold text-lg">{user?.teamName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Team ID</p>
                  <p className="font-bold font-mono">{user?.teamId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Participation</p>
                  <p className="font-bold text-[#ffdf00]">{user?.participationType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Payment Status</p>
                  <p className={`font-bold ${user?.paymentStatus === 'PAID' ? 'text-green-600' : 'text-orange-500'}`}>
                    {user?.paymentStatus} {user?.paymentStatus === 'PAID' && '✓'}
                  </p>
                </div>
              </div>
            </div>

            <div className="premium-card p-6 bg-transparent">
              <h2 className="text-xl font-bold mb-4 border-[var(--color-card-border)] pb-2 text-[#8b5a2b]">Team Members</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-transparent border-t border-[var(--color-card-border)] p-3 rounded border">
                  <div>
                    <p className="font-bold">{user?.leader?.name} <span className="text-xs bg-[#8b5a2b] text-white px-2 py-1 rounded ml-2">LEADER</span></p>
                    <p className="text-sm text-gray-400">{user?.leader?.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{user?.leader?.rollNumber}</p>
                    <p className="text-sm text-gray-400">{user?.leader?.phone}</p>
                  </div>
                </div>
                {user?.members?.map((member, i) => (
                  <div key={i} className="flex justify-between items-center bg-transparent border-t border-[var(--color-card-border)] p-3 rounded border">
                    <div>
                      <p className="font-bold">{member.name}</p>
                      <p className="text-sm text-gray-400">{member.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{member.rollNumber}</p>
                      <p className="text-sm text-gray-400">{member.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="premium-card p-6 bg-transparent text-center">
              <h2 className="text-xl font-bold mb-4 text-[#8b5a2b]">Status</h2>
              <div className="inline-block px-4 py-2 rounded-full border-[var(--color-card-border)] border-green-500 text-green-700 bg-green-50 font-bold mb-2">
                {user?.qualificationStatus || 'PENDING'}
              </div>
              <p className="text-sm text-gray-400">Qualification Status</p>
            </div>

            <div className="premium-card p-6 bg-transparent">
              <h2 className="text-xl font-bold mb-4 border-[var(--color-card-border)] pb-2 text-[#8b5a2b]">Venue</h2>
              {user?.classroomId ? (
                <div>
                  <p className="font-bold text-lg">{user.classroomId.name}</p>
                  <p className="text-gray-400">{user.classroomId.venue}</p>
                </div>
              ) : (
                <p className="text-gray-400 italic">No venue assigned yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDashboard;
