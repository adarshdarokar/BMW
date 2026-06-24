import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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
      { opacity: 1, duration: 1.5, ease: 'power2.out' }
    );

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: 'power4.out' },
      '-=0.8'
    );

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 0.6, y: 0, duration: 1.2, ease: 'power3.out' },
      '-=1.2'
    );

    tl.fromTo(
      lineRef.current,
      { opacity: 0, scaleY: 0 },
      { opacity: 1, scaleY: 1, duration: 1.2, transformOrigin: 'top', ease: 'power3.out' },
      '-=0.8'
    );

    // Subtle parallax effect on video and elements on scroll
    gsap.to(videoRef.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between px-6 md:px-12 py-10 z-10"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-[-2] overflow-hidden bg-bmw-black">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute min-w-full min-h-full w-auto h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover opacity-80"
        >
          <source src="/BMW.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Subtle Overlay to match brand look */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-bmw-black/50 via-bmw-black/20 to-bmw-black" />

      {/* Spacer for top */}
      <div />

      {/* Main Typography content */}
      <div className="max-w-5xl mx-auto text-center px-4 select-none">
        <h1
          ref={titleRef}
          className="text-7xl sm:text-9xl md:text-[12rem] font-light tracking-[0.25em] text-bmw-light font-display leading-none mb-4 mr-[-0.25em]"
        >
          BMW
        </h1>
        <p
          ref={subtitleRef}
          className="text-sm sm:text-base md:text-lg uppercase tracking-[0.6em] font-display text-bmw-light-gray mr-[-0.6em] font-light"
        >
          THE ULTIMATE DRIVING MACHINE
        </p>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="flex flex-col items-center select-none">
        <span className="text-[10px] tracking-[0.4em] text-bmw-light-gray uppercase font-display mb-4 mr-[-0.4em]">
          SCROLL TO EXPERIENCE
        </span>
        <div ref={lineRef} className="scroll-indicator-line" />
      </div>
    </section>
  );
}
