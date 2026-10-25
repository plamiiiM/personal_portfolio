import BackgroundTexture from "../components/global/portfolio_background_texture";
import Navbar from "../components/global/navbar";
import FooterSection from "../components/footer_section/footer_section";
import HeroSection from "../components/smartnet_case_study/hero_section";
import OverviewSection from "../components/smartnet_case_study/overview_section";
import ResearchSection from "../components/smartnet_case_study/research_section";
import HypothesisSection from "../components/smartnet_case_study/hypothesis_section";
import DesignSection from "../components/smartnet_case_study/design_section";
import StatisticsSection from "../components/smartnet_case_study/statistics_section";
import ScaleToFit from "../components/case_study/scale_to_fit";

// Laid out on the 1530px wide Figma frame: scaled down to fit narrower screens, centred on wider ones.
// Phones get one column instead, with each picture shrunk to fit it
function SmartnetCaseStudy() {
  return (
    <BackgroundTexture>
      <title>SmartNet - Plamena Mincheva</title>
      <Navbar />
      <ScaleToFit width={1530}>
        <article className="mx-auto max-w-3xl px-5 text-(--textOnLight) lg:max-w-none lg:px-0">
          <HeroSection />
          <OverviewSection />
          <ResearchSection />
          <HypothesisSection />
          <DesignSection />
          <StatisticsSection />
          <div className="mt-10 lg:ml-33 lg:mt-17.25">
            <FooterSection />
          </div>
        </article>
      </ScaleToFit>
    </BackgroundTexture>
  );
}

export default SmartnetCaseStudy;
