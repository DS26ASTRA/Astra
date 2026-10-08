import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Music } from 'lucide-react';
import { ancientSoundscape } from '../utils/ancientSoundscape';

const AudioMasterControl = ({ currentZone = 'forest' }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.6);
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    ancientSoundscape.setZone(currentZone);
  }, [currentZone]);

  const handleToggleMute = () => {
    setHasInteracted(true);
    const muted = ancientSoundscape.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      ancientSoundscape.playTempleBell();
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    ancientSoundscape.setVolume(val);
    if (isMuted && val > 0) {
      ancientSoundscape.toggleMute();
      setIsMuted(false);
    }
  };

  const zoneLabels = {
    forest: '🌲 SACRED FOREST',
    cave: '🕯️ RUNE CAVERN',
    mountain: '🏔️ MOUNTAIN PASS',
    ruins: '🏛️ TEMPLE RUINS',
    city: '🔥 THE ANCIENT CITY',
    citadel: '☀️ CELESTIAL CITADEL'
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none">
      <div className="relative flex items-center gap-2">
        {/* Main Audio Toggle Button */}
        <button
          onClick={handleToggleMute}
          onMouseEnter={() => setIsOpen(true)}
          className={`p-3.5 sm:px-4 sm:py-3 rounded-full border-2 transition-all flex items-center gap-2.5 font-ancient text-xs font-bold tracking-widest uppercase shadow-[0_0_25px_rgba(0,0,0,0.8)] backdrop-blur-xl ${
            isMuted 
              ? 'border-gray-700 bg-black/85 text-gray-400 hover:border-[#ffd700] hover:text-[#ffd700]'
              : 'border-[#ffd700] bg-black/90 text-[#ffd700] shadow-[0_0_30px_rgba(255,215,0,0.35)]'
          }`}
          title={isMuted ? 'Unmute Ancient Soundscape' : 'Mute Soundscape'}
        >
          {isMuted ? (
            <VolumeX size={18} className="text-gray-400" />
          ) : (
            <Volume2 size={18} className="text-[#ffd700] animate-pulse" />
          )}
          <span className="hidden sm:inline">
            {isMuted ? 'SOUND OFF' : (zoneLabels[currentZone] || 'ANCIENT AUDIO')}
          </span>
        </button>

        {/* Volume Flyout on Hover */}
        {isOpen && !isMuted && (
          <div 
            onMouseLeave={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#d4af37]/40 bg-black/90 backdrop-blur-md shadow-xl"
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 accent-[#ffd700] cursor-pointer"
            />
            <span className="text-[10px] font-ancient font-mono text-[#ffd700]">
              {Math.round(volume * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* First-time prompt badge */}
      {!hasInteracted && isMuted && (
        <div 
          onClick={handleToggleMute}
          className="cursor-pointer mt-2 px-3 py-1 rounded-md border border-[#ffd700]/50 bg-black/90 text-[#ffd700] font-ancient text-[10px] tracking-wider uppercase animate-bounce shadow-lg flex items-center gap-1.5"
        >
          <Sparkles size={11} />
          <span>CLICK FOR IMMERSIVE SOUNDSCAPE</span>
        </div>
      )}
    </div>
  );
};

export default AudioMasterControl;
