'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

import HeroParticles from './HeroParticles';

export default function Overlay() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Section 1: Hero Parallax (Subtle fade out)
  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Section 2: Story
  const y2 = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [100, 0, -100]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

  // Section 3: Expertise
  const y3 = useTransform(scrollYProgress, [0.75, 0.9, 1], [100, 0, -100]);
  const opacity3 = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 0]);
  
  // Progress Bar
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10 selection:bg-blue-500/30 selection:text-blue-200 font-sans">
      
      {/* GLOBAL HUD LAYER - FULL DENSITY */}
      <div className="fixed inset-0 pointer-events-none z-0 select-none">
          {/* Interactive Particles */}
          <div className="absolute inset-0 opacity-40">
            <HeroParticles />
          </div>

          {/* Base Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)] opacity-20" />
          
          {/* Corner Brackets */}
          <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-white/30" />
          <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-white/30" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-white/30" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-white/30" />

          {/* BACKGROUND PARALLAX COLUMNS */}
          <div className="absolute inset-0 flex justify-between px-4 md:px-10 overflow-hidden">
                <motion.div 
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
                    className="h-full flex flex-col justify-center opacity-[0.03] select-none"
                >
                    <h1 className="text-[10vh] md:text-[15vh] leading-none font-black font-heading tracking-tighter text-transparent [-webkit-text-stroke:2px_white] [writing-mode:vertical-rl] rotate-180">
                        NEURAL OPERATIONS
                    </h1>
                </motion.div>

                <motion.div 
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, -400]) }}
                    className="h-full flex flex-col justify-center opacity-[0.03] select-none"
                >
                    <h1 className="text-[10vh] md:text-[15vh] leading-none font-black font-heading tracking-tighter text-transparent [-webkit-text-stroke:2px_white] [writing-mode:vertical-rl] rotate-180">
                        SYSTEM ARCHITECTURE
                    </h1>
                </motion.div>
          </div>

          {/* Top Center: Coordinates - REMOVED */}


          {/* Left Vertical Scale */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 h-[40vh] w-[1px] bg-white/10 hidden md:block">
             {[...Array(20)].map((_, i) => (
                 <div key={i} className="absolute left-0 w-2 h-[1px] bg-white/30" style={{ top: `${i * 5}%` }} />
             ))}
          </div>

          {/* Right Vertical Bar code */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 h-[40vh] w-2 flex flex-col justify-between hidden md:flex opacity-30">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="w-full h-1 bg-white/50" style={{ opacity: 0.5 }} />
            ))}
          </div>
      </div>

      {/* Sidebar Navigation - Moved slightly inward */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="fixed right-20 md:right-24 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-6 z-50 pointer-events-auto"
      >
          <div className="w-[1px] h-32 bg-white/10 rounded-full relative overflow-hidden">
              <motion.div style={{ height: progressHeight }} className="absolute top-0 left-0 w-full bg-white/50" />
          </div>
      </motion.div>

      {/* Section 1: Hero - CENTER IS CLEAR-ISH */}
      <motion.div 
        style={{ opacity: opacity1 }}
        className="h-screen w-full flex flex-col justify-end pb-12 px-8 md:px-24 sticky top-0"
      >
        <div className="relative z-10 max-w-md pointer-events-auto mb-12">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            >
                {/* Name Card moved slightly up to avoid total bottom edge */}
                <div className="overflow-hidden mb-2">
                    <motion.h1 
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-4xl md:text-5xl font-bold text-white font-heading"
                    >
                        Rajan Nishad
                    </motion.h1>
                </div>
                <div className="h-[1px] w-16 bg-blue-500 mb-4" />
                <p className="text-sm md:text-base text-gray-300 font-light tracking-wide max-w-sm mb-8">
                    Data Scientist & Machine Learning Engineer crafting intelligence from chaos.
                </p>

                <div 
                    className="flex items-center gap-4 cursor-pointer group"
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                    <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:border-white/50 transition-colors">
                        <motion.div 
                            animate={{ y: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1 h-3 bg-white"
                        />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">Resume Mission</span>
                </div>
            </motion.div>
        </div>
      </motion.div>

      {/* Section 2: The Story - Mission Briefing Slate */}
      <motion.div 
        style={{ y: y2, opacity: opacity2 }}
        className="h-screen flex items-center justify-center md:justify-start px-6 md:px-32 sticky top-0"
      >
        <div className="relative z-10 max-w-2xl mt-12 md:mt-0 pointer-events-auto">
            {/* The Slate Container */}
            <div className="relative bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 p-8 md:p-12 overflow-hidden group">
                {/* Circuit Background */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_100%,transparent_100%)]" />
                
                {/* Scanline Animation */}
                <motion.div 
                    animate={{ top: ["-10%", "110%"] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute left-0 w-full h-[2px] bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)] z-0 pointer-events-none"
                />

                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-blue-500" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-blue-500" />
                
                {/* Header */}
                <div className="relative z-10 flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                    <span className="text-xs font-mono text-blue-400 tracking-[0.2em] uppercase">Case File: 001 // Origin</span>
                    <div className="flex gap-1">
                        <div className="w-1 h-3 bg-blue-500/50 animate-pulse" />
                        <div className="w-1 h-3 bg-blue-500/30" />
                        <div className="w-1 h-3 bg-blue-500/10" />
                    </div>
                </div>

                <h2 className="relative z-10 text-3xl md:text-5xl font-bold mb-8 text-white leading-tight font-heading">
                    Bridging Logic<br/>
                    & <span className="text-blue-500">Imagination</span>
                </h2>
                
                <p className="relative z-10 text-lg text-gray-300 leading-relaxed font-light mb-8">
                    Data isn&apos;t just numbers—it&apos;s the raw material of intelligence. I architect deep learning systems that turn 
                    <span className="text-white font-medium mx-1 border-b border-blue-500/50">chaos into clarity</span>, 
                    building the bridge between theoretical AI and real-world impact.
                </p>

                {/* Footer stats refined */}
                <div className="relative z-10 flex gap-8 pt-4 border-t border-white/5">
                    <div>
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">Clearance</div>
                        <div className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] text-blue-300 font-mono rounded">ALPHA-1</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">Sector</div>
                        <div className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] text-blue-300 font-mono rounded">NEURAL_DEEP</div>
                    </div>
                </div>
            </div>
        </div>
      </motion.div>

      {/* Section 3: Expertise - System Active Modules */}
      <motion.div 
        style={{ y: y3, opacity: opacity3 }}
        className="h-screen flex items-center justify-center md:justify-end px-6 md:px-32 sticky top-0"
      >
         <div className="pointer-events-auto z-20 w-full max-w-xl mt-12 md:mt-0">
             {/* Header */}
             <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-4">
                 <div>
                    <span className="text-blue-500 font-mono text-[10px] tracking-[0.3em] uppercase block mb-2">System Diagnostics</span>
                    <h3 className="text-3xl text-white font-heading font-medium">Active Modules</h3>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                    <span className="text-green-500 font-mono text-xs">ONLINE</span>
                 </div>
             </div>
             
             {/* Module List */}
             <div className="flex flex-col gap-3">
                 {['Generative Archives', 'Neural Networks', 'Predictive Analysis', 'Vision Systems'].map((item, i) => (
                     <motion.div 
                        key={item}
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="group relative flex items-center justify-between bg-[#111] border border-white/5 hover:border-blue-500/50 p-5 overflow-hidden transition-all duration-300"
                     >
                         {/* Power Load Bar */}
                         <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_10px_#3b82f6]" />
                         
                         {/* Hover Flash */}
                         <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                         
                         <div className="relative z-10 flex items-center gap-6">
                             <div className="flex flex-col items-center">
                                 <span className="text-[9px] font-mono text-white/20 group-hover:text-blue-500 transition-colors">IDX</span>
                                 <span className="text-sm font-mono text-white/40 group-hover:text-white transition-colors">0{i + 1}</span>
                             </div>
                             <span className="text-xl font-light text-white/80 group-hover:text-white transition-colors tracking-wide group-hover:translate-x-2 transition-transform duration-300">{item}</span>
                         </div>
                         
                         <div className="relative z-10 flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                             <div className="text-[9px] font-mono text-blue-300 tracking-widest hidden md:block">RUNNING...</div>
                             <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                         </div>
                     </motion.div>
                 ))}
             </div>
         </div>
      </motion.div>
    </div>
  );
}
