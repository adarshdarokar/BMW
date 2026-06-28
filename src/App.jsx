import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Hero from './components/Hero';
import LogoScroll from './components/LogoScroll';
import Introduction from './components/Introduction';
import LegacyTimeline from './components/LegacyTimeline';
import Philosophy from './components/Philosophy';
import Storytelling from './components/Storytelling';
import CoreValues from './components/CoreValues';
import Statistics from './components/Statistics';
import FinalExperience from './components/FinalExperience';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2, // optimized duration for a fast, responsive, and premium feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
      autoRaf: false, // Important: let GSAP's ticker drive updates
    });

    // Keep Lenis globally accessible
    window.lenis = lenis;

    // Sync Lenis with GSAP's ticker loop
    const updateLenis = (time) => {
      lenis.raf(time * 1000); // convert to milliseconds
    };
    gsap.ticker.add(updateLenis);

    // Sync GSAP's ticker with ScrollTrigger to prevent animation drop-frames
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      window.lenis = null;
    };
  }, [isLoading]);

  return (
    <div className="relative min-h-screen bg-bmw-black text-bmw-light overflow-x-hidden font-sans">
      <Navbar />
      <Hero />
      <LogoScroll />
      <Introduction />
      <LegacyTimeline />
      <Philosophy />
      <Storytelling />
      <CoreValues />
      <Statistics />
      <FinalExperience />
      
      {isLoading && (
        <Loader onComplete={() => setIsLoading(false)} />
      )}
    </div>
  );
}

