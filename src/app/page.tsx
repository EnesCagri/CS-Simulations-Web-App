// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Navbar } from "@/components/navbar";
import { GraphNodesBackground } from "@/components/graph-nodes-background";
import { GlassHeroCard } from "@/components/glass-hero-card";
import { FeaturesSection } from "@/components/features-section";
import { AboutSection } from "@/components/about-section";
import { FeaturedSimulations } from "@/components/featured-simulations";
import { SectionBackground } from "@/components/section-background";
import { Footer } from "@/components/footer";
import simulationsData from "@/db/simulations.json";

export default function Home() {
  // Map simulations to the required format for FeaturedSimulations
  const featuredData = simulationsData.simulations.map((sim) => ({
    title: sim.title,
    desc: sim.desc,
    image: sim.image,
    href: `/simulations/${sim.id}`,
  }));
  return (
    <div className="relative min-h-screen flex flex-col bg-black overflow-hidden">
      <Navbar />
      <div className="relative w-full flex flex-col items-center text-center z-10 pt-32 min-h-[80vh]">
        <GraphNodesBackground />
        <GlassHeroCard />
      </div>
      <SectionBackground showGrid>
        <FeaturesSection />
      </SectionBackground>
      <SectionBackground showGrid={false}>
        <AboutSection />
      </SectionBackground>
      <SectionBackground showGrid>
        <FeaturedSimulations data={featuredData} />
      </SectionBackground>
      <Footer />
    </div>
  );
}
