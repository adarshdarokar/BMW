import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#131313] px-4 md:px-8 pb-4 md:pb-8 pt-12">
      <div className="w-full max-w-[1440px] mx-auto bg-white rounded-[24px] p-8 md:p-12 lg:p-16 flex flex-col border border-gray-100 shadow-sm">
        
        {/* Top Content Grid */}
        <div className="flex flex-col lg:flex-row justify-between mb-16 gap-12 lg:gap-0 lg:px-2">
          
          {/* Left Column - Brand */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-[380px]">
            <h3 className="text-[20px] font-medium tracking-[0.4em] mb-5 text-black uppercase">B M W</h3>
            <p className="text-[14px] leading-[1.7] text-[#6b7280] mb-8 font-normal">
              Pioneering the future of luxury mobility. Crafted with precision, driven by passion, and engineered for those who demand perfection.
            </p>
            <div className="flex items-center gap-6">
              {/* Instagram Outline */}
              <a href="#" className="text-black hover:opacity-70 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              {/* Twitter/X Outline */}
              <a href="#" className="text-black hover:opacity-70 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              {/* YouTube Outline */}
              <a href="#" className="text-black hover:opacity-70 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
              {/* LinkedIn Outline */}
              <a href="#" className="text-black hover:opacity-70 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-16 lg:gap-24 justify-center lg:justify-end lg:pr-8">
            {/* Middle Column - Connect */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h4 className="text-[13px] font-bold tracking-[0.1em] text-black uppercase mb-6">CONNECT</h4>
              <ul className="space-y-4">
                {['Instagram', 'Twitter', 'YouTube', 'LinkedIn'].map((social) => (
                  <li key={social}>
                    <a href="#" className="text-[14px] font-medium text-[#6b7280] hover:text-black transition-colors">
                      {social}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - Company */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h4 className="text-[13px] font-bold tracking-[0.1em] text-black uppercase mb-6">COMPANY</h4>
              <ul className="space-y-4">
                {['Contact Us', 'Careers', 'Press', 'Legal & Privacy'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[14px] font-medium text-[#6b7280] hover:text-black transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-200 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[13px] font-medium text-[#6b7280] lg:px-2">
          <p>© 2026 BMW AG. ALL RIGHTS RESERVED.</p>
          
          <button 
            onClick={scrollToTop}
            className="mt-6 md:mt-0 flex items-center gap-2 hover:text-black transition-colors group"
          >
            <span>Back to Top</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-y-1"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
          </button>
        </div>

      </div>
    </footer>
  );
}
