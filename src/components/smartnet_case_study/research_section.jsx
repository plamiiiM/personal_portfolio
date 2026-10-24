import React from "react";
import Collage from "../case_study/collage";
import MarkedWord from "../global/marked_word_component";
import { Paragraph, SectionLabel, SectionTitle, SubsectionTitle } from "../case_study/typography";

const ResearchSection = () => {
  return (
    <section className="mt-53">
      <div className="ml-33">
        <SectionLabel>Research</SectionLabel>
        <SectionTitle>Football drills and training</SectionTitle>
      </div>

      <div className="mt-16.25 flex items-start justify-between">
        <Collage
          className="ml-9.5"
          width={898}
          height={600.5}
          items={[
            {
              src: "/smartnet/research_goal.webp",
              alt: "Illustrated goal with a question mark",
              x: 467,
              y: 355,
              w: 431,
              h: 245.5,
            },
            {
              src: "/smartnet/research_drills.webp",
              alt: "Research notes on the Accuracy Ladder and Sprint and Shoot drills, with a sticky note asking how to turn football training drills into fun exercises using gamification",
              x: 0,
              y: 0,
              w: 792,
              h: 564,
            },
          ]}
        />
        <Paragraph className="mr-17.25 mt-31.25 w-125.25">
          To get familiar with how a training session goes, and more specifically, how a football player improves their
          accuracy during training, I performed research on how these sessions look like through the eyes of both the
          player and coach.
        </Paragraph>
      </div>

      <div className="mt-52.5 flex items-start justify-between">
        <div className="ml-33 mt-32 w-125.25">
          <SectionTitle>Gameplay</SectionTitle>
          <Paragraph className="mt-3">
            Turned traditional accuracy drills into their gamified version. Introducing different difficulty levels and
            modes into each game, ensured that the players will stay motivated and will go back and play some more.
          </Paragraph>
          <Collage
            className="ml-17 mt-18.5"
            width={416.5}
            height={432}
            items={[
              { src: "/smartnet/gameplay_phone.webp", alt: "SmartNet exercises screen", x: 0, y: 0, w: 241, h: 432 },
              {
                src: "/smartnet/gameplay_levels.webp",
                alt: "Easy, medium and hard levels with large, medium and small targets",
                x: 230,
                y: 78,
                w: 186.5,
                h: 304,
              },
            ]}
          />
        </div>
        <Collage
          className="mr-18.5"
          width={722.8}
          height={787.1}
          items={[
            {
              src: "/smartnet/gameplay_accuracy_ladder.webp",
              alt: "User flow of the Accuracy ladder game",
              x: 0,
              y: 0,
              w: 577.5,
              h: 457.5,
            },
            {
              src: "/smartnet/gameplay_sprint_shoot.webp",
              alt: "User flow of the Sprint and shoot game",
              x: 132.3,
              y: 330.6,
              w: 590.5,
              h: 456.5,
            },
          ]}
        />
      </div>

      <div className="mt-55.5 flex items-start justify-between">
        <div className="ml-33 mt-17.75 w-125.25">
          <SectionTitle>Data Feedback</SectionTitle>
          <Paragraph className="mt-3">
            By researching coach workflows, I <MarkedWord isHighlighted>identified their needs</MarkedWord> and
            designed a UI that displays only the stats that matter to them. This gives coaches{" "}
            <MarkedWord isHighlighted>immediate, clear insights</MarkedWord> into{" "}
            <MarkedWord isHighlighted>player performance</MarkedWord> without unnecessary distraction.
          </Paragraph>
        </div>
        <Collage
          className="mr-48"
          width={590}
          height={623}
          items={[
            {
              src: "/smartnet/data_feedback_diagram.webp",
              alt: "Diagram of the user profile stats: overview, games played, most hit area and ability growth",
              x: 0,
              y: 0,
              w: 590,
              h: 453,
            },
            { src: "/smartnet/sticky_note.webp", x: 285, y: 366, w: 248.5, h: 257 },
            {
              x: 317.7,
              y: 452.9,
              w: 180.3,
              h: 90,
              rotate: -5.15,
              content: (
                <p className="text-center font-[PlamenasHandwriting] text-[1.4375rem] leading-[1.3] tracking-[0.03em]">
                  What are coaches looking for when assessing players?
                </p>
              ),
            },
          ]}
        />
      </div>

      <div className="mt-16.25 flex items-start justify-between">
        <Collage
          className="ml-33.25"
          width={724.2}
          height={798.9}
          items={[
            {
              src: "/smartnet/player_ui_feedback.webp",
              alt: "Data feedback notes with a spider chart and ability growth graph",
              x: 0,
              y: 0,
              w: 417.5,
              h: 476,
            },
            {
              src: "/smartnet/player_ui_sketch.webp",
              alt: "Hand-drawn sketch of the statistics screen",
              x: 359.2,
              y: 86.4,
              w: 365,
              h: 479.5,
            },
            {
              src: "/smartnet/player_ui_phone.webp",
              alt: "Player overview screen with game performance graph",
              x: 209.8,
              y: 384.4,
              w: 205,
              h: 414.5,
            },
          ]}
        />
        <div className="mr-32.25 mt-51.25 w-104.5">
          <Paragraph>
            To maintain player motivation and avoid toxic friction within teams, I designed{" "}
            <MarkedWord isHighlighted>role-based dashboards</MarkedWord>.
          </Paragraph>
          <SubsectionTitle className="mt-12.5">Player UIs</SubsectionTitle>
          <Paragraph className="mt-3">
            Personal milestones and skill metrics are focused exclusively for each player
          </Paragraph>
        </div>
      </div>

      <div className="mt-34 flex items-start justify-between">
        <div className="ml-50 mt-56.25 w-104.5">
          <SubsectionTitle>Coach UIs</SubsectionTitle>
          <Paragraph className="mt-1">
            Able to see side by side player comparative analytics, providing the coaches with the deep insights needed
            to optimize training.
          </Paragraph>
        </div>
        <Collage
          className="mr-11.25"
          width={810}
          height={607}
          items={[
            {
              src: "/smartnet/coach_ui_comparison.webp",
              alt: "Notebook sketches of the coach ranking and player comparison screens",
            },
          ]}
        />
      </div>
    </section>
  );
};

export default ResearchSection;
