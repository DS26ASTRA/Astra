import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Key, Shield, GraduationCap, Users } from 'lucide-react';

const LoginSelection = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#030303] flex items-center justify-center py-20 select-none">
      {/* Cinematic Lost City Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-lost-city.jpg"
          alt="Lost City"
          className="w-full h-full object-cover opacity-20 filter blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-[#030303]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#ffd700]/10 rounded-full blur-[160px] pointer-events-none" />
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#d4af37]/50 bg-black/60 text-[#ffd700] text-xs font-ancient tracking-[0.25em] uppercase mb-4"
          >
            <span>ASTRA SANCTUARY</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-ancient font-black text-white tracking-[0.15em] uppercase mb-3 text-gold-chiseled"
          >
            EXPEDITION ACCESS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#d4af37] tracking-[0.3em] text-xs sm:text-sm uppercase font-semibold"
          >
            Choose your gateway into the lost civilization
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Team Portal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-[#d4af37]/35 bg-[#0a0a0c]/85 backdrop-blur-xl p-8 flex flex-col items-center text-center group hover:border-[#ffd700] hover:shadow-[0_0_35px_rgba(212,175,55,0.25)] transition-all"
          >
            <div className="w-16 h-16 rounded-2xl border border-[#d4af37]/40 bg-black/60 mb-6 flex items-center justify-center text-[#ffd700] group-hover:scale-110 transition-transform">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-ancient font-bold text-white uppercase tracking-widest mb-2 group-hover:text-[#ffd700] transition-colors">
              Team Portal
            </h3>
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-6 leading-relaxed">
              Expedition Adventurers, Dossier & Live Ascent
            </p>
            <Link to="/team/login" className="btn-gold-epic w-full !py-3 !text-xs mt-auto">
              ENTER AS TEAM
            </Link>
          </motion.div>

          {/* Faculty Portal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border border-[#ffd700]/60 bg-gradient-to-b from-[#121008]/90 to-[#0a0a0c]/90 backdrop-blur-xl p-8 flex flex-col items-center text-center group shadow-[0_0_40px_rgba(255,215,0,0.15)] transform md:-translate-y-3 hover:border-[#ffd700] transition-all"
          >
            <div className="w-16 h-16 rounded-2xl border border-[#ffd700]/70 bg-[#ffd700]/10 mb-6 flex items-center justify-center text-[#ffd700] group-hover:scale-110 transition-transform">
              <GraduationCap size={30} />
            </div>
            <h3 className="text-xl font-ancient font-bold text-[#ffd700] uppercase tracking-widest mb-2">
              Faculty Portal
            </h3>
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-6 leading-relaxed">
              Jury Evaluation, Scoring Criteria & Mentorship
            </p>
            <Link to="/faculty/login" className="btn-gold-epic w-full !py-3 !text-xs mt-auto">
              ENTER AS FACULTY
            </Link>
          </motion.div>

          {/* Admin Portal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl border border-[#d4af37]/35 bg-[#0a0a0c]/85 backdrop-blur-xl p-8 flex flex-col items-center text-center group hover:border-[#ffd700] hover:shadow-[0_0_35px_rgba(212,175,55,0.25)] transition-all"
          >
            <div className="w-16 h-16 rounded-2xl border border-[#d4af37]/40 bg-black/60 mb-6 flex items-center justify-center text-[#ffd700] group-hover:scale-110 transition-transform">
              <Shield size={28} />
            </div>
            <h3 className="text-xl font-ancient font-bold text-white uppercase tracking-widest mb-2 group-hover:text-[#ffd700] transition-colors">
              Admin Portal
            </h3>
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-6 leading-relaxed">
              Event Command, Allocation, Teams & Analytics
            </p>
            <Link to="/admin/login" className="btn-gold-epic w-full !py-3 !text-xs mt-auto">
              ENTER AS ADMIN
            </Link>
          </motion.div>
        </div>

        {/* Credentials Overview Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-xl border border-[#d4af37]/40 bg-[#09090c]/90 backdrop-blur-md p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-[#ffd700] font-ancient text-xs font-bold tracking-widest uppercase">
            <Key size={16} />
            <span>AUTHENTICATION CREDENTIALS REFERENCE:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-ancient">
            <div className="p-3 rounded-lg border border-[#d4af37]/25 bg-black/40">
              <div className="text-[#ffd700] font-bold mb-1">SUPER ADMIN</div>
              <div className="text-gray-300">Email: <span className="text-white font-mono">admin@astra.com</span></div>
              <div className="text-gray-300">Pass: <span className="text-[#ffd700] font-mono">admin123</span></div>
              <div className="text-[10px] text-gray-500 mt-1">Or: admin.demo@ancientcivilization.test / Admin@123</div>
            </div>

            <div className="p-3 rounded-lg border border-[#d4af37]/25 bg-black/40">
              <div className="text-[#ffd700] font-bold mb-1">FACULTY JURY</div>
              <div className="text-gray-300 truncate">Email: <span className="text-white font-mono">faculty.demo@ancientcivilization.test</span></div>
              <div className="text-gray-300">Pass: <span className="text-[#ffd700] font-mono">Faculty@123</span></div>
              <div className="text-[10px] text-gray-500 mt-1">Or: faculty@astra.com / faculty123</div>
            </div>

            <div className="p-3 rounded-lg border border-[#d4af37]/25 bg-black/40">
              <div className="text-[#ffd700] font-bold mb-1">TEAM PARTICIPANT</div>
              <div className="text-gray-300 truncate">Email: <span className="text-white font-mono">team.demo@ancientcivilization.test</span></div>
              <div className="text-gray-300">Pass: <span className="text-[#ffd700] font-mono">Team@123</span></div>
              <div className="text-[10px] text-gray-500 mt-1">Or: team@astra.com / team123</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginSelection;
