import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Cpu, Landmark, ShieldAlert, Droplets, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Tracks = () => {
  const tracksList = [
    {
      id: 'ai-archaeology',
      title: 'AI & COMPUTATIONAL ARCHAEOLOGY',
      subtitle: 'The Digital Scribe',
      icon: Cpu,
      desc: 'Harness LLMs, computer vision, and neural radiance fields (NeRF) to decipher ancient scripts, reconstruct weathered hieroglyphs, and digitally preserve endangered heritage.',
      examples: [
        'Deciphering undeciphered scripts (e.g. Indus script, Linear A)',
        '3D artifact reassembly from fractured photogrammetry',
        'Satellite imagery detection of buried ancient settlements'
      ]
    },
    {
      id: 'sustainable-engineering',
      title: 'ANCIENT LOGISTICS & CLEAN HYDRAULICS',
      subtitle: 'The Aqueduct of Tomorrow',
      icon: Droplets,
      desc: 'Revitalize stepwells (Baolis), Roman volcanic concrete principles, and natural passive solar architecture into resilient smart city designs.',
      examples: [
        'Decentralized urban water distribution inspired by Harappan drainage',
        'Zero-emission passive thermal cooling building models',
        'Disaster-resilient architectural structures using ancient interlocking masonry'
      ]
    },
    {
      id: 'decentralized-governance',
      title: 'TRADE NETWORKS & DECENTRALIZED PROTOCOLS',
      subtitle: 'The Silk Route Ledger',
      icon: Landmark,
      desc: 'Model cryptographic ledgers, trust networks, and secure supply chains drawing inspiration from the global trade routes and token systems of antiquity.',
      examples: [
        'Decentralized identity & provenance verification for cultural antiquities',
        'P2P autonomous bartering and micro-settlement frameworks',
        'Fraud-proof supply chain registries for global artisans'
      ]
    },
    {
      id: 'sacred-geometry',
      title: 'OPEN INNOVATION & ASTRONOMICAL PRECISION',
      subtitle: 'The Celestial Observatory',
      icon: Compass,
      desc: 'Apply ancient astronomical algorithms, solar tracking, and mathematical harmonies to modern aerospace, sensor grids, and climate prediction models.',
      examples: [
        'Astronomical alignment algorithms for renewable solar arrays',
        'Sacred geometry heuristics for generative design and robotics',
        'Open innovation addressing modern UN Sustainable Development Goals'
      ]
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Cinematic Jungle Ruins Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/jungle-ruins.jpg"
          alt="Jungle Ruins"
          className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-105 saturate-115 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-black/25" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffd700]/15 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/40 bg-black/60 text-[#ffd700] text-xs font-ancient tracking-[0.25em] uppercase mb-4">
            <Compass size={14} />
            <span>EXPEDITION DOMAINS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-ancient font-bold text-white uppercase tracking-wider mb-4">
            HACKATHON <span className="text-gold-gradient">TRACKS & THEMES</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent mx-auto mb-6" />
          <p className="text-gray-300 font-ancient text-base sm:text-lg">
            Choose your expedition track and engineer solutions that unite ancient human ingenuity with cutting-edge 21st-century tech.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tracksList.map((track, idx) => {
            const Icon = track.icon;
            return (
              <motion.div
                key={track.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="premium-card p-8 border-[#d4af37]/35 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3.5 rounded-lg border border-[#d4af37]/40 bg-black/60 text-[#ffd700] group-hover:scale-105 group-hover:border-[#ffd700] transition-all duration-300">
                      <Icon size={26} />
                    </div>
                    <span className="font-ancient text-2xl font-bold text-[#d4af37]/40 group-hover:text-[#ffd700] transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="text-[11px] font-ancient tracking-[0.25em] text-[#d4af37] uppercase mb-2">
                    {track.subtitle}
                  </div>
                  <h3 className="font-ancient text-xl sm:text-2xl font-bold text-white uppercase tracking-wider mb-4 group-hover:text-[#ffd700] transition-colors">
                    {track.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {track.desc}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-[var(--color-card-border)] mb-6">
                    <div className="text-[11px] font-ancient tracking-widest text-gray-400 uppercase">
                      Potential Project Directions:
                    </div>
                    {track.examples.map((ex, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <span className="text-[#d4af37] mt-0.5">✦</span>
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 text-xs font-ancient tracking-widest uppercase text-[#ffd700] hover:text-white transition-colors pt-2 group/btn"
                >
                  <span>Build For This Track</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Tracks;
