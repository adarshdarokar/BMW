import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Storytelling() {
  const containerRef = useRef(null);
  
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img1WrapperRef = useRef(null);
  const img2WrapperRef = useRef(null);

  useEffect(() => {
    const triggers = [];

    // Parallax on images
    triggers.push(gsap.fromTo(img1Ref.current,
      { yPercent: -15 },
      {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: img1WrapperRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.0
        }
      }
    ).scrollTrigger);

    triggers.push(gsap.fromTo(img2Ref.current,
      { yPercent: -15 },
      {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: img2WrapperRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.0
        }
      }
    ).scrollTrigger);

    // Fade-in text as they enter the screen
    const textBlocks = [text1Ref.current, text2Ref.current];
    textBlocks.forEach((block) => {
      if (!block) return;
      const elements = block.querySelectorAll('.story-anim');
      
      triggers.push(gsap.fromTo(elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 1.0
          }
        }
      ).scrollTrigger);
    });

    return () => {
      triggers.forEach(t => t && t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="storytelling"
      className="relative w-full bg-[#131313] py-16 md:py-32 overflow-hidden"
    >
      {/* Tech blueprint grid lines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] select-none z-0">
        <svg className="w-full h-full text-[#F3F3F3]" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="tech-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-grid)" />
        </svg>
      </div>

      <div className="layout-container flex flex-col space-y-16 md:space-y-36 relative z-10 select-none">
        
        {/* Story 1: Exterior / Precision */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Text block left */}
          <div
            ref={text1Ref}
            className="md:col-span-5 flex flex-col justify-center order-2 md:order-1"
          >
            <span className="story-anim text-[10px] tracking-[0.4em] text-bmw-light-gray uppercase font-light mb-3 block">
              DESIGN PHILOSOPHY
            </span>
            <h2 className="story-anim text-3xl md:text-5xl font-light font-sans text-bmw-light leading-tight mb-6">
              AESTHETIC PRECISION
            </h2>
            <p className="story-anim text-sm sm:text-base font-light leading-relaxed text-bmw-light-gray mb-8">
              Every curve, crease, and panel is designed with surgical accuracy. 
              Aerodynamics are not added; they are carved into the very soul of the chassis, 
              sculpted to guide airflow and command road presence with equal authority.
            </p>
            <button 
              className="story-anim flex items-center space-x-3 group cursor-pointer px-6 py-3 border border-neutral-700/80 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 outline-none w-fit text-bmw-light font-sans"
              aria-label="Explore exterior design surfacing details"
            >
              <span className="text-[10px] tracking-[0.2em] font-medium transition-colors duration-300">
                EXPLORE SURFACING
              </span>
              <svg className="w-3.5 h-3.5 text-current transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Large image right */}
          <div
            ref={img1WrapperRef}
            className="md:col-span-7 p-2 bg-[#1C1C1C]/60 border border-neutral-800/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden aspect-[4/3] relative order-1 md:order-2"
          >
            <div className="w-full h-full rounded-xl overflow-hidden relative bg-bmw-medium/10">
              {/* Dark glass cover edge */}
              <div className="absolute inset-0 bg-gradient-to-tr from-bmw-black/25 via-transparent to-bmw-black/10 z-10 pointer-events-none" />
              <img
                ref={img1Ref}
                src="/assets/exterior.webp"
                alt="BMW M5 high-performance sports car sleek double headlight detailing"
                className="w-full h-[130%] object-cover absolute top-0 left-0 gpu-accelerated will-change-transform"
              />
            </div>
          </div>
        </div>

        {/* Story 2: Interior / Sanctuary */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Large image left */}
          <div
            ref={img2WrapperRef}
            className="md:col-span-7 p-2 bg-[#1C1C1C]/60 border border-neutral-800/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden aspect-[4/3] relative"
          >
            <div className="w-full h-full rounded-xl overflow-hidden relative bg-bmw-medium/10">
              {/* Dark glass cover edge */}
              <div className="absolute inset-0 bg-gradient-to-tr from-bmw-black/25 via-transparent to-bmw-black/10 z-10 pointer-events-none" />
              <img
                ref={img2Ref}
                src="/assets/interior.webp"
                alt="BMW luxury modern vehicle interior dashboard display and leather console view"
                className="w-full h-[130%] object-cover absolute top-0 left-0 gpu-accelerated will-change-transform"
              />
            </div>
          </div>

          {/* Text block right */}
          <div
            ref={text2Ref}
            className="md:col-span-5 flex flex-col justify-center pl-0 md:pl-8"
          >
            <span className="story-anim text-[10px] tracking-[0.4em] text-bmw-light-gray uppercase font-light mb-3 block">
              HUMAN CENTRIC
            </span>
            <h2 className="story-anim text-3xl md:text-5xl font-light font-sans text-bmw-light leading-tight mb-6">
              INTELLIGENT SANCTUARY
            </h2>
            <p className="story-anim text-sm sm:text-base font-light leading-relaxed text-bmw-light-gray mb-8">
              The cockpit is an extension of the driver's intent. Premium tactile leather 
              blends with responsive ambient luminescence to create an atmosphere that isolates 
              distractions and heightens sensory connection to the drive.
            </p>
            <button 
              className="story-anim flex items-center space-x-3 group cursor-pointer px-6 py-3 border border-neutral-700/80 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 outline-none w-fit text-bmw-light font-sans"
              aria-label="Explore interior cabin details"
            >
              <span className="text-[10px] tracking-[0.2em] font-medium transition-colors duration-300">
                INNER DETAILS
              </span>
              <svg className="w-3.5 h-3.5 text-current transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
