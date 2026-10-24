import React from "react";
import Collage from "../case_study/collage";
import MarkedWord from "../global/marked_word_component";
import { LargeTitle, Paragraph, SectionLabel, SectionTitle, SubsectionTitle } from "../case_study/typography";
import DesignQuestions from "./design_questions";
import PuzzleConnection from "./puzzle_connection";

const DesignSection = () => {
  return (
    <section className="mt-14">
      <div className="ml-30.75">
        <SectionLabel>Design and approach</SectionLabel>
        <SectionTitle>Comparison Analytics</SectionTitle>
      </div>

      <div className="mt-22 flex items-start justify-between">
        <Collage
          className="ml-21"
          width={657}
          height={471}
          items={[
            {
              src: "/equine/mind_map.webp",
              alt: "Handwritten mind map linking heart rate, average heart rate, intensity, ACWR, duration, walk, trot, speed and training type with red lines and question marks",
            },
          ]}
        />
        <div className="mr-32.25 mt-42 w-130">
          <Paragraph isPretty>
            This feature started with a single comment. In one of the client interviews, she mentioned in passing that
            riders <MarkedWord isHighlighted>could benefit from comparing</MarkedWord> their{" "}
            <MarkedWord
              isCircled
              isDrawn
              circle={{
                src: "/equine/circle_past_activities.svg",
                className: "left-1/2 top-1/2 w-[9.681em] h-[1.716em] -rotate-[1.22deg]",
              }}
            >
              past activities.
            </MarkedWord>
          </Paragraph>
          <Paragraph isPretty className="mt-9">
            It wasn’t a request, but it connected with what I was seeing in the data, so I decided to explore it.
          </Paragraph>
        </div>
      </div>

      <div className="mt-22 flex items-start justify-between">
        <div className="ml-30.75 mt-35.75">
          <SubsectionTitle>Finding what connects</SubsectionTitle>
          <Paragraph isPretty className="mt-3 w-98.5">
            The dataset was scattered and complicated, so I went through each metric to understand what it measures
            and how it relates to the others.
          </Paragraph>
        </div>
        <Collage
          className="mr-84.5"
          width={311}
          height={439}
          items={[
            {
              src: "/equine/funnel.webp",
              alt: "Sketch of a red thread running through a funnel and coming out as puzzle pieces",
            },
          ]}
        />
      </div>

      <LargeTitle className="mx-auto mt-21.25 w-fit">Four questions guided the design</LargeTitle>
      <DesignQuestions />

      <PuzzleConnection className="ml-52.5 mt-10" />

      <div className="mt-18.75 flex items-start justify-between">
        <div className="ml-32.5 mt-18">
          <SubsectionTitle>The solution</SubsectionTitle>
          <Paragraph isPretty className="mt-2 w-98">
            Riders <MarkedWord isHighlighted>choose a date range</MarkedWord> and a{" "}
            <MarkedWord isHighlighted>training type,</MarkedWord> and the app lists every activity that matches.
          </Paragraph>
        </div>
        <Collage
          className="mr-42.75"
          width={559.37}
          height={526.19}
          items={[
            {
              src: "/equine/solution_phone_activities.webp",
              alt: "Nirvana’s activities screen with the Compare Activities button",
              x: 0,
              y: 1.01,
              w: 259.55,
              h: 525.18,
            },
            {
              src: "/equine/solution_phone_compare.webp",
              alt: "Compare screen with a date range, the training type and two activities selected",
              x: 299.82,
              y: 0,
              w: 259.55,
              h: 525.18,
            },
          ]}
        />
      </div>

      {/* Rises beside the phones above */}
      <div className="-mt-24 flex items-start justify-between">
        <Collage
          className="ml-21.25"
          width={557.73}
          height={523.51}
          items={[
            {
              src: "/equine/solution_phone_activity.webp",
              alt: "Comparison screen with the two dates side by side, filtered per gait",
              x: 0,
              y: 0,
              w: 258.73,
              h: 523.51,
            },
            {
              src: "/equine/solution_phone_variation.webp",
              alt: "Comparison screen with the duration per gait chart and the recovery heart rate of both sessions",
              x: 299,
              y: 0,
              w: 258.73,
              h: 523.51,
            },
          ]}
        />
        <Paragraph isPretty className="mr-52 mt-75 w-98">
          They select two sessions,{" "}
          <MarkedWord
            isCircled
            isDrawn
            circle={{
              src: "/equine/circle_tap_compare.svg",
              className: "left-1/2 top-1/2 w-[8.661em] h-[1.716em] -rotate-[1.22deg]",
            }}
          >
            tap Compare,
          </MarkedWord>{" "}
          and get a page built around what the data could meaningfully show.
        </Paragraph>
      </div>
    </section>
  );
};

export default DesignSection;
