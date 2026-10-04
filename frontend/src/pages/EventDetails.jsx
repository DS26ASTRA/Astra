import React from 'react';

const EventDetails = () => {
  return (
    <div className="min-h-screen pt-12 pb-24 px-4 bg-transparent">
      <div className="max-w-4xl mx-auto premium-card p-8 md:p-12">
        <h1 className="text-5xl font-ancient text-center mb-8 text-white">Event Details</h1>
        <div className="h-1 w-32 bg-[#cd853f] mx-auto mb-12"></div>
        
        <div className="prose prose-lg text-[#2a2a2a]">
          <p className="lead text-xl italic mb-8 border-l-4 border-[#8b5a2b] pl-4">
            Avinyotsav & Hackathon is a single mega-event that bridges the gap between historical wisdom and modern technological innovation.
          </p>
          
          <h2 className="font-ancient text-3xl mt-12 mb-4 text-[#ffdf00]">The Theme: Ancient Civilization</h2>
          <p>
            This year, we draw inspiration from the great ancient civilizations. Participants are encouraged to explore how ancient problems were solved and apply those fundamental principles using modern technologies.
          </p>

          <h2 className="font-ancient text-3xl mt-12 mb-4 text-[#ffdf00]">Avinyotsav (₹150)</h2>
          <p>
            The cultural and artistic wing of the event. Engage in exhibitions, literature events, and presentations that showcase the rich heritage of humanity.
          </p>

          <h2 className="font-ancient text-3xl mt-12 mb-4 text-[#ffdf00]">Hackathon (₹500)</h2>
          <p>
            The technical wing. A 24-hour coding marathon where teams build software or hardware solutions addressing themes like ancient logistics, resource management, and monumental architecture.
          </p>

          <h2 className="font-ancient text-3xl mt-12 mb-4 text-[#ffdf00]">The Complete Experience (₹650)</h2>
          <p>
            We highly recommend teams to register for both to fully experience the intersection of art, history, and technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
