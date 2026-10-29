import React from "react";
import Collage from "../case_study/collage";
import {
  ExpertiseList,
  NameTag,
  ProjectDetails,
  Tagline,
} from "../case_study/hero";
import ScreenRecording from "../case_study/screen_recording";
import SideBySide from "../case_study/side_by_side";
import useLanguage from "../global/use_language";

// The pencil underlines are placed by hand in the design, so a couple of them sit slightly off.
const EXPERTISE = {
  en: [
    { label: "Gamification" },
    { label: "App Design" },
    { label: "UX Research" },
    { label: "Data Visualisation", lineClassName: "mt-[29.88px]" },
    { label: "User Flow", lineClassName: "mt-[29.88px]" },
    { label: "IoT Design", lineClassName: "mt-[29.88px]" },
  ],
  bg: [
    { label: "Геймификация" },
    { label: "Дизайн на приложения" },
    { label: "UX Проучване" },
    { label: "Визуализация на данни" },
    { label: "Потребителски поток" },
    { label: "Дизайн на IoT" },
  ],
};

const HeroSection = () => {
  const { t } = useLanguage();

  const details = [
    {
      term: t({ en: "Time Period", bg: "Период" }),
      details: t({
        en: "September 25 - January 26",
        bg: "Септември 2025 – януари 2026",
      }),
    },
    {
      term: t({ en: "Platform", bg: "Платформа" }),
      details: t({
        en: "Mobile App (iOS / Android)",
        bg: "Мобилно приложение (iOS / Android)",
      }),
    },
    {
      term: t({ en: "Expertise", bg: "Експертиза" }),
      details: <ExpertiseList items={t(EXPERTISE)} />,
    },
  ];

  return (
    <header className="flex flex-col">
      <NameTag className="ml-1 mt-8 lg:ml-33 lg:mt-12">SmartNet App</NameTag>

      <Tagline
        className="mt-10 lg:ml-33 lg:mt-14.5"
        title={t({
          en: "Uniting the football world with smart technology",
          bg: "Обединяване на футболния свят чрез умни технологии",
        })}
        role={t({
          en: "SmartNet | Intern UX/ UI Design",
          bg: "SmartNet | Стаж по UX/UI дизайн",
        })}
      />

      <SideBySide isCentered className="mt-10 lg:mt-26.5">
        <ProjectDetails className="lg:ml-33" items={details} />

        <Collage
          className="lg:mr-76.25"
          width={390}
          height={565}
          loading="eager"
          items={[
            {
              src: "/smartnet_collage_bigger.webp",
              alt: t({
                en: "SmartNet app icon and screens next to the SmartNet tracking device",
                bg: "Иконата и екрани на приложението SmartNet до проследяващото устройство SmartNet",
              }),
            },
            // The recording plays on the left phone's screen, reaching a little under its bezel so no seam shows.
            // It's taller than the screen, so it's pinned to the top and the gesture bar is what's cut off
            {
              group: "phone",
              content: (
                <ScreenRecording
                  src="/smartnet/hero_video.mp4"
                  poster="/smartnet/hero_video_poster.webp"
                  label={t({
                    en: "Screen recording of a coach using the SmartNet app",
                    bg: "Запис на екрана на треньор, който използва приложението SmartNet",
                  })}
                  className="object-top"
                />
              ),
              x: 10.5,
              y: 161,
              w: 181,
              h: 389.5,
            },
            {
              group: "phone",
              src: "/smartnet/hero_phone_frame.webp",
              x: 0,
              y: 152,
              w: 201.5,
              h: 407,
            },
          ]}
        />
      </SideBySide>
    </header>
  );
};

export default HeroSection;
