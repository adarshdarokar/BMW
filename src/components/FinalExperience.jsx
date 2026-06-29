import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalExperience() {
  const sectionRef = useRef(null);
  const boxRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const dividerRef = useRef(null);
  const sublineRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Theme transition: dark -> light as section scrolls into view
    const themeTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 65%',
        end: 'top 25%',
        scrub: 1.5,
      }
    });

    themeTl.to([section, 'footer'], {
      backgroundColor: '#F3F3F3',
      color: '#131313',
      ease: 'power2.out'
    });

    // Staggered content reveal — each element enters sequentially
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 55%',
        once: true,
      }
    });

    contentTl
      .fromTo(boxRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }
      )
      .fromTo(eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
        '-=1.1'
      )
      .fromTo(headlineRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power4.out' },
        '-=0.8'
      )
      .fromTo(dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.2, ease: 'power3.out', transformOrigin: 'center' },
        '-=1.0'
      )
      .fromTo(sublineRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' },
        '-=0.9'
      );

    return () => {
      themeTl.kill();
      contentTl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full min-h-[80vh] md:min-h-screen bg-[#131313] text-[#F3F3F3] flex items-center justify-center overflow-hidden transition-colors duration-500"
    >
      {/* Background "M5" Watermark — shifted right and bottom for better composition */}
      <div
        className="absolute pointer-events-none select-none z-0"
        style={{
          bottom: '-4%',
          right: '-2%',
          opacity: 0.04,
          lineHeight: 1,
        }}
      >
        <span
          className="font-black font-sans tracking-tighter"
          style={{ fontSize: 'clamp(120px, 22vw, 340px)' }}
        >
          M5
        </span>
      </div>

      {/* Blueprint Hairline Background Grid (bg-current transitions with theme color automatically) */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute top-[30%] left-0 w-full h-[1px] bg-current" />
        <div className="absolute top-[70%] left-0 w-full h-[1px] bg-current" />
        <div className="absolute left-[20%] top-0 w-[1px] h-full bg-current" />
        <div className="absolute left-[80%] top-0 w-[1px] h-full bg-current" />
      </div>

      {/* Subtle top-left accent line */}
      <div className="absolute top-0 left-0 w-px h-24 md:h-40 bg-current opacity-10 z-0 ml-6 md:ml-16" />

      {/* Centered content block */}
      <div className="relative z-10 w-full layout-container flex flex-col items-center justify-center select-none py-20 md:py-32 px-4 sm:px-6">
        
        {/* Editorial Frame Card */}
        <div
          ref={boxRef}
          className="relative w-full max-w-4xl border border-current/10 rounded-[32px] p-8 xs:p-12 md:p-20 flex flex-col items-center justify-center bg-white/[0.01] backdrop-blur-md shadow-[0_40px_100px_rgba(0,0,0,0.03)]"
          style={{ opacity: 0 }}
        >
          {/* Blueprint Corner Accents */}
          <div className="absolute -top-[1.5px] -left-[1.5px] w-4 h-4 border-t-2 border-l-2 border-current" />
          <div className="absolute -top-[1.5px] -right-[1.5px] w-4 h-4 border-t-2 border-r-2 border-current" />
          <div className="absolute -bottom-[1.5px] -left-[1.5px] w-4 h-4 border-b-2 border-l-2 border-current" />
          <div className="absolute -bottom-[1.5px] -right-[1.5px] w-4 h-4 border-b-2 border-r-2 border-current" />

          {/* Eyebrow label with generous spacing */}
          <span
            ref={eyebrowRef}
            className="inline-block text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.55em] sm:tracking-[0.65em] font-light opacity-60 mb-8 md:mb-12 text-center"
            style={{ opacity: 0 }}
          >
            THE CLIMAX OF ENGINEERING
          </span>

          {/* Main headline with refined line-height and generous gaps */}
          <h2
            ref={headlineRef}
            className="font-light font-sans uppercase leading-[1.0] tracking-[0.08em] sm:tracking-[0.1em] text-center mb-0"
            style={{
              fontSize: 'clamp(2rem, 8.5vw, 6.5rem)',
              opacity: 0,
            }}
          >
            EXPERIENCE BMW
          </h2>

          {/* Elegant precision target divider */}
          <div
            ref={dividerRef}
            className="flex items-center justify-center gap-4 my-8 md:my-12 w-full max-w-xs"
            style={{ opacity: 0 }}
          >
            <div className="h-[1px] flex-1 bg-current opacity-20" />
            <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
            <div className="h-[1px] flex-1 bg-current opacity-20" />
          </div>

          {/* Sub-tagline — styled as editorial content */}
          <p
            ref={sublineRef}
            className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.3em] opacity-50 font-light max-w-lg leading-relaxed text-center mb-10 md:mb-16"
            style={{ opacity: 0 }}
          >
            Pure precision. Engineered for those who refuse to compromise.
          </p>

          {/* CTA Button with responsive luxury margins */}
          <div
            ref={buttonRef}
            className="inline-block btn-luxury-wrapper"
            style={{ opacity: 0 }}
          >
            <div className="btn-luxury-glow" />
            <button
              className="btn-luxury"
              aria-label="Book a test drive in the BMW M5"
              style={{ padding: 'clamp(14px, 2vw, 18px) clamp(32px, 5vw, 56px)' }}
            >
              <span className="btn-luxury-sweep" />
              <span className="btn-luxury-text" style={{ fontSize: 'clamp(10px, 1.5vw, 13px)' }}>
                BOOK A TEST DRIVE
              </span>
              <svg
                className="btn-luxury-arrow w-3.5 h-3.5 md:w-4 md:h-4 ml-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
