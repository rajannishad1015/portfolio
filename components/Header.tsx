'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smart header logic: hide on scroll down (unless at very top), show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setMobileMenuOpen(false);
    } else {
      setHidden(false);
    }
  });

  const menuItems = ['Expertise', 'Work', 'About', 'Contact'];

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        {/* Unified Floating Dock */}
        <div className="pointer-events-auto relative flex items-center p-1.5 bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl ring-1 ring-white/5 mx-auto max-w-[90vw] md:max-w-2xl overflow-hidden">
          
          {/* Noise Texture Overlay for Premium Feel */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-20 mix-blend-overlay" />

          {/* Logo Section */}
          <a href="#" className="flex items-center gap-3 pl-4 pr-4 group relative z-10">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform duration-300">
               <div className="w-2 h-2 bg-white rounded-full animate-pulse group-hover:bg-blue-400 transition-colors" />
            </div>
            <span className="text-sm font-bold text-white tracking-widest hidden md:block group-hover:text-blue-400 transition-colors">
              RAJAN
            </span>
          </a>

          {/* Divider */}
          <div className="w-[1px] h-6 bg-white/10 hidden md:block" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 mx-2">
            {menuItems.map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-4 py-2 text-xs font-medium text-white/60 hover:text-white transition-colors relative group rounded-full"
              >
                <span className="relative z-10 tracking-wide">{item}</span>
                <motion.div 
                  className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100" 
                  layoutId="navbar-hover"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle (Replaces Nav on small screens) */}
           <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 ml-2 rounded-full hover:bg-white/10 text-white transition-colors z-10"
          >
             <div className="flex flex-col gap-1">
                <span className={`w-4 h-0.5 bg-white rounded-full transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`w-4 h-0.5 bg-white rounded-full transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-4 h-0.5 bg-white rounded-full transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
             </div>
          </button>

          {/* Divider */}
          <div className="w-[1px] h-6 bg-white/10 mx-2 hidden md:block" />

          {/* Resume Button */}
          <a 
            href="/resume.pdf" 
            className="relative z-10 flex items-center gap-2 px-5 py-2.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 group ml-auto md:ml-0"
          >
            <span>Resume</span>
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>

        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/60 pt-32 px-6"
          >
             <div className="flex flex-col gap-4 max-w-sm mx-auto">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 text-white text-lg font-medium"
                >
                  {item}
                  <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </motion.a>
              ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
