import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFilmCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  // DOM element ref for updating telemetry frame count without React re-renders
  const currentFrameDomRef = useRef(null);
  
  // Overlay refs for text animations
  const overlay1Ref = useRef(null);
  const overlay2Ref = useRef(null);
  const overlay3Ref = useRef(null);
  const overlay4Ref = useRef(null);

  // States for static debugging info (total and missing)
  const [totalFrames, setTotalFrames] = useState(0);
  const [missingFrames, setMissingFrames] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Retrieve preloaded frames from global cache
    const animationFrames = window.bmwAssetCache?.animation || [];
    const total = animationFrames.length;
    setTotalFrames(total);

    if (total === 0) {
      console.warn("BMW Animation frames not found in cache!");
      return;
    }

    // Verify loading status & detect missing/corrupted frames
    let missingCount = 0;
    animationFrames.forEach((img, idx) => {
      if (!img.complete || img.naturalWidth === 0) {
        missingCount++;
        console.error(`Frame index ${idx} failed to load or has 0 width:`, img.src);
      }
    });
    setMissingFrames(missingCount);

    // Optimized cover-fit drawing function using canvas backing store coordinates
    const drawCrossfadedFrames = (frameFloat) => {
      const width = canvas.width;
      const height = canvas.height;
      
      if (width === 0 || height === 0) return;

      // Clear the canvas backing store
      ctx.clearRect(0, 0, width, height);

      // Extract floor and ceil frames and fraction
      const floorIndex = Math.floor(frameFloat);
      const ceilIndex = Math.min(total - 1, Math.ceil(frameFloat));
      const fraction = frameFloat - floorIndex;

      const imgFloor = animationFrames[floorIndex];
      const imgCeil = animationFrames[ceilIndex];

      if (!imgFloor || !imgCeil) return;

      const drawSingleImage = (img, alpha) => {
        const imgWidth = img.naturalWidth || img.width || 1920;
        const imgHeight = img.naturalHeight || img.height || 1080;

        const imgRatio = imgWidth / imgHeight;
        const canvasRatio = width / height;

        let drawWidth = width;
        let drawHeight = height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          // Canvas is wider than image aspect ratio (crop top and bottom)
          drawHeight = width / imgRatio;
          offsetY = (height - drawHeight) / 2;
        } else {
          // Canvas is taller than image aspect ratio (crop left and right)
          drawWidth = height * imgRatio;
          offsetX = (width - drawWidth) / 2;
        }

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();
      };

      // Draw with interpolation
      if (floorIndex === ceilIndex || fraction === 0) {
        drawSingleImage(imgFloor, 1);
      } else {
        drawSingleImage(imgFloor, 1 - fraction);
        drawSingleImage(imgCeil, fraction);
      }

      // Update frame counter HUD directly in DOM to bypass React render loop (maintains 60 FPS)
      if (currentFrameDomRef.current) {
        const padIndex = String(Math.min(total, Math.max(1, Math.round(frameFloat) + 1))).padStart(3, '0');
        currentFrameDomRef.current.innerText = padIndex;
      }
    };

    // Resize handler: Set physical canvas dimensions based on client resolution and DPR
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      // Draw frame on resize to prevent white flash
      drawCrossfadedFrames(animObj.frame);
    };

    // Initialize animation tracking object
    const animObj = { frame: 0 };

    window.addEventListener('resize', handleResize);
    
    // Initial size configuration
    handleResize();

    // Core GSAP Timeline for Scroll scrub
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8, // subtle lag to create organic camera flow feel
        invalidateOnRefresh: true,
      }
    });

    // Scrub frame float from 0 to total - 1
    tl.to(animObj, {
      frame: total - 1,
      ease: 'none',
      onUpdate: () => {
        drawCrossfadedFrames(animObj.frame);
      }
    }, 0);

    // Fade and reveal typography timelines
    const textRevealIn = () => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    });

    const textRevealOut = () => ({
      opacity: 0,
      y: -50,
      scale: 0.95,
      filter: 'blur(10px)',
      duration: 0.6,
      ease: 'power2.in'
    });

    // Initial state for text overlays
    gsap.set([overlay1Ref.current, overlay2Ref.current, overlay3Ref.current, overlay4Ref.current], {
      opacity: 0,
      y: 60,
      scale: 1.05,
      filter: 'blur(10px)'
    });

    // Stagger overlay texts at specific ranges of the scroll timeline
    tl.to(overlay1Ref.current, textRevealIn(), 0.1)
      .to(overlay1Ref.current, textRevealOut(), 0.22);

    tl.to(overlay2Ref.current, textRevealIn(), 0.35)
      .to(overlay2Ref.current, textRevealOut(), 0.48);

    tl.to(overlay3Ref.current, textRevealIn(), 0.58)
      .to(overlay3Ref.current, textRevealOut(), 0.70);

    tl.to(overlay4Ref.current, textRevealIn(), 0.80)
      .to(overlay4Ref.current, textRevealOut(), 0.92);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      id="scroll-film-container"
      className="relative w-full h-[800vh] bg-bmw-dark z-20"
    >
      {/* Sticky Fullscreen Canvas Wrap */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* Soft Vignette Overlay for cinematic contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-bmw-dark/80 via-transparent to-bmw-dark/95 pointer-events-none z-10" />
        
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block"
        />

        {/* Live Debugging Telemetry HUD (Designed as premium automotive telemetry) */}
        <div className="absolute top-28 right-8 z-30 font-mono text-[10px] tracking-[0.2em] text-white/40 bg-black/60 backdrop-blur-md border border-white/5 p-4 rounded-xl flex flex-col gap-2 pointer-events-none select-none text-left min-w-[200px]">
          <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-1">
            <span className="font-bold text-white">M TELEMETRY HUD</span>
            <span className="text-bmw-blue animate-pulse text-[8px]">● LIVE</span>
          </div>
          <div className="flex justify-between">
            <span>DETECTOR STAT:</span>
            <span className="text-white font-bold">ACTIVE</span>
          </div>
          <div className="flex justify-between">
            <span>TOTAL FRAMES:</span>
            <span className="text-white font-bold">{totalFrames}</span>
          </div>
          <div className="flex justify-between">
            <span>CURRENT FRAME:</span>
            <span ref={currentFrameDomRef} className="text-bmw-blue font-bold">001</span>
          </div>
          <div className="flex justify-between">
            <span>MISSING COUNT:</span>
            <span className={missingFrames > 0 ? "text-red-500 font-bold" : "text-green-500 font-bold"}>
              {missingFrames}
            </span>
          </div>
        </div>

        {/* Cinematic Parallax Text Overlays */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-6 text-center">
          
          {/* Overlay 1: Pure Performance */}
          <div ref={overlay1Ref} className="absolute flex flex-col items-center">
            <span className="text-xs md:text-sm tracking-[0.6em] font-extrabold text-bmw-blue uppercase mb-3">01 // METRIC DYNAMICS</span>
            <h2 className="text-[6vw] md:text-[5vw] font-black uppercase tracking-tight text-white leading-none font-sans" style={{ fontFamily: 'Outfit' }}>
              PURE PERFORMANCE
            </h2>
            <p className="text-white/50 text-xs md:text-sm tracking-[0.2em] uppercase font-light mt-4">
              Dual high-torque electric motors pushing 617 HP.
            </p>
          </div>

          {/* Overlay 2: Engineered For Precision */}
          <div ref={overlay2Ref} className="absolute flex flex-col items-center">
            <span className="text-xs md:text-sm tracking-[0.6em] font-extrabold text-bmw-blue uppercase mb-3">02 // CHASSIS TECH</span>
            <h2 className="text-[6vw] md:text-[5vw] font-black uppercase tracking-tight text-white leading-none font-sans" style={{ fontFamily: 'Outfit' }}>
              ENGINEERED FOR PRECISION
            </h2>
            <p className="text-white/50 text-xs md:text-sm tracking-[0.2em] uppercase font-light mt-4">
              Adaptive M Suspension with near-instantaneous road reading.
            </p>
          </div>

          {/* Overlay 3: Luxury Meets Power */}
          <div ref={overlay3Ref} className="absolute flex flex-col items-center">
            <span className="text-xs md:text-sm tracking-[0.6em] font-extrabold text-bmw-blue uppercase mb-3">03 // COCKPIT DESIGN</span>
            <h2 className="text-[6vw] md:text-[5vw] font-black uppercase tracking-tight text-white leading-none font-sans" style={{ fontFamily: 'Outfit' }}>
              LUXURY MEETS POWER
            </h2>
            <p className="text-white/50 text-xs md:text-sm tracking-[0.2em] uppercase font-light mt-4">
              Premium carbon architecture wrapped in Alcantara finishes.
            </p>
          </div>

          {/* Overlay 4: The Ultimate Driving Machine */}
          <div ref={overlay4Ref} className="absolute flex flex-col items-center">
            <span className="text-xs md:text-sm tracking-[0.6em] font-extrabold text-bmw-blue uppercase mb-3">04 // EVOLUTION</span>
            <h2 className="text-[6vw] md:text-[5vw] font-black uppercase tracking-tight text-white leading-none font-sans" style={{ fontFamily: 'Outfit' }}>
              THE ULTIMATE DRIVING MACHINE
            </h2>
            <p className="text-white/50 text-xs md:text-sm tracking-[0.2em] uppercase font-light mt-4">
              An electrified M lineage made for a new generation.
            </p>
          </div>

        </div>

        {/* Sidebar Mini Progress Dot Indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-30 hidden md:flex items-center">
          <div className="w-[1px] h-32 bg-white/10 relative">
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-bmw-blue origin-top scale-y-0" id="scroll-bar-indicator" />
          </div>
          <span className="text-[10px] tracking-[0.3em] text-white/30 [writing-mode:vertical-lr] rotate-180">01 / 25 FRAMES</span>
        </div>
      </div>
    </div>
  );
}
