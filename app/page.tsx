import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Nav />
      <Hero />
      <Work />
      <Process />
      <Skills />
      <Contact />
    </main>
  );
}
