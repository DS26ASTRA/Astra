import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Search, Sparkles } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'GENERAL', 'REGISTRATION', 'HACKATHON', 'PAYMENT', 'EVALUATION'];

  const faqs = [
    {
      category: 'GENERAL',
      q: "What is ASTRA?",
      a: "ASTRA is a premier national-level innovation and technology expedition that brings together creativity, problem-solving, collaboration, and high-impact engineering through Avinyotsav & Hackathon under the grand theme of Ancient Civilization."
    },
    {
      category: 'GENERAL',
      q: "What is Avinyotsav?",
      a: "Avinyotsav is the cultural, artistic, and philosophical wing of ASTRA, giving participants a grand stage to showcase historical exhibits, classical literature, dramatic presentations, and creative expression."
    },
    {
      category: 'HACKATHON',
      q: "What is the Hackathon?",
      a: "The Hackathon is the flagship 24-hour engineering marathon of ASTRA, where teams tackle ancient civilization-inspired problem statements and forge practical, production-ready software and hardware solutions."
    },
    {
      category: 'REGISTRATION',
      q: "Are Avinyotsav and Hackathon separate events?",
      a: "No. Both exist under the unified ASTRA banner. Teams can register specifically for Avinyotsav, the Hackathon, or choose the complete expedition pass covering both."
    },
    {
      category: 'PAYMENT',
      q: "What are the registration fees?",
      a: "• Avinyotsav Cultural Wing: ₹150\n• Hackathon Technical Wing: ₹500\n• The Complete Expedition Pass (Both Wings): ₹650"
    },
    {
      category: 'REGISTRATION',
      q: "Can I participate in both wings?",
      a: "Yes! Choosing the Complete Expedition option (₹650) grants your team complete access to both cultural showcases and the 24-hour technical coding marathon."
    },
    {
      category: 'REGISTRATION',
      q: "Who is eligible to participate?",
      a: "Undergraduate and postgraduate students from recognized colleges and universities across all disciplines (Engineering, Design, Humanities, Arts) who meet the event eligibility criteria."
    },
    {
      category: 'REGISTRATION',
      q: "Can I register as a solo participant?",
      a: "Teams typically consist of 2 to 4 members to promote interdisciplinary collaboration. Check the registration portal for specific track minimums."
    },
    {
      category: 'REGISTRATION',
      q: "How will I receive my Team ID?",
      a: "Upon successful registration and payment confirmation, your unique Team ID is instantly generated and displayed on your verified team dashboard and email confirmation."
    },
    {
      category: 'REGISTRATION',
      q: "How do teams authenticate into the portal?",
      a: "You log in using your registered team leader email address and secure password. Your Team ID is your event badge number and identification token."
    },
    {
      category: 'PAYMENT',
      q: "How is online payment verified?",
      a: "Payments are processed securely via the online gateway. Once verified, your status automatically shifts to 'Confirmed' and grants access to your QR pass."
    },
    {
      category: 'PAYMENT',
      q: "Can I access an official payment receipt?",
      a: "Yes. Downloadable tax-compliant digital invoices and receipts are accessible at any time within your authenticated team dashboard."
    },
    {
      category: 'GENERAL',
      q: "What amenities are provided during the 24-hour hackathon?",
      a: "High-speed optical fiber WiFi, dedicated team bays, hardware sandbox kits, round-the-clock refreshments, midnight meals, and mentor check-ins."
    },
    {
      category: 'GENERAL',
      q: "How does event-day check-in work?",
      a: "Each confirmed team receives a digital encrypted QR pass in their dashboard. Simply present the QR code at the campus entry gate for instantaneous verification."
    },
    {
      category: 'EVALUATION',
      q: "How are Hackathon projects evaluated?",
      a: "Projects undergo rigorous assessment based on Innovation (30%), Technical Execution (30%), Ancient Civilization Thematic Relevance (20%), and Presentation / Viability (20%)."
    },
    {
      category: 'EVALUATION',
      q: "Who sits on the judging panel?",
      a: "The panel consists of industry technology architects, senior engineering leaders, university faculty, and domain researchers."
    },
    {
      category: 'EVALUATION',
      q: "Will all participants receive certificates?",
      a: "Yes, all verified participants receive an official digital certificate of participation, with podium teams receiving engraved trophies, certificates of merit, and cash prizes."
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'ALL' || faq.category === activeCategory;
    const matchesQuery = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-24 pb-20">
      {/* Cinematic Ancient Archive Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/ancient-library.jpg"
          alt="Ancient Archives"
          className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-105 saturate-110 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/25" />
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#ffd700]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#d4af37]/20 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/40 bg-black/60 text-[#ffd700] text-xs font-ancient tracking-[0.25em] uppercase mb-4">
            <HelpCircle size={14} />
            <span>KNOWLEDGE ARCHIVES</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-ancient text-white uppercase tracking-[0.15em] mb-4 text-gold-chiseled"
          >
            FREQUENTLY ASKED QUESTIONS
          </motion.h1>
          <p className="text-gray-300 font-ancient tracking-widest text-sm uppercase">
            Everything you need to know about the ASTRA expedition.
          </p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37]" size={18} />
            <input
              type="text"
              placeholder="Search answers, keywords, or guidelines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a0e] border border-[#d4af37]/35 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:border-[#ffd700] focus:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-ancient text-[11px] tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'border border-[#ffd700] bg-[#ffd700]/15 text-[#ffd700] shadow-[0_0_12px_rgba(255,215,0,0.3)]'
                    : 'border border-gray-800 bg-black/40 text-gray-400 hover:border-[#d4af37]/40 hover:text-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#ffd700]/70 bg-[#0c0c10] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                    : 'border-[#d4af37]/25 bg-[#09090c]/80 hover:border-[#d4af37]/50'
                }`}
              >
                <button 
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-200 focus:outline-none"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <span className="font-ancient text-xs font-bold text-[#d4af37]/60 shrink-0">
                      Q{index + 1}
                    </span>
                    <span className={`font-ancient tracking-wider uppercase text-sm sm:text-base font-semibold ${isOpen ? 'text-[#ffd700]' : 'text-gray-200'}`}>
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#ffd700]' : 'text-gray-500'}`}
                  />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-2 text-gray-300 text-sm leading-relaxed border-t border-[#d4af37]/20">
                        {faq.a.split('\n').map((line, i) => (
                          <p key={i} className={line.startsWith('•') ? 'ml-4 mt-1.5 text-amber-200/90 font-medium' : 'mt-2'}>
                            {line}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 text-gray-500 font-ancient text-sm">
              No answers found for "{searchQuery}". Try different search terms or select "ALL".
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default FAQ;
