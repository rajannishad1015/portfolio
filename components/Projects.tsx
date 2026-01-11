'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import CipherReveal from './CipherReveal';

const projects = [
  {
    title: "Sales Forecasting Dashboard",
    category: "Data Analysis / Power BI",
    description: "Predictive dashboard using 3+ years of historical sales data to forecast trends with 90% accuracy. Automated monthly reporting and trend analysis.",
    stats: [
        { label: "Efficiency", value: "+25%" },
        { label: "Accuracy", value: "90%" },
        { label: "Data", value: "3 Years" }
    ],
    tags: ["Power BI", "Forecasting", "Trend Analysis"],
    color: "#3b82f6" // blue
  },
  {
    title: "Customer Segmentation",
    category: "Machine Learning",
    description: "Applied clustering algorithms (K-Means) to categorize customers by behavior. Boosted targeted campaign effectiveness by 20%.",
    stats: [
        { label: "Impact", value: "+20% CTR" },
        { label: "Method", value: "Clustering" },
        { label: "Vis", value: "Power BI" }
    ],
    tags: ["Python", "K-Means", "Scikit-learn", "Pandas"],
    color: "#8b5cf6" // violet
  },
  {
    title: "Supply Chain Optimization",
    category: "SQL & Analytics",
    description: "Inventory management model using SQL/Excel. Reduced stockouts by 15% and decreased excess holding costs by 10%.",
    stats: [
        { label: "Stockouts", value: "-15%" },
        { label: "Holding", value: "-10%" },
        { label: "Stack", value: "SQL/Excel" }
    ],
    tags: ["SQL", "Excel", "Optimization", "Inventory"],
    color: "#10b981" // emerald
  },
  {
    title: "Churn Prediction Model",
    category: "Predictive Modeling",
    description: "Designed a logistic regression model achieving 85% accuracy to identify at-risk subscribers and enable proactive retention.",
    stats: [
        { label: "Accuracy", value: "85%" },
        { label: "Retention", value: "+10%" },
        { label: "Model", value: "Logistic" }
    ],
    tags: ["Python", "Logistic Regression", "Predictive Analytics"],
    color: "#f43f5e" // rose
  }
];

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={containerRef} className="bg-[#050505] relative z-20" id="projects">
      {/* Header */}
      <div className="pt-12 pb-6 px-6 md:px-12 max-w-7xl mx-auto">
         <span className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-2 block">// Deployment Log</span>
         <h2 className="text-4xl md:text-6xl font-bold text-white font-heading">
            <CipherReveal text="Case" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"><CipherReveal text="Studies" delay={0.2} /></span>
         </h2>
      </div>

      <div className="flex flex-col items-center pb-32 px-4 md:px-0">
        {projects.map((project, i) => {
          // Calculate scale target: The last card stays at 1, previous ones get smaller
          const targetScale = 1 - (projects.length - i) * 0.05; 
          return (
            <Card 
              key={i} 
              i={i} 
              project={project} 
              progress={scrollYProgress} 
              range={[i * 0.25, 1]} 
              targetScale={targetScale} 
            />
          )
        })}
      </div>
    </section>
  );
}

function Card({ i, project, progress, range, targetScale }: { i: number, project: any, progress: MotionValue, range: number[], targetScale: number }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0 md:top-12">
      <motion.div 
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }} 
        className="relative flex flex-col w-full max-w-4xl h-[60vh] md:h-[500px] rounded-3xl bg-[#0F0F0F] border border-white/10 overflow-hidden shadow-2xl origin-top"
      >
        {/* Dynamic Accent Color Border Top */}
        <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: project.color }} />

        <div className="flex flex-col md:flex-row h-full">
            {/* Left: Content */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-between relative z-10 bg-[#0F0F0F]">
                <div>
                   <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
                      <span className="text-xs font-mono uppercase tracking-widest text-white/50">{project.category}</span>
                   </div>
                   <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading leading-tight">
                        {project.title}
                   </h3>
                   <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 font-light">
                        {project.description}
                   </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] text-white/60">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right: Abstract Visual / Stats */}
            <div className="flex-1 relative bg-gradient-to-br from-[#111] to-[#050505] p-8 md:p-12 border-l border-white/5 flex flex-col justify-center gap-6 overflow-hidden group">
                 {/* Decorative Noise */}
                 <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                 
                 {/* Floating Glow Blob */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                 
                 {/* Stat Grid */}
                 <div className="relative z-10 grid grid-cols-1 gap-4">
                    {project.stats.map((stat: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
                            <span className="text-xs font-mono text-white/40 uppercase tracking-wider">{stat.label}</span>
                            <span className="text-lg font-bold text-white font-mono">{stat.value}</span>
                        </div>
                    ))}
                 </div>

                 {/* Simulated 'View Project' Button */}
                 <div className="mt-8 flex justify-end">
                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:translate-x-2 transition-transform">
                        View Analysis <span className="text-lg">→</span>
                    </button>
                 </div>
            </div>
        </div>
      </motion.div>
    </div>
  )
}
