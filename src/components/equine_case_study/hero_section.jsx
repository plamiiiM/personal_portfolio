import React from "react";
import Collage from "../case_study/collage";
import { ExpertiseList, NameTag, ProjectDetails, Tagline } from "../case_study/hero";

// The pencil underlines are placed by hand in the design, so they sit at slightly different depths
const EXPERTISE = [
  { label: "Gamification" },
  { label: "UX Research", labelClassName: "ml-[4.87px]", lineClassName: "mt-[25.24px]" },
  { label: "Data Analysis", lineClassName: "mt-[25.76px]" },
  { label: "Information Architecture", lineClassName: "mt-[29.36px]", lineSrc: "/equine/filter_underline_wide.svg" },
  { label: "IoT App Design", lineClassName: "-ml-[2px] mt-[29.4px]", lineSrc: "/equine/filter_underline_short.svg" },
];

const DETAILS = [
  { term: "Time Period", details: "April 25 - June 25" },
  { term: "Platform", details: "Figma Prototype and Mobile App (Android)" },
  { term: "Expertise", details: <ExpertiseList items={EXPERTISE} /> },
];

const HeroSection = () => {
  return (
    <header className="flex flex-col">
      {/* The design's top edge runs under the 96px nav */}
      <NameTag className="ml-34.75 mt-9.25">Equine Integration</NameTag>

      <Tagline
        className="ml-33 mt-10"
        title="Simplifying equine performance with smart, gamified design"
        role="Equine Integration |  UX/ UI Design and Mobile Development"
      />

      <div className="mt-26.5 flex items-center justify-between">
        <ProjectDetails className="ml-33" items={DETAILS} />

        {/* The screens' soft shadows spread past the collage */}
        <Collage
          className="mr-33.75"
          width={693.74}
          height={486.73}
          loading="eager"
          items={[
            {
              src: "/equine/hero_screens.webp",
              alt: "Equine Integration app icon next to the activities, horses and horse status screens",
              x: 0,
              y: -59.67,
              w: 753.51,
              h: 595.34,
            },
          ]}
        />
      </div>
    </header>
  );
};

export default HeroSection;
