import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Flame, Lightbulb, Users2, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Challenge = () => {
  const challenges = [
    {
      title: "Problem Statement 01: The Resilient City",
      tagline: "Water, Waste & Climate Adaptation",
      desc: "Modern cities face unprecedented climate stressors—droughts, floods, and energy grid collapses. Ancient metropolises like Mohenjo-Daro, Petra, and Rome thrived in arid climates through revolutionary passive engineering and water catchment.",
      prompt: "Build an IoT, AI, or Web3 system that applies ancient environmental adaptation techniques to solve modern urban climate resilience."
    },
    {
      title: "Problem Statement 02: Preserving Lost Wisdom",
      tagline: "Deciphering Weathered Inscriptions & Epigraphy",
      desc: "Millions of ancient palm-leaf manuscripts, stone stelae, and clay tablets remain untranslated and deteriorating in archives worldwide due to language bottlenecks and physical decay.",
      prompt: "Engineer an open multimodal AI platform that digitizes, transcribes, restores missing fragments, and cross-references multi-dialect ancient historical texts."
    },
    {
      title: "Problem Statement 03: Decentralized Trust & Commons",
      tagline: "Resource Governance & Community Co-ops",
      desc: "Ancient communal commons (irrigation panchayats, guild ledgers, seed banks) operated on peer accountability without centralized bureaucratic bottlenecks.",
      prompt: "Design a decentralized application (dApp) or governance dashboard enabling transparent, verifiable resource pooling and micro-credits for modern communities."
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Cinematic Ancient Archive Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/ancient-library.jpg"
          alt="Ancient Mountain Archive"
          className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-105 saturate-110 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/25" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#ffd700]/15 rounded-full blur-[150px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/40 bg-black/60 text-[#ffd700] text-xs font-ancient tracking-[0.25em] uppercase mb-4">
            <Target size={14} />
            <span>THE MISSION STATEMENT</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-ancient font-bold text-white uppercase tracking-wider mb-4">
            THE GRAND <span className="text-gold-gradient">CHALLENGE</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent mx-auto mb-6" />
          <p className="text-gray-300 font-ancient text-base sm:text-lg">
            "The answers to tomorrow's greatest crises were already etched in stone millennia ago. Your mission is to decode and deploy them."
          </p>
        </div>

        {/* Prize Pool & Highlights Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="premium-card p-6 text-center border-[#d4af37]/40">
            <div className="w-12 h-12 rounded-full border border-[#ffd700]/50 bg-[#ffd700]/10 flex items-center justify-center mx-auto mb-3 text-[#ffd700]">
              <Award size={24} />
            </div>
            <div className="font-ancient text-3xl font-extrabold text-gold-gradient mb-1">₹1,50,000+</div>
            <div className="font-ancient text-xs tracking-widest text-gray-400 uppercase">Total Prize Pool & Grants</div>
          </div>

          <div className="premium-card p-6 text-center border-[#d4af37]/40">
            <div className="w-12 h-12 rounded-full border border-[#ffd700]/50 bg-[#ffd700]/10 flex items-center justify-center mx-auto mb-3 text-[#ffd700]">
              <Flame size={24} />
            </div>
            <div className="font-ancient text-3xl font-extrabold text-gold-gradient mb-1">24 Hours</div>
            <div className="font-ancient text-xs tracking-widest text-gray-400 uppercase">Non-Stop Sprint & Mentorship</div>
          </div>

          <div className="premium-card p-6 text-center border-[#d4af37]/40">
            <div className="w-12 h-12 rounded-full border border-[#ffd700]/50 bg-[#ffd700]/10 flex items-center justify-center mx-auto mb-3 text-[#ffd700]">
              <Rocket size={24} />
            </div>
            <div className="font-ancient text-3xl font-extrabold text-gold-gradient mb-1">Incubation</div>
            <div className="font-ancient text-xs tracking-widest text-gray-400 uppercase">Direct VC & Accelerator Fast-Track</div>
          </div>
        </div>

        {/* Challenge Cards */}
        <div className="space-y-6">
          {challenges.map((c, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 6 }}
              transition={{ duration: 0.25 }}
              className="premium-card p-8 border-[#d4af37]/35 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
            >
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-ancient text-xs tracking-[0.25em] text-[#ffd700] uppercase font-bold">
                    {c.tagline}
                  </span>
                </div>
                <h3 className="font-ancient text-2xl font-bold text-white uppercase tracking-wide mb-3">
                  {c.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {c.desc}
                </p>
                <div className="p-3.5 rounded bg-black/60 border border-[#d4af37]/25 text-xs text-amber-200/90 font-mono">
                  <strong className="text-[#ffd700] font-ancient uppercase tracking-wider block mb-1">
                    Hackathon Directive:
                  </strong>
                  {c.prompt}
                </div>
              </div>

              <Link
                to="/register"
                className="btn-gold-epic whitespace-nowrap !text-xs self-stretch md:self-auto text-center"
              >
                <span>Accept Challenge</span>
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Challenge;
