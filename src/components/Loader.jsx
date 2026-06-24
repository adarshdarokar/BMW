import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subtextRef = useRef(null);
  const percentRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    // 1. Initial typography entrance animation
    const tl = gsap.timeline();
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 30, letterSpacing: '0.5em' },
      { opacity: 1, y: 0, letterSpacing: '1em', duration: 1.5, ease: 'power3.out' }
    )
    .fromTo(
      subtextRef.current,
      { opacity: 0, y: 15 },
      { opacity: 0.7, y: 0, duration: 1, ease: 'power3.out' },
      '-=1'
    )
    .fromTo(
      [percentRef.current, progressLineRef.current?.parentNode],
      { opacity: 0 },
      { opacity: 1, duration: 0.8, stagger: 0.2 },
      '-=0.8'
    );

    // 2. Preload frames
    const totalFrames = 100;
    let loadedCount = 0;
    let successCount = 0;
    const failedFrames = [];
    const preloadedImages = [];

    const handleImageLoad = (imgSrc) => {
      loadedCount++;
      successCount++;
      const currentPercent = Math.min(100, Math.floor((loadedCount / totalFrames) * 100));
      
      // Update state for render, and animate the progress line
      setProgress(currentPercent);
      if (progressLineRef.current) {
        gsap.to(progressLineRef.current, {
          width: `${currentPercent}%`,
          duration: 0.1,
          ease: 'power1.out'
        });
      }

      if (loadedCount === totalFrames) {
        console.log(`Preloading finished. Success: ${successCount}/100.`);
        if (failedFrames.length > 0) {
          console.warn(`Failed to preload ${failedFrames.length} frames:`, failedFrames);
        }
        // Trigger exit animation
        setTimeout(exitLoader, 600);
      }
    };

    const handleImageError = (imgSrc) => {
      loadedCount++;
      failedFrames.push(imgSrc);
      console.warn(`Warning: Failed to load frame from source: ${imgSrc}`);
      
      const currentPercent = Math.min(100, Math.floor((loadedCount / totalFrames) * 100));
      setProgress(currentPercent);
      if (progressLineRef.current) {
        gsap.to(progressLineRef.current, {
          width: `${currentPercent}%`,
          duration: 0.1,
          ease: 'power1.out'
        });
      }

      if (loadedCount === totalFrames) {
        console.log(`Preloading finished. Success: ${successCount}/100.`);
        if (failedFrames.length > 0) {
          console.warn(`Failed to preload ${failedFrames.length} frames:`, failedFrames);
        }
        // Trigger exit animation
        setTimeout(exitLoader, 600);
      }
    };

    // Preload loop
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedNum = String(i).padStart(3, '0');
      const src = `/bmw-logo/ezgif-frame-${paddedNum}.jpg`;
      img.onload = () => handleImageLoad(src);
      img.onerror = () => handleImageError(src);
      img.src = src;
      preloadedImages.push(img);
    }

    // Keep preloaded images in a global variable to avoid garbage collection and ensure instantaneous Canvas drawing
    window.BMW_PRELOADED_FRAMES = preloadedImages;

    // Exit timeline
    function exitLoader() {
      const exitTl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      exitTl.to([textRef.current, subtextRef.current, percentRef.current, progressLineRef.current?.parentNode], {
        opacity: 0,
        y: -30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.in'
      })
      .to(containerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', // premium slide up blind effect
        duration: 1.2,
        ease: 'power4.inOut'
      }, '-=0.3')
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.4
      }, '-=0.4');
    }

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bmw-black"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      <div className="text-center px-4 max-w-2xl select-none">
        {/* Subtitle */}
        <p
          ref={subtextRef}
          className="text-xs uppercase tracking-[0.3em] font-display text-bmw-light-gray mb-3 text-center"
        >
          BAYERISCHE MOTOREN WERKE
        </p>

        {/* Logo Text */}
        <h1
          ref={textRef}
          className="text-5xl md:text-7xl font-light tracking-[1em] text-bmw-light font-display mr-[-1em]"
        >
          BMW
        </h1>

        {/* Minimal Progress Bar */}
        <div className="w-48 h-[1px] bg-bmw-medium/40 mx-auto mt-16 relative overflow-hidden">
          <div
            ref={progressLineRef}
            className="absolute left-0 top-0 h-full bg-bmw-light w-0"
          />
        </div>

        {/* Counter */}
        <p
          ref={percentRef}
          className="text-xs font-mono tracking-[0.2em] text-bmw-light-gray mt-4"
        >
          {String(progress).padStart(3, '0')}%
        </p>
      </div>
    </div>
  );
}
