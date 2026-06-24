import React from 'react';

export default function Footer() {
  const links = {
    vehicles: ["ALL MODELS", "ELECTRIC", "M PERFORMANCE", "CONCEPT CARS"],
    discover: ["INNOVATION", "BMW WELT", "BMW MUSEUM", "CAREERS"],
    legal: ["PRIVACY POLICY", "COOKIE PREFERENCES", "LEGAL NOTICE", "CONTACT"]
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#F3F3F3] text-[#131313] pt-16 pb-10 px-6 md:px-12 border-t border-bmw-light-gray select-none relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col space-y-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Wordmark Column */}
          <div className="col-span-2 md:col-span-4 flex flex-col space-y-4">
            <h3 
              onClick={scrollToTop}
              className="text-2xl font-display tracking-[0.4em] font-light cursor-pointer hover:opacity-70 transition-opacity w-fit"
            >
              BMW
            </h3>
            <p className="text-[10px] leading-relaxed text-bmw-gray max-w-xs font-light">
              Bayerische Motoren Werke AG<br />
              Petuelring 130, 80788 München, Germany.<br />
              Registered District Court Munich HRB 42243
            </p>
          </div>

          {/* Links Column 1: Vehicles */}
          <div className="col-span-1 md:col-span-2 flex flex-col space-y-3">
            <span className="text-[9px] tracking-[0.25em] font-bold text-bmw-gray uppercase mb-1">
              VEHICLES
            </span>
            {links.vehicles.map((l, i) => (
              <a 
                key={i} 
                href="#experience" 
                className="text-[10px] tracking-[0.15em] font-medium text-[#131313] hover:text-bmw-gray transition-colors w-fit"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Links Column 2: Discover */}
          <div className="col-span-1 md:col-span-2 flex flex-col space-y-3">
            <span className="text-[9px] tracking-[0.25em] font-bold text-bmw-gray uppercase mb-1">
              DISCOVER
            </span>
            {links.discover.map((l, i) => (
              <a 
                key={i} 
                href="#timeline" 
                className="text-[10px] tracking-[0.15em] font-medium text-[#131313] hover:text-bmw-gray transition-colors w-fit"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Links Column 3: Legal */}
          <div className="col-span-1 md:col-span-2 flex flex-col space-y-3">
            <span className="text-[9px] tracking-[0.25em] font-bold text-bmw-gray uppercase mb-1">
              LEGAL
            </span>
            {links.legal.map((l, i) => (
              <a 
                key={i} 
                href="#experience" 
                className="text-[10px] tracking-[0.15em] font-medium text-[#131313] hover:text-bmw-gray transition-colors w-fit"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Social Links Column */}
          <div className="col-span-1 md:col-span-2 flex flex-col space-y-3">
            <span className="text-[9px] tracking-[0.25em] font-bold text-bmw-gray uppercase mb-1">
              SOCIAL
            </span>
            {["INSTAGRAM", "YOUTUBE", "LINKEDIN", "X.COM"].map((s, i) => (
              <a 
                key={i} 
                href="https://www.bmw.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[10px] tracking-[0.15em] font-medium text-[#131313] hover:text-bmw-gray transition-colors w-fit"
              >
                {s}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-bmw-light-gray pt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <span className="text-[9px] tracking-[0.2em] text-bmw-gray font-light">
            © 2026 BMW AG. ALL RIGHTS RESERVED.
          </span>
          <span 
            onClick={scrollToTop}
            className="text-[9px] tracking-[0.2em] text-[#131313] hover:text-bmw-gray transition-colors cursor-pointer font-bold"
          >
            BACK TO TOP ↑
          </span>
        </div>

      </div>
    </footer>
  );
}
