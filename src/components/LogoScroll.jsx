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

      // Centered scaling logic (70% of min viewport width or height limit)
      const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight) * 0.7;

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
        end: 'bottom bottom',
        scrub: 0.2, // fine-tuned scrubbing inertia
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
        scrub: true,
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
      className="relative w-full h-[250vh] bg-bmw-black"
    >
      <div
        ref={pinTargetRef}
        className="w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Cinematic Backdrop glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full bg-radial from-bmw-medium/10 to-transparent pointer-events-none filter blur-3xl z-0" />

        {!framesLoaded ? (
          <div className="z-10 text-bmw-light-gray font-mono text-xs uppercase tracking-widest animate-pulse">
            Initializing Sequence...
          </div>
        ) : (
          <>
            {/* The Frame Canvas */}
            <canvas
              ref={canvasRef}
              className="w-full h-full max-h-[85vh] max-w-[85vw] relative z-10 block cursor-default"
            />

            {/* Text Overlay */}
            <div
              ref={overlayRef}
              className="absolute bottom-16 z-20 text-center select-none"
            >
              <h2 className="text-xs uppercase tracking-[0.6em] text-bmw-light-gray font-light font-display">
                A SYMBOL OF ENGINEERING TRIUMPH
              </h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
