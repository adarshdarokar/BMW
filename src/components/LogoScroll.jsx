import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LogoScroll() {
  const containerRef = useRef(null);
  const pinTargetRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);

  const [framesLoaded, setFramesLoaded] = useState(false);
  const framesRef = useRef([]);

  // Phase 1: Robust Image Preloading
  useEffect(() => {
    const totalFrames = 100;
    let frames = window.BMW_PRELOADED_FRAMES || [];

    const verifyAndLoadAll = () => {
      // If frames are already preloaded by Loader, check completeness
      if (frames.length === totalFrames) {
        let completed = 0;
        let successCount = 0;
        const failedCount = [];

        const onCheckComplete = (img, failed = false) => {
          completed++;
          if (!failed) {
            successCount++;
          } else {
            failedCount.push(img.src);
          }

          if (completed === totalFrames) {
            console.log(`LogoScroll: Preloaded frames checked. Successful: ${successCount}/${totalFrames}.`);
            if (failedCount.length > 0) {
              console.warn(`LogoScroll: Failed frames:`, failedCount);
            }
            framesRef.current = frames;
            setFramesLoaded(true);
          }
        };

        frames.forEach((img) => {
          if (img.complete) {
            // Already fully loaded
            if (img.naturalWidth === 0) {
              onCheckComplete(img, true); // image was complete but broken
            } else {
              onCheckComplete(img, false);
            }
          } else {
            // Pending loading
            img.addEventListener('load', () => onCheckComplete(img, false));
            img.addEventListener('error', () => onCheckComplete(img, true));
          }
        });
      } else {
        // Fallback: Inline loading of frame sequence
        console.warn('LogoScroll: Preloaded frames not found in window or incomplete. Initializing fallback...');
        const loadedFrames = [];
        let completed = 0;
        let successCount = 0;
        const failedCount = [];

        for (let i = 1; i <= totalFrames; i++) {
          const img = new Image();
          const paddedNum = String(i).padStart(3, '0');
          img.src = `/bmw-logo/ezgif-frame-${paddedNum}.jpg`;

          img.onload = () => {
            completed++;
            successCount++;
            if (completed === totalFrames) {
              console.log(`LogoScroll (Fallback): Finished. Success: ${successCount}/${totalFrames}.`);
              if (failedCount.length > 0) {
                console.warn(`LogoScroll (Fallback): Failed:`, failedCount);
              }
              framesRef.current = loadedFrames;
              setFramesLoaded(true);
            }
          };

          img.onerror = () => {
            completed++;
            failedCount.push(img.src);
            console.error(`LogoScroll (Fallback): Failed to load frame ${i} at ${img.src}`);
            if (completed === totalFrames) {
              console.log(`LogoScroll (Fallback): Finished. Success: ${successCount}/${totalFrames}.`);
              if (failedCount.length > 0) {
                console.warn(`LogoScroll (Fallback): Failed:`, failedCount);
              }
              framesRef.current = loadedFrames;
              setFramesLoaded(true);
            }
          };

          loadedFrames.push(img);
        }
      }
    };

    verifyAndLoadAll();
  }, []);

  // Phase 2: Canvas Resizing, Drawing, and GSAP ScrollTrigger Sequence
  useEffect(() => {
    if (!framesLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const frames = framesRef.current;
    const totalFrames = frames.length;

    // Track the current frame index for animations
    const frameObj = { frame: 0 };

    // Fit image keeping aspect ratio centered inside canvas with padding/margin (0.7 scale)
    const renderFrame = (index) => {
      const img = frames[index];
      if (!img || !img.complete || img.naturalWidth === 0) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const canvasWidth = rect.width;
      const canvasHeight = rect.height;

      // Clear the canvas context using current transform matrix bounds
      context.clearRect(0, 0, canvasWidth, canvasHeight);

      const imgWidth = img.naturalWidth || img.width || 800;
      const imgHeight = img.naturalHeight || img.height || 800;

      // Centered scaling logic (contain perfectly within the new cinematic box)
      const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight) * 1.0;

      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;
      const x = (canvasWidth - drawWidth) / 2;
      const y = (canvasHeight - drawHeight) / 2;

      context.drawImage(img, x, y, drawWidth, drawHeight);
    };

    // Canvas scaling to match high DPI screens without distortion/accumulation
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      if (rect.width === 0 || rect.height === 0) return;

      // Adjust canvas resolution dynamically
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Reset transform and apply DPR scale factor
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);

      // Enable high-quality image smoothing for sharp frames
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';

      // Re-draw current frame immediately
      renderFrame(Math.round(frameObj.frame));
    };

    // Listen to resize events
    window.addEventListener('resize', resizeCanvas);

    // Initial setup and draw first frame
    resizeCanvas();
    renderFrame(0);

    // Main GSAP scroll sequence
    const anim = gsap.to(frameObj, {
      frame: totalFrames - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%',
        scrub: 1.5, // cinematic scrubbing inertia
        pin: pinTargetRef.current,
        onUpdate: () => {
          renderFrame(Math.floor(frameObj.frame));
        },
      },
    });

    // Subtle overlay text subtitle transitions during scroll
    const textAnim = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 20%',
        end: 'bottom 80%',
        scrub: 1.5,
      },
    });

    textAnim
      .fromTo(
        overlayRef.current,
        { opacity: 0, y: 50 },
        { opacity: 0.4, y: 0, ease: 'power2.out' }
      )
      .to(overlayRef.current, {
        opacity: 0,
        y: -50,
        ease: 'power2.in',
      });

    // Synchronize Lenis smooth scroll updates with GSAP triggers if active
    if (window.lenis) {
      window.lenis.on('scroll', ScrollTrigger.update);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (window.lenis) {
        window.lenis.off('scroll', ScrollTrigger.update);
      }
      anim.kill();
      textAnim.kill();
    };
  }, [framesLoaded]);

  return (
    <div
      ref={containerRef}
      id="logo-scroll"
      className="relative w-full min-h-screen bg-[#131313]"
    >
      <div
        ref={pinTargetRef}
        className="w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#131313]"
      >
        {/* The Cinematic Content Container */}
        <div className="relative w-[90vw] md:w-[70vw] h-[60vh] md:h-[80vh] max-w-[1400px] flex items-center justify-center">
          
          {/* Cinematic Backdrop glow (contained within the container) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-radial from-[#F3F3F3]/5 to-transparent pointer-events-none filter blur-[80px] z-0" />

          {!framesLoaded ? (
            <div className="z-10 text-[#B5B5B5] font-mono text-[10px] uppercase tracking-[0.2em] animate-pulse">
              Initializing Sequence...
            </div>
          ) : (
            <>
              {/* The Frame Canvas */}
              <canvas
                ref={canvasRef}
                className="w-full h-full relative z-10 block cursor-default"
              />
            </>
          )}
        </div>

        {/* Text Overlay */}
        <div
          ref={overlayRef}
          className="absolute bottom-12 md:bottom-16 z-20 text-center select-none w-full opacity-0"
        >
          <h2 className="text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-[#B5B5B5] font-light font-sans">
            A SYMBOL OF ENGINEERING TRIUMPH
          </h2>
        </div>
      </div>
    </div>
  );
}
