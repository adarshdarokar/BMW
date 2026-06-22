import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const cursorTextRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(touch);
      if (!touch) {
        document.documentElement.classList.add('custom-cursor-active');
      }
    };

    checkTouch();

    if (isMobile) return;

    // Mouse coordinates
    const mouse = { x: 0, y: 0 };
    
    // QuickSetter for smooth performance (bypasses React render loop)
    const setDotX = gsap.quickSetter(dotRef.current, "x", "px");
    const setDotY = gsap.quickSetter(dotRef.current, "y", "px");
    const setRingX = gsap.quickSetter(ringRef.current, "x", "px");
    const setRingY = gsap.quickSetter(ringRef.current, "y", "px");

    // Align centering offset (dot is 8px, ring is 40px)
    const dotOffset = 4;
    const ringOffset = 20;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Instantly position dot
      setDotX(mouse.x - dotOffset);
      setDotY(mouse.y - dotOffset);
    };

    // Smoothly lag the ring behind the dot using GSAP ticker
    const tick = () => {
      const currentRingX = gsap.getProperty(ringRef.current, "x") || 0;
      const currentRingY = gsap.getProperty(ringRef.current, "y") || 0;
      
      const targetX = mouse.x - ringOffset;
      const targetY = mouse.y - ringOffset;
      
      // Lerp math
      const dx = targetX - currentRingX;
      const dy = targetY - currentRingY;
      
      setRingX(currentRingX + dx * 0.15);
      setRingY(currentRingY + dy * 0.15);
    };

    window.addEventListener('mousemove', handleMouseMove);
    gsap.ticker.add(tick);

    // Hover state management
    const handleMouseOver = (e) => {
      // Find closest interactive element
      const target = e.target.closest('[data-cursor]');
      if (!target) return;

      const cursorType = target.getAttribute('data-cursor');
      
      if (cursorType === 'hover') {
        // Expand ring, change background to BMW blue
        gsap.to(ringRef.current, {
          width: 60,
          height: 60,
          xPercent: -15, // re-center expanded ring (from 40px to 60px)
          yPercent: -15,
          borderColor: '#00A3FF',
          backgroundColor: 'rgba(0, 163, 255, 0.1)',
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(dotRef.current, {
          scale: 1.5,
          backgroundColor: '#ffffff',
          duration: 0.3
        });
      } else if (cursorType === 'magnetic') {
        // Expand and color cursor
        gsap.to(ringRef.current, {
          width: 80,
          height: 80,
          xPercent: -25,
          yPercent: -25,
          borderColor: '#00A3FF',
          borderWidth: '2px',
          backgroundColor: 'transparent',
          duration: 0.4,
          ease: 'power3.out'
        });
        gsap.to(dotRef.current, {
          scale: 0,
          duration: 0.2
        });
        
        // Add subtle magnetic effect to the element itself
        const rect = target.getBoundingClientRect();
        const triggerMagnetic = (moveEvent) => {
          const x = moveEvent.clientX - rect.left - rect.width / 2;
          const y = moveEvent.clientY - rect.top - rect.height / 2;
          gsap.to(target, {
            x: x * 0.35,
            y: y * 0.35,
            duration: 0.3,
            ease: 'power2.out'
          });
        };
        
        const resetMagnetic = () => {
          gsap.to(target, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
          });
          target.removeEventListener('mousemove', triggerMagnetic);
          target.removeEventListener('mouseleave', resetMagnetic);
        };
        
        target.addEventListener('mousemove', triggerMagnetic);
        target.addEventListener('mouseleave', resetMagnetic);

      } else if (cursorType.startsWith('text:')) {
        const text = cursorType.split('text:')[1];
        setCursorText(text);
        
        gsap.to(ringRef.current, {
          width: 90,
          height: 90,
          xPercent: -28,
          yPercent: -28,
          borderColor: '#00A3FF',
          backgroundColor: 'rgba(0, 163, 255, 0.9)',
          borderWidth: '0px',
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(dotRef.current, {
          scale: 0,
          duration: 0.2
        });
        gsap.to(cursorTextRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3
        });
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (!target) return;
      
      // Reset animations
      gsap.to(ringRef.current, {
        width: 40,
        height: 40,
        xPercent: 0,
        yPercent: 0,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderWidth: '1px',
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(dotRef.current, {
        scale: 1,
        backgroundColor: '#00A3FF',
        duration: 0.3
      });
      gsap.to(cursorTextRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.2
      });
      setCursorText('');
    };

    // Hide/show cursor on enter/leave window
    const handleMouseLeave = () => {
      gsap.to([dotRef.current, ringRef.current], { opacity: 0, duration: 0.3 });
    };
    const handleMouseEnter = () => {
      gsap.to([dotRef.current, ringRef.current], { opacity: 1, duration: 0.3 });
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(tick);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/30 bg-white/[0.02] backdrop-blur-[2px] pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
        style={{ willChange: 'transform' }}
      >
        <span 
          ref={cursorTextRef}
          className="text-[10px] uppercase tracking-[0.2em] font-black text-black opacity-0 scale-50"
        >
          {cursorText}
        </span>
      </div>

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-bmw-blue pointer-events-none z-[9999] shadow-[0_0_8px_#00A3FF]"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
