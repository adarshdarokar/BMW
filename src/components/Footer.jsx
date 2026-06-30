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
    <footer className="w-full bg-[#0B0B0B] text-neutral-200 pt-20 pb-12 border-t border-neutral-900 font-sans transition-colors duration-300">
      <div className="layout-container flex flex-col gap-16">
        
        {/* Main Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Logo */}
          <div className="flex flex-col items-start col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1 border-b border-neutral-900 lg:border-b-0 pb-8 lg:pb-0 order-last lg:order-first w-full gap-4">
            <img 
              src="/logo-bmw-company.png" 
              className="w-12 h-12 object-contain filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.05)] transition-transform duration-300 hover:scale-105" 
              alt="BMW Logo" 
            />
            <h4 className="text-[13px] font-normal tracking-wider text-neutral-300">
              Sheer Driving <span className="font-semibold text-white">Pleasure</span>
            </h4>
            <div className="w-full max-w-[120px] h-[1px] bg-neutral-800" />
            <p className="text-[11px] text-neutral-500 tracking-wide font-light">
              &copy; {new Date().getFullYear()} BMW AG. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-neutral-400 font-light tracking-wide mt-2">
              <a href="#" className="hover:text-white transition-colors duration-300 underline-offset-4 hover:underline">Privacy Policy</a>
              <span className="text-neutral-700 hidden sm:inline">•</span>
              <a href="#" className="hover:text-white transition-colors duration-300 underline-offset-4 hover:underline">Legal Notice</a>
              <span className="text-neutral-700 hidden sm:inline">•</span>
              <a href="#" className="hover:text-white transition-colors duration-300 underline-offset-4 hover:underline">Cookie Settings</a>
            </div>
          </div>

          {/* Column 2: Models */}
          <div className="flex flex-col items-start col-span-1 border-b border-neutral-900 lg:border-b-0 pb-6 lg:pb-0 w-full">
            <div 
              onClick={() => toggleSection('models')} 
              className="flex items-center justify-between w-full cursor-pointer lg:cursor-default lg:pointer-events-none mb-4 lg:mb-6 py-2 lg:py-0"
            >
              <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                Models
              </h5>
              <svg 
                className={`w-4 h-4 text-neutral-500 transition-transform duration-300 lg:hidden ${openSections['models'] ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <ul className={`flex flex-col space-y-3.5 w-full overflow-hidden transition-all duration-300 ${openSections['models'] ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0 lg:max-h-[none] lg:opacity-100'}`}>
              {['All Models', 'BMW M', 'BMW i', 'Build Your Own', 'Compare Models'].map((item) => (
                <li key={item} className="group">
                  <a href="#" className="flex items-center gap-1.5 text-[13px] font-light tracking-wide text-neutral-400 hover:text-white transition-all duration-300">
                    <span>{item}</span>
                    <svg 
                      className="w-2.5 h-2.5 text-neutral-500 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3.5"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Shopping */}
          <div className="flex flex-col items-start col-span-1 border-b border-neutral-900 lg:border-b-0 pb-6 lg:pb-0 w-full">
            <div 
              onClick={() => toggleSection('shopping')} 
              className="flex items-center justify-between w-full cursor-pointer lg:cursor-default lg:pointer-events-none mb-4 lg:mb-6 py-2 lg:py-0"
            >
              <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                Shopping
              </h5>
              <svg 
                className={`w-4 h-4 text-neutral-500 transition-transform duration-300 lg:hidden ${openSections['shopping'] ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <ul className={`flex flex-col space-y-3.5 w-full overflow-hidden transition-all duration-300 ${openSections['shopping'] ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0 lg:max-h-[none] lg:opacity-100'}`}>
              {['Find Your BMW', 'Build & Price', 'Offers & Finance', 'BMW Online Shop', 'Accessories'].map((item) => (
                <li key={item} className="group">
                  <a href="#" className="flex items-center gap-1.5 text-[13px] font-light tracking-wide text-neutral-400 hover:text-white transition-all duration-300">
                    <span>{item}</span>
                    <svg 
                      className="w-2.5 h-2.5 text-neutral-500 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3.5"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Ownership */}
          <div className="flex flex-col items-start col-span-1 border-b border-neutral-900 lg:border-b-0 pb-6 lg:pb-0 w-full">
            <div 
              onClick={() => toggleSection('ownership')} 
              className="flex items-center justify-between w-full cursor-pointer lg:cursor-default lg:pointer-events-none mb-4 lg:mb-6 py-2 lg:py-0"
            >
              <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                Ownership
              </h5>
              <svg 
                className={`w-4 h-4 text-neutral-500 transition-transform duration-300 lg:hidden ${openSections['ownership'] ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <ul className={`flex flex-col space-y-3.5 w-full overflow-hidden transition-all duration-300 ${openSections['ownership'] ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0 lg:max-h-[none] lg:opacity-100'}`}>
              {['BMW Service', 'BMW Warranty', 'Roadside Assistance', 'My BMW App', 'Manuals & Guides'].map((item) => (
                <li key={item} className="group">
                  <a href="#" className="flex items-center gap-1.5 text-[13px] font-light tracking-wide text-neutral-400 hover:text-white transition-all duration-300">
                    <span>{item}</span>
                    <svg 
                      className="w-2.5 h-2.5 text-neutral-500 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3.5"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Discover */}
          <div className="flex flex-col items-start col-span-1 border-b border-neutral-900 lg:border-b-0 pb-6 lg:pb-0 w-full">
            <div 
              onClick={() => toggleSection('discover')} 
              className="flex items-center justify-between w-full cursor-pointer lg:cursor-default lg:pointer-events-none mb-4 lg:mb-6 py-2 lg:py-0"
            >
              <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                Discover
              </h5>
              <svg 
                className={`w-4 h-4 text-neutral-500 transition-transform duration-300 lg:hidden ${openSections['discover'] ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <ul className={`flex flex-col space-y-3.5 w-full overflow-hidden transition-all duration-300 ${openSections['discover'] ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0 lg:max-h-[none] lg:opacity-100'}`}>
              {['BMW Innovation', 'Sustainability', 'BMW Welt', 'Company', 'Careers'].map((item) => (
                <li key={item} className="group">
                  <a href="#" className="flex items-center gap-1.5 text-[13px] font-light tracking-wide text-neutral-400 hover:text-white transition-all duration-300">
                    <span>{item}</span>
                    <svg 
                      className="w-2.5 h-2.5 text-neutral-500 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3.5"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 6: Stay Connected */}
          <div className="flex flex-col items-start col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1 pt-6 lg:pt-0 pb-6 lg:pb-0 border-b border-neutral-900 lg:border-b-0 w-full">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white mb-6">
              Stay Connected
            </h5>
            <div className="flex flex-wrap gap-3.5">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#151515] flex items-center justify-center text-neutral-400 hover:bg-white hover:text-black hover:shadow-[0_8px_24px_rgba(255,255,255,0.08)] hover:-translate-y-1 transition-all duration-300 border border-neutral-900 outline-none"
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
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-[11px] font-light tracking-wide text-neutral-500 text-center px-4">
          <svg 
            width="13" 
            height="13" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-neutral-600 flex-shrink-0"
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
