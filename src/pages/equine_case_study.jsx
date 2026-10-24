import BackgroundTexture from "../components/global/portfolio_background_texture";
import Navbar from "../components/global/navbar";
import FooterSection from "../components/footer_section/footer_section";
import HeroSection from "../components/equine_case_study/hero_section";
import OverviewSection from "../components/equine_case_study/overview_section";
import ResearchSection from "../components/equine_case_study/research_section";
import DesignSection from "../components/equine_case_study/design_section";
import FeaturesSection from "../components/equine_case_study/features_section";
import ScaleToFit from "../components/case_study/scale_to_fit";

// Laid out on the 1440px wide Figma frame: scaled down to fit narrower screens, centred on wider ones
function EquineCaseStudy() {
  return (
    <BackgroundTexture>
      <title>Equine Integration - Plamena Mincheva</title>
      <Navbar />
      <ScaleToFit width={1440}>
        <article className="text-(--textOnLight)">
          <HeroSection />
          <OverviewSection />
          <ResearchSection />
          <DesignSection />
          <FeaturesSection />
          <div className="ml-33 mt-17.25">
            <FooterSection />
          </div>
        </article>
      </ScaleToFit>
    </BackgroundTexture>
  );
}

export default EquineCaseStudy;
