import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Introduction() {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const titleContainerRef = useRef(null);
  
  // Refs for words to cycle through
  const bmvTextRef = useRef(null);
  const word1Ref = useRef(null); // Luxury
  const word2Ref = useRef(null); // Innovation
  const word3Ref = useRef(null); // Performance
  const word4Ref = useRef(null); // Engineering
  const word5Ref = useRef(null); // Precision

  useEffect(() => {
    const parent = containerRef.current;
    const titleContainer = titleContainerRef.current;
    
    // Helper to split text into characters wrapped in overflow-hidden spans
    const splitTextToSpans = (element) => {
      if (!element) return;
      const text = element.textContent;
      element.innerHTML = '';
      
      const words = text.split(' ');
      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'inline-block whitespace-nowrap';
        
        const chars = Array.from(word);
        chars.forEach(char => {
          const charWrapper = document.createElement('span');
          charWrapper.className = 'inline-block overflow-hidden relative leading-normal align-middle';
          
          const charInner = document.createElement('span');
          charInner.className = 'inline-block translate-y-[100%]';
          charInner.textContent = char;
          
          charWrapper.appendChild(charInner);
          wordSpan.appendChild(charWrapper);
        });
        
        element.appendChild(wordSpan);
        // Add space between words (but not after last word)
        if (wordIndex < words.length - 1) {
          element.appendChild(document.createTextNode(' '));
        }
      });
    };

    // Split all our text targets
    splitTextToSpans(bmvTextRef.current);
    splitTextToSpans(word1Ref.current);
    splitTextToSpans(word2Ref.current);
    splitTextToSpans(word3Ref.current);
    splitTextToSpans(word4Ref.current);
    splitTextToSpans(word5Ref.current);

    // Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: pinRef.current,
      }
    });

    const getInners = (ref) => ref.current?.querySelectorAll('span span') || [];

    // Reset styles initially (hide everything except first text)
    gsap.set([word1Ref.current, word2Ref.current, word3Ref.current, word4Ref.current, word5Ref.current], {
      opacity: 0,
      display: 'none'
    });

    // 1. Reveal "Bayerische Motoren Werke"
    tl.to(getInners(bmvTextRef), {
      y: '0%',
      stagger: 0.02,
      duration: 1.5,
      ease: 'power3.out'
    });

    // Hold "Bayerische Motoren Werke"
    tl.to({}, { duration: 0.5 });

    // 2. Transition: "Bayerische Motoren Werke" -> display:none and show LUXURY
    tl.to(getInners(bmvTextRef), {
      y: '-100%',
      stagger: 0.015,
      duration: 1,
      ease: 'power3.in'
    })
    .to(bmvTextRef.current, {
      opacity: 0,
      duration: 0.2
    })
    // Setup Luxury
    .set(word1Ref.current, { display: 'block', opacity: 1 })
    .to(getInners(word1Ref), {
      y: '0%',
      stagger: 0.03,
      duration: 1.5,
      ease: 'power4.out'
    }, '-=0.2')
    .to({}, { duration: 0.5 }); // Hold Luxury

    // 3. Luxury -> Innovation
    tl.to(getInners(word1Ref), {
      y: '-100%',
      stagger: 0.02,
      duration: 1,
      ease: 'power3.in'
    })
    .set(word1Ref.current, { display: 'none' })
    .set(word2Ref.current, { display: 'block', opacity: 1 })
    .to(getInners(word2Ref), {
      y: '0%',
      stagger: 0.03,
      duration: 1.5,
      ease: 'power4.out'
    }, '-=0.2')
    .to({}, { duration: 0.5 }); // Hold Innovation

    // 4. Innovation -> Performance
    tl.to(getInners(word2Ref), {
      y: '-100%',
      stagger: 0.02,
      duration: 1,
      ease: 'power3.in'
    })
    .set(word2Ref.current, { display: 'none' })
    .set(word3Ref.current, { display: 'block', opacity: 1 })
    .to(getInners(word3Ref), {
      y: '0%',
      stagger: 0.03,
      duration: 1.5,
      ease: 'power4.out'
    }, '-=0.2')
    .to({}, { duration: 0.5 }); // Hold Performance

    // 5. Performance -> Engineering
    tl.to(getInners(word3Ref), {
      y: '-100%',
      stagger: 0.02,
      duration: 1,
      ease: 'power3.in'
    })
    .set(word3Ref.current, { display: 'none' })
    .set(word4Ref.current, { display: 'block', opacity: 1 })
    .to(getInners(word4Ref), {
      y: '0%',
      stagger: 0.03,
      duration: 1.5,
      ease: 'power4.out'
    }, '-=0.2')
    .to({}, { duration: 0.5 }); // Hold Engineering

    // 6. Engineering -> Precision
    tl.to(getInners(word4Ref), {
      y: '-100%',
      stagger: 0.02,
      duration: 1,
      ease: 'power3.in'
    })
    .set(word4Ref.current, { display: 'none' })
    .set(word5Ref.current, { display: 'block', opacity: 1 })
    .to(getInners(word5Ref), {
      y: '0%',
      stagger: 0.03,
      duration: 1.5,
      ease: 'power4.out'
    }, '-=0.2')
    .to({}, { duration: 0.7 }); // Hold Precision (slightly longer final hold)

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="introduction"
      className="relative w-full h-[180vh] bg-bmw-black"
    >
      <div
        ref={pinRef}
        className="w-full h-screen sticky top-0 flex items-center justify-center overflow-hidden"
      >
        {/* Subtle radial glow to draw focus to center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] rounded-full bg-radial from-bmw-medium/5 to-transparent pointer-events-none filter blur-3xl" />

        <div
          ref={titleContainerRef}
          className="w-full max-w-7xl px-8 text-center select-none"
        >
          {/* Main sequence displays */}
          <h2
            ref={bmvTextRef}
            className="text-3xl sm:text-5xl md:text-7xl font-light tracking-[0.2em] font-display text-bmw-light leading-snug"
          >
            BAYERISCHE MOTOREN WERKE
          </h2>

          <h2
            ref={word1Ref}
            className="text-5xl sm:text-7xl md:text-9xl font-semibold tracking-[0.3em] font-display text-bmw-light mr-[-0.3em] uppercase leading-none"
          >
            LUXURY
          </h2>

          <h2
            ref={word2Ref}
            className="text-5xl sm:text-7xl md:text-9xl font-semibold tracking-[0.2em] font-display text-bmw-light mr-[-0.2em] uppercase leading-none"
          >
            INNOVATION
          </h2>

          <h2
            ref={word3Ref}
            className="text-5xl sm:text-7xl md:text-9xl font-semibold tracking-[0.15em] font-display text-bmw-light mr-[-0.15em] uppercase leading-none"
          >
            PERFORMANCE
          </h2>

          <h2
            ref={word4Ref}
            className="text-5xl sm:text-7xl md:text-9xl font-semibold tracking-[0.25em] font-display text-bmw-light mr-[-0.25em] uppercase leading-none"
          >
            ENGINEERING
          </h2>

          <h2
            ref={word5Ref}
            className="text-5xl sm:text-7xl md:text-9xl font-semibold tracking-[0.3em] font-display text-bmw-light mr-[-0.3em] uppercase leading-none text-stroke-medium"
          >
            PRECISION
          </h2>
        </div>
      </div>
    </section>
  );
}
