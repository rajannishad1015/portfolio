import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TechStack from "@/components/TechStack";
import About from "@/components/About";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rajan Nishad | AI & Data Science Portfolio",
  description: "Explore the work of Rajan Nishad, a Data Scientist and generative AI engineer building solutions with LLMs, RAG, and Computer Vision.",
  alternates: {
    canonical: "https://rajann.me",
  },
};

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
