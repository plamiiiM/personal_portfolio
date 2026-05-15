import BackgroundTexture from "../components/global/portfolio_background_texture";
import PortfolioWithScribble from "../components/landing section/portfolio_label_with_picture";
import ProfessionTitleName from "../components/landing section/profession_title_name";
import IntroductionSection from "../components/introduction section/introduction_section";
import UXStrategySection from "../components/ux strategy section/ux_strategy_section";
import ExperienceSection from "../components/experience section/experience_section";

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
            src="/src/assets/scribble_graphite_big_color.png"
            alt="Scribble with graphite pencil"
            className=" absolute -right-20 -top-100 mix-blend-multiply opacity-80 rotate-70"
          />

          <IntroductionSection />
        </section>
        <img
          src="/src/assets/cup_with_coffee.png"
          alt="Cup with coffee"
          className="place-self-end mr-50 -rotate-26 w-100"
        />
        <UXStrategySection />
        <ExperienceSection/>
      </main>
    </BackgroundTexture>
  );
}

export default LandingPage;
