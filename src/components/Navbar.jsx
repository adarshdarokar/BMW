import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-in-out px-6 md:px-12 py-5 md:py-6 flex items-center justify-between ${
        isScrolled ? 'glass-nav py-4' : 'bg-transparent'
      }`}
    >
      {/* Brand logo / text */}
      <div 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="cursor-pointer font-display tracking-[0.4em] font-light text-xl hover:opacity-75 transition-opacity"
      >
        BMW
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-10 text-xs font-medium tracking-[0.2em] text-bmw-light-gray">
        <button 
          onClick={() => scrollToSection('introduction')}
          className="hover:text-bmw-light transition-colors duration-300 relative group"
        >
          INTRODUCTION
          <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-bmw-light transition-all duration-300 group-hover:w-full"></span>
        </button>
        <button 
          onClick={() => scrollToSection('logo-scroll')}
          className="hover:text-bmw-light transition-colors duration-300 relative group"
        >
          DESIGN
          <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-bmw-light transition-all duration-300 group-hover:w-full"></span>
        </button>
        <button 
          onClick={() => scrollToSection('timeline')}
          className="hover:text-bmw-light transition-colors duration-300 relative group"
        >
          HERITAGE
          <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-bmw-light transition-all duration-300 group-hover:w-full"></span>
        </button>
        <button 
          onClick={() => scrollToSection('philosophy')}
          className="hover:text-bmw-light transition-colors duration-300 relative group"
        >
          PHILOSOPHY
          <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-bmw-light transition-all duration-300 group-hover:w-full"></span>
        </button>
        <button 
          onClick={() => scrollToSection('experience')}
          className="hover:text-bmw-light transition-colors duration-300 relative group"
        >
          EXPERIENCE
          <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-bmw-light transition-all duration-300 group-hover:w-full"></span>
        </button>
      </div>

      {/* Right Indicator / Menu */}
      <div className="flex items-center space-x-4">
        <span className="hidden sm:inline-block text-[10px] tracking-[0.25em] text-bmw-gray border border-bmw-medium/40 px-3 py-1.5 rounded-full select-none font-mono">
          M PERFORMANCE
        </span>
        
        {/* Minimal Mobile Menu Button (Hamburger) */}
        <button 
          onClick={() => scrollToSection('experience')}
          className="md:hidden flex flex-col justify-between w-5 h-3 cursor-pointer group"
          aria-label="Toggle Menu"
        >
          <span className="w-full h-[1px] bg-bmw-light transition-all group-hover:bg-bmw-light-gray"></span>
          <span className="w-full h-[1px] bg-bmw-light transition-all group-hover:bg-bmw-light-gray"></span>
        </button>
      </div>
    </motion.nav>
  );
}
