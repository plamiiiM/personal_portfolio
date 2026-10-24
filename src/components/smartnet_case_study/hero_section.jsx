import React from "react";
import Collage from "../case_study/collage";
import { ExpertiseList, NameTag, ProjectDetails, Tagline } from "../case_study/hero";

// The pencil underlines are placed by hand in the design, so a couple of them sit slightly off
const EXPERTISE = [
  { label: "Gamification" },
  { label: "App Design", labelClassName: "ml-[7.87px]" },
  { label: "User Persona" },
  { label: "Journey Mapping", lineClassName: "ml-[4.4px] mt-[29.88px]" },
];

const DETAILS = [
  { term: "Time Period", details: "September 25 - January 26" },
  { term: "Platform", details: "Mobile App (iOS / Android)" },
  { term: "Expertise", details: <ExpertiseList items={EXPERTISE} /> },
];

const HeroSection = () => {
  return (
    <header className="flex flex-col">
      <NameTag className="ml-35 mt-12">SmartNet</NameTag>

      <Tagline
        className="ml-33 mt-14.5"
        title="Uniting the football world with smart technology"
        role="SmartNet | Intern UX/ UI Design"
      />

      <div className="mt-26.5 flex items-center justify-between">
        <ProjectDetails className="ml-33" items={DETAILS} />

        <Collage
          className="mr-76.25"
          width={390}
          height={565}
          loading="eager"
          items={[
            { src: "/smartnet_collage_bigger.png", alt: "SmartNet app icon and screens next to the SmartNet tracking device" },
            { src: "/smartnet/hero_phone.webp", alt: "Phone home screen with the SmartNet app", x: 0, y: 152, w: 201.5, h: 407 },
          ]}
        />
      </div>
    </header>
  );
};

export default HeroSection;
