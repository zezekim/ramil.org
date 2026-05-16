import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import MouseSpotlight from "@/components/MouseSpotlight";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="grid-bg min-h-screen">
      <MouseSpotlight />
      <ScrollProgress />
      <Nav />
      <Hero />
      <TechMarquee />
      <Work />
      <Process />
      <Skills />
      <Contact />
    </main>
  );
}
