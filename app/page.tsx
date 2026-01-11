import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TechStack from "@/components/TechStack";
import About from "@/components/About";

export default function Home() {
  return (
    <main className="min-h-screen text-white">
      <Header />
      <div className="relative z-10 bg-[#121212]">
        <ScrollyCanvas />
        <Overlay />
      </div>
      
      <div className="relative z-20 space-y-0 pb-12 bg-[#121212]">
        <TechStack />
        <Projects />
        <About />
      </div>
      
      <Footer />
    </main>
  );
}
