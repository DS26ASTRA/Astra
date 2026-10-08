import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { ancientSoundscape } from '../utils/ancientSoundscape';

const Navbar = () => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const muted = ancientSoundscape.toggleMute();
    setIsMuted(muted);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Nav links matching reference storyboard top bar
  const navLinks = [
    { id: 'home', label: 'Home', progress: 0.00 },
    { id: 'about', label: 'About', progress: 0.30 },
    { id: 'themes', label: 'Themes', progress: 0.45 },
    { id: 'rules', label: 'Rules', progress: 0.58 },
    { id: 'schedule', label: 'Schedule', progress: 0.70 },
    { id: 'teams', label: 'Teams', progress: 0.85 },
    { id: 'leaderboard', label: 'Leaderboard', progress: 0.95 },
    { id: 'contact', label: 'Contact', progress: 1.00 }
  ];

  const handleNavClick = (e, link) => {
    setIsOpen(false);
    ancientSoundscape.playStoneClick();

    if (location.pathname === '/') {
      e.preventDefault();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const targetY = link.progress * maxScroll;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    } else {
      navigate(`/?trek=${link.progress}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-[2px] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo matching storyboard */}
          <Link
            to="/"
            onClick={() => {
              ancientSoundscape.playStoneClick();
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 select-none group"
          >
            <span className="font-ancient text-sm text-[#ffd700]">▲</span>
            <span className="font-ancient text-xl sm:text-2xl font-black tracking-[0.25em] text-white group-hover:text-[#ffd700] transition-colors">
              ASTRA
            </span>
          </Link>

          {/* Center Navigation Links matching storyboard */}
          <div className="hidden lg:flex items-center space-x-7 xl:space-x-9">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={(e) => handleNavClick(e, link)}
                className="font-ancient text-[11px] tracking-[0.2em] uppercase transition-colors text-gray-300 hover:text-[#ffd700] cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3.5">
            {/* Ambient Soundscape Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? "Unmute Ambient Soundscape" : "Mute Soundscape"}
              className="p-1.5 rounded-full text-gray-400 hover:text-[#ffd700] transition-colors cursor-pointer"
            >
              {!isMuted ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {!role ? (
              <div className="flex items-center space-x-5">
                <Link
                  to="/login"
                  className="font-ancient text-[11px] text-[#ffd700] tracking-[0.2em] uppercase hover:text-white transition-colors"
                >
                  PORTAL
                </Link>
                <Link
                  to="/login"
                  className="font-ancient text-[11px] text-gray-300 tracking-[0.2em] uppercase hover:text-[#ffd700] transition-colors"
                >
                  LOGIN
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-5">
                <Link 
                  to={role === 'ADMIN' ? '/admin' : role === 'FACULTY' ? '/faculty' : '/team'} 
                  className="font-ancient text-[11px] text-[#ffd700] tracking-[0.2em] uppercase hover:text-white transition-colors"
                >
                  PORTAL
                </Link>
                <button
                  onClick={handleLogout}
                  className="font-ancient text-[11px] text-gray-300 tracking-[0.2em] uppercase hover:text-red-400 transition-colors cursor-pointer"
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden space-x-2">
            <button
              onClick={toggleSound}
              className="p-1.5 text-gray-400"
            >
              {!isMuted ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-1.5 text-gray-300 hover:text-white"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[400px] bg-black/90 border-b border-gray-800' : 'max-h-0'
        }`}
      >
        <div className="px-6 pt-2 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={(e) => handleNavClick(e, link)}
              className="block w-full text-left py-1.5 font-ancient text-xs tracking-widest text-gray-300 hover:text-[#ffd700] uppercase"
            >
              {link.label}
            </button>
          ))}
          {!role && (
            <div className="pt-3 border-t border-gray-800">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center py-2 rounded-full border border-gray-700 font-ancient text-xs tracking-widest text-white uppercase"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
