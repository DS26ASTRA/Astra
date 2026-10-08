import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Palette, Crown, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventDetails = () => {
  const tiers = [
    {
      id: 'avinyotsav',
      title: 'AVINYOTSAV',
      price: '₹150',
      subtitle: 'Cultural & Artistic Wing',
      badge: 'CULTURAL',
      badgeColor: 'border-amber-500/50 text-amber-300 bg-amber-500/10',
      desc: 'Engage in exhibitions, classical literature, dramatic presentations, and creative arts that celebrate ancient civilization heritage.',
      highlights: [
        'Ancient Civilization Art & Artifact Exhibits',
        'Historical Debates & Oratory Sessions',
        'Visual Design & Media Showcases',
        'Certificate of Artistic Excellence'
      ],
      icon: Palette
    },
    {
      id: 'hackathon',
      title: 'HACKATHON',
      price: '₹500',
      subtitle: 'Technical Innovation Wing',
      badge: 'TECHNICAL',
      badgeColor: 'border-[#ffd700]/70 text-[#ffd700] bg-[#ffd700]/10',
      desc: 'A 24-hour intense coding marathon where teams engineer software and hardware solutions addressing problems inspired by ancient civilization.',
      highlights: [
        '24-Hour Intensive Development Sprint',
        'Mentorship from Industry Leaders & Scholars',
        'Hardware & Cloud Computing Sandbox',
        'Eligible for Grand Cash Prizes & Incubation'
      ],
      icon: Code2,
      featured: true
    },
    {
      id: 'both',
      title: 'THE COMPLETE EXPEDITION',
      price: '₹650',
      subtitle: 'All-Inclusive Full Pass',
      badge: 'RECOMMENDED',
      badgeColor: 'border-yellow-400 text-yellow-300 bg-yellow-400/20',
      desc: 'The definitive experience bridging historical wisdom and cutting-edge tech. Full access to both Avinyotsav and the Hackathon.',
      highlights: [
        'Unrestricted Access to All Tracks & Workshops',
        'Dual Certification (Artistic + Technical)',
        'VIP Networking Dinner with Judges & Speakers',
        'Exclusive Expedition Merchandise Kit'
      ],
      icon: Crown,
      bestValue: true
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Cinematic Summit Sanctuary Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/summit-throne.jpg"
          alt="Summit Sanctuary"
          className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-105 saturate-110 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#d4af37]/20 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/40 bg-black/60 text-[#ffd700] text-xs font-ancient tracking-[0.25em] uppercase mb-4">
            <Sparkles size={14} />
            <span>EXPEDITION BLUEPRINT</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-ancient font-bold text-white uppercase tracking-wider mb-4">
            EVENT <span className="text-gold-gradient">DETAILS & TIERS</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent mx-auto mb-6" />
          <p className="text-gray-300 font-ancient text-base sm:text-lg leading-relaxed">
            Avinyotsav & Hackathon is a single mega-event that bridges the gap between historical wisdom and modern technological innovation.
          </p>
        </div>

        {/* Theme Highlight Card */}
        <div className="premium-card p-8 sm:p-10 mb-16 border-[#d4af37]/40 relative overflow-hidden bg-black/60">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-[90px] pointer-events-none" />
          <div className="relative z-10">
            <div className="text-xs font-ancient tracking-[0.3em] text-[#d4af37] uppercase mb-2">
              CENTRAL ARCHETYPE
            </div>
            <h3 className="text-2xl sm:text-3xl font-ancient text-white uppercase tracking-wide mb-4">
              THE THEME: <span className="text-gold-gradient">ANCIENT CIVILIZATION</span>
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base max-w-4xl">
              This year, we draw inspiration from the world's greatest ancient civilizations—from the monumental engineering of Mesopotamia and the Indus Valley to the astronomical precision of Mesoamerica and the architectural marvels of the Roman and Maurya Empires. Participants are challenged to identify the core human challenges solved millennia ago and reinvent those solutions for tomorrow with artificial intelligence, distributed systems, clean energy, and robotics.
            </p>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-xl border p-8 flex flex-col justify-between transition-all duration-300 ${
                  tier.bestValue
                    ? 'border-[#ffd700] bg-gradient-to-b from-[#181408] to-[#0a0a0c] shadow-[0_0_35px_rgba(212,175,55,0.25)]'
                    : tier.featured
                    ? 'border-[#d4af37]/60 bg-gradient-to-b from-[#121215] to-[#08080a] shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                    : 'border-[#d4af37]/30 bg-[#0a0a0c] hover:border-[#d4af37]/60'
                }`}
              >
                {/* Top Badge */}
                {tier.bestValue && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full border border-[#ffd700] bg-[#1a1505] text-[#ffd700] font-ancient text-[10px] font-bold tracking-[0.2em] uppercase shadow-lg">
                    MOST POPULAR EXPEDITION
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg border border-[#d4af37]/30 bg-black/50 text-[#ffd700]">
                      <Icon size={24} />
                    </div>
                    <span className={`px-2.5 py-1 rounded text-[10px] font-ancient tracking-widest uppercase border ${tier.badgeColor}`}>
                      {tier.badge}
                    </span>
                  </div>

                  <h3 className="font-ancient text-2xl font-bold uppercase tracking-wider text-white mb-1">
                    {tier.title}
                  </h3>
                  <div className="text-xs text-[#d4af37] font-ancient tracking-wider uppercase mb-4">
                    {tier.subtitle}
                  </div>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="font-ancient text-4xl sm:text-5xl font-extrabold text-gold-gradient">
                      {tier.price}
                    </span>
                    <span className="text-gray-400 text-xs uppercase tracking-widest font-sans">
                      / entry pass
                    </span>
                  </div>

                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {tier.desc}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-[var(--color-card-border)] mb-8">
                    <div className="text-[11px] font-ancient tracking-widest text-[#ffd700] uppercase">
                      Included Privileges:
                    </div>
                    {tier.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <CheckCircle2 size={15} className="text-[#ffd700] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/register"
                  className={`w-full py-3 rounded text-center font-ancient text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                    tier.bestValue
                      ? 'btn-gold-epic !w-full'
                      : 'border border-[#d4af37]/60 text-[#ffd700] bg-black/40 hover:bg-[#d4af37] hover:text-black'
                  }`}
                >
                  <span>Select Expedition</span>
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EventDetails;
