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
    // Preload all images
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises: Promise<void>[] = [];

      for (let i = 0; i < FRAME_COUNT; i++) {
        const promise = new Promise<void>((resolve, reject) => {
          const img = new Image();
          const frameNumber = i.toString().padStart(2, "0");
          img.src = `/sequence/frame_${frameNumber}.png`;
          img.onload = () => {
            loadedImages[i] = img;
            resolve();
          };
          img.onerror = reject;
        });
        promises.push(promise);
      }

      try {
        await Promise.all(promises);
        setImages(loadedImages);
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load images", error);
      }
    };

    loadImages();
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !isLoaded || !images[index]) return;

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
    renderFrame(index);
  });

  // Initial render when loaded
  useEffect(() => {
    if (isLoaded) {
      renderFrame(0);
    }
  }, [isLoaded]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) renderFrame(Math.round(frameIndex.get()));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, frameIndex]);

  return (
    <div className="h-[500vh] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        <canvas ref={canvasRef} className="block w-full h-full object-cover" />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-white/20">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}
