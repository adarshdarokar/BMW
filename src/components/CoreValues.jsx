import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CoreValues() {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const itemsRef = useRef([]);
  const descRef = useRef([]);

  const values = [
    {
      num: "01",
      title: "PRECISION",
      desc: "Measured in microns, perfected in motion. We align tolerance to physical limits, ensuring absolute synergy between human intention and mechanical response."
    },
    {
      num: "02",
      title: "PERFORMANCE",
      desc: "More than horsepower. It is the perfect equilibrium of power delivery, cornering agility, and braking responsiveness that makes the drive an addictive art form."
    },
    {
      num: "03",
      title: "INNOVATION",
      desc: "Constructing the infrastructure of tomorrow. We integrate intelligence directly into structural elements, pioneering new paradigms of driver assistance and circular recycling."
    },
    {
      num: "04",
      title: "LUXURY",
      desc: "A sensory experience designed to soothe. High-end materials, acoustic damping, and ergonomic mastery create a personal sanctuary that isolates you from the chaos of the road."
    },
    {
      num: "05",
      title: "ENGINEERING",
      desc: "Born out of aircraft precision, engineered for racing dominance. Every mechanical unit represents a decade of iteration, designed to withstand stress and perform under absolute loads."
    }
  ];

  useEffect(() => {
    const parent = containerRef.current;
    
    // Create ScrollTrigger pinning timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: pinRef.current,
      }
    });

    // Animate list items and descriptions based on scroll progress
    values.forEach((_, idx) => {
      if (idx === 0) {
        // Set first item as active initially
        gsap.set(itemsRef.current[0], { color: '#F3F3F3', x: 20 });
        gsap.set(descRef.current[0], { opacity: 1, y: 0 });
        // Set other items as inactive
        values.slice(1).forEach((_, oIdx) => {
          gsap.set(itemsRef.current[oIdx + 1], { color: '#3C3C3C', x: 0 });
          gsap.set(descRef.current[oIdx + 1], { opacity: 0, y: 30 });
        });
        return;
      }

      const prevIdx = idx - 1;
      
      // Transition from prev to current
      tl.to([itemsRef.current[prevIdx], descRef.current[prevIdx]], {
        color: prevIdx === 0 ? '#3C3C3C' : '#3C3C3C', // target inactive color
        x: prevIdx === 0 ? 0 : 0,
        opacity: prevIdx === 0 ? 0 : 0,
        y: prevIdx === 0 ? -30 : -30,
        duration: 1,
        ease: 'power2.inOut'
      })
      .to([itemsRef.current[idx], descRef.current[idx]], {
        color: '#F3F3F3', // active color
        x: 20,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=0.5')
      .to({}, { duration: 0.4 }); // Hold
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="core-values"
      className="relative w-full h-[200vh] bg-bmw-black"
    >
      <div
        ref={pinRef}
        className="w-full h-screen sticky top-0 flex items-center justify-center overflow-hidden px-8 md:px-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full max-w-7xl mx-auto items-center select-none z-10">
          
          {/* Left Column: Vertical values navigation tracker */}
          <div className="col-span-1 md:col-span-5 flex flex-col space-y-6 md:space-y-10 border-l border-bmw-medium/20 pl-4 py-6">
            {values.map((v, idx) => (
              <div
                key={idx}
                ref={el => itemsRef.current[idx] = el}
                className="flex items-center space-x-6 text-2xl md:text-4xl font-light font-display tracking-wider cursor-default origin-left transition-all duration-300"
                style={{ color: '#3C3C3C' }}
              >
                <span className="text-xs md:text-sm font-mono tracking-widest text-bmw-gray">
                  {v.num}
                </span>
                <span>{v.title}</span>
              </div>
            ))}
          </div>

          {/* Right Column: Dynamic Description Panel */}
          <div className="col-span-1 md:col-span-7 relative h-48 md:h-64 flex items-center pl-0 md:pl-16">
            {values.map((v, idx) => (
              <div
                key={idx}
                ref={el => descRef.current[idx] = el}
                className="absolute w-full flex flex-col justify-center pointer-events-none opacity-0 translate-y-8"
              >
                <span className="text-[10px] tracking-[0.4em] font-bold text-bmw-light-gray uppercase mb-3">
                  CORE BRAND PILLAR
                </span>
                <p className="text-lg md:text-2xl font-light leading-relaxed text-bmw-light-gray max-w-xl">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
