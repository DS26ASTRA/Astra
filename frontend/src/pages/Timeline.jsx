import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, CheckCircle2 } from 'lucide-react';

const TimelinePage = () => {
  const journeySteps = [
    {
      num: "01",
      title: "EXPEDITION REGISTRATION",
      desc: "Enroll your team, elect your designated leader, and select your preferred participation domain (Avinyotsav, Hackathon, or Complete Pass).",
      status: "OPEN NOW",
      statusColor: "border-green-500/60 text-green-400 bg-green-500/10"
    },
    {
      num: "02",
      title: "TEAM FORMATION & IDEA CRUCIBLE",
      desc: "Assemble your 2-4 person cohort. Cross-disciplinary teams uniting software devs, designers, and domain thinkers are strongly encouraged.",
      status: "UPCOMING",
      statusColor: "border-[#d4af37]/60 text-[#ffd700] bg-[#d4af37]/10"
    },
    {
      num: "03",
      title: "EXPEDITION DAY & CHECK-IN",
      desc: "Present your authenticated encrypted QR pass at the campus checkpoint. Collect your official expedition badge and team access kit.",
      status: "FEB 10",
      statusColor: "border-blue-500/50 text-blue-300 bg-blue-500/10"
    },
    {
      num: "04",
      title: "BUILD, CODE & TRANSCEND",
      desc: (
        <div className="space-y-3 mt-3">
          <p className="text-gray-300 text-xs sm:text-sm">
            A non-stop 24-hour sprint in dedicated high-speed innovation bays with round-the-clock mentor support and midnight refreshments.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            <div className="bg-black/60 p-3 rounded border border-[#d4af37]/30">
              <h4 className="text-[10px] text-[#ffd700] uppercase tracking-widest font-ancient mb-1">
                For Hackathon Builders:
              </h4>
              <p className="text-xs text-gray-400 font-mono">
                IDEATE → CODE → HARDEN → SHIP
              </p>
            </div>
            <div className="bg-black/60 p-3 rounded border border-[#d4af37]/30">
              <h4 className="text-[10px] text-[#ffd700] uppercase tracking-widest font-ancient mb-1">
                For Avinyotsav Creators:
              </h4>
              <p className="text-xs text-gray-400 font-mono">
                CURATE → DESIGN → PERFORM → EXHIBIT
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      num: "05",
      title: "GRAND JURY EVALUATION",
      desc: "Present your functioning code repository, live interactive demo, and architectural deck to our esteemed jury of industry tech leaders and domain scholars."
    },
    {
      num: "06",
      title: "FINAL SCORES & VERIFICATION",
      desc: "Scores are rigorously calculated and finalized across Innovation, Engineering Execution, and Thematic Alignment."
    },
    {
      num: "07",
      title: "VICTORY & RECOGNITION",
      desc: "Podium announcement, distribution of ₹1,50,000+ prize pool, special category citations, verified certificates, and startup incubation referrals."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pt-24 pb-20">
      {/* Cinematic Cliffside Pilgrimage Path Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/cliff-path.jpg"
          alt="Cliffside Pilgrimage Path"
          className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-105 saturate-110 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/25" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#d4af37]/20 rounded-full blur-[150px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/40 bg-black/60 text-[#ffd700] text-xs font-ancient tracking-[0.25em] uppercase mb-4">
            <Compass size={14} />
            <span>THE SACRED PATH</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-ancient text-white uppercase tracking-[0.12em] mb-4 text-gold-chiseled"
          >
            JOURNEY THROUGH THE EVENT
          </motion.h1>
          <p className="text-[#ffd700] font-ancient tracking-[0.3em] text-sm uppercase">
            THE PATH TO GLORY — 7 PHASES OF ASCENT
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Vertical Glowing Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#ffd700]/70 via-[#d4af37]/40 to-transparent md:-translate-x-1/2 shadow-[0_0_10px_rgba(255,215,0,0.3)]" />

          <div className="space-y-12">
            {journeySteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                
                {/* Center Node / Mobile Left Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-2 border-[#ffd700] bg-[#0a0a0e] flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                  <div className="w-4 h-4 bg-gradient-to-r from-[#ffd700] to-[#d4af37] rounded-full animate-pulse" />
                </div>

                {/* Content Box */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                  index % 2 === 0 ? 'md:text-left md:pr-14' : 'md:text-right md:pl-14'
                }`}>
                  <div className="premium-card p-7 group relative overflow-hidden border-[#d4af37]/35 hover:border-[#ffd700]">
                    
                    {/* Big Ancient Background Number */}
                    <div className="absolute -bottom-4 -right-2 text-8xl font-ancient text-white/5 font-bold transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none">
                      {step.num}
                    </div>

                    <div className="relative z-10">
                      <div className={`flex items-center gap-3 mb-3 ${
                        index % 2 === 0 ? '' : 'md:justify-end'
                      }`}>
                        <span className="font-ancient text-2xl font-bold text-[#ffd700]">
                          {step.num}
                        </span>
                        <h3 className="font-ancient text-lg sm:text-xl font-bold text-white tracking-wider uppercase group-hover:text-[#ffd700] transition-colors">
                          {step.title}
                        </h3>
                      </div>
                      
                      {typeof step.desc === 'string' ? (
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      ) : (
                        step.desc
                      )}

                      {step.status && (
                        <div className={`inline-block mt-4 px-3 py-1 rounded-full text-[10px] font-ancient font-bold tracking-widest uppercase border ${step.statusColor}`}>
                          STATUS: {step.status}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TimelinePage;
