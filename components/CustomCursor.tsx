'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
            setIsHovered(true);
        } else {
            setIsHovered(false);
        }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver); // Delegate event for performance

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <div className="relative w-8 h-8">
            <motion.div 
                animate={{ scale: isHovered ? 1.5 : 1, rotate: isHovered ? 45 : 0 }}
                className="absolute inset-0 border border-white rounded-full transition-all duration-200"
            />
            {/* Reticle Lines */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full" />
            <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white" animate={{ opacity: isHovered ? 0 : 1 }} />
            <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white" animate={{ opacity: isHovered ? 0 : 1 }} />
            <motion.div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-white" animate={{ opacity: isHovered ? 0 : 1 }} />
            <motion.div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-white" animate={{ opacity: isHovered ? 0 : 1 }} />
        </div>
      </motion.div>
    </>
  );
}
