import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LogoAnimation() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 2.0; // Play the video at 2x speed as requested

      const forcePlay = () => {
        video.play().catch(err => {
          console.warn("Retrying video play:", err);
        });
      };

      // Force play on load, fallback to user interactions if blocked by browser policy
      video.play().catch(() => {
        const interactionEvents = ['click', 'touchstart', 'scroll'];
        const playOnInteraction = () => {
          forcePlay();
          interactionEvents.forEach(evt => window.removeEventListener(evt, playOnInteraction));
        };
        interactionEvents.forEach(evt => window.addEventListener(evt, playOnInteraction, { passive: true }));
      });
    }

    // Premium entrance animation for the video on scroll
    gsap.fromTo(
      videoRef.current,
      { opacity: 0, scale: 0.98 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[40vh] md:h-screen bg-[#131313] py-12 md:py-0 flex items-center justify-center overflow-hidden"
    >
      {/* Subtle radial backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-radial from-[#F3F3F3]/5 to-transparent pointer-events-none filter blur-3xl z-0" />

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-[90%] md:w-[70vw] max-w-[1000px] h-auto object-contain z-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-neutral-800/10"
      >
        <source src="/bmw-logo-animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
}
