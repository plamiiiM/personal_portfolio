import BackgroundTexture from "../components/global/portfolio_background_texture";
import PortfolioWithScribble from "../components/landing_section/portfolio_label_with_picture";
import ProfessionTitleName from "../components/landing_section/profession_title_name";
import IntroductionSection from "../components/introduction_section/introduction_section";
import UXStrategySection from "../components/ux_strategy_section/ux_strategy_section";
import ExperienceSection from "../components/experience_section/experience_section";
import SelectedWorkSection from "../components/selected_work_section/selected_work_section";
import SkillsetSection from "../components/skillset_section/skillset_section";
import FooterSection from "../components/footer_section/footer_section";

function LandingPage() {
  return (
    <BackgroundTexture>
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
        <UXStrategySection />
        <ExperienceSection />
        <SkillsetSection />
        <FooterSection/>
      </main>
    </BackgroundTexture>
  );
}

export default LandingPage;
