import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Key, ArrowRight, ArrowLeft } from 'lucide-react';

const FacultyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const fillCredentials = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/auth/faculty/login`, { email, password });
      if (res.data.success) {
        login(res.data.data, 'FACULTY', res.data.data.token);
        navigate('/faculty');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#030303] px-4 py-20 overflow-hidden select-none">
      {/* Cinematic Background Scenery */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/images/ancient-library.jpg"
          alt="Ancient Archives"
          className="w-full h-full object-cover opacity-25 filter blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-black/70 to-[#030303]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ffd700]/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Back Link */}
        <Link 
          to="/login" 
          className="inline-flex items-center gap-2 text-xs font-ancient tracking-widest text-[#d4af37] hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          <span>BACK TO PORTALS</span>
        </Link>

        <div className="rounded-2xl border border-[#d4af37]/40 bg-[#0a0a0c]/90 backdrop-blur-xl p-8 sm:p-10 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl border border-[#ffd700]/50 bg-black/60 flex items-center justify-center text-[#ffd700] shadow-[0_0_20px_rgba(255,215,0,0.3)]">
              <GraduationCap size={26} />
            </div>
            <h2 className="text-3xl font-ancient font-black text-white uppercase tracking-widest text-gold-chiseled mb-2">
              FACULTY PORTAL
            </h2>
            <p className="text-xs font-ancient tracking-widest text-gray-400 uppercase">
              Grand Mentors & Jury Council
            </p>
          </div>

          {/* Quick Demo Credentials Autofill Banner */}
          <div className="mb-6 p-4 rounded-xl border border-[#ffd700]/30 bg-[#ffd700]/5 backdrop-blur-sm">
            <span className="text-[11px] font-ancient font-bold tracking-wider text-[#ffd700] flex items-center gap-1.5 uppercase mb-2">
              <Key size={13} />
              <span>1-CLICK DEMO CREDENTIALS:</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillCredentials('faculty.demo@ancientcivilization.test', 'Faculty@123')}
                className="px-3 py-2 rounded border border-[#d4af37]/40 bg-black/50 hover:bg-[#d4af37]/20 text-left transition-colors text-gray-200"
              >
                <div className="font-bold text-[#ffd700] text-[11px] truncate">faculty.demo@...</div>
                <div className="text-[10px] text-gray-400 font-mono">Faculty@123</div>
              </button>
              <button
                type="button"
                onClick={() => fillCredentials('faculty@astra.com', 'faculty123')}
                className="px-3 py-2 rounded border border-[#d4af37]/40 bg-black/50 hover:bg-[#d4af37]/20 text-left transition-colors text-gray-200"
              >
                <div className="font-bold text-[#ffd700] text-[11px]">faculty@astra.com</div>
                <div className="text-[10px] text-gray-400 font-mono">faculty123</div>
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-950/80 border border-red-500/80 text-red-200 text-xs px-4 py-3 rounded-lg mb-6 tracking-wide">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-ancient tracking-widest text-gray-300 uppercase mb-2">
                Faculty Email Address
              </label>
              <input 
                required 
                type="email" 
                className="w-full px-4 py-3 rounded-lg border border-[#d4af37]/40 bg-black/60 text-white placeholder-gray-500 text-sm focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700] outline-none transition-all"
                placeholder="faculty.demo@ancientcivilization.test"
                value={email} 
                onChange={e => setEmail(e.target.value)} 
              />
            </div>

            <div>
              <label className="block text-xs font-ancient tracking-widest text-gray-300 uppercase mb-2">
                Council Password
              </label>
              <input 
                required 
                type="password" 
                className="w-full px-4 py-3 rounded-lg border border-[#d4af37]/40 bg-black/60 text-white placeholder-gray-500 text-sm focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700] outline-none transition-all"
                placeholder="••••••••"
                value={password} 
                onChange={e => setPassword(e.target.value)} 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="btn-gold-epic w-full !py-3.5 flex items-center justify-center gap-2 mt-4"
            >
              <span>{loading ? 'AUTHENTICATING COUNCIL...' : 'ENTER JURY CHAMBER'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-8 text-center border-t border-[#d4af37]/20 pt-5">
            <p className="text-gray-400 text-xs font-ancient tracking-wider">
              Need new faculty credentials?{' '}
              <Link to="/faculty-register" className="text-[#ffd700] font-bold hover:underline ml-1">
                Request Access Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyLogin;
