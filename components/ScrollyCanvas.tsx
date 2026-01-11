"use client";

import { useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const FRAME_COUNT = 91;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();

  // Map scroll progress (0-1) to frame index (0-90)
  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, FRAME_COUNT - 1]
  );

  useEffect(() => {
    const loadImages = async () => {
        // 1. Load the first image IMMEDIATELY for instant visual
        const firstImg = new Image();
        firstImg.src = `/sequence/frame_00.png`;
        
        await new Promise<void>((resolve, reject) => {
             firstImg.onload = () => resolve();
             firstImg.onerror = reject;
        });

        // Set initial image state so it renders ASAP
        setImages((prev) => {
            const newImages = [...prev];
            newImages[0] = firstImg;
            return newImages;
        });
        setIsLoaded(true); // Allow rendering to start

        // 2. Load the rest in background
        const promises: Promise<void>[] = [];
        for (let i = 1; i < FRAME_COUNT; i++) {
            const promise = new Promise<void>((resolve, reject) => {
                const img = new Image();
                const frameNumber = i.toString().padStart(2, "0");
                img.src = `/sequence/frame_${frameNumber}.png`;
                img.onload = () => {
                    setImages((prev) => {
                        const clone = [...prev];
                        clone[i] = img;
                        return clone;
                    });
                    resolve();
                };
                img.onerror = reject;
            });
            promises.push(promise);
        }
    };

    loadImages();
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    // We allow rendering if we have the SPECIFIC image needed, even if not fully loaded
    if (!canvas || !images[index]) return; 

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];

    // Canvas sizing
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Object-fit: cover logic
    const scale = Math.max(
      canvas.width / img.width,
      canvas.height / img.height
    );
    const x = canvas.width / 2 - (img.width / 2) * scale;
    const y = canvas.height / 2 - (img.height / 2) * scale;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.round(latest);
    // Fallback to frame 0 if current frame isn't loaded yet
    if (images[index]) {
        renderFrame(index);
    } else if (images[0]) {
        renderFrame(0);
    }
  });

  // Initial render when loaded
  useEffect(() => {
    if (isLoaded && images[0]) {
      renderFrame(0);
    }
  }, [isLoaded, images]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
        const idx = Math.round(frameIndex.get());
        if (images[idx]) renderFrame(idx);
        else if (images[0]) renderFrame(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, frameIndex, images]);

  return (
    <div className="h-[500vh] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        <canvas ref={canvasRef} className="block w-full h-full object-cover" />
        {/* Removed "Loading..." text since we render frame 0 almost instantly */}
      </div>
    </div>
  );
}
