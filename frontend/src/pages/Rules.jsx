const Rules = () => {
  return (
    <div className="min-h-screen pt-24 px-4 bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-ancient text-white uppercase tracking-widest mb-8">Rules & Guidelines</h1>
        <div className="premium-card p-8 space-y-6">
          <div>
            <h3 className="text-[#d4af37] font-bold tracking-widest uppercase mb-2">Eligibility</h3>
            <p className="text-gray-300">Open to all university students.</p>
          </div>
          <div>
            <h3 className="text-[#d4af37] font-bold tracking-widest uppercase mb-2">Team Size</h3>
            <p className="text-gray-300">2-4 members per team.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Rules;
