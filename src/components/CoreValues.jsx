import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

export default function CoreValues() {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const itemsRef = useRef([]);
  const descRef = useRef([]);
  const mobileCardsRef = useRef([]);

  useEffect(() => {
    const parent = containerRef.current;
    if (!parent) return;

    const mm = gsap.matchMedia();

    // Desktop: Pin layout and transition items on scroll
    mm.add("(min-width: 768px)", () => {
      // Set first item as active initially
      gsap.set(itemsRef.current[0], { color: '#F3F3F3', x: 10 });
      gsap.set(descRef.current[0], { opacity: 1, y: 0 });
      // Set other items as inactive
      values.slice(1).forEach((_, oIdx) => {
        gsap.set(itemsRef.current[oIdx + 1], { color: '#3C3C3C', x: 0 });
        gsap.set(descRef.current[oIdx + 1], { opacity: 0, y: 20 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          start: 'top top',
          end: '+=200%',
          scrub: 1.5,
          pin: pinRef.current,
          invalidateOnRefresh: true,
        }
      });

      values.forEach((_, idx) => {
        if (idx === 0) return;
        const prevIdx = idx - 1;
        
        tl.to(itemsRef.current[prevIdx], {
          color: '#3C3C3C',
          x: 0,
          duration: 1.5,
          ease: 'power2.inOut'
        })
        .to(descRef.current[prevIdx], {
          opacity: 0,
          y: -20,
          duration: 1.5,
          ease: 'power2.inOut'
        }, '-=1.5')
        .to(itemsRef.current[idx], {
          color: '#F3F3F3',
          x: 20,
          duration: 1.5,
          ease: 'power3.out'
        }, '-=0.8')
        .to(descRef.current[idx], {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out'
        }, '-=1.5')
        .to({}, { duration: 0.5 }); // Hold
      });
    });

    // Mobile: Render cards sequentially fading in as they scroll in
    mm.add("(max-width: 767px)", () => {
      values.forEach((_, idx) => {
        const card = mobileCardsRef.current[idx];
        if (!card) return;

        gsap.fromTo(card,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 1.0,
            }
          }
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="core-values"
      className="relative w-full min-h-screen bg-[#131313] overflow-hidden"
    >
      <div
        ref={pinRef}
        className="w-full md:h-screen md:sticky md:top-0 flex items-center justify-center md:overflow-hidden"
      >
        {/* Mobile Layout: A vertical stack of cards */}
        <div className="flex md:hidden flex-col gap-10 layout-container select-none z-10 w-full py-16">
          {values.map((v, idx) => (
            <div 
              key={idx}
              ref={el => mobileCardsRef.current[idx] = el}
              className="flex flex-col border-l border-bmw-medium/40 pl-4 py-4"
            >
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-xs font-mono tracking-widest text-bmw-gray">{v.num}</span>
                <h3 className="text-xl font-light font-sans text-bmw-light tracking-wide">{v.title}</h3>
              </div>
              <span className="text-[9px] tracking-[0.3em] font-medium text-bmw-light-gray uppercase mb-2">
                CORE BRAND PILLAR
              </span>
              <p className="text-sm font-light leading-relaxed text-bmw-light-gray/80">
                {v.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop Layout: Pinned tracker */}
        <div className="hidden md:grid grid-cols-12 gap-8 items-center layout-container select-none z-10 w-full">
          
          {/* Left Column: Vertical values navigation tracker */}
          <div className="col-span-5 flex flex-col space-y-10 border-l border-bmw-medium/20 pl-4 py-6">
            {values.map((v, idx) => (
              <div
                key={idx}
                ref={el => itemsRef.current[idx] = el}
                className="flex items-center space-x-6 text-4xl font-light font-sans tracking-wider cursor-default origin-left transition-all duration-300"
                style={{ color: '#3C3C3C' }}
              >
                <span className="text-sm font-mono tracking-widest text-bmw-gray">
                  {v.num}
                </span>
                <span>{v.title}</span>
              </div>
            ))}
          </div>

          {/* Right Column: Dynamic Description Panel */}
          <div className="col-span-7 relative h-64 flex items-center pl-16">
            {values.map((v, idx) => (
              <div
                key={idx}
                ref={el => descRef.current[idx] = el}
                className="absolute w-full flex flex-col justify-center pointer-events-none opacity-0 translate-y-8"
              >
                <span className="text-[10px] tracking-[0.4em] font-medium text-bmw-light-gray uppercase mb-3">
                  CORE BRAND PILLAR
                </span>
                <p className="text-2xl font-light leading-relaxed text-bmw-light-gray max-w-xl">
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
