'use client';

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

export default function Footer() {
  const mouseX = useMotionValue(Infinity);

  return (
    <footer 
        className="relative bg-[#050505] border-t border-white/10 h-[50vh] flex flex-col items-center justify-center overflow-hidden"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        id="contact"
    >
        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.15),transparent_70%)]" />

        <div className="relative z-10 text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold font-heading text-white tracking-tight mb-4">
                Ready to <span className="text-blue-500">Align?</span>
            </h2>
            <p className="text-white/40 font-mono text-sm">Initialize sequence for collaboration.</p>
        </div>

        {/* INTERACTIVE TERMINAL */}
        <div className="relative z-20 w-full max-w-lg mb-8 px-4">
             <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4 font-mono text-xs md:text-sm text-gray-300 shadow-2xl">
                 <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                     <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                     <span className="ml-auto text-white/20 text-[10px]">guest@rajan-portfolio ~</span>
                 </div>
                 <div className="space-y-1">
                     <div className="text-white/50">Type &apos;hello&apos; to initiate handshake...</div>
                     <div className="flex items-center gap-2">
                         <span className="text-blue-500">$</span>
                         <input 
                            type="text" 
                            placeholder="Enter command..."
                            className="bg-transparent border-none outline-none text-blue-400 w-full placeholder:text-white/10"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    const val = e.currentTarget.value.trim().toLowerCase();
                                    if (val) {
                                        window.location.href = `mailto:rajannishad1015@gmail.com?subject=Terminal Command: ${val}`;
                                        e.currentTarget.value = 'TRANSMITTING...';
                                    }
                                }
                            }}
                         />
                     </div>
                 </div>
             </div>
        </div>

        {/* THE DOCK */}
        <div className="relative z-20 mx-auto flex h-16 items-end gap-4 rounded-2xl bg-white/5 px-4 pb-3 border border-white/10 backdrop-blur-md">
            {ICONS.map((icon) => (
                <DockIcon key={icon.label} mouseX={mouseX} {...icon} />
            ))}
        </div>
        
        <div className="absolute bottom-6 text-[10px] text-white/20 font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} Rajan Nishad
        </div>
    </footer>
  );
}

const ICONS = [
    { label: 'Email', url: 'mailto:rajannishad1015@gmail.com', path: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { label: 'GitHub', url: 'https://github.com/Rajannishad1015', path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/rajanishad', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
    { label: 'Twitter', url: '#', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
    { label: 'Resume', url: '/resume.pdf', path: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
];

function DockIcon({ mouseX, label, url, path }: { mouseX: MotionValue; label: string; url: string; path: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.a
      ref={ref}
      href={url}
      style={{ width }}
      className="aspect-square flex flex-col items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/5 relative group"
    >
      <span className="absolute -top-8 bg-neutral-900 border border-white/10 text-[10px] text-white py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {label}
      </span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-1/2 h-1/2 text-white/80 group-hover:text-blue-400 transition-colors"
      >
          <path d={path} />
          {/* LinkedIn circle fix */}
          {label === 'LinkedIn' && <circle cx="4" cy="4" r="2" />}
      </svg>
    </motion.a>
  );
}
