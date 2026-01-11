import TechSphere from './TechSphere';
import CipherReveal from './CipherReveal';

export default function TechStack() {
  return (
    <section className="py-12 bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center min-h-[80vh]" id="stack">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#121212_0%,#000000_100%)] z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0 opacity-30" />

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center h-full flex-grow">
        
        {/* Header */}
        <div className="text-center mb-8 relative z-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white font-heading mb-2">
                Neural <span className="text-blue-500">System</span>
            </h2>
            <p className="text-xs font-mono text-blue-400/50 uppercase tracking-[0.3em]">Operational Tech Architecture</p>
        </div>

        {/* ZERO GRAVITY CHAMBER */}
        <div className="relative w-full h-[60vh] md:h-[70vh] border border-white/10 rounded-3xl bg-white/[0.02] overflow-hidden backdrop-blur-sm shadow-2xl">
            <div className="absolute top-4 left-4 font-mono text-[10px] text-white/30 tracking-widest">
                VISUALIZATION: <span className="text-blue-500">HOLOGRAPHIC_SPHERE</span>
            </div>
            <TechSphere />
            
            {/* Overlay Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-white/20 rounded-tl-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-white/20 rounded-tr-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-white/20 rounded-bl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-white/20 rounded-br-3xl pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
