import React from "react";
import Collage from "../case_study/collage";
import { Paragraph, SectionLabel, SectionTitle, SubsectionTitle } from "../case_study/typography";

const DesignSection = () => {
  return (
    <section className="mt-11">
      <div className="flex items-start justify-between">
        <div className="ml-33 mt-13.5 w-126.5">
          <SectionLabel>Design and approach</SectionLabel>
          <SectionTitle className="mt-3.5">Mood board &amp; aesthetics</SectionTitle>
          <Paragraph className="mt-3">
            For the brand identity of the app, I followed clients wishes of brand representation and adapted them to a
            new visual system of custom colors, fonts, illustrations and UI.
          </Paragraph>
        </div>
        <Collage
          className="mr-5"
          width={804}
          height={536}
          items={[
            {
              src: "/smartnet/moodboard.webp",
              alt: "Mood board with football imagery, the orange type scale in Anton and Montserrat, icons and player cards",
            },
          ]}
        />
      </div>
      {/* Laid over the bottom corner of the mood board */}
      <Collage
        className="ml-31.5 -mt-44.5"
        width={637.5}
        height={434.5}
        items={[
          {
            src: "/smartnet/design_system.webp",
            alt: "Design system: Anton and Montserrat type, buttons, cards and the orange, light grey and dark grey palette",
          },
        ]}
      />

      <div className="mt-54.5 flex items-start justify-between">
        <div className="ml-34 mt-24.75 w-126.5">
          <SectionTitle>Gamified drills</SectionTitle>
          <Paragraph className="mt-3">
            I crafted 6 different games targeting the skills needed for a footballer to succeed. Focusing on training
            accuracy through progressive difficulty, speed and precision.
          </Paragraph>
        </div>
        <Collage
          className="mr-18.5"
          width={708}
          height={531}
          items={[
            {
              src: "/smartnet/gamified_drills_ideation.webp",
              alt: "Notebook sketches of the NET logo and ideas for shooting, number and close goal games",
            },
          ]}
        />
      </div>
      <Collage
        className="ml-34 -mt-43"
        width={741}
        height={556}
        items={[
          {
            src: "/smartnet/gamified_drills_ideation_2.webp",
            alt: "Notebook notes on reaction, timed, challenge and ghost keeper drills",
          },
        ]}
      />

      <div className="relative z-10 ml-205 mt-50.75 w-126.5">
        <SubsectionTitle>Level Mastery</SubsectionTitle>
        <Paragraph>
          Gamification was a crucial key to the drills. By adding difficulty levels, revealing instant scores and
          providing feedback, I keep player motivation and ensure user retention.
        </Paragraph>
      </div>
      {/* Runs off the left edge of the page */}
      <Collage
        className="-ml-60.75 -mt-21"
        width={1407}
        height={631}
        items={[
          {
            src: "/smartnet/level_mastery_stats.webp",
            alt: "Notebook sketches of the statistics priorities and the training setup screens",
            x: 0,
            y: 0,
            w: 828,
            h: 621,
          },
          {
            src: "/smartnet/level_mastery_levels.webp",
            alt: "Notebook sketches of the pre-set and custom level options",
            x: 823,
            y: 193,
            w: 584,
            h: 438,
          },
        ]}
      />
      <Collage
        className="ml-82.5 mt-11.75"
        width={809.5}
        height={478}
        items={[
          {
            src: "/smartnet/level_mastery_phone_training.webp",
            alt: "Choose training screen with All areas and Goal corners",
            x: 0,
            y: 0,
            w: 236.5,
            h: 478,
          },
          {
            src: "/smartnet/level_mastery_phone_levels.webp",
            alt: "Levels screen with easy, medium and hard levels",
            x: 573,
            y: 0,
            w: 236.5,
            h: 478,
          },
        ]}
      />

      <div className="mt-10.75 flex items-start justify-between">
        <div className="ml-33 mt-59.75 w-126.5">
          <SubsectionTitle>During the game</SubsectionTitle>
          <Paragraph>
            Inside the game, I provided clear visuals and modern approach to what coaches and players are seeing,
            showing user need’s prioritization. The SmartNet design works by allowing the coach to see in real time
            which sector of the goal is the aim, the score board and time.
          </Paragraph>
        </div>
        {/* Its transparent left edge overlaps the text column by 20px */}
        <Collage
          className="-ml-5 mr-8"
          width={880}
          height={721.5}
          items={[
            {
              src: "/smartnet/during_game.webp",
              alt: "In-game Sniper shot screen showing a goal, the score and the shot power, over the notebook sketches it came from",
            },
          ]}
        />
      </div>

      <div className="mt-32 flex items-start justify-between">
        <Collage
          className="ml-44.25"
          width={559}
          height={582}
          items={[
            {
              src: "/smartnet/user_flow.webp",
              alt: "Hand-drawn user flow from start, team and player selection through training choice and play to the game end and results",
            },
          ]}
        />
        <div className="mr-59.5 mt-43 w-113.75">
          <SubsectionTitle>User Flow</SubsectionTitle>
          <Paragraph className="mt-2">
            The whole game is coordinated in a simple user flow, giving the freedom and ease for both users to start and
            track field progression.
          </Paragraph>
        </div>
      </div>

      <SectionTitle className="ml-45 mt-65.5">Illustrations</SectionTitle>
      <Collage
        className="ml-30.25 mt-10.5"
        width={1220}
        height={815.7}
        items={[
          {
            src: "/smartnet/illustrations_goal.webp",
            alt: "Illustration of a ball flying into a goal with lit-up target zones",
            x: 526,
            y: 512.7,
            w: 397,
            h: 272,
          },
          {
            src: "/smartnet/illustrations_sketch_speed.webp",
            alt: "Pencil sketches for the speed drill illustrations",
            x: 0,
            y: 114.7,
            w: 595.5,
            h: 485,
          },
          {
            src: "/smartnet/illustrations_sketch_zones.webp",
            alt: "Pencil sketches of the half-space and wide shooting zones",
            x: 613.5,
            y: 0,
            w: 571.5,
            h: 453,
          },
          {
            src: "/smartnet/illustrations_zones.webp",
            alt: "Illustration of a pitch with green, yellow and red distance zones",
            x: 847,
            y: 396.8,
            w: 373,
            h: 231,
          },
          {
            src: "/smartnet/illustrations_speed.webp",
            alt: "Illustration of a player sprinting to shoot at the goal",
            x: 74,
            y: 584.7,
            w: 373,
            h: 231,
          },
          { src: "/smartnet/illustrations_arrow_right.webp", x: 687.2, y: 381.6, w: 171.5, h: 167.5 },
          { src: "/smartnet/illustrations_arrow_left.webp", x: 148, y: 463.7, w: 168.5, h: 172.5 },
        ]}
      />
    </section>
  );
};

export default DesignSection;
