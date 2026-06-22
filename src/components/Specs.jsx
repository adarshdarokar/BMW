import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Compass, Activity } from 'lucide-react';

const specsData = [
  {
    icon: <Zap size={24} className="text-bmw-blue" />,
    label: "PEAK OUTPUT",
    value: "617",
    unit: "HP",
    desc: "Dual electric M-tuned motors powering all wheels synchronously."
  },
  {
    icon: <Activity size={24} className="text-bmw-blue" />,
    label: "ACCELERATION",
    value: "3.1",
    unit: "SEC",
    desc: "Instant torque delivery launching you from 0 to 60 mph."
  },
  {
    icon: <Compass size={24} className="text-bmw-blue" />,
    label: "ESTIMATED RANGE",
    value: "300",
    unit: "MI",
    desc: "High-density thermal-managed lithium battery system."
  },
  {
    icon: <Shield size={24} className="text-bmw-blue" />,
    label: "CHARGE RATIO",
    value: "10-80",
    unit: "% IN 22 MIN",
    desc: "Ultra-fast 800V DC architecture compatibility."
  }
];

export default function Specs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section 
      id="specs"
      className="relative w-full py-32 md:py-48 bg-bmw-deep px-6 md:px-12 overflow-hidden z-20"
    >
      {/* Background radial glows */}
      <div className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-bmw-blue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-bmw-blue/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24 relative z-10">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 text-left">
          <div>
            <span className="text-xs md:text-sm tracking-[0.6em] font-extrabold text-bmw-blue uppercase block mb-3">
              TECHNICAL DATA
            </span>
            <h2 
              className="text-[8vw] md:text-[4vw] font-black uppercase tracking-tighter leading-none text-white font-sans"
              style={{ fontFamily: 'Outfit' }}
            >
              M HYPER-CORE
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-white/50 text-sm tracking-wide leading-relaxed font-light">
              Experience the revolutionary performance that bridges motorsport legacy and electric efficiency. Every metric is calibrated for high-precision track response.
            </p>
          </div>
        </div>

        {/* Specs Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {specsData.map((spec, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="glass-card glass-card-hover rounded-2xl p-8 flex flex-col justify-between items-start gap-8 relative overflow-hidden group select-none text-left"
              data-cursor="hover"
            >
              {/* Top ambient line glow */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-bmw-blue/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              
              <div className="flex justify-between items-center w-full">
                <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center bg-white/[0.01]">
                  {spec.icon}
                </div>
                <span className="text-[10px] tracking-[0.4em] font-bold text-white/20 uppercase font-mono">
                  [ 0{index + 1} // S_M ]
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] tracking-[0.4em] font-extrabold text-white/40 uppercase">
                  {spec.label}
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <h3 
                    className="text-5xl md:text-6xl font-black text-white leading-none tracking-tighter"
                    style={{ fontFamily: 'Outfit' }}
                  >
                    {spec.value}
                  </h3>
                  <span className="text-sm font-bold text-bmw-blue uppercase tracking-widest">
                    {spec.unit}
                  </span>
                </div>
              </div>

              <p className="text-white/40 text-xs leading-relaxed font-light border-t border-white/5 pt-4 w-full">
                {spec.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Dynamic Interactive Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full rounded-2xl border border-white/5 bg-gradient-to-r from-bmw-dark via-white/[0.01] to-bmw-dark p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 text-left"
        >
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-bold uppercase tracking-wider text-white">RESERVE TEST EXPERIENCE</h4>
            <p className="text-xs text-white/50 max-w-lg leading-relaxed">
              Unlock early access track bookings. Join our engineering team for dynamic track testing trials of the M Vision platform.
            </p>
          </div>
          <button 
            className="px-8 py-4 bg-white text-black font-semibold text-xs tracking-[0.3em] uppercase rounded-full hover:bg-bmw-blue hover:text-white transition-colors duration-500 shadow-xl"
            data-cursor="magnetic"
          >
            REQUEST PASS
          </button>
        </motion.div>
      </div>
    </section>
  );
}
