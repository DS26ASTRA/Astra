import { Link } from 'react-router-dom';
import { Compass, Sparkles, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#020203] text-gray-400 py-16 border-t border-[#d4af37]/25 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-40 blur-xs" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-ancient text-3xl font-extrabold tracking-[0.2em] text-gold-gradient">
                ASTRA
              </span>
            </div>
            <p className="text-xs tracking-[0.25em] uppercase text-[#ffd700] font-ancient mb-3">
              NATIONAL LEVEL HACKATHON — ANCIENT CIVILIZATION
            </p>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed mb-6">
              Where ancient heritage meets cutting-edge innovation. Exploring millennia of historical wisdom to build resilient technology for the future.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-ancient tracking-widest text-[#d4af37] uppercase border border-[#d4af37]/30 px-3 py-1 rounded bg-black/40">
                DISCOVER. DECODE. CREATE.
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-ancient font-bold mb-4 uppercase tracking-[0.2em] text-[#ffd700] text-xs">
              Expedition Links
            </h4>
            <ul className="space-y-2.5 text-xs font-ancient tracking-wider uppercase">
              <li>
                <Link to="/#challenge" className="hover:text-[#ffd700] transition-colors">
                  The Challenge
                </Link>
              </li>
              <li>
                <Link to="/#tracks" className="hover:text-[#ffd700] transition-colors">
                  Hackathon Tracks
                </Link>
              </li>
              <li>
                <Link to="/#event" className="hover:text-[#ffd700] transition-colors">
                  Event Tiers & Passes
                </Link>
              </li>
              <li>
                <Link to="/#rules" className="hover:text-[#ffd700] transition-colors">
                  Rules & Guidelines
                </Link>
              </li>
              <li>
                <Link to="/#timeline" className="hover:text-[#ffd700] transition-colors">
                  Event Roadmap
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="hover:text-[#ffd700] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-ancient font-bold mb-4 uppercase tracking-[0.2em] text-[#ffd700] text-xs">
              Command Headquarters
            </h4>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#ffd700] shrink-0" />
                <span className="tracking-wide">expedition@astrahackathon.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#ffd700] shrink-0" />
                <span className="tracking-wide">+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#ffd700] shrink-0 mt-0.5" />
                <span className="tracking-wide">Innovation Center, Campus Headquarters</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#1a1a1f] flex flex-col md:flex-row justify-between items-center text-[11px] font-ancient tracking-widest text-gray-500 uppercase">
          <p>&copy; {new Date().getFullYear()} ASTRA National Level Hackathon. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-[#ffd700] cursor-pointer transition-colors">Honor Code</span>
            <span className="hover:text-[#ffd700] cursor-pointer transition-colors">Privacy Charter</span>
            <span className="hover:text-[#ffd700] cursor-pointer transition-colors">Safety Protocols</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
