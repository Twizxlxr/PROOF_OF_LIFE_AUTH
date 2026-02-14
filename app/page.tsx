import PresentationProvider from "@/components/PresentationProvider";
import SlideControls from "@/components/SlideControls";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import FlowSection from "@/components/FlowSection";
import MLSection from "@/components/MLSection";
import ScoringSection from "@/components/ScoringSection";
import SecuritySection from "@/components/SecuritySection";
import TokenSection from "@/components/TokenSection";
import PerformanceSection from "@/components/PerformanceSection";
import UseCasesSection from "@/components/UseCasesSection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";

const slides = [
  { Component: Hero, key: "hero" },
  { Component: ProblemSection, key: "problem" },
  { Component: SolutionSection, key: "solution" },
  { Component: ArchitectureSection, key: "architecture" },
  { Component: FlowSection, key: "flow" },
  { Component: MLSection, key: "ml" },
  { Component: ScoringSection, key: "scoring" },
  { Component: SecuritySection, key: "security" },
  { Component: TokenSection, key: "token" },
  { Component: PerformanceSection, key: "performance" },
  { Component: UseCasesSection, key: "usecases" },
  { Component: StatsSection, key: "stats" },
  { Component: CTASection, key: "cta" },
];

export default function Home() {
  return (
    <PresentationProvider>
      <main className="relative">
        {slides.map(({ Component, key }, index) => (
          <div key={key} data-slide={index} className="slide-snap-target">
            <Component />
          </div>
        ))}
      </main>
      <SlideControls />
    </PresentationProvider>
  );
}
