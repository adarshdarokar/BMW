import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const vehicleRef = useRef(null);
  const lightSweepRef = useRef(null);
  const glowOrbRef = useRef(null);
  const statsRef = useRef(null);

  // GSAP animations on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Vehicle entrance: scale up from slight zoom + fade
      gsap.fromTo(vehicleRef.current,
        { scale: 1.08, opacity: 0, y: 30, filter: 'blur(8px)' },
        { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)', duration: 2, ease: 'power3.out', delay: 0.6 }
      );

      // Light sweep across the vehicle
      gsap.fromTo(lightSweepRef.current,
        { x: '-120%', opacity: 0.7 },
        { x: '120%', opacity: 0, duration: 2.2, ease: 'power2.inOut', delay: 1.2 }
      );

      // Subtle floating animation for the vehicle
      gsap.to(vehicleRef.current, {
        y: -12,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2.6
      });

      // Ambient glow orb slow drift
      gsap.to(glowOrbRef.current, {
        x: 40,
        y: -30,
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(vehicleRef.current, {
            y: progress * 80 - 12,
            scale: 1 - progress * 0.05
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Framer Motion variants
  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut' }
    }
  };

  const stats = [
    { value: '617', unit: 'HP', label: 'PEAK POWER' },
    { value: '3.1', unit: 'SEC', label: '0–60 MPH' },
    { value: '300', unit: 'MI', label: 'RANGE' },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen bg-bmw-dark overflow-hidden select-none"
      style={{ minHeight: '100vh' }}
    >
      {/* ── Background Layers ── */}

      {/* Deep radial ambient glow - blue core */}
      <div
        ref={glowOrbRef}
        className="absolute pointer-events-none"
        style={{
          top: '30%',
          left: '50%',
          width: '900px',
          height: '900px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse at center, rgba(0,163,255,0.07) 0%, rgba(0,163,255,0.02) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Bottom fade to deep black */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bmw-dark via-bmw-dark/80 to-transparent pointer-events-none z-10" />

      {/* ── Main Content Layout ── */}
      <div className="relative z-10 flex flex-col items-center justify-between w-full min-h-screen px-6 md:px-12 lg:px-20 pt-28 md:pt-32 pb-8">

        {/* ── Top: Typography Block ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center w-full max-w-5xl z-20"
        >
          {/* Category tag */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-bmw-blue/60" />
            <span className="text-[10px] md:text-xs tracking-[0.6em] font-bold text-bmw-blue uppercase">
              M VISION CONCEPT
            </span>
            <div className="w-8 h-[1px] bg-bmw-blue/60" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            className="text-[11vw] md:text-[7vw] lg:text-[6vw] font-black uppercase tracking-[-0.03em] leading-[0.9] text-white"
            style={{ fontFamily: 'Outfit' }}
          >
            THE FUTURE OF
          </motion.h1>
          <motion.h1
            variants={fadeUp}
            className="text-[13vw] md:text-[9vw] lg:text-[8vw] font-black uppercase tracking-[-0.04em] leading-[0.9] text-transparent bg-clip-text"
            style={{
              fontFamily: 'Outfit',
              backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #00A3FF 60%, #0066CC 100%)',
            }}
          >
            DRIVING
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="mt-5 text-[11px] md:text-sm text-white/40 max-w-lg tracking-[0.15em] uppercase font-light leading-relaxed"
          >
            Where absolute precision engineering converges with raw electric power.
            The next chapter of M Performance begins here.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <button
              className="group relative px-8 py-4 bg-bmw-blue text-white font-semibold text-[11px] tracking-[0.3em] uppercase rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,163,255,0.4)] flex items-center gap-3"
              data-cursor="magnetic"
            >
              <span className="relative z-10">CONFIGURE NOW</span>
              <ChevronRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
            <button
              className="group px-8 py-4 border border-white/15 text-white/80 font-semibold text-[11px] tracking-[0.3em] uppercase rounded-full hover:border-white/40 hover:text-white hover:bg-white/[0.03] transition-all duration-500 flex items-center gap-3"
              data-cursor="magnetic"
            >
              <Play size={12} className="fill-bmw-blue text-bmw-blue" />
              <span>WATCH FILM</span>
            </button>
          </motion.div>
        </motion.div>

        {/* ── Center: Vehicle Visual ── */}
        <div className="relative w-full flex-1 flex items-center justify-center my-4 md:my-0" style={{ minHeight: '35vh' }}>
          {/* Vehicle ground reflection glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: '80%',
              maxWidth: '800px',
              height: '60px',
              background: 'radial-gradient(ellipse at center, rgba(0,163,255,0.12) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />

          {/* Light sweep effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              ref={lightSweepRef}
              className="absolute top-0 bottom-0"
              style={{
                width: '200px',
                left: '0',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
                filter: 'blur(30px)',
              }}
            />
          </div>

          {/* BMW Vehicle Image */}
          <motion.img
            ref={vehicleRef}
            src="/bmw-hero-vehicle.png"
            alt="BMW M Vision Concept"
            initial={{ opacity: 0 }}
            className="relative z-10 w-full max-w-4xl h-auto object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            style={{ willChange: 'transform' }}
            draggable={false}
          />
        </div>

        {/* ── Bottom: Stats Bar + Scroll Indicator ── */}
        <motion.div
          ref={statsRef}
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl z-20"
        >
          {/* Stats row */}
          <motion.div
            variants={fadeIn}
            className="flex justify-center items-center gap-6 md:gap-12 lg:gap-16 py-6 border-t border-white/[0.06]"
          >
            {stats.map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && <div className="w-[1px] h-8 bg-white/[0.06]" />}
                <div className="flex flex-col items-center gap-1 group">
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight transition-colors duration-300 group-hover:text-bmw-blue"
                      style={{ fontFamily: 'Outfit' }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-[10px] md:text-xs font-bold text-bmw-blue uppercase tracking-widest">
                      {stat.unit}
                    </span>
                  </div>
                  <span className="text-[8px] md:text-[9px] tracking-[0.3em] text-white/25 uppercase font-semibold">
                    {stat.label}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            className="flex flex-col items-center gap-3 pt-4 pb-2 cursor-pointer"
            onClick={() => {
              const target = document.getElementById('specs');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
            data-cursor="hover"
          >
            <span className="text-[9px] tracking-[0.5em] font-semibold text-white/20 uppercase">EXPLORE</span>
            <div className="w-[18px] h-[30px] rounded-full border border-white/15 flex justify-center pt-1.5">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-1 rounded-full bg-bmw-blue shadow-[0_0_6px_#00A3FF]"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
