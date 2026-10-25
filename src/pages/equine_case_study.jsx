import BackgroundTexture from "../components/global/portfolio_background_texture";
import Navbar from "../components/global/navbar";
import FooterSection from "../components/footer_section/footer_section";
import HeroSection from "../components/equine_case_study/hero_section";
import OverviewSection from "../components/equine_case_study/overview_section";
import ResearchSection from "../components/equine_case_study/research_section";
import DesignSection from "../components/equine_case_study/design_section";
import FeaturesSection from "../components/equine_case_study/features_section";
import ScaleToFit from "../components/case_study/scale_to_fit";
import useLanguage from "../components/global/use_language";

// Laid out on the 1440px wide Figma frame: scaled down to fit narrower screens, centred on wider ones.
// Phones get one column instead, with each picture shrunk to fit it
function EquineCaseStudy() {
  const { t } = useLanguage();

  return (
    <BackgroundTexture>
      <title>{t({ en: "Equine Integration - Plamena Mincheva", bg: "Equine Integration – Пламена Минчева" })}</title>
      <Navbar />
      <ScaleToFit width={1440}>
        <article className="mx-auto max-w-3xl px-5 text-(--textOnLight) lg:max-w-none lg:px-0">
          <HeroSection />
          <OverviewSection />
          <ResearchSection />
          <DesignSection />
          <FeaturesSection />
          <div className="mt-10 lg:ml-33 lg:mt-17.25">
            <FooterSection />
          </div>
        </article>
      </ScaleToFit>
    </BackgroundTexture>
  );
}

export default EquineCaseStudy;
