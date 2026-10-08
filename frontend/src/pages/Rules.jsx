import React from 'react';
import { motion } from 'framer-motion';
import { Scroll, Shield, CheckCircle, AlertTriangle, Users, Laptop } from 'lucide-react';

const Rules = () => {
  const rulesList = [
    {
      icon: Users,
      title: "Team Composition",
      desc: "Teams must consist of 2 to 4 members. Cross-institutional and multidisciplinary teams (engineers, designers, historians) are warmly encouraged."
    },
    {
      icon: Laptop,
      title: "Original Code & Development",
      desc: "All source code, designs, and architectural prototypes must be developed during the official hackathon sprint. Open-source libraries and APIs are permitted."
    },
    {
      icon: Shield,
      title: "Intellectual Property",
      desc: "Participants retain 100% full intellectual property rights to their projects, prototypes, and code created during the hackathon."
    },
    {
      icon: Scroll,
      title: "Thematic Adherence",
      desc: "Submissions must clearly demonstrate an alignment with the Ancient Civilization archetype and address one of the designated track domains."
    },
    {
      icon: CheckCircle,
      title: "Evaluation & Scoring",
      desc: "Judging is conducted by a jury of tech architects and domain researchers evaluating Innovation (30%), Technical Execution (30%), Ancient Civilization Relevance (20%), and Presentation (20%)."
    },
    {
      icon: AlertTriangle,
      title: "Fair Play & Code of Conduct",
      desc: "Strict adherence to anti-plagiarism guidelines. Any form of harassment or unethical conduct will result in immediate disqualification."
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Cinematic Stone Ruins Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/stone-ruins-bg.jpg"
          alt="Ancient Stone Masonry"
          className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-105 saturate-110 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#ffd700]/15 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/40 bg-black/60 text-[#ffd700] text-xs font-ancient tracking-[0.25em] uppercase mb-4">
            <Scroll size={14} />
            <span>CODE OF EXPEDITION</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-ancient font-bold text-white uppercase tracking-wider mb-4">
            RULES & <span className="text-gold-gradient">GUIDELINES</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent mx-auto mb-6" />
          <p className="text-gray-300 font-ancient text-base sm:text-lg">
            Ancient civilizations stood the test of centuries because of honorable codes and rigorous standards.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rulesList.map((rule, idx) => {
            const Icon = rule.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="premium-card p-6 border-[#d4af37]/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg border border-[#d4af37]/40 bg-black/50 text-[#ffd700]">
                      <Icon size={22} />
                    </div>
                    <span className="font-ancient text-xs font-bold text-[#d4af37]/60">
                      RULE #{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-ancient text-xl font-bold text-white uppercase tracking-wider mb-3">
                    {rule.title}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Rules;
