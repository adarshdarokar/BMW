import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SplitText = React.forwardRef(({ text, className }, ref) => {
  return (
    <h2 ref={ref} className={className}>
      {text.split(' ').map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, cIdx) => (
            <span key={cIdx} className="inline-block overflow-hidden relative leading-normal align-middle">
              <span className="inline-block translate-y-[100%]">
                {char}
              </span>
            </span>
          ))}
          {wIdx < text.split(' ').length - 1 && ' '}
        </span>
      ))}
    </h2>
  );
});

SplitText.displayName = 'SplitText';

export default function Introduction() {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const titleContainerRef = useRef(null);
  
  // Refs for words to cycle through
  const word1Ref = useRef(null); // Luxury
  const word2Ref = useRef(null); // Innovation
  const word3Ref = useRef(null); // Performance
  const word4Ref = useRef(null); // Engineering
  const word5Ref = useRef(null); // Precision

  useEffect(() => {
    const parent = containerRef.current;

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

    const getInners = (ref) => ref.current?.querySelectorAll('span span') || [];

    // Reset styles initially (hide all words)
    gsap.set([word1Ref.current, word2Ref.current, word3Ref.current, word4Ref.current, word5Ref.current], {
      opacity: 0,
      display: 'none'
    });

    // 1. Reveal LUXURY
    tl.set(word1Ref.current, { display: 'block', opacity: 1 })
      .to(getInners(word1Ref), {
        y: '0%',
        stagger: 0.03,
        duration: 1.5,
        ease: 'power4.out'
      })
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
      className="relative w-full min-h-screen bg-[#131313]"
    >
      <div
        ref={pinRef}
        className="w-full h-screen sticky top-0 flex items-center justify-center overflow-hidden"
      >
        {/* Subtle radial glow to draw focus to center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] rounded-full bg-radial from-[#F3F3F3]/5 to-transparent pointer-events-none filter blur-3xl" />

        <div
          ref={titleContainerRef}
          className="layout-container text-center select-none"
        >
          {/* Main sequence displays */}
          <SplitText
            ref={word1Ref}
            text="LUXURY"
            className="text-[9vw] sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.15em] sm:tracking-[0.3em] font-sans text-[#F3F3F3] uppercase leading-none"
          />

          <SplitText
            ref={word2Ref}
            text="INNOVATION"
            className="text-[8vw] sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.1em] sm:tracking-[0.2em] font-sans text-[#F3F3F3] uppercase leading-none"
          />

          <SplitText
            ref={word3Ref}
            text="PERFORMANCE"
            className="text-[7.5vw] sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.05em] sm:tracking-[0.15em] font-sans text-[#F3F3F3] uppercase leading-none"
          />

          <SplitText
            ref={word4Ref}
            text="ENGINEERING"
            className="text-[7.5vw] sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.05em] sm:tracking-[0.25em] font-sans text-[#F3F3F3] uppercase leading-none"
          />

          <SplitText
            ref={word5Ref}
            text="PRECISION"
            className="text-[8.5vw] sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.1em] sm:tracking-[0.3em] font-sans text-[#F3F3F3] uppercase leading-none text-stroke-medium"
          />
        </div>
      </div>
    </section>
  );
}
