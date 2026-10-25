import React from "react";
import Collage from "../case_study/collage";
import MarkedWord from "../global/marked_word_component";
import { LargeTitle, Paragraph, SectionLabel, SectionTitle, SubsectionTitle } from "../case_study/typography";
import DesignQuestions from "./design_questions";
import PuzzleConnection from "./puzzle_connection";
import SideBySide from "../case_study/side_by_side";
import useLanguage from "../global/use_language";

const DesignSection = () => {
  const { t } = useLanguage();

  return (
    <section className="mt-20 lg:mt-14">
      <div className="lg:ml-30.75">
        <SectionLabel>{t({ en: "Design and approach", bg: "Дизайн и подход" })}</SectionLabel>
        <SectionTitle>{t({ en: "Comparison Analytics", bg: "Сравнителен анализ" })}</SectionTitle>
      </div>

      <SideBySide isPictureFirst className="mt-6 lg:mt-22">
        <Collage
          className="lg:ml-21"
          width={657}
          height={471}
          items={[
            {
              src: "/equine/mind_map.webp",
              alt: t({
                en: "Handwritten mind map linking heart rate, average heart rate, intensity, ACWR, duration, walk, trot, speed and training type with red lines and question marks",
                bg: "Ръкописна мисловна карта, която свързва пулс, среден пулс, интензивност, ACWR, продължителност, ходом, тръс, скорост и вид тренировка с червени линии и въпросителни",
              }),
            },
          ]}
        />
        <div className="lg:mr-32.25 lg:mt-42 lg:w-130">
          <Paragraph isPretty>
            {t({
              en: (
                <>
                  This feature started with a single comment. In one of the client interviews, she mentioned in passing
                  that riders <MarkedWord isHighlighted isDrawn>could benefit from comparing</MarkedWord> their{" "}
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
                </>
              ),
              bg: (
                <>
                  Тази функционалност започна с един-единствен коментар. В едно от интервютата клиентката спомена между
                  другото, че за ездачите <MarkedWord isHighlighted isDrawn>би било полезно да сравняват</MarkedWord>{" "}
                  <MarkedWord
                    isCircled
                    isDrawn
                    circle={{
                      src: "/equine/circle_past_activities.svg",
                      className: "left-1/2 top-1/2 w-[110%] h-[1.716em] -rotate-[1.22deg]",
                    }}
                  >
                    предишните си тренировки.
                  </MarkedWord>
                </>
              ),
            })}
          </Paragraph>
          <Paragraph isPretty className="mt-6 lg:mt-9">
            {t({
              en: "It wasn’t a request, but it connected with what I was seeing in the data, so I decided to explore it.",
              bg: "Не беше изрично искане, но съвпадаше с това, което виждах в данните, затова реших да го проуча.",
            })}
          </Paragraph>
        </div>
      </SideBySide>

      <SideBySide className="mt-14 lg:mt-22">
        <div className="lg:ml-30.75 lg:mt-35.75">
          <SubsectionTitle>{t({ en: "Finding what connects", bg: "Откриване на връзките" })}</SubsectionTitle>
          <Paragraph isPretty className="mt-3 lg:w-98.5">
            {t({
              en: "The dataset was scattered and complicated, so I went through each metric to understand what it measures and how it relates to the others.",
              bg: "Данните бяха разпокъсани и сложни, затова прегледах всеки показател, за да разбера какво измерва и как е свързан с останалите.",
            })}
          </Paragraph>
        </div>
        <Collage
          className="lg:mr-84.5"
          width={311}
          height={439}
          items={[
            {
              src: "/equine/funnel.webp",
              alt: t({
                en: "Sketch of a red thread running through a funnel and coming out as puzzle pieces",
                bg: "Скица на червена нишка, която минава през фуния и излиза като парчета от пъзел",
              }),
            },
          ]}
        />
      </SideBySide>

      <LargeTitle className="mx-auto mt-16 lg:mt-21.25 w-fit max-lg:text-center">
        {t({ en: "Four questions guided the design", bg: "Четири въпроса насочиха дизайна" })}
      </LargeTitle>
      <DesignQuestions />

      <PuzzleConnection className="mt-10 lg:ml-52.5" />

      <SideBySide className="mt-14 lg:mt-18.75">
        <div className="lg:ml-32.5 lg:mt-18">
          <SubsectionTitle>{t({ en: "The solution", bg: "Решението" })}</SubsectionTitle>
          <Paragraph isPretty className="mt-2 lg:w-98">
            {t({
              en: (
                <>
                  Riders <MarkedWord isHighlighted isDrawn>choose a date range</MarkedWord> and a{" "}
                  <MarkedWord isHighlighted isDrawn>training type,</MarkedWord> and the app lists every activity that matches.
                </>
              ),
              bg: (
                <>
                  Ездачите <MarkedWord isHighlighted isDrawn>избират период</MarkedWord> и{" "}
                  <MarkedWord isHighlighted isDrawn>вид тренировка,</MarkedWord> а приложението показва всички тренировки, които
                  отговарят на избора.
                </>
              ),
            })}
          </Paragraph>
        </div>
        <Collage
          className="lg:mr-42.75"
          width={559.37}
          height={526.19}
          items={[
            {
              src: "/equine/solution_phone_activities.webp",
              alt: t({ en: "Nirvana’s activities screen with the Compare Activities button", bg: "Екранът с тренировките на Nirvana с бутона Compare Activities" }),
              x: 0,
              y: 1.01,
              w: 259.55,
              h: 525.18,
            },
            {
              src: "/equine/solution_phone_compare.webp",
              alt: t({
                en: "Compare screen with a date range, the training type and two activities selected",
                bg: "Екранът за сравнение с избран период, вид тренировка и две избрани тренировки",
              }),
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
              alt: t({
                en: "Comparison screen with the two dates side by side, filtered per gait",
                bg: "Екранът за сравнение с двете дати една до друга, филтрирани по алюр",
              }),
              x: 0,
              y: 0,
              w: 258.73,
              h: 523.51,
            },
            {
              src: "/equine/solution_phone_variation.webp",
              alt: t({
                en: "Comparison screen with the duration per gait chart and the recovery heart rate of both sessions",
                bg: "Екранът за сравнение с диаграмата на продължителността по алюри и пулса при възстановяване за двете тренировки",
              }),
              x: 299,
              y: 0,
              w: 258.73,
              h: 523.51,
            },
          ]}
        />
        <Paragraph isPretty className="lg:mr-52 lg:mt-75 lg:w-98">
          {t({
            en: (
              <>
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
              </>
            ),
            bg: (
              <>
                Избират две тренировки,{" "}
                <MarkedWord
                  isCircled
                  isDrawn
                  circle={{
                    src: "/equine/circle_tap_compare.svg",
                    className: "left-1/2 top-1/2 w-[115%] h-[1.716em] -rotate-[1.22deg]",
                  }}
                >
                  натискат Compare
                </MarkedWord>{" "}
                и получават страница, изградена около това, което данните наистина могат да покажат.
              </>
            ),
          })}
        </Paragraph>
      </SideBySide>
    </section>
  );
};

export default DesignSection;
