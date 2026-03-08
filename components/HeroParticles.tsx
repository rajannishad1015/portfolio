'use client';

import { useEffect, useRef } from 'react';

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseX: number;
      baseY: number;
      
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.5; // Slow movement
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
      }

      update() {
        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = 150;
        const force = (maxDistance - distance) / maxDistance;

        if (distance < maxDistance) {
            // Move away from mouse
            this.vx -= forceDirectionX * force * 0.5;
            this.vy -= forceDirectionY * force * 0.5;
        }

        // Basic movement
        this.x += this.vx;
        this.y += this.vy;

        // Friction
        this.vx *= 0.98;
        this.vy *= 0.98; 

        // Bounce off edges (or wrap) - let's wrap
        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;

        // Restore random movement if stopped
        if (Math.abs(this.vx) < 0.1) this.vx += (Math.random() - 0.5) * 0.1;
        if (Math.abs(this.vy) < 0.1) this.vy += (Math.random() - 0.5) * 0.1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(100, 160, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000); // Density calculation
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw all particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      // Optimized connection rendering with spatial grid
      // Create a spatial grid for efficient proximity queries
      const connectionDistance = 100;
      const gridSize = connectionDistance; // Each cell is connectionDistance x connectionDistance
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);
      const grid: Particle[][] = Array.from({ length: rows * cols }, () => []);

      // Assign particles to grid cells
      for (let i = 0; i < particles.length; i++) {
        const col = Math.floor(particles[i].x / gridSize);
        const row = Math.floor(particles[i].y / gridSize);
        const cellIndex = row * cols + col;
        if (cellIndex >= 0 && cellIndex < grid.length) {
          grid[cellIndex].push(particles[i]);
        }
      }

      // Only check particles in same or adjacent cells
      const checked = new Set<string>();
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const col = Math.floor(p1.x / gridSize);
        const row = Math.floor(p1.y / gridSize);

        // Check current cell and 8 adjacent cells
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const neighborRow = row + dr;
            const neighborCol = col + dc;
            const cellIndex = neighborRow * cols + neighborCol;

            if (cellIndex >= 0 && cellIndex < grid.length && grid[cellIndex]) {
              for (let j = 0; j < grid[cellIndex].length; j++) {
                const p2 = grid[cellIndex][j];

                // Avoid checking same particle and duplicate pairs
                const pairKey = p1 < p2 ? `${particles.indexOf(p1)}-${particles.indexOf(p2)}` : `${particles.indexOf(p2)}-${particles.indexOf(p1)}`;
                if (p1 !== p2 && !checked.has(pairKey)) {
                  checked.add(pairKey);

                  // Use squared distance to avoid sqrt calculation
                  const dx = p1.x - p2.x;
                  const dy = p1.y - p2.y;
                  const distSquared = dx * dx + dy * dy;
                  const maxDistSquared = connectionDistance * connectionDistance;

                  if (distSquared < maxDistSquared) {
                    const distance = Math.sqrt(distSquared);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(100, 160, 255, ${0.2 - distance/500})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                  }
                }
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-auto"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
