import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalExperience() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Theme transition: change background to #F3F3F3 and text to #131313
    // We target the section itself and animate its background and text colors.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'top 20%',
        scrub: 1.5,
      }
    });

    tl.to(section, {
      backgroundColor: '#F3F3F3',
      color: '#131313',
      ease: 'power2.out'
    });

    // Content reveal animation
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 50%',
      }
    });

    contentTl.fromTo(headlineRef.current,
      { opacity: 0, y: 50, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 2.5, ease: 'power4.out' }
    )
    .fromTo(buttonRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 2.0, ease: 'power3.out' },
      '-=1.5'
    );

    return () => {
      tl.kill();
      contentTl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full min-h-screen bg-[#131313] text-[#F3F3F3] flex items-center justify-center transition-colors duration-500 overflow-hidden"
    >
      {/* Editorial background markings */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center select-none z-0">
        <span className="text-[25vw] font-black font-sans tracking-tight text-bmw-gray">
          M5
        </span>
      </div>

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 text-center select-none"
      >
        <span className="text-[10px] tracking-[0.4em] text-[#B5B5B5] uppercase font-light mb-4 block">
          THE CLIMAX OF ENGINEERING
        </span>
        
        <h2
          ref={headlineRef}
          className="text-5xl sm:text-7xl lg:text-9xl font-light tracking-[0.1em] font-sans uppercase leading-none mb-12"
        >
          EXPERIENCE BMW
        </h2>

        {/* Premium Luxury Call to Action */}
        <div ref={buttonRef} className="inline-block btn-luxury-wrapper mt-4">
          <div className="btn-luxury-glow"></div>
          <button className="btn-luxury">
            <span className="btn-luxury-sweep"></span>
            <span className="btn-luxury-text">BOOK A TEST DRIVE</span>
            <svg 
              className="btn-luxury-arrow w-4 h-4" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
