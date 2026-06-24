import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Statistics() {
  const containerRef = useRef(null);
  
  const [accel, setAccel] = useState(0);
  const [power, setPower] = useState(0);
  const [range, setRange] = useState(0);

  useEffect(() => {
    const parent = containerRef.current;
    if (!parent) return;

    const statsObj = { accel: 0, power: 0, range: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: 'top 75%',
        once: true // trigger count-up only once for premium feeling
      }
    });

    tl.to(statsObj, {
      accel: 3.7,
      power: 601,
      range: 582,
      duration: 2.5,
      ease: 'power3.out',
      onUpdate: () => {
        setAccel(statsObj.accel.toFixed(1));
        setPower(Math.floor(statsObj.power));
        setRange(Math.floor(statsObj.range));
      }
    });

    // Fade in structural borders and text
    tl.fromTo(parent.querySelectorAll('.stat-border'),
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: 'power2.out', transformOrigin: 'left' },
      '0'
    );

    tl.fromTo(parent.querySelectorAll('.stat-label'),
      { opacity: 0, y: 15 },
      { opacity: 0.5, y: 0, duration: 1, ease: 'power2.out', stagger: 0.15 },
      '0.5'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="statistics"
      className="relative w-full bg-bmw-black py-24 md:py-48 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto select-none z-10 relative">
        <span className="text-[10px] tracking-[0.4em] text-bmw-light-gray uppercase font-bold mb-12 block text-center">
          ENGINEERING BENCHMARKS
        </span>

        {/* Minimal Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          
          {/* Stat 1: Acceleration */}
          <div className="flex flex-col items-center text-center px-4 relative">
            <div className="stat-border absolute top-0 left-0 w-full h-[1px] bg-bmw-medium/20" />
            <div className="pt-10 flex items-baseline">
              <span className="text-7xl md:text-9xl font-light font-display text-bmw-light leading-none">
                {accel}
              </span>
              <span className="text-xl md:text-2xl font-light text-bmw-light-gray ml-2">
                S
              </span>
            </div>
            <span className="stat-label text-[10px] tracking-[0.25em] text-bmw-light-gray font-mono uppercase mt-6">
              0 - 100 KM/H ACCELERATION
            </span>
          </div>

          {/* Stat 2: Power */}
          <div className="flex flex-col items-center text-center px-4 relative">
            <div className="stat-border absolute top-0 left-0 w-full h-[1px] bg-bmw-medium/20" />
            <div className="pt-10 flex items-baseline">
              <span className="text-7xl md:text-9xl font-light font-display text-bmw-light leading-none">
                {power}
              </span>
              <span className="text-xl md:text-2xl font-light text-bmw-light-gray ml-2">
                HP
              </span>
            </div>
            <span className="stat-label text-[10px] tracking-[0.25em] text-bmw-light-gray font-mono uppercase mt-6">
              M TWINPOWER MAX OUTPUT
            </span>
          </div>

          {/* Stat 3: Range */}
          <div className="flex flex-col items-center text-center px-4 relative">
            <div className="stat-border absolute top-0 left-0 w-full h-[1px] bg-bmw-medium/20" />
            <div className="pt-10 flex items-baseline">
              <span className="text-7xl md:text-9xl font-light font-display text-bmw-light leading-none">
                {range}
              </span>
              <span className="text-xl md:text-2xl font-light text-bmw-light-gray ml-2">
                KM
              </span>
            </div>
            <span className="stat-label text-[10px] tracking-[0.25em] text-bmw-light-gray font-mono uppercase mt-6">
              PURE ELECTRIC RANGE (WLTP)
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
