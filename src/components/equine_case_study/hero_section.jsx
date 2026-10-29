import React from "react";
import Collage from "../case_study/collage";
import { ExpertiseList, NameTag, ProjectDetails, Tagline } from "../case_study/hero";
import ScreenRecording from "../case_study/screen_recording";
import SideBySide from "../case_study/side_by_side";
import useLanguage from "../global/use_language";

// The pencil underlines are placed by hand in the design, so they sit at slightly different depths.
const EXPERTISE = {
  en: [
    { label: "Gamification" },
    { label: "UX Research", lineClassName: "mt-[25.24px]" },
    { label: "Data Analysis", lineClassName: "mt-[25.76px]" },
    { label: "Information Architecture", lineClassName: "mt-[29.36px]", lineSrc: "/equine/filter_underline_wide.svg" },
    { label: "IoT App Design", lineClassName: "mt-[29.4px]", lineSrc: "/equine/filter_underline_short.svg" },
  ],
  bg: [
    { label: "Геймификация" },
    { label: "UX проучване" },
    { label: "Анализ на данни" },
    { label: "Информационна архитектура" },
    { label: "Дизайн на IoT приложения" },
  ],
};

const HeroSection = () => {
  const { t } = useLanguage();

  const details = [
    { term: t({ en: "Time Period", bg: "Период" }), details: t({ en: "April 25 - June 25", bg: "Април – юни 2025" }) },
    {
      term: t({ en: "Platform", bg: "Платформа" }),
      details: t({ en: "Figma Prototype and Mobile App (Android)", bg: "Прототип във Figma и мобилно приложение (Android)" }),
    },
    { term: t({ en: "Expertise", bg: "Експертиза" }), details: <ExpertiseList items={t(EXPERTISE)} /> },
  ];

  return (
    <header className="flex flex-col">
      {/* The design's top edge runs under the 96px nav */}
      <NameTag className="ml-1 mt-8 lg:ml-33 lg:mt-9.25">Equine Integration</NameTag>

      <Tagline
        className="mt-10 lg:ml-33"
        title={t({
          en: "Simplifying equine performance with smart, gamified design",
          bg: "Представянето на коня, опростено с умен, геймифициран дизайн",
        })}
        role={t({
          en: "Equine Integration |  UX/ UI Design and Mobile Development",
          bg: "Equine Integration | UX/UI дизайн и мобилна разработка",
        })}
      />

      <SideBySide isCentered className="mt-10 lg:mt-26.5">
        <ProjectDetails className="lg:ml-33" items={details} />

        <Collage
          className="lg:mr-33.75"
          width={548.46}
          height={565.07}
          loading="eager"
          items={[
            // The recording plays on the middle phone's screen, reaching a little under its bezel so no seam shows.
            // The phones come cut out over it, with the app icon still overlapping the top of its screen
            {
              group: "phones",
              content: (
                <ScreenRecording
                  src="/equine/hero_video.mp4"
                  poster="/equine/hero_video_poster.webp"
                  label={t({
                    en: "Screen recording of the Equine Integration app, going from the horses to a horse's status, achievements and compared activities",
                    bg: "Запис на екрана на приложението Equine Integration – от конете до състоянието, постиженията и сравнените активности на един кон",
                  })}
                />
              ),
              x: 176.5,
              y: 108,
              w: 208,
              h: 447.5,
            },
            {
              group: "phones",
              src: "/equine/hero_screens_frame.webp",
              alt: t({
                en: "Equine Integration app icon above three phones, the side ones showing the horse status and horses screens",
                bg: "Иконата на приложението Equine Integration над три телефона, като страничните показват екраните за състоянието на коня и конете",
              }),
            },
          ]}
        />
      </SideBySide>
    </header>
  );
};

export default HeroSection;
