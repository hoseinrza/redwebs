import Hero from "@/components/Hero";
import PathsSection from "@/components/PathsSection";
import ServicesGrid from "@/components/ServicesGrid";
import PortfolioPreview from "@/components/PortfolioPreview";
import InsightsSection from "@/components/InsightsSection";
import StatsBar from "@/components/StatsBar";
import CtaBanner from "@/components/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <PathsSection />
      <ServicesGrid />
      <PortfolioPreview />
      <InsightsSection />
      <StatsBar />
      <CtaBanner />
    </>
  );
}
