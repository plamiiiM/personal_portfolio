import React from "react";
import Collage from "../case_study/collage";
import MarkedWord from "../global/marked_word_component";
import { Paragraph, SectionTitle, SubsectionTitle } from "../case_study/typography";
import { noteText } from "./sticky_note";
import SideBySide from "../case_study/side_by_side";

// A thin marker stroke under the lower half of the large statement's lines
const STATEMENT_HIGHLIGHT = { className: "-left-[0.2em] w-[calc(100%+0.3em)] top-[calc(50%-0.22em)] h-[0.58em]" };

const FeaturesSection = () => {
  return (
    <section className="mt-20 lg:mt-70">
      <SideBySide>
        <div className="lg:ml-30.75 lg:mt-3.25">
          <SectionTitle>Rest Days</SectionTitle>
          <p className="mt-6 lg:-ml-0.5 lg:mt-15.75 lg:w-192.75 font-[poppins] text-[1.5rem] lg:text-[2.25rem] font-light italic tracking-[0.03em]">
            <MarkedWord isHighlighted highlight={STATEMENT_HIGHLIGHT}>
              A horse’s progress depends on rest as
            </MarkedWord>{" "}
            <MarkedWord isHighlighted highlight={STATEMENT_HIGHLIGHT}>
              much as on training.
            </MarkedWord>
          </p>
          <p className="mt-3 lg:-ml-0.5 lg:mt-2.75 lg:w-109 font-[poppins] text-[1rem] lg:text-[1.125rem] italic tracking-[0.03em]">
            The app only showed what the horse did, never what it didn’t do.
          </p>
        </div>
        <Collage
          className="lg:mr-29"
          width={359.95}
          height={407.85}
          items={[
            {
              src: "/equine/rest_days_note.webp",
              alt: "Handwritten note on recording rest days: make them automatic, editable in case of mistakes, editable in bulk, and open to comments like injuries",
            },
          ]}
        />
      </SideBySide>

      <SideBySide isPictureFirst className="mt-14 lg:mt-15.25">
        {/* The sketch sits in a pencil corner that runs off its left and bottom edges */}
        <Collage
          className="lg:ml-21.25"
          width={701.89}
          height={524.71}
          items={[
            { src: "/equine/rest_days_line_bottom.svg", x: -0.25, y: 396.02, w: 323.5, h: 1, rotate: 3.19 },
            {
              src: "/equine/rest_days_sketch.webp",
              alt: "Sketch of the rest days screen with heart rate, rest and workout day counts and a week of days",
              x: 40.96,
              y: 14,
              w: 417.66,
              h: 379.8,
            },
            { src: "/equine/rest_days_line_left.svg", x: -110.31, y: 247.04, w: 299.54, h: 1, rotate: 93.45 },
            { src: "/equine/rest_days_phone.webp", x: 325.96, y: 0, w: 371.75, h: 524.71 },
            {
              src: "/equine/rest_days_calendar.webp",
              alt: "Rest days card showing the week, 3 workout days and 4 rest days, lifted off the horse’s status screen",
              x: 328.7,
              y: 58.01,
              w: 373.19,
              h: 347.4,
            },
          ]}
        />
        <div className="lg:mr-37.75 lg:mt-30.25 flex lg:w-99.25 flex-col gap-y-3">
          <Paragraph isPretty>
            With several trainers working with the same horse, nobody could see the full picture, so{" "}
            <MarkedWord
              isCircled
              isDrawn
              circle={{
                src: "/equine/circle_overtraining.svg",
                className: "left-1/2 top-1/2 w-[13.282em] h-[1.982em] -rotate-[1.81deg]",
              }}
            >
              overtraining was easy to
            </MarkedWord>{" "}
            miss.
          </Paragraph>
          <Paragraph isPretty>
            So, I designed an <MarkedWord isHighlighted>automated rest day</MarkedWord> view that helps riders and
            trainers <MarkedWord isHighlighted>prevent overtraining,</MarkedWord> with editing and annotations to keep
            the data accurate when the device fails.
          </Paragraph>
        </div>
      </SideBySide>

      <SideBySide className="mt-14 lg:mt-37">
        <div className="lg:ml-31 lg:mt-36.5">
          <SectionTitle>Achievements</SectionTitle>
          <Paragraph isPretty className="mt-3.75 lg:w-102.5">
            I designed a <MarkedWord isHighlighted>goal-based achievements</MarkedWord> feature that rewards riders for
            recording training and improving fitness, with wording and trainings that{" "}
            <MarkedWord isHighlighted>protect the</MarkedWord>{" "}
            <MarkedWord isHighlighted>horse from overtraining.</MarkedWord>
          </Paragraph>
        </div>
        <Collage
          className="lg:mr-64.25"
          width={401.41}
          height={588.75}
          items={[
            { src: "/equine/achievements_phone.webp", x: 105.71, y: 0, w: 256, h: 517.98 },
            { src: "/equine/achievements_card_shadow.webp", x: 49.9, y: 184.09, w: 351.51, h: 153.86 },
            { src: "/equine/sticky_yellow_small.webp", x: 0, y: 340.04, w: 240.38, h: 248.71 },
            noteText({
              text: "How can I make recording training feel rewarding instead of like a chore?",
              fontSize: "1.3936rem",
              x: 21.06,
              y: 417.32,
              w: 198.44,
              h: 116,
              rotate: 4.27,
            }),
            {
              src: "/equine/achievements_card.webp",
              alt: "Achievements card with 5 to go and 2 of 7 done, lifted off the horse’s status screen",
              x: 70.27,
              y: 208.55,
              w: 315.71,
              h: 101.35,
            },
          ]}
        />
      </SideBySide>

      <SideBySide isPictureFirst className="mt-14 lg:mt-13">
        <Collage
          className="lg:ml-41.25"
          width={514}
          height={517.98}
          items={[
            {
              src: "/equine/rider_sketch.webp",
              alt: "Pencil sketch of a rider on a trotting horse",
              x: 72,
              y: 66,
              w: 442,
              h: 386,
            },
            {
              src: "/equine/achievements_list_phone.webp",
              alt: "Achievements screen with the sad cartoon horse and trotting and heart rate exercises to improve training",
              x: 0,
              y: 0,
              w: 256,
              h: 517.98,
            },
          ]}
        />
        <Paragraph isPretty className="lg:mr-56.75 lg:mt-41 lg:w-111.5">
          A set of exercises based on the horse’s current workload and metrics are introduced. A horse that is
          deconditioned gets light, controlled exercises, such as a short trot at a steady pace, so{" "}
          <MarkedWord isHighlighted>improvement comes through play</MarkedWord> and feeds back into better training.
        </Paragraph>
      </SideBySide>

      <blockquote className="mx-auto mt-20 lg:mt-63.25 lg:w-272.75 text-center font-[poppins]">
        <p className="text-[1.375rem] lg:text-[2rem] font-semibold italic tracking-[0.03em]">
          “Riders don’t need a reminder to record. They need a reason.”
        </p>
        <p className="mx-auto mt-2 lg:mt-0.75 lg:w-180 text-[1.125rem] lg:text-[1.75rem] font-extralight italic tracking-[0.03em]">
          Achievements make every recording count toward something
        </p>
      </blockquote>

      <div className="mt-20 lg:ml-33.25 lg:mt-53 lg:w-148.75">
        <SubsectionTitle>Challenges VS Achievements</SubsectionTitle>
        <Paragraph isPretty className="mt-2">
          The word <MarkedWord isHighlighted>“Challenge”</MarkedWord> carries a{" "}
          <MarkedWord
            isCircled
            isDrawn
            circle={{
              src: "/equine/circle_competitive_pressure.svg",
              className: "left-1/2 top-1/2 w-[11.803em] h-[1.954em] -rotate-[0.7deg]",
            }}
          >
            competitive pressure
          </MarkedWord>{" "}
          that can push riders to overdo it, especially professional riders training for competitions.
        </Paragraph>
        <Paragraph isPretty className="mt-5 lg:mt-7.75">
          <MarkedWord isHighlighted>“Achievement”</MarkedWord> frames the goal as{" "}
          <MarkedWord
            isCircled
            isDrawn
            circle={{
              src: "/equine/circle_progress_not_contest.svg",
              className: "left-1/2 top-1/2 w-[13.998em] h-[1.954em] -rotate-[0.7deg]",
            }}
          >
            progress, not a contest,
          </MarkedWord>{" "}
          which nudges riders toward the horse’s actual needs. Gamification in this context calls for care, because
          the one who pays for overtraining is the horse.
        </Paragraph>
      </div>

      <SideBySide className="mt-20 lg:mt-64.25">
        <div className="lg:ml-33.25 lg:mt-37.25">
          <SectionTitle>Virtual Pet</SectionTitle>
          <Paragraph isPretty className="mt-4.25 lg:w-96">
            A small, non-interactive avatar whose mood follows the horse’s workload status - that is the Virtual Pet.
          </Paragraph>
        </div>
        <Collage
          className="lg:mr-57"
          width={466.95}
          height={502.97}
          items={[
            { src: "/equine/pet_happy.webp", alt: "Happy cartoon horse avatar", x: 0, y: 5, w: 228.41, h: 272.98 },
            { src: "/equine/pet_sad.webp", alt: "Tired cartoon horse avatar", x: 228, y: 0, w: 238.95, h: 260.41 },
            { src: "/equine/sticky_blue_small_shadow.webp", x: 75.5, y: 166.59, w: 349.25, h: 336.38 },
            { src: "/equine/sticky_blue_small.webp", x: 99, y: 169, w: 302.07, h: 313.24 },
            noteText({
              text: "How can a rider understand the horse’s condition at a glance, without reading metrics?",
              fontSize: "1.622rem",
              x: 135.79,
              y: 254.21,
              w: 230.97,
              h: 170,
              rotate: -2.47,
            }),
          ]}
        />
      </SideBySide>

      <SideBySide isPictureFirst className="mt-8 lg:mt-0.25">
        <Collage
          className="lg:ml-30.75"
          width={545.09}
          height={531.16}
          items={[
            {
              src: "/equine/pet_phone_horses.webp",
              alt: "Horses screen listing each horse with its avatar and workload score",
              x: 0,
              y: 6,
              w: 259.55,
              h: 525.16,
            },
            {
              src: "/equine/pet_phone_status.webp",
              alt: "Nirvana’s status screen with the tired avatar, a deconditioned workload, achievements and rest days",
              x: 285.54,
              y: 0,
              w: 259.55,
              h: 525.16,
            },
          ]}
        />
        <div className="lg:mr-37.75 lg:mt-34.5 lg:w-116.75">
          <Paragraph isPretty className="lg:ml-0.75 lg:w-116">
            It’s part of the gamification plan, but also makes the{" "}
            <MarkedWord isHighlighted>metrics easier to read</MarkedWord> and supports the achievements, since progress
            can show in how the avatar looks.
          </Paragraph>
          <Paragraph isPretty className="mt-5 lg:mt-8.5 lg:w-116">
            This <MarkedWord isHighlighted>cartoon avatar</MarkedWord> gives the horse{" "}
            <MarkedWord
              isCircled
              isDrawn
              circle={{
                src: "/equine/circle_a_voice.svg",
                className: "left-1/2 top-1/2 w-[4.59em] h-[1.982em] -rotate-[0.7deg]",
              }}
            >
              a voice
            </MarkedWord>{" "}
            that can be express visually, encouraging riders to record more while making metrics and achievements
            easier to read.
          </Paragraph>
        </div>
      </SideBySide>
    </section>
  );
};

export default FeaturesSection;
