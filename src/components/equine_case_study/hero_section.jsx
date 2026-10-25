import React from "react";
import Collage from "../case_study/collage";
import { ExpertiseList, NameTag, ProjectDetails, Tagline } from "../case_study/hero";
import SideBySide from "../case_study/side_by_side";
import useLanguage from "../global/use_language";

// The pencil underlines are placed by hand in the design, so they sit at slightly different depths.
// The Bulgarian labels have lengths of their own, so there each line stretches to its label
const BG_LINE = "mt-[25.84px] w-full h-0.5";
const EXPERTISE = {
  en: [
    { label: "Gamification" },
    { label: "UX Research", labelClassName: "ml-[4.87px]", lineClassName: "mt-[25.24px]" },
    { label: "Data Analysis", lineClassName: "mt-[25.76px]" },
    { label: "Information Architecture", lineClassName: "mt-[29.36px]", lineSrc: "/equine/filter_underline_wide.svg" },
    { label: "IoT App Design", lineClassName: "-ml-[2px] mt-[29.4px]", lineSrc: "/equine/filter_underline_short.svg" },
  ],
  bg: [
    { label: "Геймификация", lineClassName: BG_LINE },
    { label: "UX проучване", lineClassName: BG_LINE },
    { label: "Анализ на данни", lineClassName: BG_LINE },
    { label: "Информационна архитектура", lineClassName: BG_LINE },
    { label: "Дизайн на IoT приложения", lineClassName: BG_LINE },
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
      <NameTag className="ml-1 mt-8 lg:ml-34.75 lg:mt-9.25">Equine Integration</NameTag>

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
            {
              src: "/equine/hero_screens.webp",
              alt: t({
                en: "Equine Integration app icon above three phones showing the horse status and horses screens",
                bg: "Иконата на приложението Equine Integration над три телефона с екраните за състоянието на коня и конете",
              }),
            },
          ]}
        />
      </SideBySide>
    </header>
  );
};

export default HeroSection;
