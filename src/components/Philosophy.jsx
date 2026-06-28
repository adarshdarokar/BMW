import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  useEffect(() => {
    const parent = containerRef.current;
    
    // Character splitter function
    const splitIntoChars = (element) => {
      if (!element) return;
      const text = element.textContent;
      element.innerHTML = '';
      
      const words = text.split(' ');
      words.forEach((word, wIdx) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'inline-block whitespace-nowrap';
        
        const chars = Array.from(word);
        chars.forEach(char => {
          const charSpan = document.createElement('span');
          charSpan.className = 'char-span inline-block transition-transform duration-75';
          charSpan.textContent = char;
          wordSpan.appendChild(charSpan);
        });
        
        element.appendChild(wordSpan);
        if (wIdx < words.length - 1) {
          element.appendChild(document.createTextNode(' '));
        }
      });
    };

    // Split text
    splitIntoChars(text1Ref.current);
    splitIntoChars(text2Ref.current);
    splitIntoChars(text3Ref.current);

    const mm = gsap.matchMedia();
    const getChars = (ref) => ref.current?.querySelectorAll('.char-span') || [];

    // Desktop Breakpoint (Pin and Overlay)
    mm.add("(min-width: 768px)", () => {
      // Reset absolute properties for desktop
      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], {
        position: 'absolute'
      });

      // Reset styles
      gsap.set([getChars(text1Ref), getChars(text2Ref), getChars(text3Ref)], {
        opacity: 0,
        scale: 1.3,
        filter: 'blur(10px)',
        y: 50
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          start: 'top top',
          end: '+=150%',
          scrub: 1.5,
          pin: pinRef.current,
        }
      });

      // 1. Reveal First Text: DRIVEN BY PERFECTION
      tl.to(getChars(text1Ref), {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        y: 0,
        stagger: {
          amount: 0.8,
          from: 'random'
        },
        duration: 1.5,
        ease: 'power3.out'
      })
      .to({}, { duration: 0.5 }) // Hold
      .to(getChars(text1Ref), {
        opacity: 0,
        scale: 0.85,
        filter: 'blur(10px)',
        y: -50,
        stagger: 0.02,
        duration: 1,
        ease: 'power2.in'
      })

      // 2. Reveal Second Text: ENGINEERED FOR EMOTION
      .to(getChars(text2Ref), {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        y: 0,
        stagger: {
          amount: 0.8,
          from: 'center'
        },
        duration: 1.5,
        ease: 'power4.out'
      }, '-=0.2')
      .to({}, { duration: 0.5 }) // Hold
      .to(getChars(text2Ref), {
        opacity: 0,
        scale: 1.2,
        filter: 'blur(10px)',
        y: 50,
        stagger: 0.02,
        duration: 1,
        ease: 'power2.in'
      })

      // 3. Reveal Third Text: DESIGNED FOR THE FUTURE
      .to(getChars(text3Ref), {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        y: 0,
        stagger: {
          amount: 0.8,
          from: 'left'
        },
        duration: 1.5,
        ease: 'back.out(1.2)'
      }, '-=0.2')
      .to({}, { duration: 0.7 }); // Hold final
    });

    // Mobile Breakpoint (Vertical Stack & Fade)
    mm.add("(max-width: 767px)", () => {
      // Set to relative for stacking
      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], {
        position: 'relative'
      });

      [text1Ref, text2Ref, text3Ref].forEach((ref) => {
        const chars = getChars(ref);
        
        // Reset styles for mobile entry
        gsap.set(chars, {
          opacity: 0,
          scale: 1.15,
          filter: 'blur(8px)',
          y: 20
        });

        gsap.to(chars, {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: {
            amount: 0.5,
            from: 'start'
          },
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 1.0,
          }
        });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="relative w-full min-h-screen bg-[#131313] overflow-hidden"
    >
      <div
        ref={pinRef}
        className="w-full md:h-screen md:sticky md:top-0 flex flex-col items-center justify-center px-6 py-24 md:py-0"
      >
        {/* Abstract graphic elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[700px] max-h-[700px] border border-[#F3F3F3]/10 rounded-full pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[450px] max-h-[450px] border border-[#F3F3F3]/5 rounded-full pointer-events-none z-0" />

        <div className="layout-container text-center flex flex-col items-center justify-center select-none relative z-10 gap-16 md:gap-0 w-full">
          
          <h2
            ref={text1Ref}
            className="text-[7.5vw] sm:text-6xl md:text-8xl font-light tracking-[0.15em] sm:tracking-[0.2em] font-sans text-[#F3F3F3] leading-tight uppercase w-full py-4 md:py-0"
          >
            DRIVEN BY PERFECTION
          </h2>

          <h2
            ref={text2Ref}
            className="text-[7.5vw] sm:text-6xl md:text-8xl font-light tracking-[0.15em] sm:tracking-[0.2em] font-sans text-[#F3F3F3] leading-tight uppercase w-full py-4 md:py-0"
          >
            ENGINEERED FOR EMOTION
          </h2>

          <h2
            ref={text3Ref}
            className="text-[7.5vw] sm:text-6xl md:text-8xl font-light tracking-[0.15em] sm:tracking-[0.2em] font-sans text-[#F3F3F3] leading-tight uppercase w-full text-stroke-medium py-4 md:py-0"
          >
            DESIGNED FOR THE FUTURE
          </h2>
          
        </div>
      </div>
    </section>
  );
}
