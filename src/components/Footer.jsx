import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const headlineRef = useRef(null);
  const gridRef = useRef(null);
  const bottomRef = useRef(null);
  const dividerRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Inner wrapper smooth reveal
      gsap.fromTo(
        innerRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        }
      );

      // Headline Typography Reveal
      const chars = headlineRef.current?.querySelectorAll('.char');
      if (chars?.length) {
        gsap.fromTo(
          chars,
          { opacity: 0, y: 120, rotateX: -80 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.04,
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // Middle Grid columns fade/up
      const cols = gridRef.current?.querySelectorAll('.footer-col');
      if (cols?.length) {
        gsap.fromTo(
          cols,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // Divider draw
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: 'power4.inOut',
            transformOrigin: 'left center',
            scrollTrigger: {
              trigger: dividerRef.current,
              start: 'top 95%',
            },
          }
        );
      }

      // Bottom Section Reveal
      if (bottomRef.current) {
        gsap.fromTo(
          bottomRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bottomRef.current,
              start: 'top 98%',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headline = "THE FUTURE OF DRIVING";
  const headlineChars = headline.split('').map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{
        marginRight: char === ' ' ? '1.5vw' : '0',
        willChange: 'transform, opacity',
        transformOrigin: '50% 100%'
      }}
    >
      {char}
    </span>
  ));

  return (
    <footer
      ref={containerRef}
      className="relative w-full text-[#F3F3F3] bg-[#131313] overflow-hidden select-none"
    >
      {/* 
        Smooth gradient transition layer to blend out the Final Experience section 
        into the dark footer, maintaining the cinematic flow.
      */}
      <div
        className="w-full pointer-events-none"
        style={{
          height: '180px',
          background: 'linear-gradient(to bottom, #F3F3F3 0%, #131313 100%)',
        }}
      />

      <div ref={innerRef} className="footer-inner w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 pt-8 pb-12 lg:pt-16 lg:pb-16 flex flex-col items-center">
        
        {/* TOP SECTION: Statement Typography */}
        <div className="w-full flex justify-center mb-24 lg:mb-40">
          <h2
            ref={headlineRef}
            className="font-display font-black uppercase text-center leading-[0.85] tracking-tighter"
            style={{ fontSize: 'clamp(2.5rem, 9vw, 13rem)', perspective: '1000px' }}
          >
            {headlineChars}
          </h2>
        </div>

        {/* MIDDLE SECTION: Modern Grid */}
        <div 
          ref={gridRef}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24 lg:mb-40"
        >
          {/* Column 1 */}
          <div className="footer-col flex flex-col">
            <h3 className="font-display text-xl lg:text-2xl uppercase tracking-widest font-semibold mb-6">BMW</h3>
            <p className="text-[#B5B5B5] text-sm font-light leading-relaxed max-w-xs">
              Sheer driving pleasure since 1916. Crafting the future of mobility through precision engineering and relentless innovation.
            </p>
          </div>

          {/* Column 2 */}
          <div className="footer-col flex flex-col md:pl-0 lg:pl-12">
            <ul className="space-y-4">
              {['History', 'Innovation', 'Performance', 'Experience'].map(item => (
                <li key={item}>
                  <a href="#" className="footer-link group relative text-sm uppercase tracking-[0.2em] font-light inline-block">
                    {item}
                    <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-[#B5B5B5] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right group-hover:origin-left"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-col flex flex-col md:pl-0 lg:pl-12">
            <ul className="space-y-4">
              {['Contact', 'Careers', 'Press', 'Support'].map(item => (
                <li key={item}>
                  <a href="#" className="footer-link group relative text-sm uppercase tracking-[0.2em] font-light inline-block">
                    {item}
                    <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-[#B5B5B5] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right group-hover:origin-left"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div className="footer-col flex flex-col md:pl-0 lg:pl-12">
            <ul className="space-y-4">
              {['Instagram', 'YouTube', 'LinkedIn'].map(item => (
                <li key={item}>
                  <a href="#" className="footer-link group relative text-sm uppercase tracking-[0.2em] font-light inline-block">
                    {item}
                    <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-[#B5B5B5] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right group-hover:origin-left"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="w-full flex flex-col">
          {/* Minimal Divider */}
          <div ref={dividerRef} className="w-full h-[1px] bg-[#B5B5B5]/30 mb-8" />
          
          <div ref={bottomRef} className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[#B5B5B5] text-xs tracking-[0.2em] uppercase font-light">
              © BMW 2026
            </div>
            
            <div className="text-[#F3F3F3] text-xs tracking-[0.3em] uppercase font-light">
              Crafted with Precision
            </div>

            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-4 text-xs tracking-[0.2em] uppercase font-light text-[#F3F3F3] hover:text-[#B5B5B5] transition-colors duration-500"
            >
              <span>Back To Top</span>
              <div className="w-8 h-8 rounded-full border border-[#B5B5B5]/40 flex items-center justify-center group-hover:border-[#B5B5B5] group-hover:-translate-y-1 transition-all duration-500">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="transform -rotate-90">
                  <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          transition: color 0.5s ease;
        }
        .footer-link:hover {
          color: #B5B5B5;
        }
      `}</style>
    </footer>
  );
}
