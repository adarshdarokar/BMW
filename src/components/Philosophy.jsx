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

    // Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: 'top top',
        end: '+=150%',
        scrub: 1.5,
        pin: pinRef.current,
      }
    });

    const getChars = (ref) => ref.current?.querySelectorAll('.char-span') || [];

    // Reset styles
    gsap.set([getChars(text1Ref), getChars(text2Ref), getChars(text3Ref)], {
      opacity: 0,
      scale: 1.3,
      filter: 'blur(10px)',
      y: 50
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

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="relative w-full min-h-screen bg-[#131313]"
    >
      <div
        ref={pinRef}
        className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden px-6"
      >
        {/* Abstract graphic elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[700px] max-h-[700px] border border-[#F3F3F3]/10 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[450px] max-h-[450px] border border-[#F3F3F3]/5 rounded-full pointer-events-none" />

        <div className="layout-container text-center flex flex-col items-center justify-center select-none relative z-10">
          
          <h2
            ref={text1Ref}
            className="text-[7.5vw] sm:text-6xl md:text-8xl font-light tracking-[0.1em] sm:tracking-[0.2em] font-sans text-[#F3F3F3] leading-tight uppercase absolute w-full"
          >
            DRIVEN BY PERFECTION
          </h2>

          <h2
            ref={text2Ref}
            className="text-[7.5vw] sm:text-6xl md:text-8xl font-light tracking-[0.1em] sm:tracking-[0.2em] font-sans text-[#F3F3F3] leading-tight uppercase absolute w-full"
          >
            ENGINEERED FOR EMOTION
          </h2>

          <h2
            ref={text3Ref}
            className="text-[7.5vw] sm:text-6xl md:text-8xl font-light tracking-[0.1em] sm:tracking-[0.2em] font-sans text-[#F3F3F3] leading-tight uppercase absolute w-full text-stroke-medium"
          >
            DESIGNED FOR THE FUTURE
          </h2>
          
        </div>
      </div>
    </section>
  );
}
