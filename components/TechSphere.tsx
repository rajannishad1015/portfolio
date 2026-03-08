'use client';

import { useEffect, useRef } from 'react';

const SKILLS = [
  "Python", "SQL", "Power BI", "Excel", "Tableau", 
  "Pandas", "NumPy", "Scikit", "MySQL", "React", 
  "JavaScript", "C++", "Oracle", "Git", "Stats", "AI",
  "TensorFlow", "PyTorch", "AWS", "Docker"
];

export default function TechSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId: number;

    // Sphere State
    // Sphere State
    // Sphere State
    let rotation = { x: 0, y: 0 };
    let targetRotation = { x: 0, y: 0 };
    let radius = 280; // Initial radius

    // Generate Points on a Sphere (Fibonacci Sphere Algorithm for even distribution)
    let points = SKILLS.map((skill, i) => {
        const phi = Math.acos(-1 + (2 * i) / SKILLS.length);
        const theta = Math.sqrt(SKILLS.length * Math.PI) * phi;
        
        return {
            x: 0, // Will be calculated in resize/update
            y: 0, 
            z: 0, 
            originalPhi: phi,
            originalTheta: theta,
            text: skill
        };
    });

    const resize = () => {
        width = canvas.parentElement?.clientWidth || window.innerWidth;
        height = canvas.parentElement?.clientHeight || window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Responsive Radius
        if (width < 600) {
            radius = 120; // Reduced slightly based on user feedback (was 135)
        } else {
            radius = 280; // Desktop default
        }

        // Recalculate original positions based on new radius
        points = points.map(p => ({
            ...p,
            x: radius * Math.cos(p.originalTheta) * Math.sin(p.originalPhi),
            y: radius * Math.sin(p.originalTheta) * Math.sin(p.originalPhi),
            z: radius * Math.cos(p.originalPhi)
        }));
    };

    // Cache trigonometric calculations
    let cosRotX = 1, sinRotX = 0, cosRotY = 1, sinRotY = 0;
    let lastRotX = 0, lastRotY = 0;

    const animate = () => {
        ctx.clearRect(0, 0, width, height);

        // Interpolate rotation for smoothness
        rotation.x += (targetRotation.x - rotation.x) * 0.05;
        rotation.y += (targetRotation.y - rotation.y) * 0.05;

        // Auto-rotation (idle spin)
        targetRotation.y += 0.001;

        // Only recalculate trig functions if rotation changed significantly
        if (Math.abs(rotation.x - lastRotX) > 0.001 || Math.abs(rotation.y - lastRotY) > 0.001) {
            cosRotX = Math.cos(rotation.x);
            sinRotX = Math.sin(rotation.x);
            cosRotY = Math.cos(rotation.y);
            sinRotY = Math.sin(rotation.y);
            lastRotX = rotation.x;
            lastRotY = rotation.y;
        }

        const cx = width / 2;
        const cy = height / 2;
        const perspective = width < 600 ? 400 : 500;

        // 1. PROJECT 3D Points to 2D (with cached trig values)
        const projectedPoints = points.map(p => {
             // Rotate around X
             let y1 = p.y * cosRotX - p.z * sinRotX;
             let z1 = p.y * sinRotX + p.z * cosRotX;

             // Rotate around Y
             let x2 = p.x * cosRotY - z1 * sinRotY;
             let z2 = p.x * sinRotY + z1 * cosRotY;

             // Perspective Projection
             const scale = perspective / (perspective + z2);
             const x2d = cx + x2 * scale;
             const y2d = cy + y1 * scale;

             return { ...p, x2, y1, z2, x2d, y2d, scale };
        });

        // 2. DRAW CONNECTIONS (Neural Lines) - Optimized with squared distances
        // We do this before nodes so lines appear behind text
        ctx.lineWidth = 1;
        const threshold = width < 600 ? 90 : 150;
        const thresholdSquared = threshold * threshold;

        for (let i = 0; i < projectedPoints.length; i++) {
            const p1 = projectedPoints[i];

            // Early exit if point is too far back (optimization)
            if (p1.z2 > radius * 0.8) continue;

            for (let j = i + 1; j < projectedPoints.length; j++) {
                const p2 = projectedPoints[j];

                // Early exit if second point is too far back
                if (p2.z2 > radius * 0.8) continue;

                // Calculate distance in 3D space using squared distance first
                const dx = p1.x2 - p2.x2;
                const dy = p1.y1 - p2.y1;
                const dz = p1.z2 - p2.z2;
                const distSquared = dx*dx + dy*dy + dz*dz;

                if (distSquared < thresholdSquared) {
                    const dist = Math.sqrt(distSquared);

                    // Opacity based on Z-depth (Near items (neg z) are opaque)
                    const avgZ = (p1.z2 + p2.z2) / 2;
                    const normZ = (avgZ + radius) / (2 * radius);
                    const opacity = Math.max(0.02, (1 - normZ) * 0.3);

                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(100, 180, 255, ${opacity})`;
                    ctx.moveTo(p1.x2d, p1.y2d);
                    ctx.lineTo(p2.x2d, p2.y2d);
                    ctx.stroke();
                }
            }
        }

        // 3. DRAW NODES (Sorted by Z - Far to Near)
        projectedPoints.sort((a, b) => b.z2 - a.z2);

        projectedPoints.forEach(p => {
             // Opacity/Scale based on Z-depth
            const normZ = (p.z2 + radius) / (2 * radius);
            const opacity = Math.min(1, Math.max(0.15, (1 - normZ) + 0.1));

            ctx.save();
            ctx.globalAlpha = opacity;

            // Text - Refined Size (Responsive)
            const baseSize = width < 600 ? 9 : 18;
            const fontSize = Math.max(7, baseSize * p.scale);
            ctx.font = `600 ${fontSize}px "Outfit", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Glow effect for front items (Negative Z is Front)
            if (p.z2 < 0) {
                ctx.shadowColor = 'rgba(59, 130, 246, 0.6)';
                ctx.shadowBlur = (width < 600 ? 10 : 15) * p.scale;
                ctx.fillStyle = '#ffffff';
            } else {
                ctx.fillStyle = '#94a3b8'; // Slate-400
                ctx.shadowBlur = 0;
            }

            ctx.fillText(p.text, p.x2d, p.y2d);
            ctx.restore();
        });

        animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
    
    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        targetRotation.y = ((x - width / 2) / width) * 2; 
        targetRotation.x = ((y - height / 2) / height) * 2;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationId);
    };

  }, []);

  return <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
}
