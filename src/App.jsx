import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
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
import Footer from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Keep Lenis globally accessible (useful for triggering custom scroll events if needed)
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, [isLoading]);

  return (
    <div className="relative min-h-screen bg-bmw-black text-bmw-light overflow-x-hidden font-sans">
      {isLoading ? (
        <Loader onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <Navbar />
          <Hero />
          <Introduction />
          <LogoScroll />
          <LegacyTimeline />
          <Philosophy />
          <Storytelling />
          <CoreValues />
          <Statistics />
          <FinalExperience />
          <Footer />
        </>
      )}
    </div>
  );
}
