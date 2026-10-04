const Footer = () => {
  return (
    <footer className="bg-[#050505] text-gray-400 py-12 border-t border-[var(--color-card-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-ancient text-2xl font-bold mb-4 tracking-[0.2em] text-gold-gradient">ASTRA</h3>
            <p className="text-sm tracking-widest uppercase mb-2 text-white">Ancient Civilization</p>
            <p className="text-xs text-gray-500">Discover. Decode. Create.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-[0.15em] text-[#d4af37] text-sm">Quick Links</h4>
            <ul className="space-y-3 text-xs tracking-wider uppercase">
              <li><a href="/event" className="hover:text-white transition-colors">Event Details</a></li>
              <li><a href="/participation" className="hover:text-white transition-colors">Participation</a></li>
              <li><a href="/register" className="hover:text-white transition-colors">Register</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-[0.15em] text-[#d4af37] text-sm">Contact</h4>
            <p className="text-xs tracking-wider mb-2">info@astrahackathon.com</p>
            <p className="text-xs tracking-wider">+91 98765 43210</p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center text-xs tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} Astra National Hackathon. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-[#d4af37] cursor-pointer">Terms</span>
            <span className="hover:text-[#d4af37] cursor-pointer">Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
