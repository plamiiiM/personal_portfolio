import React, { useState } from "react";
import Collage from "../case_study/collage";

const chalkLabel = (text, box) => ({
  ...box,
  content: (
    <p className="font-[PlamenasHandwriting] text-[2rem] tracking-[0.03em] whitespace-nowrap text-[#ebe6e6]">{text}</p>
  ),
});

// The smaller chalk board of the last two drivers is centred where the first one sits
const SMALL_BOARD = { src: "/equine/chalkboard.webp", x: 10.16, y: 7.05, w: 612.07, h: 424.66 };

const DRIVERS = [
  {
    name: "Anthropomorphism",
    description: "People respond with empathy to anything that shows human-like emotion.",
    visual: [
      { src: "/equine/chalkboard_anthropomorphism.webp" },
      {
        src: "/equine/cartoon_horse.webp",
        alt: "Chalk cartoon of a smiling horse, with the moods it can show",
        x: 364,
        y: 89.44,
        w: 182.17,
        h: 220.5,
      },
      chalkLabel("Tired", { x: 329, y: 135.44, w: 65, h: 48 }),
      chalkLabel("Sad", { x: 538, y: 219, w: 45, h: 48 }),
      chalkLabel("Happy", { x: 334, y: 284.44, w: 76, h: 48 }),
      { src: "/equine/real_horse.webp", alt: "Chalk drawing of a real horse’s head, with an arrow to its cartoon", x: 102, y: 81, w: 163, h: 267 },
      { src: "/equine/arrow_line.svg", x: 224, y: 211.32, w: 143.5, h: 7.36 },
    ],
  },
  {
    name: "Responsibility",
    description: "Caring for something gives people a reason to come back.",
    visual: [
      SMALL_BOARD,
      {
        src: "/equine/responsibility_visual.webp",
        alt: "Chalk drawing of a rider leaning her head against the cartoon horse, with a heart above them",
        x: 155.87,
        y: 78.47,
        w: 327,
        h: 281,
      },
    ],
  },
  {
    name: "Reinforcement",
    description: "Small, regular rewards strengthen the bond over time.",
    visual: [
      SMALL_BOARD,
      { src: "/equine/reinforcement_horse.webp", x: 376.16, y: 66.05, w: 139.81, h: 169.24 },
      {
        src: "/equine/reinforcement_visual.webp",
        alt: "Chalk drawing of the achievements card with a rosette, peeked at by the cartoon horse",
        x: 128.16,
        y: 159.05,
        w: 343,
        h: 151,
      },
    ],
  },
];

// The three drivers of attachment: picking one opens its description and shows its drawing on the chalk board
const AttachmentDrivers = ({ className = "" }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={`flex flex-col lg:flex-row lg:items-start ${className}`}>
      <ul className="lg:ml-57.25 lg:mt-15 flex lg:w-85.75 flex-col gap-y-5 lg:gap-y-8.5 font-[poppins] tracking-[0.03em]">
        {DRIVERS.map(({ name, description }, index) => {
          const isActive = index === activeIndex;
          return (
            <li key={name} className="relative">
              {/* Pencil mark beside the open driver */}
              {isActive && <span className="absolute -left-4 top-1 h-10 lg:-left-6.75 lg:top-2.25 lg:h-14 w-1 bg-black" aria-hidden="true" />}
              <button
                type="button"
                aria-expanded={isActive}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer text-left text-[1.5rem] lg:text-[2rem] tracking-[0.03em] transition-colors ${
                  isActive ? "font-bold" : "text-[#686868] hover:text-(--textOnLight)"
                }`}
              >
                {name}
              </button>
              {isActive && <p className="lg:w-61.5 text-[1rem] lg:text-[1.125rem] tracking-[0.03em]">{description}</p>}
            </li>
          );
        })}
      </ul>

      <Collage className="mt-8 lg:mt-0 lg:ml-22.5" width={632.38} height={438.75} items={DRIVERS[activeIndex].visual} />
    </div>
  );
};

export default AttachmentDrivers;
