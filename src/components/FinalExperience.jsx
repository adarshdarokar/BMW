import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalExperience() {
  const sectionRef = useRef(null);
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
      .fromTo(eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      )
      .fromTo(headlineRef.current,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: 'power4.out' },
        '-=0.6'
      )
      .fromTo(dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.2, ease: 'power3.out', transformOrigin: 'center' },
        '-=0.8'
      )
      .fromTo(sublineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(buttonRef.current,
        { opacity: 0, y: 24 },
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

      {/* Subtle top-left accent line */}
      <div className="absolute top-0 left-0 w-px h-24 md:h-40 bg-current opacity-10 z-0 ml-6 md:ml-16" />

      {/* Centered content block */}
      <div className="relative z-10 w-full layout-container flex flex-col items-center text-center select-none py-16 md:py-24">

        {/* Eyebrow label */}
        <span
          ref={eyebrowRef}
          className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.45em] sm:tracking-[0.55em] font-light opacity-60 mb-5 md:mb-7"
          style={{ opacity: 0 }}
        >
          THE CLIMAX OF ENGINEERING
        </span>

        {/* Main headline — fluid responsive scale */}
        <h2
          ref={headlineRef}
          className="font-light font-sans uppercase leading-[0.92] tracking-[0.06em] sm:tracking-[0.08em] md:tracking-[0.1em] mb-0"
          style={{
            fontSize: 'clamp(2.4rem, 10vw, 9rem)',
            opacity: 0,
          }}
        >
          EXPERIENCE BMW
        </h2>

        {/* Thin divider between headline and body — adds editorial luxury feel */}
        <div
          ref={dividerRef}
          className="w-12 md:w-16 h-px bg-current opacity-25 mt-7 md:mt-9 mb-7 md:mb-9"
          style={{ opacity: 0 }}
        />

        {/* Sub-tagline — short premium copy that grounds the CTA */}
        <p
          ref={sublineRef}
          className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] opacity-50 font-light max-w-[260px] sm:max-w-xs md:max-w-sm leading-relaxed mb-9 md:mb-12"
          style={{ opacity: 0 }}
        >
          Pure precision. Engineered for those who refuse to compromise.
        </p>

        {/* CTA Button */}
        <div
          ref={buttonRef}
          className="inline-block btn-luxury-wrapper"
          style={{ opacity: 0 }}
        >
          <div className="btn-luxury-glow" />
          <button
            className="btn-luxury"
            aria-label="Book a test drive in the BMW M5"
            style={{ padding: 'clamp(12px, 2vw, 16px) clamp(28px, 5vw, 48px)' }}
          >
            <span className="btn-luxury-sweep" />
            <span className="btn-luxury-text" style={{ fontSize: 'clamp(10px, 1.5vw, 13px)' }}>
              BOOK A TEST DRIVE
            </span>
            <svg
              className="btn-luxury-arrow w-3.5 h-3.5 md:w-4 md:h-4"
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
    </section>
  );
}
