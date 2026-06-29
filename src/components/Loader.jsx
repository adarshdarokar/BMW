import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);
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
      [percentRef.current, progressLineRef.current?.parentNode],
      { opacity: 0 },
      { opacity: 1, duration: 0.8, stagger: 0.2 },
      '-=0.8'
    );

    // 2. Preload website assets and simulate progress smoothly
    const assetsToPreload = [
      '/assets/exterior.webp',
      '/assets/interior.webp'
    ];

    assetsToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    const progressObj = { value: 0 };
    const progressTween = gsap.to(progressObj, {
      value: 100,
      duration: 1.8, // premium, smooth duration matching text animations
      ease: 'power1.inOut',
      onUpdate: () => {
        const currentPercent = Math.floor(progressObj.value);
        setProgress(currentPercent);
        if (progressLineRef.current) {
          progressLineRef.current.style.width = `${currentPercent}%`;
        }
      },
      onComplete: () => {
        setTimeout(exitLoader, 400);
      }
    });

    // Exit timeline
    function exitLoader() {
      const exitTl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      exitTl.to([textRef.current, percentRef.current, progressLineRef.current?.parentNode], {
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
      progressTween.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bmw-black"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      <div className="text-center px-4 max-w-2xl select-none">


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
