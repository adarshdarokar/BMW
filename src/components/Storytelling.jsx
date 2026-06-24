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
          scrub: true
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
          scrub: true
        }
      }
    ).scrollTrigger);

    // Fade-in text as they enter the screen
    const textBlocks = [text1Ref.current, text2Ref.current];
    textBlocks.forEach((block) => {
      if (!block) return;
      const elements = block.querySelectorAll('.story-anim');
      
      triggers.push(gsap.fromTo(elements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true
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
      className="relative w-full bg-bmw-black py-12 md:py-20 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col space-y-24 md:space-y-40 relative z-10 select-none">
        
        {/* Story 1: Exterior / Precision */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Text block left */}
          <div
            ref={text1Ref}
            className="md:col-span-5 flex flex-col justify-center order-2 md:order-1"
          >
            <span className="story-anim text-[10px] tracking-[0.4em] text-bmw-light-gray uppercase font-bold mb-3 block">
              DESIGN PHILOSOPHY
            </span>
            <h2 className="story-anim text-3xl md:text-5xl font-light font-display text-bmw-light leading-tight mb-6">
              AESTHETIC PRECISION
            </h2>
            <p className="story-anim text-sm sm:text-base font-light leading-relaxed text-bmw-light-gray mb-6">
              Every curve, crease, and panel is designed with surgical accuracy. 
              Aerodynamics are not added; they are carved into the very soul of the chassis, 
              sculpted to guide airflow and command road presence with equal authority.
            </p>
            <div className="story-anim flex items-center space-x-3 group cursor-pointer w-fit">
              <span className="text-xs tracking-[0.2em] font-medium text-bmw-light group-hover:text-bmw-light-gray transition-colors">
                EXPLORE SURFACING
              </span>
              <svg className="w-4 h-4 text-bmw-light transform group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

          {/* Large image right */}
          <div
            ref={img1WrapperRef}
            className="md:col-span-7 overflow-hidden aspect-[4/3] rounded-lg relative order-1 md:order-2 bg-bmw-medium/10"
          >
            {/* Dark glass cover edge */}
            <div className="absolute inset-0 bg-gradient-to-tr from-bmw-black/25 via-transparent to-bmw-black/10 z-10 pointer-events-none" />
            <img
              ref={img1Ref}
              src="/assets/exterior.png"
              alt="BMW Headlight Detail"
              className="w-full h-[130%] object-cover absolute top-0 left-0"
            />
          </div>
        </div>

        {/* Story 2: Interior / Sanctuary */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Large image left */}
          <div
            ref={img2WrapperRef}
            className="md:col-span-7 overflow-hidden aspect-[4/3] rounded-lg relative bg-bmw-medium/10"
          >
            {/* Dark glass cover edge */}
            <div className="absolute inset-0 bg-gradient-to-tr from-bmw-black/25 via-transparent to-bmw-black/10 z-10 pointer-events-none" />
            <img
              ref={img2Ref}
              src="/assets/interior.png"
              alt="BMW Luxury Cockpit"
              className="w-full h-[130%] object-cover absolute top-0 left-0"
            />
          </div>

          {/* Text block right */}
          <div
            ref={text2Ref}
            className="md:col-span-5 flex flex-col justify-center pl-0 md:pl-8"
          >
            <span className="story-anim text-[10px] tracking-[0.4em] text-bmw-light-gray uppercase font-bold mb-3 block">
              HUMAN CENTRIC
            </span>
            <h2 className="story-anim text-3xl md:text-5xl font-light font-display text-bmw-light leading-tight mb-6">
              INTELLIGENT SANCTUARY
            </h2>
            <p className="story-anim text-sm sm:text-base font-light leading-relaxed text-bmw-light-gray mb-6">
              The cockpit is an extension of the driver's intent. Premium tactile leather 
              blends with responsive ambient luminescence to create an atmosphere that isolates 
              distractions and heightens sensory connection to the drive.
            </p>
            <div className="story-anim flex items-center space-x-3 group cursor-pointer w-fit">
              <span className="text-xs tracking-[0.2em] font-medium text-bmw-light group-hover:text-bmw-light-gray transition-colors">
                INNER DETAILS
              </span>
              <svg className="w-4 h-4 text-bmw-light transform group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
