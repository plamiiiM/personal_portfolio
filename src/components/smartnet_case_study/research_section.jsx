import React from "react";
import Collage from "../case_study/collage";
import { noteShadow } from "../case_study/note_shadow";
import MarkedWord from "../global/marked_word_component";
import { Paragraph, SectionLabel, SectionTitle, SubsectionTitle } from "../case_study/typography";
import SideBySide from "../case_study/side_by_side";
import useLanguage from "../global/use_language";

const ResearchSection = () => {
  const { t } = useLanguage();

  return (
    <section className="mt-20 lg:mt-53">
      <div className="lg:ml-33">
        <SectionLabel>{t({ en: "Research", bg: "Проучване" })}</SectionLabel>
        <SectionTitle>{t({ en: "Football drills and training", bg: "Футболни упражнения и тренировки" })}</SectionTitle>
      </div>

      <SideBySide isPictureFirst className="mt-6 lg:mt-16.25">
        <Collage
          className="lg:ml-9.5"
          width={898}
          height={600.5}
          items={[
            {
              src: "/smartnet/research_goal.webp",
              alt: t({ en: "Illustrated goal with a question mark", bg: "Илюстрация на врата с въпросителен знак" }),
              x: 467,
              y: 355,
              w: 431,
              h: 245.5,
            },
            {
              group: "drills",
              src: "/smartnet/research_drills.webp",
              alt: t({
                en: "Research notes on the Accuracy Ladder and Sprint and Shoot drills, with a sticky note asking how to turn football training drills into fun exercises using gamification",
                bg: "Бележки от проучването за упражненията Accuracy Ladder и Sprint and Shoot с лепящо листче, което пита как футболните упражнения да станат забавни чрез геймификация",
              }),
              x: 0,
              y: 0,
              w: 792,
              h: 564,
            },
            // The drills' sticky note is part of the picture, without a shadow and written on in English, so the same
            // blank note is laid exactly over it with its shadow, and the question written on in either language.
            // It comes in with the drills, so the note in the picture never shows
            noteShadow({ group: "drills", x: 348, y: 258.6, w: 250.5, h: 259 }),
            { group: "drills", src: "/smartnet/sticky_note.webp", x: 348, y: 258.6, w: 250.5, h: 259 },
            {
              group: "drills",
              x: 378,
              y: 331,
              w: 180,
              h: 150,
              rotate: -6.4,
              content: (
                <p className="text-center font-plamenas text-[1.3125rem] leading-[1.3] tracking-[0.03em]">
                  {t({
                    en: "How to turn football training drills, into fun exercises using gamification?",
                    bg: "Как да превърнем футболните упражнения в забавни игри чрез геймификация?",
                  })}
                </p>
              ),
            },
          ]}
        />
        <Paragraph className="lg:mr-17.25 lg:mt-31.25 lg:w-125.25">
          {t({
            en: "To get familiar with how a training session goes, and more specifically, how a football player improves their accuracy during training, I performed research on how these sessions look like through the eyes of both the player and coach.",
            bg: "За да разбера как протича една тренировка и по-конкретно как футболистът подобрява точността си по време на нея, проучих как изглеждат тези тренировки през погледа както на играча, така и на треньора.",
          })}
        </Paragraph>
      </SideBySide>

      <SideBySide className="mt-14 lg:mt-52.5">
        <div className="lg:ml-33 lg:mt-32 lg:w-125.25">
          <SectionTitle>{t({ en: "Gameplay", bg: "Геймплей" })}</SectionTitle>
          <Paragraph className="mt-3">
            {t({
              en: "Turned traditional accuracy drills into their gamified version. Introducing different difficulty levels and modes into each game, ensured that the players will stay motivated and will go back and play some more.",
              bg: "Превърнах традиционните упражнения за точност в игри. Различните нива на трудност и режими във всяка игра поддържат мотивацията на играчите и ги карат да се връщат за още.",
            })}
          </Paragraph>
          <Collage
            className="mt-8 lg:ml-17 lg:mt-18.5"
            width={416.5}
            height={432}
            items={[
              {
                src: "/smartnet/gameplay_phone.webp",
                alt: t({ en: "SmartNet exercises screen", bg: "Екранът с упражнения на SmartNet" }),
                x: 0,
                y: 0,
                w: 241,
                h: 432,
              },
              {
                src: "/smartnet/gameplay_levels.webp",
                alt: t({
                  en: "Easy, medium and hard levels with large, medium and small targets",
                  bg: "Лесно, средно и трудно ниво с големи, средни и малки цели",
                }),
                x: 230,
                y: 78,
                w: 186.5,
                h: 304,
              },
            ]}
          />
        </div>
        <Collage
          className="lg:mr-18.5"
          width={722.8}
          height={787.1}
          items={[
            {
              src: "/smartnet/gameplay_accuracy_ladder.webp",
              alt: t({ en: "User flow of the Accuracy ladder game", bg: "Потребителският поток на играта Accuracy ladder" }),
              x: 0,
              y: 0,
              w: 577.5,
              h: 457.5,
            },
            {
              src: "/smartnet/gameplay_sprint_shoot.webp",
              alt: t({ en: "User flow of the Sprint and shoot game", bg: "Потребителският поток на играта Sprint and shoot" }),
              x: 132.3,
              y: 330.6,
              w: 590.5,
              h: 456.5,
            },
          ]}
        />
      </SideBySide>

      <SideBySide className="mt-14 lg:mt-55.5">
        <div className="lg:ml-33 lg:mt-17.75 lg:w-125.25">
          <SectionTitle>{t({ en: "Data Feedback", bg: "Обратна връзка от данните" })}</SectionTitle>
          <Paragraph className="mt-3">
            {t({
              en: (
                <>
                  By researching coach workflows, I <MarkedWord isHighlighted isDrawn>identified their needs</MarkedWord> and
                  designed a UI that displays only the stats that matter to them. This gives coaches{" "}
                  <MarkedWord isHighlighted isDrawn>immediate, clear insights</MarkedWord> into{" "}
                  <MarkedWord isHighlighted isDrawn>player performance</MarkedWord> without unnecessary distraction.
                </>
              ),
              bg: (
                <>
                  Като проучих как работят треньорите, <MarkedWord isHighlighted isDrawn>открих нуждите им</MarkedWord> и
                  проектирах интерфейс, който показва само статистиките, важни за тях. Така треньорите получават{" "}
                  <MarkedWord isHighlighted isDrawn>моментална и ясна представа</MarkedWord> за{" "}
                  <MarkedWord isHighlighted isDrawn>представянето на играчите</MarkedWord> без излишни разсейвания.
                </>
              ),
            })}
          </Paragraph>
        </div>
        <Collage
          className="lg:mr-48"
          width={590}
          height={623}
          items={[
            {
              src: "/smartnet/data_feedback_diagram.webp",
              alt: t({
                en: "Diagram of the user profile stats: overview, games played, most hit area and ability growth",
                bg: "Схема на статистиките в профила на играча: обзор, изиграни игри, най-често уцелвана зона и развитие на уменията",
              }),
              x: 0,
              y: 0,
              w: 590,
              h: 453,
            },
            noteShadow({ note: "question", x: 285, y: 366, w: 248.5, h: 257 }),
            { note: "question", src: "/smartnet/sticky_note.webp", x: 285, y: 366, w: 248.5, h: 257 },
            {
              note: "question",
              x: 317.7,
              y: 452.9,
              w: 180.3,
              h: 90,
              rotate: -5.15,
              content: (
                <p className="text-center font-plamenas text-[1.4375rem] leading-[1.3] tracking-[0.03em]">
                  {t({
                    en: "What are coaches looking for when assessing players?",
                    bg: "Какво търсят треньорите, когато оценяват играчите?",
                  })}
                </p>
              ),
            },
          ]}
        />
      </SideBySide>

      <SideBySide isPictureFirst className="mt-14 lg:mt-16.25">
        <Collage
          className="lg:ml-33.25"
          width={724.2}
          height={798.9}
          items={[
            {
              src: "/smartnet/player_ui_feedback.webp",
              alt: t({
                en: "Data feedback notes with a spider chart and ability growth graph",
                bg: "Бележки за обратната връзка от данните с паяжинна диаграма и графика на развитието на уменията",
              }),
              x: 0,
              y: 0,
              w: 417.5,
              h: 476,
            },
            {
              src: "/smartnet/player_ui_sketch.webp",
              alt: t({ en: "Hand-drawn sketch of the statistics screen", bg: "Ръчно нарисувана скица на екрана със статистика" }),
              x: 359.2,
              y: 86.4,
              w: 365,
              h: 479.5,
            },
            {
              src: "/smartnet/player_ui_phone.webp",
              alt: t({
                en: "Player overview screen with game performance graph",
                bg: "Екранът с обзор на играча и графика на представянето в игрите",
              }),
              x: 209.8,
              y: 384.4,
              w: 205,
              h: 414.5,
            },
          ]}
        />
        <div className="lg:mr-32.25 lg:mt-51.25 lg:w-104.5">
          <Paragraph>
            {t({
              en: (
                <>
                  To maintain player motivation and avoid toxic friction within teams, I designed{" "}
                  <MarkedWord isHighlighted isDrawn>role-based dashboards</MarkedWord>.
                </>
              ),
              bg: (
                <>
                  За да запазя мотивацията на играчите и да избегна токсичното напрежение в отборите, проектирах{" "}
                  <MarkedWord isHighlighted isDrawn>табла според ролята</MarkedWord>.
                </>
              ),
            })}
          </Paragraph>
          <SubsectionTitle className="mt-8 lg:mt-12.5">{t({ en: "Player UIs", bg: "Интерфейс за играчите" })}</SubsectionTitle>
          <Paragraph className="mt-3">
            {t({
              en: "Personal milestones and skill metrics are focused exclusively for each player",
              bg: "Личните постижения и показателите за уменията са насочени изцяло към всеки отделен играч",
            })}
          </Paragraph>
        </div>
      </SideBySide>

      <SideBySide className="mt-14 lg:mt-34">
        <div className="lg:ml-50 lg:mt-56.25 lg:w-104.5">
          <SubsectionTitle>{t({ en: "Coach UIs", bg: "Интерфейс за треньорите" })}</SubsectionTitle>
          <Paragraph className="mt-1">
            {t({
              en: "Able to see side by side player comparative analytics, providing the coaches with the deep insights needed to optimize training.",
              bg: "Треньорите могат да сравняват играчите един до друг, което им дава задълбочената представа, нужна за по-добри тренировки.",
            })}
          </Paragraph>
        </div>
        <Collage
          className="lg:mr-11.25"
          width={810}
          height={607}
          items={[
            {
              src: "/smartnet/coach_ui_comparison.webp",
              alt: t({
                en: "Notebook sketches of the coach ranking and player comparison screens",
                bg: "Скици в тетрадка на екраните с класирането за треньора и сравнението на играчите",
              }),
            },
          ]}
        />
      </SideBySide>
    </section>
  );
};

export default ResearchSection;
