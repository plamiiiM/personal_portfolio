import React from "react";
import Collage from "../case_study/collage";
import MarkedWord from "../global/marked_word_component";
import { Paragraph, SectionLabel, SectionTitle } from "../case_study/typography";
import SideBySide from "../case_study/side_by_side";

const OverviewSection = () => {
  return (
    <>
      <section className="mt-20 lg:mt-44.75">
        <div className="lg:ml-33">
          <SectionLabel>Project Overview</SectionLabel>
          <SectionTitle>What is SmartNet?</SectionTitle>
        </div>

        <SideBySide isPictureFirst className="mt-6 lg:mt-20.5">
          <Collage
            className="lg:ml-26.75"
            width={636.3}
            height={385.4}
            items={[
              { src: "/smartnet/device_shadow_ellipse.svg", x: 390.5, y: 317.9, w: 245.9, h: 44.4 },
              {
                src: "/smartnet/overview_net_device.webp",
                alt: "SmartNet device standing in front of a goal fitted with the SmartNet net",
                x: 0,
                y: 0,
                w: 619.5,
                h: 385.5,
              },
            ]}
          />
          <Paragraph className="lg:mr-32.25 lg:mt-19.75 lg:w-125.75">
            SmartNet is an <MarkedWord isHighlighted>advanced football training system</MarkedWord> that turns every
            shot into real, measurable data, providing accurate{" "}
            <MarkedWord
              isCircled
              isDrawn
              circle={{ src: "/smartnet/circle_shot_placement.svg", className: "left-1/2 top-1/2 w-[105%] h-[2.2em]" }}
            >
              shot-placement analytics
            </MarkedWord>{" "}
            that give players and coaches the clarity needed to improve finishing with precision.
          </Paragraph>
        </SideBySide>
      </section>

      <SideBySide as="section" className="mt-20 lg:mt-23.25">
        <div className="lg:ml-33 lg:mt-43 lg:w-121.75">
          <SectionTitle>The challenge</SectionTitle>
          {/* <Paragraph isPretty className="mt-3 w-119">
            Translate real-world football drills and device tracking metrics into gamified exercises that help players
            and coaches track their accuracy progress and long-term improvement.
          </Paragraph> */}
          <Paragraph isPretty>
            Bring{" "}
            <MarkedWord isHighlighted isThin>
              real pitch drills
            </MarkedWord>{" "}
            into the app and make progress worth coming back for. The app had to help players and coaches{" "}
            <MarkedWord
              isCircled
              isDrawn
              circle={{
                src: "/smartnet/circle_track_accuracy.svg",
                className: "left-[calc(50%+0.38em)] top-[calc(50%-0.1em)] w-[115%] h-[1.72em]",
              }}
            >
              track accuracy
            </MarkedWord>{" "}
            and see{" "}
            <MarkedWord isHighlighted isThin>
              improvement over time
            </MarkedWord>
            , all gathered in one place.
          </Paragraph>
        </div>

        <Collage
          className="lg:mr-22"
          width={755}
          height={616.7}
          items={[
            { src: "/smartnet/challenge_frame.webp", x: 0, y: 0, w: 755, h: 552.5 },
            {
              src: "/smartnet/challenge_pitch.webp",
              alt: "Pitch diagram of the accuracy drill zones: wide zones, half-spaces and the central zone",
              x: 12.1,
              y: 7.2,
              w: 734.5,
              h: 541.5,
            },
            {
              src: "/smartnet/challenge_phone.webp",
              alt: "SmartNet exercises screen with the Sniper shot and Sprint and shoot drills",
              x: 421.2,
              y: 224.7,
              w: 219,
              h: 392,
            },
          ]}
        />
      </SideBySide>
    </>
  );
};

export default OverviewSection;
