import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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



export default function LegacyTimeline() {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const parent = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!parent || !scrollContainer) return;

    const mm = gsap.matchMedia();

    // Desktop Breakpoint (Tablet Landscape and Desktop: Horizontal Scroll)
    mm.add("(min-width: 768px)", () => {
      const sections = scrollContainer.querySelectorAll('.timeline-panel');

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
      sections.forEach((sec) => {
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
    });

    // Mobile Breakpoint (Vertical Stack)
    mm.add("(max-width: 767px)", () => {
      const panels = scrollContainer.querySelectorAll('.timeline-panel');

      panels.forEach((panel, index) => {
        const milestone = milestones[index];
        const elements = panel.querySelectorAll('.timeline-anim-element');

        // Dynamically transition the parent background color as panels scroll into view
        gsap.to(parent, {
          backgroundColor: milestone.bg,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: panel,
            start: 'top 50%',
            end: 'bottom 50%',
            scrub: true,
          }
        });

        // Entrance fade-in for each panel's content
        gsap.fromTo(elements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1.0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 1.0,
            }
          }
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="timeline"
      className="relative w-full min-h-screen bg-bmw-black transition-colors duration-500 ease-out"
    >
      <div
        ref={pinRef}
        className="w-full md:h-screen md:sticky md:top-0 md:overflow-hidden flex flex-col md:flex-row md:items-center transition-colors duration-500 ease-out"
      >
        {/* Decorative Grid Lines to give that engineered, industrial look */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-5 pointer-events-none opacity-5 z-0">
          <div className="border-r border-bmw-light h-full"></div>
          <div className="border-r border-bmw-light h-full hidden md:block"></div>
          <div className="border-r border-bmw-light h-full"></div>
          <div className="border-r border-bmw-light h-full hidden md:block"></div>
          <div></div>
        </div>

        {/* Flex container: vertical on mobile, horizontal on desktop */}
        <div
          ref={scrollContainerRef}
          className="flex flex-col md:flex-row h-auto md:h-full w-full md:w-[500vw] relative z-10 py-16 md:py-0 gap-16 md:gap-0"
        >
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="timeline-panel w-full md:w-screen h-auto md:h-full flex items-center flex-shrink-0 select-none px-6 md:px-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 layout-container items-center w-full">
                {/* Large Year Column */}
                <div className="md:col-span-5 flex flex-col justify-center">
                  <span className={`timeline-anim-element gpu-accelerated text-6xl sm:text-8xl lg:text-9xl font-light font-sans tracking-tighter leading-none ${m.textColor}`}>
                    {m.year}
                  </span>
                  <div className={`timeline-anim-element gpu-accelerated w-16 md:w-24 h-[1px] my-4 md:my-6 ${idx === 4 ? 'bg-bmw-black' : 'bg-bmw-light-gray'} opacity-50`} />
                </div>

                {/* Info details column */}
                <div className="md:col-span-7 flex flex-col justify-center pr-0 md:pr-12">
                  <span className={`timeline-anim-element gpu-accelerated text-[10px] tracking-[0.4em] font-medium uppercase mb-2 ${m.muteColor}`}>
                    {m.title}
                  </span>
                  <h3 className={`timeline-anim-element gpu-accelerated text-2xl md:text-4xl font-light font-sans leading-tight mb-4 md:mb-6 ${m.textColor}`}>
                    {m.subtitle}
                  </h3>
                  <p className={`timeline-anim-element gpu-accelerated text-sm sm:text-base font-light leading-relaxed max-w-xl ${m.muteColor}`}>
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
