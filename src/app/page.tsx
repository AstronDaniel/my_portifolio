import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import CosmicCursor from "@/components/CosmicCursor";
import Preloader from "@/components/Preloader";
import Terminal from "@/components/Terminal";
import KonamiWrapper from "@/components/KonamiWrapper";
import FloatingShapes from "@/components/FloatingShapes";
import CyberpunkScroll from "@/components/CyberpunkScroll";
import Scenarios from "@/components/Scenarios";

export default function Home() {
  return (
    <main className="bg-[#030014] min-h-screen text-white selection:bg-blue-500/30 overflow-x-hidden">
      <Preloader />
      <Scenarios />
      <CosmicCursor />
      <StarBackground />
      <FloatingShapes />
      <CyberpunkScroll />
      <Terminal />
      <KonamiWrapper />

      <div className="relative z-10 flex flex-col gap-24 pb-32">
        <Hero />
        <Navbar /> {/* Floating Dock */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-32">
          <section id="about" className="scroll-mt-24">
            <About />
          </section>

          <section id="skills" className="scroll-mt-24">
            <Skills />
          </section>

          <section id="projects" className="scroll-mt-24">
            <Projects />
          </section>

          <section id="contact" className="scroll-mt-24">
            <Contact />
          </section>
        </div>

        <Footer />
      </div>
    </main>
  );
}
