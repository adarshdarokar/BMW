import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Component imports
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollFilmCanvas from './components/ScrollFilmCanvas';
import Specs from './components/Specs';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;

    // Register ScrollTrigger globally
    gsap.registerPlugin(ScrollTrigger);

    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Synchronize GSAP ScrollTrigger with Lenis
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Feed Lenis frame ticks into GSAP's high-performance animation ticker
    const syncLenisWithGsap = (time) => {
      lenis.raf(time * 1000); // converts time seconds to milliseconds
    };
    gsap.ticker.add(syncLenisWithGsap);
    gsap.ticker.lagSmoothing(0); // prevents framerate spikes or jumpy jumps

    // Scroll progress bar logic for the canvas sidebar
    const scrollIndicator = document.getElementById('scroll-bar-indicator');
    const updateProgress = () => {
      if (scrollIndicator) {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        gsap.to(scrollIndicator, { scaleY: scrollPercent, duration: 0.1, ease: 'none' });
      }
    };
    window.addEventListener('scroll', updateProgress);

    return () => {
      gsap.ticker.remove(syncLenisWithGsap);
      window.removeEventListener('scroll', updateProgress);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [loaded]);

  return (
    <div className="relative w-full min-h-screen bg-bmw-dark overflow-x-hidden selection:bg-bmw-blue selection:text-white">
      {/* Dynamic Noise Grain Overlay */}
      <div className="noise-overlay" />

      {/* Preloading Screen */}
      <Preloader onComplete={() => setLoaded(true)} />

      {/* Main Page Content (Revealed after loading completes) */}
      {loaded && (
        <>
          <CustomCursor />
          <Navbar />
          <Hero />
          <ScrollFilmCanvas />
          <Specs />
          <Footer />
        </>
      )}
    </div>
  );
}
