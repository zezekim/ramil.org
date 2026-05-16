import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import Stats from "@/components/Stats";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="grid-bg min-h-screen">
      <Nav />
      <Hero />
      <TechMarquee />
      <Stats />
      <Work />
      <Process />
      <Skills />
      <Contact />
    </main>
  );
}
