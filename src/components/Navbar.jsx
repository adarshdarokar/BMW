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
        className={`fixed inset-x-0 top-0 z-50 h-20 flex items-center transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isScrolled
            ? "bg-[#131313]/70 backdrop-blur-2xl border-b border-white/5"
            : "bg-transparent"
          }`}
      >
        <div className="w-full max-w-[1440px] mx-auto h-full px-6 md:px-10 lg:px-14 xl:px-16 flex items-center justify-between">

          {/* BMW Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center justify-center shrink-0 cursor-pointer transition-all duration-300 hover:opacity-80 hover:scale-105"
          >
            <img
              src="/logo.jpg"
              alt="BMW Logo"
              className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover"
            />
          </button>

          {/* Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="group relative flex items-center justify-center text-sm font-medium uppercase tracking-[0.18em] text-white transition-all duration-500 hover:-translate-y-[2px]"
          >
            <span className="opacity-80 transition-opacity duration-300 group-hover:opacity-100">
              Menu
            </span>

            <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-white transition-all duration-500 group-hover:w-full"></span>
          </button>

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
              className="absolute top-[30px] right-5 md:right-8 lg:right-12 text-sm font-sans font-medium text-[#F3F3F3] tracking-[0.2em] uppercase opacity-70 hover:opacity-100 transition-opacity duration-300"
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
