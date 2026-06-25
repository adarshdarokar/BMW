import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#131313] pt-24 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-[#F3F3F3]/5">
      <div className="w-full max-w-[1440px] mx-auto">
        
        {/* Minimal Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
          <div className="md:col-span-4">
            <h3 className="text-xl font-light tracking-[0.3em] mb-6 text-[#F3F3F3] uppercase">BMW</h3>
            <p className="text-sm font-light leading-relaxed text-[#B5B5B5] max-w-xs">
              Pioneering the future of luxury mobility. Crafted with precision, driven by passion, and engineered for those who demand perfection.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-xs font-medium tracking-[0.2em] text-[#555555] uppercase mb-8">Connect</h4>
            <ul className="space-y-4">
              {['Instagram', 'Twitter', 'YouTube', 'LinkedIn'].map((social) => (
                <li key={social}>
                  <a href="#" className="group relative inline-block text-sm font-light tracking-wide text-[#B5B5B5] hover:text-[#F3F3F3] transition-colors">
                    {social}
                    <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-[#F3F3F3] transition-all duration-500 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-medium tracking-[0.2em] text-[#555555] uppercase mb-8">Company</h4>
            <ul className="space-y-4">
              {['Contact Us', 'Careers', 'Press', 'Legal & Privacy'].map((link) => (
                <li key={link}>
                  <a href="#" className="group relative inline-block text-sm font-light tracking-wide text-[#B5B5B5] hover:text-[#F3F3F3] transition-colors">
                    {link}
                    <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-[#F3F3F3] transition-all duration-500 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#F3F3F3]/5 text-[10px] font-light tracking-[0.2em] text-[#B5B5B5] uppercase">
          <p>© {new Date().getFullYear()} BMW AG. All Rights Reserved.</p>
          
          <button 
            onClick={scrollToTop}
            className="mt-8 md:mt-0 flex items-center space-x-4 hover:text-[#F3F3F3] transition-colors group cursor-pointer"
          >
            <span>Back to Top</span>
            <div className="w-8 h-[1px] bg-[#B5B5B5] group-hover:w-16 group-hover:bg-[#F3F3F3] transition-all duration-500" />
          </button>
        </div>
      </div>
    </footer>
  );
}
