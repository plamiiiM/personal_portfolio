import BackgroundTexture from "../components/global/portfolio_background_texture";
import PortfolioWithScribble from "../components/landing_section/portfolio_label_with_picture";
import ProfessionTitleName from "../components/landing_section/profession_title_name";
import IntroductionSection from "../components/introduction_section/introduction_section";
import UXStrategySection from "../components/ux_strategy_section/ux_strategy_section";
import ExperienceSection from "../components/experience_section/experience_section";

function LandingPage() {
  return (
    <BackgroundTexture>
      <header className="flex flex-row justify-start items-center gap-x-52">
        <PortfolioWithScribble />
        <ProfessionTitleName />
      </header>
      <main className="ml-28 mr-28">
        <section className="relative mt-80">
          <img
            src="/scribble_graphite_big_color.png"
            alt="Scribble with graphite pencil"
            className=" w-[24rem] absolute -right-20 -top-100 mix-blend-multiply opacity-80 rotate-70"
          />

          <IntroductionSection />
        </section>
        <img
          src="/cup_with_coffee.png"
          alt="Cup with coffee"
          className="place-self-end mr-50 -rotate-26 w-[20rem]"
        />
        <UXStrategySection />
        <ExperienceSection />
      </main>
    </BackgroundTexture>
  );
}

export default LandingPage;
