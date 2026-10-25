import React from "react";
import Collage from "../case_study/collage";
import Hypothesis from "../case_study/hypothesis";
import MarkedWord from "../global/marked_word_component";
import { LargeTitle, Paragraph, SectionLabel, SectionTitle } from "../case_study/typography";
import AttachmentDrivers from "./attachment_drivers";
import SideBySide from "../case_study/side_by_side";

const ResearchSection = () => {
  return (
    <section className="mt-20 lg:mt-60.75">
      <div className="lg:ml-32.75">
        <SectionLabel>Research</SectionLabel>
        <SectionTitle>Shedding light on data</SectionTitle>
        {/* The marker stroke runs past the sentence on both sides (where it fits on one line) */}
        <p className="relative mt-4 lg:w-174.5 font-[poppins] text-[1rem] lg:text-[1.125rem] font-light italic tracking-[0.03em]">
          <img src="/highlight.svg" alt="" className="absolute hidden lg:block -left-5 top-0.75 h-6 w-147 max-w-none" />
          <span className="relative">
            The problem wasn’t missing data, it was{" "}
            <MarkedWord
              isCircled
              isDrawn
              circle={{
                src: "/equine/circle_missing_context.svg",
                className: "left-1/2 top-1/2 w-[9.728em] h-[2.195em] -rotate-[0.62deg]",
              }}
            >
              missing context.
            </MarkedWord>
          </span>
        </p>
      </div>

      <SideBySide isPictureFirst className="mt-8 lg:mt-24.25">
        <Collage
          className="lg:ml-24.75"
          width={589.53}
          height={430.36}
          items={[
            // Pencil frame around the sketch
            { x: 16.13, y: 25.76, w: 557, h: 362, rotate: -5.25, className: "border-2 border-[#262020]" },
            {
              src: "/equine/data_sketch.webp",
              alt: "Sketch of a desk lamp shining on a table of horse data and a red bar chart",
              x: 42.03,
              y: 14.04,
              w: 527.19,
              h: 416.32,
            },
          ]}
        />
        <Paragraph isPretty className="lg:mr-36.5 lg:mt-26.25 lg:w-119.5">
          <MarkedWord isHighlighted>Understanding</MarkedWord> the data became the foundation for the whole redesign.
          Working through the client’s <MarkedWord isHighlighted>raw dataset</MarkedWord> and learning the equestrian
          world gave me a clear picture of how the whole app connects. It became the foundation for every design
          decision.
        </Paragraph>
      </SideBySide>

      <SideBySide className="mt-14 lg:mt-61">
        <div className="lg:ml-32.75 lg:mt-13.25">
          <SectionTitle>Building an emotional connection</SectionTitle>
          <Paragraph isPretty className="mt-5 lg:w-128.5">
            Reminders are easy to ignore, so I looked into <MarkedWord isHighlighted>gamification</MarkedWord> to keep
            riders tracking. That led to the idea of{" "}
            <MarkedWord
              isCircled
              isDrawn
              circle={{
                src: "/equine/circle_virtual_pet.svg",
                className: "left-1/2 top-1/2 w-[6.443em] h-[1.716em] -rotate-[1.22deg]",
              }}
            >
              a virtual pet,
            </MarkedWord>{" "}
            and the question of whether it could create an <MarkedWord isHighlighted>emotional bond</MarkedWord> strong
            enough to build a habit.
          </Paragraph>
        </div>
        <Collage
          className="lg:mr-50.5"
          width={292}
          height={319}
          items={[
            {
              src: "/equine/pet_device_sketch.webp",
              alt: "Sketch of the tracking device with a smiling cartoon horse on its screen",
            },
          ]}
        />
      </SideBySide>

      <LargeTitle className="mx-auto mt-16 lg:mt-47.5 lg:w-216.25 text-center">
        Research points to three drivers of attachment
      </LargeTitle>
      <AttachmentDrivers className="mt-8 lg:mt-22.25" />

      {/* Starts under the chalk board, so its first curve rises out of it */}
      <Hypothesis className="mt-16 lg:-mt-12.25">
        “If riders get a readable session summary and a virtual pet that reflects their horse’s condition,{" "}
        <span className="opacity-50">
          they’ll rely less on the chat and build a tracking habit driven by emotional bond, not reminders.
        </span>
        ”
      </Hypothesis>
    </section>
  );
};

export default ResearchSection;
