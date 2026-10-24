import React from "react";
import Collage from "../case_study/collage";

// The pencil underlines are placed by hand in the design, so a couple of them sit slightly off
const EXPERTISE = [
  { label: "Gamification" },
  { label: "App Design", labelClassName: "ml-[7.87px]" },
  { label: "User Persona" },
  { label: "Journey Mapping", lineClassName: "ml-[4.4px] mt-[29.88px]" },
];

const GLOSSARY = [
  { term: "Time Period", details: "September 25 - January 26" },
  { term: "Platform", details: "Mobile App (iOS / Android)" },
  {
    term: "Expertise",
    details: (
      <ul className="flex flex-wrap gap-5 text-[1rem] tracking-[0.03em]">
        {EXPERTISE.map(({ label, labelClassName = "", lineClassName = "mt-[25.84px]" }) => (
          <li key={label} className="grid">
            <span className={`col-start-1 row-start-1 whitespace-nowrap ${labelClassName}`}>{label}</span>
            <img
              src="/smartnet/filter_underline.svg"
              alt=""
              className={`col-start-1 row-start-1 self-start ${lineClassName}`}
            />
          </li>
        ))}
      </ul>
    ),
  },
];

const HeroSection = () => {
  return (
    <header className="flex flex-col">
      {/* Paper name tag, pinned at an angle like the project titles on the landing page */}
      <h1
        className="ml-35 mt-12 w-fit -rotate-7 bg-[#faf8f8] p-[16.87px] font-[PlamenasHandwriting] text-[5.0625rem] tracking-[0.03em]
                   shadow-[0_1.69px_1.69px_rgba(0,0,0,0.3),0_3.38px_5.06px_rgba(0,0,0,0.15)]"
      >
        SmartNet
      </h1>

      <div className="ml-33 mt-14.5 flex max-w-239.5 flex-col gap-y-6 font-[poppins]">
        <p className="text-[2.5rem] font-semibold tracking-[0.03em]">Uniting the football world with smart technology</p>
        <p className="text-[1.25rem] tracking-[0.03em] text-(--red)">SmartNet | Intern UX/ UI Design</p>
      </div>

      <div className="mt-26.5 flex items-center justify-between">
        <dl className="ml-33 flex w-111.25 flex-col gap-y-11.25 font-[poppins]">
          {GLOSSARY.map(({ term, details }) => (
            <div key={term} className="flex flex-col gap-y-2">
              <dt className="text-[1.25rem] tracking-[0.03em] text-(--red)">{term}</dt>
              <dd className="text-[1.125rem] tracking-[0.03em]">{details}</dd>
            </div>
          ))}
        </dl>

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
