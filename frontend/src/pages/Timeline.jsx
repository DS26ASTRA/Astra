import React from 'react';
import { motion } from 'framer-motion';

const TimelinePage = () => {
  const journeySteps = [
    {
      num: "01",
      title: "REGISTRATION",
      desc: "Register your team and select your participation option.",
      status: "Open"
    },
    {
      num: "02",
      title: "TEAM FORMATION",
      desc: "Build your team and prepare your idea."
    },
    {
      num: "03",
      title: "EVENT DAY",
      desc: "Check in at the venue and participate in the event."
    },
    {
      num: "04",
      title: "BUILD & CREATE",
      desc: (
        <div className="space-y-4 mt-4">
          <div className="bg-black/40 p-4 rounded border border-[var(--color-card-border)]">
            <h4 className="text-xs text-gray-400 uppercase tracking-widest mb-2">For Hackathon participants</h4>
            <p className="text-[#d4af37] font-bold tracking-[0.2em] text-[10px] sm:text-xs">IDEATE → DEVELOP → TEST → PRESENT</p>
          </div>
          <div className="bg-black/40 p-4 rounded border border-[var(--color-card-border)]">
            <h4 className="text-xs text-gray-400 uppercase tracking-widest mb-2">For Avinyotsav participants</h4>
            <p className="text-[#d4af37] font-bold tracking-[0.2em] text-[10px] sm:text-xs">EXPLORE → CREATE → PERFORM → PRESENT</p>
          </div>
        </div>
      )
    },
    {
      num: "05",
      title: "EVALUATION",
      desc: "Faculty/judges evaluate participating teams according to predefined criteria."
    },
    {
      num: "06",
      title: "RESULTS",
      desc: "Scores are finalized and qualified teams/winners are announced."
    },
    {
      num: "07",
      title: "RECOGNITION",
      desc: "Certificates, prizes and special recognitions are provided."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050505] pt-24 pb-20">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600354143497-22ce2d744b8f?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-ancient text-white uppercase tracking-[0.15em] mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          >
            JOURNEY THROUGH THE EVENT
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#d4af37] tracking-widest text-sm uppercase"
          >
            The Path to Glory
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-8 bottom-8 w-[2px] bg-[var(--color-card-border)] md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {journeySteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* Center Node / Mobile Left Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-[#d4af37] bg-[#050505] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                  <div className="w-3 h-3 bg-[#d4af37] rounded-full"></div>
                </div>

                {/* Content */}
                <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${index % 2 === 0 ? 'md:text-left md:pr-12' : 'md:text-right md:pl-12'}`}>
                  <div className="premium-card p-8 group relative overflow-hidden">
                    
                    {/* Number Background */}
                    <div className="absolute -bottom-6 -right-6 text-9xl font-ancient text-white/5 font-bold transition-transform duration-500 group-hover:scale-110 pointer-events-none select-none">
                      {step.num}
                    </div>

                    <div className="relative z-10">
                      <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                        <span className="text-3xl font-ancient text-[#d4af37]">{step.num}</span>
                        <h3 className="text-xl font-ancient text-white tracking-widest uppercase">{step.title}</h3>
                      </div>
                      
                      {typeof step.desc === 'string' ? (
                        <p className="text-gray-400 tracking-wide text-sm leading-relaxed">{step.desc}</p>
                      ) : (
                        step.desc
                      )}

                      {step.status && (
                        <div className={`inline-block mt-6 px-4 py-1 rounded text-xs font-bold tracking-widest uppercase border ${step.status === 'Open' ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-[#d4af37]/50 text-[#d4af37] bg-[#d4af37]/10'}`}>
                          Status: {step.status}
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
