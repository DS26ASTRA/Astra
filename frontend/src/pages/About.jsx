import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const features = [
    {
      title: "DISCOVER",
      desc: "Explore new ideas, technologies, and perspectives."
    },
    {
      title: "INNOVATE",
      desc: "Turn real-world problems into creative solutions."
    },
    {
      title: "CREATE",
      desc: "Build, experiment, and bring your ideas to life."
    },
    {
      title: "INSPIRE",
      desc: "Share your work and inspire others to think beyond the ordinary."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pt-24 pb-20">
      {/* Cinematic Jungle Ruins Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/jungle-ruins.jpg"
          alt="Jungle Ruins"
          className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-105 saturate-110 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/25" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#d4af37]/20 via-transparent to-transparent opacity-70"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-[#d4af37]"></div>
                <span className="text-[#d4af37] tracking-[0.3em] text-xs uppercase font-bold">About Astra</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-ancient text-white uppercase tracking-widest mb-6 leading-tight">
                Where Ideas <br/>
                <span className="text-gold-gradient">Become Possibilities</span>
              </h2>
              
              <div className="space-y-6 text-gray-300 text-sm md:text-base tracking-wide leading-relaxed">
                <p>
                  ASTRA is a platform created to bring together innovation, creativity, technology, and the spirit of collaboration.
                </p>
                <p className="pl-4 border-l-2 border-[var(--color-card-border)] text-gray-400 italic">
                  It is more than just an event. It is a space where students come together to think differently, solve meaningful problems, build ideas, and showcase what they can create.
                </p>
                <p>
                  From the first spark of an idea to the final presentation, ASTRA encourages participants to explore new possibilities, work as a team, learn from challenges, and turn imagination into something real.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Visual/Cards Content */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-8 lg:hidden"
            >
              <h3 className="text-2xl font-ancient text-white uppercase tracking-widest">What makes ASTRA different?</h3>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  className="premium-card p-8 group hover:-translate-y-2 transition-transform duration-500"
                >
                  <div className="w-10 h-10 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 flex items-center justify-center mb-6 group-hover:bg-[#d4af37] transition-colors duration-500">
                    <span className="text-[#d4af37] group-hover:text-black font-bold font-ancient">{idx + 1}</span>
                  </div>
                  <h4 className="text-white font-ancient text-xl tracking-widest uppercase mb-3 group-hover:text-[#d4af37] transition-colors">{feature.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 p-10 md:p-16 premium-card relative overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600354143497-22ce2d744b8f?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-ancient text-white uppercase tracking-[0.2em] mb-4">
              ASTRA is where curiosity meets creativity, and ideas take flight.
            </h3>
            <p className="text-[#d4af37] tracking-[0.3em] uppercase text-sm mb-8">
              Be part of the journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {['Think', 'Build', 'Innovate', 'Inspire'].map((word, i) => (
                <span key={i} className="text-gray-300 font-bold tracking-[0.2em] uppercase text-xs md:text-sm border border-[var(--color-card-border)] px-4 py-2 rounded bg-black/40 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
