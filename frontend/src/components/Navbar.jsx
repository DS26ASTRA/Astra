import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const sections = ['home', 'event', 'about', 'timeline', 'faq'];
      let current = 'home';
      
      // Check which section is in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  // Handle hash scrolling when coming from a different page
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -80; // Navbar height
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'event', label: 'Event' },
    { id: 'about', label: 'About' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'faq', label: 'FAQ' }
  ];

  const handleNavClick = (e, sectionId) => {
    setIsOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
          window.history.pushState(null, '', `/#${sectionId}`);
        }
      }
    }
  };

  const renderNavLink = (link) => {
    const isActive = location.pathname === '/' && activeSection === link.id;
    return (
      <Link 
        key={link.id}
        to={link.id === 'home' ? '/' : `/#${link.id}`} 
        onClick={(e) => handleNavClick(e, link.id)}
        className={`uppercase text-[10px] tracking-[0.15em] transition-colors ${
          isActive ? 'text-[#d4af37] font-bold border-b border-[#d4af37] pb-1' : 'text-gray-300 hover:text-[#d4af37]'
        }`}
      >
        {link.label}
      </Link>
    );
  };

  const renderMobileNavLink = (link) => {
    const isActive = location.pathname === '/' && activeSection === link.id;
    return (
      <Link 
        key={link.id}
        to={link.id === 'home' ? '/' : `/#${link.id}`} 
        onClick={(e) => handleNavClick(e, link.id)}
        className={`block px-3 py-2 rounded-md text-xs font-medium uppercase tracking-widest ${
          isActive ? 'text-[#d4af37] bg-[#1a1a1a]' : 'text-gray-300 hover:text-[#d4af37] hover:bg-[#1a1a1a]'
        }`}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <nav className="bg-[#050505]/95 backdrop-blur-md border-b border-[var(--color-card-border)] sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" onClick={(e) => handleNavClick(e, 'home')} className="font-ancient text-3xl tracking-[0.2em] text-gold-gradient font-bold uppercase">ASTRA</Link>
          </div>
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6 items-center">
              {navLinks.map(renderNavLink)}
              {role && (
                <Link to="/leaderboard" className={`uppercase text-[10px] tracking-[0.15em] transition-colors ${location.pathname === '/leaderboard' ? 'text-[#d4af37] font-bold border-b border-[#d4af37] pb-1' : 'text-gray-300 hover:text-[#d4af37]'}`}>Leaderboard</Link>
              )}
              
              {!role ? (
                <>
                  <Link to="/register" className="bg-blue-600 hover:bg-blue-500 text-white uppercase text-[10px] font-bold tracking-[0.15em] px-5 py-2.5 rounded transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] ml-2">Register</Link>
                  <Link to="/login" className="btn-primary py-2 px-6 text-[10px] ml-4">Login</Link>
                </>
              ) : (
                <>
                  {role === 'TEAM' && <Link to="/team" className="text-gray-300 hover:text-[#d4af37] uppercase text-[10px] tracking-[0.15em] ml-4">Dashboard</Link>}
                  {role === 'FACULTY' && <Link to="/faculty" className="text-gray-300 hover:text-[#d4af37] uppercase text-[10px] tracking-[0.15em] ml-4">Dashboard</Link>}
                  {role === 'ADMIN' && <Link to="/admin" className="text-gray-300 hover:text-[#d4af37] uppercase text-[10px] tracking-[0.15em] ml-4">Dashboard</Link>}
                  <button onClick={handleLogout} className="btn-secondary py-2 px-6 text-[10px] ml-4">Logout</button>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-[#d4af37] hover:text-white hover:bg-[#1a1a1a] focus:outline-none border border-[var(--color-card-border)]">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen border-b border-[var(--color-card-border)]' : 'max-h-0'}`}>
        <div className="bg-[#0a0a0a] px-2 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col shadow-2xl">
          {navLinks.map(renderMobileNavLink)}
          {role && (
            <Link to="/leaderboard" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-xs font-medium uppercase tracking-widest ${location.pathname === '/leaderboard' ? 'text-[#d4af37] bg-[#1a1a1a]' : 'text-gray-300 hover:text-[#d4af37] hover:bg-[#1a1a1a]'}`}>Leaderboard</Link>
          )}
          {!role ? (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-xs font-medium text-[#d4af37] border border-[#d4af37]/50 text-center mt-4 uppercase tracking-widest bg-black/50">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white uppercase tracking-widest text-center mt-3 shadow-[0_0_15px_rgba(37,99,235,0.4)]">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="text-left w-full block px-3 py-3 rounded-md text-xs font-medium text-[#d4af37] border border-gray-600 uppercase tracking-widest mt-4 hover:border-[#d4af37]">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
