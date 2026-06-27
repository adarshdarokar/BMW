import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroPoster from '../assets/hero.png';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    // Elegant reveal animation for the hero content
    const tl = gsap.timeline();
    
    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2.5, ease: 'power2.out' }
    );

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 2.5, ease: 'power4.out' },
      '-=1.5'
    );

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 0.8, y: 0, duration: 2.0, ease: 'power3.out' },
      '-=1.8'
    );

    tl.fromTo(
      lineRef.current,
      { opacity: 0, scaleY: 0 },
      { opacity: 1, scaleY: 1, duration: 1.5, transformOrigin: 'top', ease: 'power3.out' },
      '-=1.2'
    );

    // Subtle parallax effect on video and elements on scroll
    gsap.to(videoRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-screen min-h-screen overflow-hidden flex flex-col justify-between py-10 z-10"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-[-2] overflow-hidden bg-bmw-black">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster}
          className="absolute w-full h-full object-cover object-center opacity-80"
        >
          <source src="/BMW.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Subtle Overlay to match brand look */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-[#131313]/60 via-[#131313]/30 to-[#131313]/90" />

      {/* Spacer for top */}
      <div />

      {/* Main Typography content */}
      <div className="w-full max-w-[1440px] mx-auto text-center px-6 md:px-12 lg:px-24 select-none flex flex-col items-center">
        <h1
          ref={titleRef}
          className="text-6xl sm:text-8xl lg:text-9xl font-light tracking-tight text-[#F3F3F3] font-sans leading-none mb-6 ml-[0.125em]"
        >
          BMW
        </h1>
        <p
          ref={subtitleRef}
          className="text-xs sm:text-sm md:text-base uppercase tracking-[0.8em] font-sans text-[#B5B5B5] ml-[0.4em] font-light"
        >
          THE ULTIMATE DRIVING MACHINE
        </p>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="flex flex-col items-center select-none">
        <span className="text-[10px] tracking-[0.5em] text-[#B5B5B5] uppercase font-sans mb-6 ml-[0.25em]">
          SCROLL TO EXPERIENCE
        </span>
        <div ref={lineRef} className="scroll-indicator-line" />
      </div>
    </section>
  );
}
