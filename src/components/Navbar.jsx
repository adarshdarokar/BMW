import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'History', id: 'introduction' },
    { label: 'Innovation', id: 'philosophy' },
    { label: 'Heritage', id: 'timeline' },
    { label: 'Experience', id: 'experience' }
  ];

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out h-[80px] flex items-center ${
          isScrolled 
            ? 'bg-[#131313]/80 backdrop-blur-xl border-b border-[#F3F3F3]/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center h-full">
          
          {/* Left: BMW Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer hover:opacity-70 transition-opacity duration-300 flex items-center"
          >
            <img src="/logo.jpg" alt="BMW Logo" className="h-[36px] md:h-[40px] w-auto object-contain" />
          </div>

          {/* Center: Empty to maintain minimal aesthetic */}
          <div className="flex-1"></div>

          {/* Right: Menu Button */}
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="group relative flex flex-col items-center justify-center text-sm font-sans font-light text-[#F3F3F3] tracking-[0.1em] uppercase transition-all duration-500 hover:-translate-y-[2px] cursor-pointer"
            >
              <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                Menu
              </span>
              <span className="absolute bottom-[-6px] left-1/2 w-0 h-[1px] bg-[#F3F3F3] -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#131313] flex flex-col justify-center items-center px-6"
          >
            {/* Close Button within the menu for intuitive UX */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-[30px] right-6 md:right-12 lg:right-24 text-sm font-sans font-medium text-[#F3F3F3] tracking-[0.2em] uppercase opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              CLOSE
            </button>

            <div className="flex flex-col items-center gap-12">
              {navLinks.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-4xl sm:text-6xl font-sans font-light tracking-[0.1em] text-[#F3F3F3] hover:text-[#B5B5B5] transition-colors uppercase"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
