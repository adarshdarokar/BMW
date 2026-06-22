import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Inline logo canvas component that renders preloaded logo frames on hover
function LogoCanvas() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const currentFrameRef = useRef(0);
  const isHoveredRef = useRef(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const logoFrames = window.bmwAssetCache?.logo || [];
    
    const drawFrame = (frameIndex) => {
      const img = logoFrames[frameIndex];
      if (img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Circular clip for clean render if needed, or draw normally
        ctx.save();
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.restore();
      }
    };
    
    // Draw initial frame
    if (logoFrames.length > 0) {
      // Draw first frame once loaded
      if (logoFrames[0].complete) {
        drawFrame(0);
      } else {
        logoFrames[0].onload = () => drawFrame(0);
      }
    }
    
    const updateAnimation = () => {
      if (logoFrames.length === 0) return;
      
      if (isHoveredRef.current) {
        // Play forward
        currentFrameRef.current = (currentFrameRef.current + 1) % logoFrames.length;
      } else {
        // Slow reset to 0
        if (currentFrameRef.current > 0) {
          currentFrameRef.current = (currentFrameRef.current - 2 + logoFrames.length) % logoFrames.length;
          if (currentFrameRef.current < 2) currentFrameRef.current = 0;
        }
      }
      
      drawFrame(currentFrameRef.current);
      
      // Continue loop if hovered or if resetting to 0
      if (isHoveredRef.current || currentFrameRef.current > 0) {
        animationRef.current = requestAnimationFrame(updateAnimation);
      }
    };
    
    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(updateAnimation);
    };
    
    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      // Let it play back/reset to 0
    };
    
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={50} 
      height={50} 
      className="w-12 h-12 rounded-full cursor-pointer mix-blend-screen transition-transform duration-300 hover:scale-105"
      data-cursor="magnetic"
    />
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [scrolled, setScrolled] = useState(false);

  const links = ['Home', 'Performance', 'Technology', 'Experience'];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setMobileMenuOpen(false);
    
    // Smooth scroll navigation target
    let selector = '';
    if (linkName === 'Home') selector = '#hero';
    if (linkName === 'Performance') selector = '#scroll-film-container';
    if (linkName === 'Technology') selector = '#specs';
    if (linkName === 'Experience') selector = '#footer';

    if (selector) {
      const element = document.querySelector(selector);
      if (element) {
        // Let Lenis scroll smoothly by triggering normal scroll
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled 
            ? 'py-4 bg-bmw-dark/80 border-white/5 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
            : 'py-6 bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo & Branding */}
          <div className="flex items-center gap-4">
            <LogoCanvas />
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold tracking-[0.2em] text-white">BMW</span>
              <span className="text-[9px] font-semibold tracking-[0.3em] text-bmw-blue">M PERFORMANCE</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link} className="relative">
                <button
                  onClick={() => handleLinkClick(link)}
                  className={`text-xs font-semibold uppercase tracking-[0.3em] transition-colors duration-300 py-2 ${
                    activeLink === link ? 'text-bmw-blue' : 'text-white/70 hover:text-white'
                  }`}
                  data-cursor="hover"
                >
                  {link}
                </button>
                {activeLink === link && (
                  <motion.div 
                    layoutId="activeUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-bmw-blue shadow-[0_0_8px_#00A3FF]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Hamburger Menu Trigger for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-white hover:text-bmw-blue transition-colors p-2"
              data-cursor="hover"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-bmw-dark/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:hidden"
          >
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold tracking-widest text-white">M</div>
                <span className="text-xs uppercase tracking-[0.3em] font-semibold text-white/50">M Series</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-bmw-blue transition-colors p-2 rounded-full border border-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Links List */}
            <ul className="flex flex-col gap-6 text-left my-auto">
              {links.map((link, idx) => (
                <motion.li 
                  key={link}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                >
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="text-4xl font-light uppercase tracking-[0.2em] text-white/70 hover:text-bmw-blue active:text-bmw-blue text-left w-full transition-colors font-sans"
                  >
                    {link}
                  </button>
                </motion.li>
              ))}
            </ul>

            {/* Mobile Footer Area */}
            <div className="border-t border-white/5 pt-6 flex flex-col gap-2 text-left">
              <span className="text-[10px] uppercase tracking-widest text-white/30">BMW MARKETING DRIVETRAIN</span>
              <span className="text-[10px] uppercase tracking-widest text-white/30">© 2026 BMW AG</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
