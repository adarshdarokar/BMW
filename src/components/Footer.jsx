import React from 'react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="footer"
      className="relative w-full bg-bmw-dark pt-32 pb-16 px-6 md:px-12 overflow-hidden z-20 border-t border-white/5"
    >
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-bmw-blue/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-24 relative z-10">
        
        {/* Massive Text CTA */}
        <div className="text-center flex flex-col items-center select-none">
          <span className="text-xs md:text-sm tracking-[0.6em] font-extrabold text-bmw-blue uppercase mb-6">
            BORN ELECTRIC. M BRED.
          </span>
          <h2 
            className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 select-none drop-shadow-[0_0_80px_rgba(0,163,255,0.15)]"
            style={{ fontFamily: 'Outfit' }}
          >
            THE ULTIMATE
          </h2>
          <h2 
            className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/5 select-none"
            style={{ fontFamily: 'Outfit' }}
          >
            DRIVING MACHINE
          </h2>
        </div>

        {/* Magnetic Button Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <button 
            className="px-10 py-5 bg-bmw-blue text-white font-bold text-xs tracking-[0.3em] uppercase rounded-full hover:bg-white hover:text-black transition-colors duration-500 shadow-[0_0_30px_rgba(0,163,255,0.3)] flex items-center gap-3 w-full sm:w-auto justify-center"
            data-cursor="magnetic"
          >
            CONFIGURE VEHICLE <ChevronRight size={14} />
          </button>
          
          <button 
            className="px-10 py-5 border border-white/20 text-white font-bold text-xs tracking-[0.3em] uppercase rounded-full hover:bg-white/5 hover:border-white transition-all duration-500 flex items-center gap-3 w-full sm:w-auto justify-center"
            data-cursor="magnetic"
          >
            FIND DEALER <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-left border-t border-white/5 pt-16">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-[0.3em] font-extrabold text-white/30 uppercase">BUILD YOURS</span>
            <a href="#" className="text-xs text-white/60 hover:text-bmw-blue transition-colors uppercase tracking-widest font-light" data-cursor="hover">M3 Competition</a>
            <a href="#" className="text-xs text-white/60 hover:text-bmw-blue transition-colors uppercase tracking-widest font-light" data-cursor="hover">M4 Coupe</a>
            <a href="#" className="text-xs text-white/60 hover:text-bmw-blue transition-colors uppercase tracking-widest font-light" data-cursor="hover">M8 Gran Coupe</a>
            <a href="#" className="text-xs text-white/60 hover:text-bmw-blue transition-colors uppercase tracking-widest font-light" data-cursor="hover">M Vision Concept</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-[0.3em] font-extrabold text-white/30 uppercase">INNOVATION</span>
            <a href="#" className="text-xs text-white/60 hover:text-bmw-blue transition-colors uppercase tracking-widest font-light" data-cursor="hover">BMW eDrive</a>
            <a href="#" className="text-xs text-white/60 hover:text-bmw-blue transition-colors uppercase tracking-widest font-light" data-cursor="hover">Charging Tech</a>
            <a href="#" className="text-xs text-white/60 hover:text-bmw-blue transition-colors uppercase tracking-widest font-light" data-cursor="hover">ConnectedDrive</a>
            <a href="#" className="text-xs text-white/60 hover:text-bmw-blue transition-colors uppercase tracking-widest font-light" data-cursor="hover">M Motorsport</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-[0.3em] font-extrabold text-white/30 uppercase">EXPERIENCE</span>
            <a href="#" className="text-xs text-white/60 hover:text-bmw-blue transition-colors uppercase tracking-widest font-light" data-cursor="hover">BMW Welt</a>
            <a href="#" className="text-xs text-white/60 hover:text-bmw-blue transition-colors uppercase tracking-widest font-light" data-cursor="hover">Driving Academy</a>
            <a href="#" className="text-xs text-white/60 hover:text-bmw-blue transition-colors uppercase tracking-widest font-light" data-cursor="hover">BMW Museum</a>
            <a href="#" className="text-xs text-white/60 hover:text-bmw-blue transition-colors uppercase tracking-widest font-light" data-cursor="hover">Exclusive Events</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-[0.3em] font-extrabold text-white/30 uppercase">COMPANY</span>
            <a href="#" className="text-xs text-white/60 hover:text-bmw-blue transition-colors uppercase tracking-widest font-light" data-cursor="hover">About BMW Group</a>
            <a href="#" className="text-xs text-white/60 hover:text-bmw-blue transition-colors uppercase tracking-widest font-light" data-cursor="hover">Sustainability</a>
            <a href="#" className="text-xs text-white/60 hover:text-bmw-blue transition-colors uppercase tracking-widest font-light" data-cursor="hover">Careers</a>
            <a href="#" className="text-xs text-white/60 hover:text-bmw-blue transition-colors uppercase tracking-widest font-light" data-cursor="hover">Press Room</a>
          </div>
        </div>

        {/* Bottom copyright details */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-12 text-left">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <span className="text-[10px] tracking-[0.3em] font-black text-white">BMW</span>
            <span className="text-[10px] text-white/40 font-light">© 2026 BMW AG. This is an immersive interactive marketing demonstration.</span>
          </div>
          <div className="flex items-center gap-6 text-[10px] text-white/30 tracking-[0.25em] uppercase">
            <a href="#" className="hover:text-bmw-blue transition-colors">Privacy Policy</a>
            <span>/</span>
            <a href="#" className="hover:text-bmw-blue transition-colors">Legal Details</a>
            <span>/</span>
            <button onClick={scrollToTop} className="hover:text-bmw-blue transition-colors" data-cursor="hover">Back To Top ↑</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
