import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const brandRef = useRef(null);
  const buttonsRef = useRef([]);
  const carRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Theme transition: dark -> light as section scrolls into view
    const themeTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'top 30%',
        scrub: 1.5,
      }
    });

    themeTl.to([section, 'footer'], {
      backgroundColor: '#F3F3F3',
      color: '#131313',
      ease: 'power2.out'
    });

    // Content reveal animations
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        once: true,
      }
    });

    contentTl
      .fromTo(cardRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' }
      )
      .fromTo(brandRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(buttonsRef.current.filter(Boolean),
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, stagger: 0.15, duration: 1.0, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo(carRef.current,
        { opacity: 0, scale: 0.95, x: 40 },
        { opacity: 1, scale: 1, x: 0, duration: 1.4, ease: 'power4.out' },
        '-=0.9'
      );

    return () => {
      themeTl.kill();
      contentTl.kill();
    };
  }, []);

  const contactOptions = [
    {
      title: 'BOOK A TEST DRIVE',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    },
    {
      title: 'CONTACT US',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      )
    },
    {
      title: 'FIND A DEALER',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen bg-[#131313] text-[#F3F3F3] flex items-center justify-center py-16 md:py-24 transition-colors duration-500 overflow-hidden"
    >
      <div className="layout-container px-6 sm:px-12 md:px-16 w-full">
        
        {/* Same-to-Same Corporate Card */}
        <div
          ref={cardRef}
          className="relative w-full bg-gradient-to-br from-white via-white to-[#F9F9FB] text-black rounded-[32px] overflow-hidden shadow-[0_45px_90px_-20px_rgba(0,0,0,0.045),0_15px_40px_-15px_rgba(0,0,0,0.035),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-neutral-200/50 flex flex-col md:flex-row min-h-[500px]"
          style={{ opacity: 0 }}
        >
          {/* Subtle background vector curves matching the reference image */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 select-none">
            <svg className="w-full h-full text-black" viewBox="0 0 1000 600" fill="currentColor">
              <path d="M-100 120 C 350 200 450 40 950 150 L 950 700 L -100 700 Z" />
              <path d="M-100 350 C 250 480 500 280 1100 420 L 1100 700 L -100 700 Z" opacity="0.5" />
            </svg>
          </div>

          {/* Mobile Car Banner (displays only on mobile, top of card) */}
          <div className="block md:hidden w-full h-[220px] overflow-hidden relative">
            <img
              src="/assets/bmw-m5-rear.png"
              className="w-full h-full object-cover"
              alt="BMW M5 Rear View"
            />
            {/* Smooth overlay gradient to match the card bg */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>

          {/* Left / Branding Quadrant */}
          <div
            ref={brandRef}
            className="w-full md:w-[45%] p-8 xs:p-10 md:p-16 flex flex-col justify-center z-10"
            style={{ opacity: 0 }}
          >
            <span className="text-[9px] uppercase tracking-[0.55em] font-semibold text-[#666666] mb-4">
              THE CLIMAX OF ENGINEERING
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.06em] uppercase leading-[1.0] text-[#111111] mb-3">
              EXPERIENCE
              <span className="block mt-1 font-normal tracking-[0.18em] font-sans">B M W</span>
            </h2>

            {/* M-Color Stripe Divider */}
            <div className="flex items-center gap-2 mt-2 mb-6">
              <div className="flex h-1 w-9 flex-shrink-0">
                <div className="w-1/3 bg-[#0066b2]" /> {/* Light Blue */}
                <div className="w-1/3 bg-[#00185a]" /> {/* Dark Blue */}
                <div className="w-1/3 bg-[#e31a1a]" /> {/* Red */}
              </div>
              <div className="h-[1px] w-28 bg-neutral-200" />
            </div>

            <p className="text-[11px] sm:text-xs tracking-[0.2em] leading-[1.8] text-[#666666] uppercase font-light max-w-sm">
              PURE PRECISION. ENGINEERED FOR THOSE WHO REFUSE TO COMPROMISE.
            </p>
          </div>

          {/* Middle / Contact Buttons Quadrant */}
          <div className="w-full md:w-[35%] p-8 xs:p-10 md:py-16 md:pr-12 md:pl-0 flex items-center z-10">
            {/* Vertical hairline divider with fading gradient for desktop view */}
            <div className="hidden md:block w-[1px] h-48 bg-gradient-to-b from-transparent via-neutral-200/60 to-transparent mr-12 flex-shrink-0" />
            
            <div className="flex flex-col space-y-4 w-full justify-center">
              {contactOptions.map((opt, idx) => (
                <div
                  key={opt.title}
                  ref={el => buttonsRef.current[idx] = el}
                  style={{ opacity: 0 }}
                  className="w-full"
                >
                  <a
                    href="#"
                    className="relative flex items-center justify-between w-full group py-5 pl-6 pr-4 -mx-4 rounded-2xl border-b border-neutral-100 hover:bg-neutral-50/70 hover:pl-8 transition-all duration-300 outline-none"
                    aria-label={opt.title}
                  >
                    {/* Vertical M-stripe indicator on hover */}
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-[3px] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center flex flex-col rounded-r">
                      <div className="flex-1 bg-[#0066b2]" />
                      <div className="flex-1 bg-[#00185a]" />
                      <div className="flex-1 bg-[#e31a1a]" />
                    </div>

                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-[#F5F5F7] group-hover:bg-[#111111] group-hover:text-white text-black flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.03)] mr-4 border border-black/5 transform transition-all duration-300 group-hover:scale-105">
                        {opt.icon}
                      </div>
                      <span className="text-[11px] font-bold tracking-[0.2em] text-[#111111] transition-colors duration-300">
                        {opt.title}
                      </span>
                    </div>
                    <svg
                      className="w-4 h-4 text-[#666666] group-hover:text-black transform transition-all duration-300 group-hover:translate-x-1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right / Car Image Quadrant (displays absolute right on desktop) */}
          <div
            ref={carRef}
            className="hidden md:block absolute right-0 top-0 bottom-0 w-[35%] pointer-events-none"
            style={{ opacity: 0 }}
          >
            <img
              src="/assets/bmw-m5-rear.png"
              className="w-full h-full object-cover object-left"
              alt="BMW M5 Rear View"
            />
            {/* Fade overlays to blend the car naturally into the layout */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
          </div>

        </div>

      </div>
    </section>
  );
}
