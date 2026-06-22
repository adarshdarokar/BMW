import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const line1 = "THE FUTURE OF";
  const line2 = "DRIVING";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 80, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section 
      id="hero"
      className="relative w-full h-screen bg-bmw-dark overflow-hidden flex flex-col justify-between items-center p-8 md:p-16 select-none"
    >
      {/* Ambient Moving Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{
            x: ['-20%', '20%', '-20%'],
            y: ['-20%', '20%', '-20%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute -top-1/4 -left-1/4 w-[150vw] h-[150vh] ambient-glow-blue opacity-50 pointer-events-none"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full ambient-glow-white opacity-80" />
      </div>

      <div className="flex-grow flex flex-col justify-center items-center text-center z-10 w-full max-w-5xl">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center gap-1 md:gap-3"
        >
          {/* Subheading */}
          <motion.p 
            variants={wordVariants}
            className="text-xs md:text-sm tracking-[0.6em] font-extrabold text-bmw-blue uppercase mb-4"
          >
            INTRODUCING THE M VISION COUPE
          </motion.p>

          {/* Heading Line 1 */}
          <div className="mask-reveal py-2">
            <motion.h1 
              variants={wordVariants}
              className="text-[8vw] md:text-[6.5vw] font-black tracking-tighter leading-none text-white uppercase"
              style={{ fontFamily: 'Outfit' }}
              data-cursor="hover"
            >
              {line1}
            </motion.h1>
          </div>

          {/* Heading Line 2 */}
          <div className="mask-reveal py-2">
            <motion.h1 
              variants={wordVariants}
              className="text-[9vw] md:text-[8vw] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-bmw-blue uppercase"
              style={{ fontFamily: 'Outfit' }}
              data-cursor="hover"
            >
              {line2}
            </motion.h1>
          </div>

          {/* Premium Description */}
          <motion.p 
            variants={wordVariants}
            className="mt-6 text-sm md:text-base text-white/50 max-w-md uppercase tracking-[0.2em] font-light leading-relaxed px-4"
          >
            Where absolute precision engineering converges with raw electric power.
          </motion.p>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="z-10 flex flex-col items-center gap-3 cursor-pointer"
        onClick={() => {
          document.getElementById('scroll-film-container').scrollIntoView({ behavior: 'smooth' });
        }}
        data-cursor="hover"
      >
        <span className="text-[10px] tracking-[0.4em] font-bold text-white/40 uppercase">SCROLL TO EXPERIENCE</span>
        <div className="w-[20px] h-[36px] rounded-full border-2 border-white/20 flex justify-center p-1">
          <motion.div 
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-1.5 h-1.5 rounded-full bg-bmw-blue shadow-[0_0_6px_#00A3FF]"
          />
        </div>
      </motion.div>
    </section>
  );
}
