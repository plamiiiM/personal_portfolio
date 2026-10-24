import React from "react";
import Collage from "../case_study/collage";
import MarkedWord from "../global/marked_word_component";
import { Paragraph, SectionLabel, SectionTitle } from "../case_study/typography";
import { noteText } from "./sticky_note";

const OverviewSection = () => {
  return (
    <>
      <section className="mt-68.75">
        <div className="ml-34">
          <SectionLabel>Project Overview</SectionLabel>
          <SectionTitle>What is Equine Integration?</SectionTitle>
        </div>

        <div className="mt-17 flex items-start justify-between">
          <Collage
            className="ml-27"
            width={598}
            height={476.61}
            items={[
              {
                src: "/equine/overview_activity.webp",
                alt: "Activity screen with the overview, per gait and recovery stats, next to a pencil sketch of a galloping horse and the workload card",
              },
            ]}
          />
          <Paragraph isPretty className="mr-27 mt-46 w-139.5">
            Equine Integration <MarkedWord isHighlighted>helps riders and trainers track</MarkedWord> their horse’s
            training. A wearable belt records each session and the{" "}
            <MarkedWord isHighlighted>app brings the data together in one place</MarkedWord>, so riders can follow
            progress and prepare for competition.
          </Paragraph>
        </div>
      </section>

      <section className="mt-48.5">
        <div className="flex items-start justify-between">
          <div className="ml-36.5 mt-15.75 w-119">
            <SectionTitle>The challenge</SectionTitle>
            <Paragraph isPretty className="mt-4.5">
              Riders had <MarkedWord isHighlighted>data but no understanding:</MarkedWord> the analytics page was a
              wall of numbers they{" "}
              <MarkedWord
                isCircled
                isDrawn
                circle={{
                  src: "/equine/circle_couldnt_interpret.svg",
                  className: "left-1/2 top-1/2 w-[10.035em] h-[1.771em] -rotate-[3.38deg]",
                }}
              >
                couldn’t interpret.
              </MarkedWord>{" "}
              Worse, tracking depended on riders remembering to measure every training, and each{" "}
              <MarkedWord isHighlighted>forgotten session</MarkedWord> meant{" "}
              <MarkedWord
                isCircled
                isDrawn
                circle={{
                  src: "/equine/circle_lost_data.svg",
                  className: "left-1/2 top-1/2 w-[6.479em] h-[1.428em] -rotate-[4.35deg]",
                }}
              >
                lost data
              </MarkedWord>{" "}
              ahead of the next competition.
            </Paragraph>
          </div>
          <Collage
            className="mr-51.5"
            width={463.63}
            height={336.83}
            items={[
              {
                src: "/equine/challenge_chart.webp",
                alt: "Sketch of a dashed card with line and bar charts",
                x: 0,
                y: 66,
                w: 195.96,
                h: 251.17,
              },
              {
                src: "/equine/challenge_phone.webp",
                alt: "Sketch of a phone with a “Training upcoming” notification and a bell",
                x: 105,
                y: 0,
                w: 358.63,
                h: 336.83,
              },
            ]}
          />
        </div>

        <div className="ml-36.5 mt-41 w-223.75">
          <Paragraph isPretty>
            My challenge as UX/UI designer was to solve both problems at once:{" "}
            <MarkedWord isHighlighted>translate raw metrics</MarkedWord>{" "}
            <MarkedWord isHighlighted>into insights</MarkedWord> riders could read at a glance, and{" "}
            <MarkedWord isHighlighted>build a habit</MarkedWord> around wearing the device, using gamified features
            and a refined user flow.
          </Paragraph>
          <Paragraph isPretty className="mt-6.75">
            All of it had to fit inside the app’s established design system, so the new experience would feel like
            part of the product rather than an add-on.
          </Paragraph>
        </div>

        {/* "How might we" questions on sticky notes, each over its own soft shadow */}
        <Collage
          className="ml-22.5 mt-15.75"
          width={1253.75}
          height={656.32}
          items={[
            { src: "/equine/sticky_blue_shadow.webp", x: 0, y: 95.13, w: 344.68, h: 349.92 },
            { src: "/equine/sticky_blue.webp", x: 5.79, y: 54.01, w: 374.64, h: 386.77 },
            noteText({
              text: "How might we translate complex horse data into a simple narrative story about today's ride?",
              x: 63.45,
              y: 143.62,
              w: 250.64,
              h: 251.95,
              rotate: 7.2,
            }),
            { src: "/equine/sticky_yellow_shadow.webp", x: 443.32, y: 286.71, w: 347.71, h: 369.61 },
            { src: "/equine/sticky_yellow.webp", x: 466.96, y: 266.9, w: 360.23, h: 375.37 },
            noteText({
              text: "How might we design a training history that instantly shows a rider their progress over time at a single glance?",
              x: 492.34,
              y: 374.23,
              w: 308.31,
              h: 195,
              rotate: -1.62,
            }),
            { src: "/equine/sticky_pink_shadow.webp", x: 920.54, y: 91.37, w: 243.44, h: 259.77 },
            { src: "/equine/sticky_pink.webp", x: 873.74, y: 0, w: 380.01, h: 393.01 },
            noteText({
              text: "How might we frame tracking as the horse's way of \"speaking\" so riders never want to miss a session?",
              x: 950.17,
              y: 99.76,
              w: 240.02,
              h: 234,
              rotate: -6.43,
            }),
          ]}
        />
      </section>
    </>
  );
};

export default OverviewSection;
