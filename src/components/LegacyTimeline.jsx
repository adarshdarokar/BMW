import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LegacyTimeline() {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Milestone data
  const milestones = [
    {
      year: "1916",
      title: "FOUNDATION",
      subtitle: "The Genesis of Aviation and Engineering",
      desc: "BMW was established as Rapp Motorenwerke, initially producing aircraft engines. This spirit of high-altitude precision laid the foundational DNA for every vehicle that would follow.",
      bg: "#131313",
      textColor: "text-bmw-light",
      muteColor: "text-bmw-light-gray"
    },
    {
      year: "1972",
      title: "MOTORSPORT HERITAGE",
      subtitle: "Born on the Track, Bred for the Road",
      desc: "The creation of the BMW Motorsport division (M division) united pure racing passion with luxury engineering. A legacy of dominance on the asphalt that redefined performance.",
      bg: "#242424",
      textColor: "text-bmw-light",
      muteColor: "text-bmw-light-gray"
    },
    {
      year: "1980s",
      title: "LUXURY EVOLUTION",
      subtitle: "The Rise of Executive Sophistication",
      desc: "With the introduction of the legendary 7 Series and high-performance luxury tourers, BMW combined athletic driving dynamics with executive-level comfort, carving a unique niche in automotive history.",
      bg: "#3C3C3C",
      textColor: "text-bmw-light",
      muteColor: "text-bmw-light-gray"
    },
    {
      year: "2000s",
      title: "MODERN ENGINEERING",
      subtitle: "Digital Innovation Meets Driving Joy",
      desc: "Entering the digital era, BMW pioneered advanced driving interfaces, lightweight carbon-fiber construction, and TwinPower Turbo tech, maximizing power while optimizing weight distribution.",
      bg: "#696969",
      textColor: "text-bmw-light",
      muteColor: "text-bmw-light/80"
    },
    {
      year: "2026+",
      title: "ELECTRIC FUTURE",
      subtitle: "The Neue Klasse Horizon",
      desc: "Redefining the driving experience for a sustainable age. Incorporating circular design, clean energy, and next-generation battery architectures to deliver pure emotion without emissions.",
      bg: "#B5B5B5",
      textColor: "text-bmw-black", // Dark text on light background for contrast!
      muteColor: "text-bmw-medium"
    }
  ];

  useEffect(() => {
    const parent = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!parent || !scrollContainer) return;

    const sections = scrollContainer.querySelectorAll('.timeline-panel');
    const totalPanels = sections.length;

    // Horizontal scroll timeline
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: 'top top',
        end: () => `+=${scrollContainer.offsetWidth - window.innerWidth}`,
        scrub: 1.5,
        pin: pinRef.current,
        invalidateOnRefresh: true,
      }
    });

    // Translate horizontal container
    scrollTl.to(scrollContainer, {
      x: () => `-${scrollContainer.offsetWidth - window.innerWidth}px`,
      ease: 'none'
    });

    // Interpolate background color of the pinned element
    milestones.forEach((m, index) => {
      if (index === 0) return;
      
      const prevSection = sections[index - 1];
      
      gsap.to(pinRef.current, {
        backgroundColor: m.bg,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: prevSection,
          containerAnimation: scrollTl,
          start: 'right center',
          end: 'right left',
          scrub: 1.5,
        }
      });
    });

    // Fade in text elements sequentially
    sections.forEach((sec, idx) => {
      const elements = sec.querySelectorAll('.timeline-anim-element');
      
      gsap.fromTo(elements, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sec,
            containerAnimation: scrollTl,
            start: 'left 60%',
            end: 'left 20%',
            scrub: 1.5,
          }
        }
      );
    });

    return () => {
      scrollTl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="timeline"
      className="relative w-full min-h-screen"
    >
      <div
        ref={pinRef}
        className="w-full h-screen sticky top-0 bg-bmw-black overflow-hidden flex items-center transition-colors duration-500 ease-out"
      >
        {/* Decorative Grid Lines to give that engineered, industrial look */}
        <div className="absolute inset-0 grid grid-cols-5 pointer-events-none opacity-5 z-0">
          <div className="border-r border-bmw-light h-full"></div>
          <div className="border-r border-bmw-light h-full"></div>
          <div className="border-r border-bmw-light h-full"></div>
          <div className="border-r border-bmw-light h-full"></div>
          <div></div>
        </div>

        {/* Horizontal flex container */}
        <div
          ref={scrollContainerRef}
          className="flex h-full w-[500vw] relative z-10"
        >
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="timeline-panel w-screen h-full flex items-center px-6 md:px-12 lg:px-24 flex-shrink-0 select-none"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full max-w-[1440px] mx-auto items-center">
                {/* Large Year Column */}
                <div className="md:col-span-5 flex flex-col justify-center">
                  <span className={`timeline-anim-element text-8xl md:text-8xl lg:text-9xl font-light font-sans tracking-tighter leading-none ${m.textColor}`}>
                    {m.year}
                  </span>
                  <div className={`timeline-anim-element w-24 h-[1px] my-6 ${idx === 4 ? 'bg-bmw-black' : 'bg-bmw-light-gray'} opacity-50`} />
                </div>

                {/* Info details column */}
                <div className="md:col-span-7 flex flex-col justify-center pr-0 md:pr-12">
                  <span className={`timeline-anim-element text-[10px] tracking-[0.4em] font-medium uppercase mb-2 ${m.muteColor}`}>
                    {m.title}
                  </span>
                  <h3 className={`timeline-anim-element text-2xl md:text-4xl font-light font-sans leading-tight mb-6 ${m.textColor}`}>
                    {m.subtitle}
                  </h3>
                  <p className={`timeline-anim-element text-sm sm:text-base font-light leading-relaxed max-w-xl ${m.muteColor}`}>
                    {m.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
