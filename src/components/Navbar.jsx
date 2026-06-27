import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'History', id: 'introduction' },
    { label: 'Innovation', id: 'philosophy' },
    { label: 'Heritage', id: 'timeline' },
    { label: 'Experience', id: 'experience' }
  ];

  const handleLogoClick = () => {
    setMenuOpen(false);
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLinkClick = (id) => {
    setMenuOpen(false);
    // Allow closing animation to play before scrolling for a premium feeling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        if (window.lenis) {
          window.lenis.scrollTo(element, {
            duration: 1.8,
            ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 450);
  };

  // Framer Motion Animation Variants using cubic-bezier(0.76, 0, 0.24, 1)
  const overlayVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.45,
        ease: [0.76, 0, 0.24, 1],
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        when: 'beforeChildren',
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      transition: {
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 h-20 transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] ${isScrolled
          ? 'bg-[#0f0f0f]/60 backdrop-blur-xl border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent border-b border-transparent'
          }`}
      >
          {/* Centered max-width container with equal horizontal padding */}
          <div className="layout-container h-full flex items-center justify-between">

            {/* Left: Title wordmark */}
            <button
              onClick={handleLogoClick}
              className="flex items-center shrink-0 cursor-pointer outline-none select-none transition-all duration-300 hover:opacity-80"
              aria-label="BMW Home"
            >
              <svg className="w-8 h-8 mr-3 text-white fill-current" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2.5"/>
                <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M50,50 L50,12 A38,38 0 0,1 88,50 Z" fill="currentColor"/>
                <path d="M50,50 L12,50 A38,38 0 0,1 50,12 Z" fill="none"/>
                <path d="M50,50 L50,88 A38,38 0 0,1 12,50 Z" fill="currentColor"/>
                <path d="M50,50 L88,50 A38,38 0 0,1 50,88 Z" fill="none"/>
                <text x="32" y="38" fontSize="12" fontWeight="700" fontFamily="Outfit, sans-serif" fill="currentColor" transform="rotate(-35, 32, 38)">B</text>
                <text x="46" y="27" fontSize="12" fontWeight="700" fontFamily="Outfit, sans-serif" fill="currentColor">M</text>
                <text x="61" y="34" fontSize="12" fontWeight="700" fontFamily="Outfit, sans-serif" fill="currentColor" transform="rotate(35, 61, 34)">W</text>
              </svg>
              <span className="font-sans text-xs tracking-[0.5em] font-semibold text-[#F3F3F3]">B M W</span>
            </button>

            {/* Right: Menu Button - Naturally aligned via Flexbox container layout */}
            <button
              onClick={() => setMenuOpen(true)}
              className="group relative flex items-center justify-center text-sm font-medium uppercase tracking-[0.18em] text-[#F3F3F3] cursor-pointer py-2 outline-none select-none"
              aria-label="Open Menu"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[1px]">
                Menu
              </span>
              <span className="absolute bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full"></span>
            </button>

          </div>
        </nav>

        {/* Fullscreen Mobile Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
              className="fixed inset-0 z-50 bg-[#111111] flex flex-col justify-center select-none"
            >
              {/* Close Button positioned at the container margin coordinates */}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-6 right-6 md:right-12 lg:right-24 text-sm font-medium uppercase tracking-[0.18em] text-[#F3F3F3] cursor-pointer group flex items-center gap-3 hover:text-white transition-colors duration-300 outline-none"
                aria-label="Close Menu"
              >
                <span className="opacity-80 group-hover:opacity-100 transition-opacity">Close</span>
                <svg
                  className="w-4 h-4 transform group-hover:rotate-90 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Menu Content aligned with the container left margin */}
              <div className="layout-container flex flex-col justify-center items-start">
                <div className="flex flex-col items-start gap-8 md:gap-12">
                  {navLinks.map((item) => (
                    <motion.button
                      key={item.id}
                      variants={itemVariants}
                      onClick={() => handleLinkClick(item.id)}
                      className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-light tracking-[0.08em] text-white/40 hover:text-white uppercase transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:translate-x-6 cursor-pointer text-left outline-none"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Subtle brand graphic bottom right of the menu */}
              <div className="absolute bottom-10 right-6 md:right-12 lg:right-24 pointer-events-none opacity-5 select-none">
                <span className="text-[12vw] font-black font-sans tracking-tighter text-white">BMW</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </>
  );
}
