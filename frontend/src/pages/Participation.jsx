import React from 'react';
import { Link } from 'react-router-dom';

const Participation = () => {
  return (
    <div className="min-h-[80vh] pt-12 pb-24 px-4 bg-transparent flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <h1 className="text-5xl font-ancient text-center mb-4 text-white">Choose Your Path</h1>
        <p className="text-center text-[#8b5a2b] mb-12 max-w-2xl mx-auto text-lg">
          Select how you wish to participate in the Ancient Civilization event.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="premium-card p-8 text-center flex flex-col hover:-translate-y-2 transition-transform cursor-pointer">
            <h3 className="text-gray-300xl font-ancient font-bold mb-2 text-white">Avinyotsav</h3>
            <p className="text-3xl text-[#d4af37] font-bold mb-4">₹150</p>
            <p className="text-[#2a2a2a] flex-grow mb-6">Cultural and artistic exhibitions.</p>
            <Link to="/register?type=AVINYOTSAV" className="btn-secondary">Register</Link>
          </div>
          
          <div className="premium-card p-8 text-center flex flex-col border-[#800000] border-4 hover:-translate-y-2 transition-transform cursor-pointer shadow-2xl relative">
            <div className="absolute top-0 right-0 bg-[#800000] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
            <h3 className="text-gray-300xl font-ancient font-bold mb-2 text-white">Both Events</h3>
            <p className="text-4xl text-[#ffdf00] font-bold mb-4">₹650</p>
            <p className="text-[#2a2a2a] flex-grow mb-6">The complete experience. Culture + Tech.</p>
            <Link to="/register?type=BOTH" className="btn-primary">Register</Link>
          </div>

          <div className="premium-card p-8 text-center flex flex-col hover:-translate-y-2 transition-transform cursor-pointer">
            <h3 className="text-gray-300xl font-ancient font-bold mb-2 text-white">Hackathon</h3>
            <p className="text-3xl text-[#d4af37] font-bold mb-4">₹500</p>
            <p className="text-[#2a2a2a] flex-grow mb-6">24-hour technical coding marathon.</p>
            <Link to="/register?type=HACKATHON" className="btn-secondary">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participation;
