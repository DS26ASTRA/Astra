import React from 'react';
import { ancientSoundscape } from '../utils/ancientSoundscape';

const WorldWaypointNav = ({ scrollProgress = 0, onSelectZone }) => {
  // 9 subtle waypoints matching the vertical dot track in the reference storyboard
  const waypoints = [
    { id: 'forest', name: 'Forest', progress: 0.00 },
    { id: 'about', name: 'About', progress: 0.09 },
    { id: 'themes', name: 'Themes', progress: 0.18 },
    { id: 'rules', name: 'Rules', progress: 0.27 },
    { id: 'journey', name: 'Journey', progress: 0.36 },
    { id: 'schedule', name: 'Schedule', progress: 0.45 },
    { id: 'teams', name: 'Teams', progress: 0.64 },
    { id: 'leaderboard', name: 'Leaderboard', progress: 0.73 },
    { id: 'final', name: 'Final', progress: 0.99 },
  ];

  const handleWaypointClick = (wp) => {
    ancientSoundscape.playStoneClick();
    if (onSelectZone) {
      onSelectZone(wp.progress);
    }
  };

  // Find closest waypoint to current scrollProgress
  const currentWp = waypoints.reduce((closest, curr) => {
    return Math.abs(curr.progress - scrollProgress) < Math.abs(closest.progress - scrollProgress) ? curr : closest;
  }, waypoints[0]);

  return (
    <aside 
      aria-label="Expedition Progress" 
      className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-end pointer-events-auto select-none"
    >
      <div className="flex flex-col items-end gap-3.5 py-4">
        {waypoints.map((wp) => {
          const isActive = currentWp.id === wp.id;

          return (
            <button
              key={wp.id}
              onClick={() => handleWaypointClick(wp)}
              className="flex items-center gap-2.5 group cursor-pointer transition-all"
              title={wp.name}
            >
              {/* Subtle label showing for active or hovered waypoint */}
              <span className={`font-ancient text-[10px] tracking-[0.2em] uppercase transition-opacity duration-300 ${
                isActive 
                  ? 'text-[#ffd700] font-bold opacity-100 drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]' 
                  : 'text-gray-400 opacity-0 group-hover:opacity-100'
              }`}>
                {wp.name}
              </span>

              {/* Minimalist dot indicator matching reference storyboard */}
              <div className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-2 h-2 bg-[#ffd700] shadow-[0_0_8px_#ffd700]'
                  : 'w-1.5 h-1.5 bg-gray-600/70 group-hover:bg-gray-300'
              }`} />
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default WorldWaypointNav;
