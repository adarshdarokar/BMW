import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationRef = useRef(null);

  // Total images: 25 main animation + 100 logo animation = 125
  const mainFramesCount = 25;
  const logoFramesCount = 100;
  const totalImages = mainFramesCount + logoFramesCount;

  useEffect(() => {
    let loadedCount = 0;
    const cache = {
      animation: [],
      logo: []
    };

    const imageLoaded = () => {
      loadedCount++;
      const currentProgress = Math.round((loadedCount / totalImages) * 100);
      setProgress(currentProgress);
    };

    // Preload main animation frames
    for (let i = 1; i <= mainFramesCount; i++) {
      const img = new Image();
      const frameStr = String(i).padStart(3, '0');
      img.src = `/bmw animation/ezgif-frame-${frameStr}.jpg`;
      img.onload = imageLoaded;
      img.onerror = imageLoaded; // count as loaded to prevent stuck screen
      cache.animation.push(img);
    }

    // Preload logo frames
    for (let i = 1; i <= logoFramesCount; i++) {
      const img = new Image();
      const frameStr = String(i).padStart(3, '0');
      img.src = `/bmw logo/ezgif-frame-${frameStr}.jpg`;
      img.onload = imageLoaded;
      img.onerror = imageLoaded;
      cache.logo.push(img);
    }

    // Store in window cache for reuse globally in canvas components
    window.bmwAssetCache = cache;

    return () => {};
  }, []);

  // Smooth lerping of the displayed percentage
  useEffect(() => {
    const lerp = () => {
      setDisplayedProgress((prev) => {
        const diff = progress - prev;
        if (diff > 0.5) {
          // Normal count up
          return Math.min(100, Math.round(prev + diff * 0.15 + 0.5));
        } else if (progress === 100 && Math.round(prev) < 100) {
          // Force close when loaded
          return prev + 1;
        } else if (Math.round(prev) >= 100) {
          setTimeout(() => {
            setIsLoaded(true);
          }, 800);
          return 100;
        }
        return prev;
      });
      animationRef.current = requestAnimationFrame(lerp);
    };

    animationRef.current = requestAnimationFrame(lerp);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [progress]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100vh',
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[999] flex flex-col justify-between bg-bmw-dark p-8 md:p-16 overflow-hidden select-none"
        >
          {/* Ambient Lighting Background */}
          <div className="absolute inset-0 bg-radial-gradient from-bmw-blue/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-bmw-blue/5 rounded-full blur-[120px] pointer-events-none" />

          {/* Top Logo text */}
          <div className="flex justify-between items-center z-10">
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-xs uppercase tracking-[0.4em] text-white/50 font-semibold"
            >
              M PERFORMANCE
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xs uppercase tracking-[0.4em] text-white/50 font-semibold"
            >
              EST. 1916
            </motion.span>
          </div>

          {/* Center Progress Ticker */}
          <div className="flex flex-col items-center justify-center flex-grow z-10">
            <div className="relative">
              <motion.h1 
                className="text-[18vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 select-none"
                style={{ fontFamily: 'Outfit' }}
              >
                {String(displayedProgress).padStart(3, '0')}
              </motion.h1>
              <div className="absolute -bottom-4 left-0 right-0 h-[2px] bg-white/10 overflow-hidden">
                <motion.div 
                  className="h-full bg-bmw-blue shadow-[0_0_10px_#00A3FF]"
                  style={{ width: `${displayedProgress}%` }}
                />
              </div>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="mt-8 text-xs md:text-sm uppercase tracking-[0.6em] text-bmw-blue font-bold"
            >
              Loading BMW Experience
            </motion.p>
          </div>

          {/* Bottom Luxury Branding */}
          <div className="flex justify-between items-end z-10">
            <div className="max-w-xs text-left">
              <p className="text-xs text-white/40 leading-relaxed font-light">
                THE COUPE THAT DEFINES THE FUTURE. PURE ELECTRIC MEETS IMMERSIVE PERFORMANCE.
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
                © 2026 BMW AG
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
