import React from "react";
import Collage from "../case_study/collage";
import { Paragraph, SectionTitle, SubsectionTitle } from "../case_study/typography";

const StatisticsSection = () => {
  return (
    <section className="mt-70.75">
      <div className="flex items-start justify-between">
        <div className="ml-33 mt-27.25">
          <SectionTitle>Player and game statistics</SectionTitle>
          <div className="mt-10.5 w-113.75">
            <SubsectionTitle>Statistics</SubsectionTitle>
            <Paragraph className="mt-2">
              The most important part of the application is the statistics panel. There all information about the
              progress is stored and visible for coaches and players.
            </Paragraph>
          </div>
        </div>
        {/* Runs off the right edge of the page */}
        <Collage
          className="-mr-97.25"
          width={1197}
          height={456}
          items={[
            { src: "/smartnet/statistics_sketch.webp", alt: "Notebook sketches of the statistics overview and history screens" },
            // Frosted panel over the notebook's second page (from the spine on), which isn't about this section.
            // It's masked with the sketch itself, so it frosts the page right up to its edges but not the background
            {
              x: 590.5,
              y: 5,
              w: 560,
              h: 450.5,
              className:
                "bg-[rgba(244,244,244,0.2)] backdrop-blur-[3.55px] [mask-image:url(/smartnet/statistics_sketch.webp)] [mask-position:right_top] [mask-size:74.8125rem_28.5rem] [mask-repeat:no-repeat]",
            },
          ]}
        />
      </div>

      <div className="mt-57.25 flex items-start justify-between">
        <Collage
          className="ml-27.25"
          width={683.5}
          height={1084}
          items={[
            {
              src: "/smartnet/past_activities_sketch.webp",
              alt: "Sketch of the Sniper shot results with the target map breakdown",
              x: 0,
              y: 0,
              w: 575,
              h: 617.5,
            },
            {
              src: "/smartnet/past_activities_phone_map.webp",
              alt: "Game results screen with ball speed and the target map of hits and misses",
              x: 35,
              y: 461,
              w: 431.5,
              h: 623,
            },
            {
              src: "/smartnet/past_activities_phone.webp",
              alt: "Past activities screen with the Sniper shot level, averages and ball speed",
              x: 339,
              y: 213,
              w: 344.5,
              h: 576.5,
            },
          ]}
        />
        <div className="mr-37.25 mt-53.25 w-113.75">
          <SubsectionTitle>Past Activities</SubsectionTitle>
          <Paragraph className="mt-2">
            In the ‘Past Activities’ section the coaches are most happy. They are able to see all past exercises and
            filter them through each team and even player.
          </Paragraph>
          <Paragraph className="mt-4.75">
            Each game consists of information about it’s level, the results and finally the most interactive part -
            ‘The target map’, which allows the user to see where the ball hit for each sequence.
          </Paragraph>
        </div>
      </div>

      <div className="mt-43.75 flex items-start justify-between">
        <div className="ml-51.5 mt-39 w-113.75">
          <SubsectionTitle>Player Statistics</SubsectionTitle>
          <Paragraph className="mt-2">
            This section is with the purpose of gathering all the information about each registered player. You are
            able to see their position, team and even which area they are lacking in.
          </Paragraph>
        </div>
        <Collage
          className="mr-37.25"
          width={637}
          height={678}
          items={[
            {
              src: "/smartnet/player_stats_list_phone.webp",
              alt: "Team statistics screen listing players with improving or declining trends",
              x: 0,
              y: 0,
              w: 280,
              h: 566,
            },
            {
              src: "/smartnet/player_stats_profile_phone.webp",
              alt: "Player profile screen with overview and game performance graph",
              x: 357,
              y: 112,
              w: 280,
              h: 566,
            },
          ]}
        />
      </div>
    </section>
  );
};

export default StatisticsSection;
