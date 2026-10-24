import BackgroundTexture from "../components/global/portfolio_background_texture";
import PortfolioWithScribble from "../components/landing_section/portfolio_label_with_picture";
import ProfessionTitleName from "../components/landing_section/profession_title_name";
import IntroductionSection from "../components/introduction_section/introduction_section";
import ExperienceSection from "../components/experience_section/experience_section";
import SelectedWorkSection from "../components/selected_work_section/selected_work_section";
import SkillsetSection from "../components/skillset_section/skillset_section";
import FooterSection from "../components/footer_section/footer_section";
import Navbar from "../components/global/navbar";
import ScaleToFit from "../components/case_study/scale_to_fit";

// Laid out on the 1530px wide Figma frame (the skillset clusters span all of it):
// scaled down to fit narrower screens, centred on wider ones, like the case studies
function LandingPage() {
  return (
    <BackgroundTexture>
      <Navbar />
      <ScaleToFit width={1530}>
        <header className="flex flex-row justify-start items-center gap-x-52">
          <PortfolioWithScribble />
          <ProfessionTitleName />
        </header>
        <main className="ml-28 flex flex-col gap-y-30">
          <section className="relative mt-80">
            <img
              src="/scribble_graphite_big_color.png"
              alt="Scribble with graphite pencil"
              className=" w-[24rem] absolute -right-20 -top-100 mix-blend-multiply opacity-80 rotate-70"
            />

            <IntroductionSection />
          </section>
          <SelectedWorkSection />
          <ExperienceSection />
          <SkillsetSection />
          <FooterSection/>
        </main>
      </ScaleToFit>
    </BackgroundTexture>
  );
}

export default LandingPage;
