'use client';

import { motion } from 'framer-motion';
import CipherReveal from './CipherReveal';

export default function About() {
  return (
    <section className="py-12 bg-[#0a0a0a] relative z-20 overflow-hidden" id="about">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            {/* Header */}
            <div className="mb-20 max-w-2xl">
                <span className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-2 block">// Mission Profile</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white font-heading leading-tight mb-6">
                    Operational <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">History</span>
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed font-light">
                    I am a Data Scientist bridging the gap between theoretical AI and production engineering. 
                    Currently enabling data-driven decisions at <span className="text-white">Rays Biotech</span>.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
                
                {/* Column 1: Experience Timeline */}
                <div>
                     <h3 className="text-2xl text-white font-heading font-medium mb-8 flex items-center gap-3">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        Timeline
                     </h3>
                     
                     <div className="relative border-l border-white/10 pl-8 md:pl-12 space-y-12">
                        {TIMELINE.map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="relative group"
                            >
                                {/* Timeline Node */}
                                <div className="absolute -left-[39px] md:-left-[55px] top-1.5 w-4 h-4 rounded-full bg-[#0a0a0a] border border-blue-500/50 group-hover:bg-blue-500 group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.2)]" />
                                
                                <span className="text-xs font-mono text-blue-400/80 mb-1 block uppercase tracking-wider">{item.year}</span>
                                <h4 className="text-xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">{item.role}</h4>
                                <div className="text-sm font-medium text-white/60 mb-2">{item.company}</div>
                                <p className="text-sm text-gray-400 font-light leading-relaxed max-w-md">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                     </div>
                </div>

                {/* Column 2: Certifications & Stats */}
                <div>
                    <h3 className="text-2xl text-white font-heading font-medium mb-8 flex items-center gap-3">
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        Clearance & Certs
                     </h3>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {CERTS.map((cert, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group relative bg-white/5 border border-white/10 p-5 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div>
                                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">{cert.issuer}</div>
                                        <h4 className="text-base font-bold text-white leading-tight mb-2">{cert.name}</h4>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-end">
                                        <span className="text-[10px] text-gray-500 font-mono">{cert.id}</span>
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                     </div>

                     {/* Stat Card Mini */}
                     <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-900/10 to-transparent border border-blue-500/10 backdrop-blur-sm">
                         <div className="flex justify-between items-center">
                            <div>
                                <div className="text-3xl font-bold text-white font-heading">BSC</div>
                                <div className="text-sm text-blue-300 font-medium">Data Science</div>
                                <div className="text-[10px] text-gray-500 mt-1">Kes Shroff College | 2024</div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-white font-heading">3.8</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-widest">GPA Equivalent</div>
                            </div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    </section>
  );
}

const TIMELINE = [
    {
        year: "2025 - Present",
        role: "Data Scientist",
        company: "Rays Biotech",
        description: "Engaging in social media content optimization using data insights. Managing product listings with high-quality descriptions and visuals."
    },
    {
        year: "2024",
        role: "Graduated (B.Sc Data Science)",
        company: "Kes Shroff College",
        description: "Specialized in Machine Learning, Statistical Analysis, and Big Data technologies. Completed key academic projects in Predictive Modeling."
    },
    {
        year: "2024",
        role: "Freelance / Internship",
        company: "Deloitte (Job Sim)",
        description: "Simulation involving data analysis and forensic technology. Created visualizations using Tableau to classify complex datasets."
    },
    {
        year: "2022",
        role: "Higher Secondary (HSC)",
        company: "Maharashtra Board",
        description: "Foundation in Science and Mathematics. Secured 50%."
    }
];

const CERTS = [
    {
        name: "CS50 AI with Python",
        issuer: "Harvard University",
        id: "CS50-AI-2024"
    },
    {
        name: "Machine Learning w/ Python",
        issuer: "IBM Professional",
        id: "IBM-ML-V1"
    },
    {
        name: "Prompt Engineering",
        issuer: "Columbia University",
        id: "OPENAI-WEB3"
    },
    {
        name: "AI Foundations Associate",
        issuer: "Oracle Cloud",
        id: "OCI-2024"
    }
];
