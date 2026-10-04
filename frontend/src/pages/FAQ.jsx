import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: "What is ASTRA?",
      a: "ASTRA is a student-focused innovation and technology event that brings together creativity, problem-solving, collaboration, and innovation through Avinyotsav & Hackathon."
    },
    {
      q: "What is Avinyotsav?",
      a: "Avinyotsav is the creative and cultural participation component of ASTRA, giving participants a platform to showcase their creativity, talent, ideas, and cultural expression."
    },
    {
      q: "What is the Hackathon?",
      a: "The Hackathon is the innovation and technology component of ASTRA, where teams identify problems and build practical, creative technology-based solutions."
    },
    {
      q: "Are Avinyotsav and Hackathon separate events?",
      a: "No. Both are participation options under the same ASTRA event. Participants can choose Avinyotsav, Hackathon, or both."
    },
    {
      q: "What are the registration fees?",
      a: "- Avinyotsav: ₹150\n- Hackathon: ₹500\n- Both: ₹650"
    },
    {
      q: "Can I participate in both?",
      a: "Yes. You can select the Both option and participate in both components for ₹650."
    },
    {
      q: "Who can participate?",
      a: "Students who meet the event's eligibility requirements can participate. The detailed eligibility criteria will be provided in the event rules."
    },
    {
      q: "Can I register individually?",
      a: "Registration depends on the participation component and its configured team requirements. The registration page will show the applicable team/member requirements."
    },
    {
      q: "How do I register?",
      a: "Select your participation option, provide your team and member details, review your registration, and complete the online payment."
    },
    {
      q: "How will I receive my Team ID?",
      a: "After successful registration and payment verification, your Team ID will be generated and displayed in your dashboard/confirmation."
    },
    {
      q: "How do I login?",
      a: "You will login using your registered email address and password. Your Team ID is your event identifier and is not used as the login username."
    },
    {
      q: "How does payment work?",
      a: "Payments are processed through the event's online payment gateway. Your registration becomes confirmed after successful payment verification."
    },
    {
      q: "Can I see my payment receipt?",
      a: "Yes. After successful payment, the receipt/payment details will be available in your authenticated team dashboard."
    },
    {
      q: "What happens after registration?",
      a: "After registration, your team can access its dashboard to view registration status, payment information, event details, schedule, venue/classroom information, QR pass, notifications, and other available features."
    },
    {
      q: "How does event check-in work?",
      a: "Registered teams can use their QR pass for event-day check-in. The event team/admin can scan and verify the QR code."
    },
    {
      q: "How are Hackathon projects evaluated?",
      a: "Projects are evaluated using predefined criteria such as innovation, technical implementation, impact, creativity, and presentation. The final criteria and weightage are controlled by the event administration."
    },
    {
      q: "Will I be able to see the leaderboard?",
      a: "Authenticated participants can access the leaderboard when it is made available by the administration. Participant and scoring information will not be exposed publicly."
    },
    {
      q: "Who evaluates the teams?",
      a: "Designated and verified faculty/judges evaluate participating teams according to the event's evaluation criteria."
    },
    {
      q: "How does faculty registration work?",
      a: "Faculty members can submit their registration online. Their account remains pending until the event administration verifies and activates it."
    },
    {
      q: "What if I have a problem during registration?",
      a: "Contact the event support team through the official contact details provided on the website."
    },
    {
      q: "Where can I find event updates?",
      a: "Important announcements, schedule changes, and other updates will be available through the official website and authenticated dashboard notifications."
    },
    {
      q: "Will participants receive certificates?",
      a: "Certificates can be issued according to the event's participation and achievement criteria. The final certificate policy will be announced by the administration."
    },
    {
      q: "Where can I find the complete rules?",
      a: "Visit the Rules section of the ASTRA website for detailed participation, registration, evaluation, and event guidelines."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050505] pt-24 pb-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-ancient text-white uppercase tracking-[0.15em] mb-4"
          >
            FREQUENTLY ASKED <span className="text-gold-gradient">QUESTIONS</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 tracking-widest text-sm uppercase"
          >
            Everything you need to know about ASTRA.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="premium-card overflow-hidden"
            >
              <button 
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-300 hover:bg-white/5 focus:outline-none"
              >
                <span className={`font-ancient tracking-widest uppercase text-sm md:text-base ${activeIndex === index ? 'text-[#d4af37]' : 'text-gray-200'}`}>
                  {faq.q}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-[#d4af37]' : ''}`}
                />
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 pt-2 text-gray-400 text-sm leading-relaxed border-t border-[var(--color-card-border)]/30 mt-2">
                      {faq.a.split('\n').map((line, i) => (
                        <p key={i} className={line.startsWith('-') ? 'ml-4 mt-1' : 'mt-2'}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
