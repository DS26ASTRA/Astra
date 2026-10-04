const Tracks = () => {
  return (
    <div className="min-h-screen pt-24 px-4 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-ancient text-white uppercase tracking-widest mb-8">Event Tracks</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="premium-card p-6">
            <h3 className="text-[#d4af37] font-bold tracking-widest uppercase mb-2">AI & Machine Learning</h3>
            <p className="text-gray-400 text-sm">Build intelligent solutions using cutting-edge models.</p>
          </div>
          <div className="premium-card p-6">
            <h3 className="text-[#d4af37] font-bold tracking-widest uppercase mb-2">Web & Software</h3>
            <p className="text-gray-400 text-sm">Create scalable and accessible platforms.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tracks;
