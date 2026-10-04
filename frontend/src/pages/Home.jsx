import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import EventDetails from './EventDetails';
import About from './About';
import TimelinePage from './Timeline';
import FAQ from './FAQ';

const Home = () => {
  return (
    <div className="bg-[#050505]">
      {/* ==============================================
          HERO SECTION
      ============================================== */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604085449557-690a2a5ef8c8?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50"></div>
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#d4af37] rounded-full blur-[150px] opacity-10"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="border border-[#d4af37]/30 bg-black/40 backdrop-blur-sm px-4 py-1 rounded text-[#d4af37] font-ancient tracking-[0.3em] text-xs uppercase mb-6 inline-block"
          >
            Ancient Civilization
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-8xl font-ancient font-bold text-white mb-4 leading-[1.1] drop-shadow-2xl"
          >
            AVINYOTSAV<br/>
            <span className="text-gold-gradient">& HACKATHON</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-2xl text-gray-300 font-ancient tracking-[0.2em] mb-4 uppercase"
          >
            Where ancient heritage meets innovation.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-sm md:text-base text-gray-400 font-modern tracking-[0.4em] mb-12 uppercase"
          >
            Discover. Decode. Create.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link to="/register" className="bg-blue-600 hover:bg-blue-500 text-white uppercase tracking-widest font-bold px-8 py-3 rounded shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center">
              REGISTER NOW
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="hidden md:flex gap-12 mt-20 border-t border-[var(--color-card-border)] pt-8 w-full max-w-3xl"
          >
            {[
              { t1: "IDEAS", t2: "EXPLORE" },
              { t1: "PEOPLE", t2: "COLLABORATE" },
              { t1: "TECHNOLOGY", t2: "BUILD" },
              { t1: "IMPACT", t2: "CREATE TOMORROW" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[#d4af37] font-ancient tracking-widest text-sm">{item.t1}</span>
                <span className="text-gray-500 text-xs tracking-widest uppercase">{item.t2}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==============================================
          SHORT EVENT INTRODUCTION
      ============================================== */}
      <section className="py-24 px-4 bg-[#0a0a0a] border-t border-[var(--color-card-border)] relative">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-300 text-xl md:text-2xl font-ancient leading-relaxed tracking-widest">
            Ancient Civilization – Avinyotsav & Hackathon brings creativity, culture, technology and innovation together in one immersive event.
          </p>
        </div>
      </section>

      {/* ==============================================
          SECTIONS IMPORTED AS COMPONENTS
      ============================================== */}
      
      <div id="event">
        <EventDetails />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="timeline">
        <TimelinePage />
      </div>

      <div id="faq">
        <FAQ />
      </div>

      {/* ==============================================
          REGISTRATION CTA
      ============================================== */}
      <section className="relative py-32 px-4 overflow-hidden text-center border-t border-[var(--color-card-border)]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600354143497-22ce2d744b8f?q=80&w=2000')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#d4af37] rounded-[100%] blur-[150px] opacity-15"></div>
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-ancient font-bold text-white mb-6 uppercase tracking-widest drop-shadow-lg">
            Your journey into the Ancient Civilization begins here.
          </h2>
          
          <Link to="/register" className="bg-blue-600 hover:bg-blue-500 text-white uppercase tracking-widest font-bold text-lg px-12 py-4 rounded shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all inline-flex mt-8">
            REGISTER NOW
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
