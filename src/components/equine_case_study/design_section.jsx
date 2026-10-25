import React from "react";
import Collage from "../case_study/collage";
import MarkedWord from "../global/marked_word_component";
import { LargeTitle, Paragraph, SectionLabel, SectionTitle, SubsectionTitle } from "../case_study/typography";
import DesignQuestions from "./design_questions";
import PuzzleConnection from "./puzzle_connection";
import SideBySide from "../case_study/side_by_side";

const DesignSection = () => {
  return (
    <section className="mt-20 lg:mt-14">
      <div className="lg:ml-30.75">
        <SectionLabel>Design and approach</SectionLabel>
        <SectionTitle>Comparison Analytics</SectionTitle>
      </div>

      <SideBySide isPictureFirst className="mt-6 lg:mt-22">
        <Collage
          className="lg:ml-21"
          width={657}
          height={471}
          items={[
            {
              src: "/equine/mind_map.webp",
              alt: "Handwritten mind map linking heart rate, average heart rate, intensity, ACWR, duration, walk, trot, speed and training type with red lines and question marks",
            },
          ]}
        />
        <div className="lg:mr-32.25 lg:mt-42 lg:w-130">
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
          <Paragraph isPretty className="mt-6 lg:mt-9">
            It wasn’t a request, but it connected with what I was seeing in the data, so I decided to explore it.
          </Paragraph>
        </div>
      </SideBySide>

      <SideBySide className="mt-14 lg:mt-22">
        <div className="lg:ml-30.75 lg:mt-35.75">
          <SubsectionTitle>Finding what connects</SubsectionTitle>
          <Paragraph isPretty className="mt-3 lg:w-98.5">
            The dataset was scattered and complicated, so I went through each metric to understand what it measures
            and how it relates to the others.
          </Paragraph>
        </div>
        <Collage
          className="lg:mr-84.5"
          width={311}
          height={439}
          items={[
            {
              src: "/equine/funnel.webp",
              alt: "Sketch of a red thread running through a funnel and coming out as puzzle pieces",
            },
          ]}
        />
      </SideBySide>

      <LargeTitle className="mx-auto mt-16 lg:mt-21.25 w-fit max-lg:text-center">Four questions guided the design</LargeTitle>
      <DesignQuestions />

      <PuzzleConnection className="mt-10 lg:ml-52.5" />

      <SideBySide className="mt-14 lg:mt-18.75">
        <div className="lg:ml-32.5 lg:mt-18">
          <SubsectionTitle>The solution</SubsectionTitle>
          <Paragraph isPretty className="mt-2 lg:w-98">
            Riders <MarkedWord isHighlighted>choose a date range</MarkedWord> and a{" "}
            <MarkedWord isHighlighted>training type,</MarkedWord> and the app lists every activity that matches.
          </Paragraph>
        </div>
        <Collage
          className="lg:mr-42.75"
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
      </SideBySide>

      {/* Rises beside the phones above */}
      <SideBySide isPictureFirst className="mt-8 lg:-mt-24">
        <Collage
          className="lg:ml-21.25"
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
        <Paragraph isPretty className="lg:mr-52 lg:mt-75 lg:w-98">
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
      </SideBySide>
    </section>
  );
};

export default DesignSection;
