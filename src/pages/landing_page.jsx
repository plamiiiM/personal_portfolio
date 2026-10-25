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
import FitToWidth from "../components/global/fit_to_width";
import useLanguage from "../components/global/use_language";

// Laid out on the 1530px wide Figma frame (the skillset clusters span all of it):
// scaled down to fit narrower screens, centred on wider ones, like the case studies.
// Phones get one column instead, with the photo and title shrunk to fit it
function LandingPage() {
  const { t } = useLanguage();

  return (
    <BackgroundTexture>
      <title>{t({ en: "Plamena Mincheva - UX Designer", bg: "Пламена Минчева – UX дизайнер" })}</title>
      <Navbar />
      <ScaleToFit width={1530}>
        <header className="flex flex-col items-center gap-y-8 px-5 lg:flex-row lg:justify-start lg:items-center lg:gap-x-52 lg:px-0">
          <FitToWidth>
            <PortfolioWithScribble />
          </FitToWidth>
          <FitToWidth>
            <ProfessionTitleName />
          </FitToWidth>
        </header>
        <main className="mx-auto max-w-3xl px-5 lg:max-w-none lg:px-0 lg:ml-28 flex flex-col gap-y-20 lg:gap-y-30">
          <section className="relative mt-20 lg:mt-80">
            <img
              src="/scribble_graphite_big_color.png"
              alt={t({ en: "Scribble with graphite pencil", bg: "Драсканица с графитен молив" })}
              className="hidden lg:block w-[24rem] absolute -right-20 -top-100 mix-blend-multiply opacity-80 rotate-70"
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
