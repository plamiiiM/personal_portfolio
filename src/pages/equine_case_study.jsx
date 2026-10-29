import BackgroundTexture from "../components/global/portfolio_background_texture";
import Navbar from "../components/global/navbar";
import FooterSection from "../components/footer_section/footer_section";
import HeroSection from "../components/equine_case_study/hero_section";
import OverviewSection from "../components/equine_case_study/overview_section";
import ResearchSection from "../components/equine_case_study/research_section";
import DesignSection from "../components/equine_case_study/design_section";
import FeaturesSection from "../components/equine_case_study/features_section";
import ScaleToFit from "../components/case_study/scale_to_fit";
import usePageEntrance from "../components/global/use_page_entrance";
import { InViewHold, inViewClassName } from "../components/global/use_in_view";

// Laid out on the 1440px wide Figma frame: scaled down to fit narrower screens, centred on wider ones.
// Phones get one column instead, with each picture shrunk to fit it.
// The header plays its entrance as the page opens (usePageEntrance), the rest as it scrolls into view
function EquineCaseStudy() {
  const { headerRef, isInView: isHeaderInView, isInstant: isHeaderInstant, isHolding } = usePageEntrance();

  return (
    <BackgroundTexture>
      <Navbar />
      <ScaleToFit width={1440}>
        <article className="mx-auto max-w-3xl px-5 text-(--textOnLight) lg:max-w-none lg:px-0">
          <InViewHold value={isHolding}>
            <div ref={headerRef} className={inViewClassName(isHeaderInView, isHeaderInstant)}>
              <HeroSection />
            </div>
            <OverviewSection />
            <ResearchSection />
            <DesignSection />
            <FeaturesSection />
            <div className="mt-10 lg:ml-33 lg:mt-17.25">
              <FooterSection
                tagline={{
                  en: "Want UX research that turns interviews into features?",
                  bg: "Търсите UX проучване, което превръща интервютата във функционалности?",
                }}
              />
            </div>
          </InViewHold>
        </article>
      </ScaleToFit>
    </BackgroundTexture>
  );
}

export default EquineCaseStudy;
