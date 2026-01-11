'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hexCodes, setHexCodes] = useState<string[]>([]);

  useEffect(() => {
    // Generate hex codes on client only to prevent hydration mismatch
    setHexCodes(Array.from({ length: 20 }).map(() => 
      Array.from({ length: 12 }).map(() => Math.floor(Math.random() * 16).toString(16)).join('')
    ));

    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500); // Wait a bit at 100%
          return 100;
        }
        // Random increment for "realistic" feel
        return Math.min(prev + Math.floor(Math.random() * 10) + 2, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex flex-col pointer-events-none">
            {/* Top Half - Blast Door */}
            <motion.div
                initial={{ y: 0 }}
                exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
                className="relative w-full h-1/2 bg-[#050505] border-b border-white/10 overflow-hidden flex items-end justify-center"
            >
                {/* Background Texture inside Top */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
                
                {/* Scrolling Hex Layer */}
                <div className="absolute top-0 left-0 w-full p-4 opacity-10 font-mono text-[10px] text-blue-500 overflow-hidden">
                    {hexCodes.map((code, i) => (
                        <div key={i} className="whitespace-nowrap">{`0x${code} // SYSTEM_Check[${i}]`}</div>
                    ))}
                </div>
            </motion.div>

            {/* Bottom Half - Blast Door */}
            <motion.div
                initial={{ y: 0 }}
                exit={{ y: "100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
                className="relative w-full h-1/2 bg-[#050505] border-t border-white/10 overflow-hidden flex items-start justify-center"
            >
                {/* Background Texture inside Bottom */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
                
                {/* Bottom Status Bar */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end font-mono text-xs text-blue-500/80">
                    <div className="flex flex-col gap-1">
                        <span className="opacity-50">UPLINK STATUS</span>
                        <span className="animate-pulse">{progress < 100 ? "ESTABLISHING CONNECTIVITY..." : "CONNECTION SECURE"}</span>
                    </div>
                    <div className="text-2xl font-bold">{progress}%</div>
                </div>

                {/* Progress Bar Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-900/30">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]"
                    />
                </div>
            </motion.div>

            {/* CENTRAL LOADER ONSCREEN - Fades out before doors open */}
            <motion.div
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                className="absolute inset-0 flex items-center justify-center z-20"
            >
                {/* Gyroscopic Core */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Ring 1 */}
                    <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-[spin_3s_linear_infinite]" />
                    {/* Ring 2 */}
                    <div className="absolute inset-2 rounded-full border border-t-white/80 border-r-transparent border-b-transparent border-l-transparent animate-[spin_2s_linear_infinite_reverse]" />
                    {/* Core */}
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                </div>
            </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
