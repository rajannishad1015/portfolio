"use client";

import { useScroll, useMotionValueEvent, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const FRAME_COUNT = 91;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Use a ref for images to avoid re-renders during loading
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();

  // Map scroll progress (0-1) to frame index (0-FRAME_COUNT-1)
  const rawFrameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, FRAME_COUNT - 1]
  );

  // Add spring physics for buttery smooth scrubbing
  const frameIndex = useSpring(rawFrameIndex, {
    stiffness: 80,
    damping: 20,
    mass: 1,
    restDelta: 0.001
  });

  // 1. Load images on mount
  useEffect(() => {
    // Initialize the array
    imagesRef.current = new Array(FRAME_COUNT);

    let loadedCount = 0;

    const loadImages = async () => {
      // Load the first image immediately for instant feedback
      const firstImg = new Image();
      firstImg.src = `/sequence/frame_00.png`;
      try {
        await firstImg.decode(); // Decode before rendering
      } catch (e) {
         // ignore decode error
      }
      imagesRef.current[0] = firstImg;
      
      // Mark as at least partially ready so we can render frame 0
      setIsLoaded(true);

      // Load the rest in background
      for (let i = 1; i < FRAME_COUNT; i++) {
        const img = new Image();
        const frameNumber = i.toString().padStart(2, "0");
        img.src = `/sequence/frame_${frameNumber}.png`;
        
        img.onload = async () => {
          try {
            await img.decode();
          } catch(e) { /* ignore */ }
          
          imagesRef.current[i] = img;
          loadedCount++;
          if (loadedCount === FRAME_COUNT - 1) {
             // All loaded
          }
        };
      }
    };

    loadImages();
  }, []);

  // 2. Handle Canvas Sizing (ONLY on resize, not every frame)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.getContext("2d", { alpha: false }); 

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Re-render current frame after resize
        const currentFrame = Math.round(frameIndex.get());
        renderFrame(currentFrame);
    };

    // Initial size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

  // 3. Optimized Render Function
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Get the image: either the specific frame, or fallback to previous frames, or frame 0
    let img = imagesRef.current[index];
    
    // Simple fallback logic: if current frame missing, look back a few frames
    if (!img) {
        for (let i = index - 1; i >= 0; i--) {
            if (imagesRef.current[i]) {
                img = imagesRef.current[i];
                break;
            }
        }
    }

    if (!img) return; // Nothing to draw

    const cw = canvas.width;
    const ch = canvas.height;

    // Calculate 'object-fit: cover'
    const imgRatio = img.width / img.height;
    const canvasRatio = cw / ch;

    const isWide = canvasRatio > imgRatio;
    const drawWidth = isWide ? cw : ch * imgRatio;
    const drawHeight = isWide ? cw / imgRatio : ch;
    const offsetX = isWide ? 0 : (cw - drawWidth) / 2;
    const offsetY = isWide ? (ch - drawHeight) / 2 : 0;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // 4. Drive animation from scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isLoaded) {
      requestAnimationFrame(() => renderFrame(Math.round(latest)));
    }
  });

  // Initial render when first image loads
  useEffect(() => {
      if (isLoaded) {
          renderFrame(0);
      }
  }, [isLoaded]);

  return (
    <div className="h-[500vh] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        <canvas ref={canvasRef} className="block w-full h-full object-cover" />
      </div>
    </div>
  );
}
