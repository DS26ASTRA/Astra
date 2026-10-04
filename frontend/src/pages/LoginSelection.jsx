import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginSelection = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050505] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599939571322-792a326cb789?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-ancient text-white tracking-[0.2em] uppercase mb-4"
          >
            WELCOME BACK
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#d4af37] tracking-widest text-sm uppercase"
          >
            Choose your portal
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="premium-card p-10 flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 rounded-full border border-[var(--color-card-border)] mb-6 flex items-center justify-center text-[#d4af37] group-hover:border-[#d4af37] transition-colors">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="text-xl font-ancient text-white uppercase tracking-widest mb-2">Team Portal</h3>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-8">Access your dashboard</p>
            <Link to="/team/login" className="btn-primary w-full">TEAM LOGIN</Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="premium-card p-10 flex flex-col items-center text-center group border-[#d4af37]/30 shadow-[0_0_30px_rgba(212,175,55,0.05)] transform md:-translate-y-4"
          >
            <div className="w-16 h-16 rounded-full border border-[#d4af37]/50 mb-6 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37]/10 transition-colors">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <h3 className="text-xl font-ancient text-white uppercase tracking-widest mb-2">Faculty Portal</h3>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-8">Evaluate & Manage</p>
            <Link to="/faculty/login" className="btn-primary w-full bg-[#d4af37]/20 border-[#d4af37]">FACULTY LOGIN</Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="premium-card p-10 flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 rounded-full border border-[var(--color-card-border)] mb-6 flex items-center justify-center text-gray-500 group-hover:text-gray-300 transition-colors">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h3 className="text-xl font-ancient text-gray-400 uppercase tracking-widest mb-2">Admin Portal</h3>
            <p className="text-gray-600 text-xs uppercase tracking-wider mb-8">Event Management</p>
            <Link to="/admin/login" className="btn-secondary w-full text-gray-400 border-gray-600 hover:text-white hover:border-gray-400">ADMIN LOGIN</Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection;
