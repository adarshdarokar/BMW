import React, { useState } from 'react';

export default function Footer() {
  const [openSections, setOpenSections] = useState({});
  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const socialIcons = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/bmw/',
      path: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/user/BMW',
      path: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/BMW/',
      path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/bmwgroup',
      path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z'
    },
    {
      name: 'X',
      url: 'https://x.com/BMW',
      path: 'M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768M20 4l-6.768 6.768'
    }
  ];

  return (
    <footer className="w-full bg-[#FAFAFA] text-[#111111] pt-16 pb-8 border-t border-neutral-200/60 font-sans">
      <div className="layout-container flex flex-col gap-12 px-6 sm:px-12 md:px-16">
        
        {/* Main Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & Logo */}
          <div className="flex flex-col items-start col-span-2 md:col-span-1 border-b border-neutral-200/40 lg:border-b-0 pb-5 lg:pb-0">
            <img 
              src="/logo-bmw-company.png" 
              className="w-10 h-10 object-contain mb-4 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.03)]" 
              alt="BMW Logo" 
            />
            <h4 className="text-[12px] font-normal tracking-wide mb-3 text-[#111111]">
              Sheer Driving <span className="font-semibold">Pleasure</span>
            </h4>
            <div className="w-full max-w-[150px] h-[1px] bg-neutral-200/60 mb-4" />
            <p className="text-[10px] text-[#666666] mb-2 tracking-wide font-light">
              &copy; 2024 BMW AG. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] text-[#666666] font-light tracking-wide">
              <a href="#" className="hover:text-black transition-colors underline-offset-2 hover:underline">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors underline-offset-2 hover:underline">Legal Notice</a>
              <a href="#" className="hover:text-black transition-colors underline-offset-2 hover:underline">Cookie Settings</a>
            </div>
          </div>

          {/* Column 2: Models */}
          <div className="flex flex-col items-start col-span-2 md:col-span-1 border-b border-neutral-200/40 lg:border-b-0 pb-5 lg:pb-0 w-full">
            <div 
              onClick={() => toggleSection('models')} 
              className="flex items-center justify-between w-full cursor-pointer lg:cursor-default lg:pointer-events-none mb-2 lg:mb-5"
            >
              <h5 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#111111]">
                Models
              </h5>
              <svg 
                className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-300 lg:hidden ${openSections['models'] ? 'rotate-90' : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <ul className={`flex flex-col space-y-3 w-full transition-all duration-300 ${openSections['models'] ? 'block' : 'hidden lg:flex'}`}>
              {['All Models', 'BMW M', 'BMW i', 'Build Your Own', 'Compare Models'].map((item) => (
                <li key={item} className="group flex justify-between items-center w-full">
                  <a href="#" className="text-[12px] font-light tracking-wide text-[#666666] group-hover:text-black hover:underline underline-offset-4 transition-all duration-300">
                    {item}
                  </a>
                  <svg 
                    className="w-2.5 h-2.5 text-neutral-300 group-hover:text-black group-hover:translate-x-0.5 transition-all duration-300" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Shopping */}
          <div className="flex flex-col items-start col-span-2 md:col-span-1 border-b border-neutral-200/40 lg:border-b-0 pb-5 lg:pb-0 w-full">
            <div 
              onClick={() => toggleSection('shopping')} 
              className="flex items-center justify-between w-full cursor-pointer lg:cursor-default lg:pointer-events-none mb-2 lg:mb-5"
            >
              <h5 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#111111]">
                Shopping
              </h5>
              <svg 
                className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-300 lg:hidden ${openSections['shopping'] ? 'rotate-90' : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <ul className={`flex flex-col space-y-3 w-full transition-all duration-300 ${openSections['shopping'] ? 'block' : 'hidden lg:flex'}`}>
              {['Find Your BMW', 'Build & Price', 'Offers & Finance', 'BMW Online Shop', 'Accessories'].map((item) => (
                <li key={item} className="group flex justify-between items-center w-full">
                  <a href="#" className="text-[12px] font-light tracking-wide text-[#666666] group-hover:text-black hover:underline underline-offset-4 transition-all duration-300">
                    {item}
                  </a>
                  <svg 
                    className="w-2.5 h-2.5 text-neutral-300 group-hover:text-black group-hover:translate-x-0.5 transition-all duration-300" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Ownership */}
          <div className="flex flex-col items-start col-span-2 md:col-span-1 border-b border-neutral-200/40 lg:border-b-0 pb-5 lg:pb-0 w-full">
            <div 
              onClick={() => toggleSection('ownership')} 
              className="flex items-center justify-between w-full cursor-pointer lg:cursor-default lg:pointer-events-none mb-2 lg:mb-5"
            >
              <h5 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#111111]">
                Ownership
              </h5>
              <svg 
                className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-300 lg:hidden ${openSections['ownership'] ? 'rotate-90' : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <ul className={`flex flex-col space-y-3 w-full transition-all duration-300 ${openSections['ownership'] ? 'block' : 'hidden lg:flex'}`}>
              {['BMW Service', 'BMW Warranty', 'Roadside Assistance', 'My BMW App', 'Manuals & Guides'].map((item) => (
                <li key={item} className="group flex justify-between items-center w-full">
                  <a href="#" className="text-[12px] font-light tracking-wide text-[#666666] group-hover:text-black hover:underline underline-offset-4 transition-all duration-300">
                    {item}
                  </a>
                  <svg 
                    className="w-2.5 h-2.5 text-neutral-300 group-hover:text-black group-hover:translate-x-0.5 transition-all duration-300" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Discover */}
          <div className="flex flex-col items-start col-span-2 md:col-span-1 border-b border-neutral-200/40 lg:border-b-0 pb-5 lg:pb-0 w-full">
            <div 
              onClick={() => toggleSection('discover')} 
              className="flex items-center justify-between w-full cursor-pointer lg:cursor-default lg:pointer-events-none mb-2 lg:mb-5"
            >
              <h5 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#111111]">
                Discover
              </h5>
              <svg 
                className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-300 lg:hidden ${openSections['discover'] ? 'rotate-90' : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <ul className={`flex flex-col space-y-3 w-full transition-all duration-300 ${openSections['discover'] ? 'block' : 'hidden lg:flex'}`}>
              {['BMW Innovation', 'Sustainability', 'BMW Welt', 'Company', 'Careers'].map((item) => (
                <li key={item} className="group flex justify-between items-center w-full">
                  <a href="#" className="text-[12px] font-light tracking-wide text-[#666666] group-hover:text-black hover:underline underline-offset-4 transition-all duration-300">
                    {item}
                  </a>
                  <svg 
                    className="w-2.5 h-2.5 text-neutral-300 group-hover:text-black group-hover:translate-x-0.5 transition-all duration-300" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 6: Stay Connected */}
          <div className="flex flex-col items-start col-span-2 md:col-span-1 pt-5 lg:pt-0">
            <h5 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#111111] mb-5">
              Stay Connected
            </h5>
            <div className="grid grid-cols-3 gap-3">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#666666] hover:bg-[#111111] hover:text-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 border border-neutral-200/40 shadow-[0_4px_12px_rgba(0,0,0,0.02)] outline-none"
                  aria-label={social.name}
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-200/60 to-transparent mt-4" />
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-[10px] font-light tracking-wide text-[#666666] text-center px-4">
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-neutral-400 flex-shrink-0"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>Your data is safe with us. BMW Group takes your privacy very seriously.</span>
        </div>

      </div>
    </footer>
  );
}
