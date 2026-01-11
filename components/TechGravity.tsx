'use client';

import { useEffect, useRef } from 'react';

const SKILLS = [
  "Python", "SQL", "Power BI", "Excel", "Tableau", 
  "Pandas", "NumPy", "Scikit", "MySQL", "React", 
  "JS", "C++", "Oracle", "Git", "Stats", "AI"
];

export default function TechGravity() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId: number;
    let bodies: Body[] = [];
    let mouse = { x: -1000, y: -1000 };

    // Physics Constants
    const DRAG = 0.98;
    const ELASTICITY = 0.8;
    const GRAVITY_WELL_FORCE = 0.3;

    class Body {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      mass: number;
      text: string;
      color: string;

      constructor(x: number, y: number, text: string) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.radius = 40 + Math.random() * 20; // Varied sizes
        this.mass = this.radius;
        this.text = text;
        this.color = `hsl(${210 + Math.random() * 40}, 70%, 60%)`; // Blue/Cyan variants
      }

      update() {
        // Mouse Interaction (Push/Pull)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
            // Gentle repulsion
            const force = (200 - distance) / 200;
            this.vx -= (dx / distance) * force * 0.5;
            this.vy -= (dy / distance) * force * 0.5;
        }

        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Wall Collisions
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.vx *= -1;
        }
        if (this.x + this.radius > width) {
            this.x = width - this.radius;
            this.vx *= -1;
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.vy *= -1;
        }
        if (this.y + this.radius > height) {
            this.y = height - this.radius;
            this.vy *= -1;
        }

        // Apply Drag
        this.vx *= DRAG;
        this.vy *= DRAG;

        // Keep them moving slightly (Zero Gravity Drift)
        if (Math.abs(this.vx) < 0.1) this.vx += (Math.random() - 0.5) * 0.2;
        if (Math.abs(this.vy) < 0.1) this.vy += (Math.random() - 0.5) * 0.2;
      }

      draw() {
        if (!ctx) return;
        
        // Glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fill();

        // Text
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${this.radius / 2.5}px "Outfit", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, this.x, this.y);
      }
    }

    // Resolve Collisions between bodies
    const resolveCollision = (b1: Body, b2: Body) => {
        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < b1.radius + b2.radius) {
            // Normalize impact vector
            const nx = dx / distance;
            const ny = dy / distance;

            // Relative velocity
            const rvx = b2.vx - b1.vx;
            const rvy = b2.vy - b1.vy;

            // Velocity along normal
            const velAlongNormal = rvx * nx + rvy * ny;

            // Do not resolve if velocities are separating
            if (velAlongNormal > 0) return;

            // Impulse scalar
            let j = -(1 + ELASTICITY) * velAlongNormal;
            j /= (1 / b1.mass + 1 / b2.mass);

            // Apply impulse
            const impulseX = j * nx;
            const impulseY = j * ny;

            b1.vx -= (1 / b1.mass) * impulseX;
            b1.vy -= (1 / b1.mass) * impulseY;
            b2.vx += (1 / b2.mass) * impulseX;
            b2.vy += (1 / b2.mass) * impulseY;

            // Positional correction (prevent sticking)
            const percent = 0.2; // Penetration percentage to correct
            const slop = 0.01; // Penetration allowance
            const penetration = b1.radius + b2.radius - distance;
            if (penetration > slop) {
                const correctionX = (penetration / (1 / b1.mass + 1 / b2.mass)) * percent * nx;
                const correctionY = (penetration / (1 / b1.mass + 1 / b2.mass)) * percent * ny;
                
                b1.x -= correctionX * (1 / b1.mass);
                b1.y -= correctionY * (1 / b1.mass);
                b2.x += correctionX * (1 / b2.mass);
                b2.y += correctionY * (1 / b2.mass);
            }
        }
    };

    const resize = () => {
        width = canvas.parentElement?.clientWidth || window.innerWidth;
        height = canvas.parentElement?.clientHeight || window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        // Re-init bodies if empty
        if (bodies.length === 0) {
            SKILLS.forEach(skill => {
                bodies.push(new Body(
                    Math.random() * width, 
                    Math.random() * height, 
                    skill
                ));
            });
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Update all
        bodies.forEach(b => b.update());

        // Check collisions (O(N^2) but N is small ~16)
        for (let i = 0; i < bodies.length; i++) {
            for (let j = i + 1; j < bodies.length; j++) {
                resolveCollision(bodies[i], bodies[j]);
            }
        }

        // Draw all
        bodies.forEach(b => b.draw());

        animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationId);
    };

  }, []);

  return <canvas ref={canvasRef} className="w-full h-full cursor-none" />;
}
