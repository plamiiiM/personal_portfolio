import React from "react";
import Collage from "../case_study/collage";
import MarkedWord from "../global/marked_word_component";
import { Paragraph, SectionLabel, SectionTitle } from "../case_study/typography";
import { noteText } from "./sticky_note";
import SideBySide from "../case_study/side_by_side";
import useLanguage from "../global/use_language";

const OverviewSection = () => {
  const { t } = useLanguage();
  // Bulgarian words run longer, so the "How might we" questions are written a little smaller to fit their notes
  const noteSize = t({ en: "1.875rem", bg: "1.625rem" });

  return (
    <>
      <section className="mt-20 lg:mt-68.75">
        <div className="lg:ml-34">
          <SectionLabel>{t({ en: "Project Overview", bg: "Преглед на проекта" })}</SectionLabel>
          <SectionTitle>{t({ en: "What is Equine Integration?", bg: "Какво е Equine Integration?" })}</SectionTitle>
        </div>

        <SideBySide isPictureFirst className="mt-6 lg:mt-17">
          <Collage
            className="lg:ml-27"
            width={598}
            height={476.61}
            items={[
              {
                src: "/equine/overview_activity.webp",
                alt: t({
                  en: "Activity screen with the overview, per gait and recovery stats, next to a pencil sketch of a galloping horse and the workload card",
                  bg: "Екранът на тренировка с обзора, статистиките по алюри и възстановяването, до скица с молив на галопиращ кон и картата с натоварването",
                }),
              },
            ]}
          />
          <Paragraph isPretty className="lg:mr-27 lg:mt-46 lg:w-139.5">
            {t({
              en: (
                <>
                  Equine Integration <MarkedWord isHighlighted isDrawn>helps riders and trainers track</MarkedWord> their
                  horse’s training. A wearable belt records each session and the{" "}
                  <MarkedWord isHighlighted isDrawn>app brings the data together in one place</MarkedWord>, so riders can follow
                  progress and prepare for competition.
                </>
              ),
              bg: (
                <>
                  Equine Integration <MarkedWord isHighlighted isDrawn>помага на ездачи и треньори да следят</MarkedWord>{" "}
                  тренировките на коня си. Колан със сензори записва всяка тренировка, а{" "}
                  <MarkedWord isHighlighted isDrawn>приложението събира данните на едно място</MarkedWord>, така че ездачите да
                  следят напредъка и да се подготвят за състезания.
                </>
              ),
            })}
          </Paragraph>
        </SideBySide>
      </section>

      <section className="mt-20 lg:mt-48.5">
        <SideBySide>
          <div className="lg:ml-36.5 lg:mt-15.75 lg:w-119">
            <SectionTitle>{t({ en: "The challenge", bg: "Предизвикателството" })}</SectionTitle>
            <Paragraph isPretty className="mt-4.5">
              {t({
                en: (
                  <>
                    Riders had <MarkedWord isHighlighted isDrawn>data but no understanding:</MarkedWord> the analytics page was
                    a wall of numbers they{" "}
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
                    <MarkedWord isHighlighted isDrawn>forgotten session</MarkedWord> meant{" "}
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
                  </>
                ),
                bg: (
                  <>
                    Ездачите имаха <MarkedWord isHighlighted isDrawn>данни, но не и разбиране:</MarkedWord> страницата с
                    анализите беше стена от числа, които{" "}
                    <MarkedWord
                      isCircled
                      isDrawn
                      circle={{
                        src: "/equine/circle_couldnt_interpret.svg",
                        className: "left-1/2 top-1/2 w-[110%] h-[1.771em] -rotate-[3.38deg]",
                      }}
                    >
                      не можеха да разчетат.
                    </MarkedWord>{" "}
                    Още по-лошо, проследяването зависеше от това ездачите да не забравят да записват всяка тренировка, а
                    всяка <MarkedWord isHighlighted isDrawn>пропусната тренировка</MarkedWord> означаваше{" "}
                    <MarkedWord
                      isCircled
                      isDrawn
                      circle={{
                        src: "/equine/circle_lost_data.svg",
                        className: "left-1/2 top-1/2 w-[115%] h-[1.428em] -rotate-[4.35deg]",
                      }}
                    >
                      загубени данни
                    </MarkedWord>{" "}
                    преди следващото състезание.
                  </>
                ),
              })}
            </Paragraph>
          </div>
          <Collage
            className="lg:mr-51.5"
            width={463.63}
            height={336.83}
            items={[
              {
                src: "/equine/challenge_chart.webp",
                alt: t({ en: "Sketch of a dashed card with line and bar charts", bg: "Скица на карта с пунктирана рамка, линейна и стълбовидна диаграма" }),
                x: 0,
                y: 66,
                w: 195.96,
                h: 251.17,
              },
              {
                src: "/equine/challenge_phone.webp",
                alt: t({ en: "Sketch of a phone with a “Training upcoming” notification and a bell", bg: "Скица на телефон с известие „Training upcoming“ и звънче" }),
                x: 105,
                y: 0,
                w: 358.63,
                h: 336.83,
              },
            ]}
          />
        </SideBySide>

        <div className="mt-10 lg:ml-36.5 lg:mt-41 lg:w-223.75">
          <Paragraph isPretty>
            {t({
              en: (
                <>
                  My challenge as UX/UI designer was to solve both problems at once:{" "}
                  <MarkedWord isHighlighted isDrawn>translate raw metrics</MarkedWord>{" "}
                  <MarkedWord isHighlighted isDrawn>into insights</MarkedWord> riders could read at a glance, and{" "}
                  <MarkedWord isHighlighted isDrawn>build a habit</MarkedWord> around wearing the device, using gamified
                  features and a refined user flow.
                </>
              ),
              bg: (
                <>
                  Моето предизвикателство като UX/UI дизайнер беше да реша двата проблема наведнъж: да{" "}
                  <MarkedWord isHighlighted isDrawn>превърна суровите показатели</MarkedWord>{" "}
                  <MarkedWord isHighlighted isDrawn>в изводи,</MarkedWord> които ездачите разбират с един поглед, и да{" "}
                  <MarkedWord isHighlighted isDrawn>изградя навик</MarkedWord> за носене на устройството чрез функционалности с
                  елементи на игра и изчистен потребителски поток.
                </>
              ),
            })}
          </Paragraph>
          <Paragraph isPretty className="mt-6.75">
            {t({
              en: "All of it had to fit inside the app’s established design system, so the new experience would feel like part of the product rather than an add-on.",
              bg: "Всичко трябваше да се впише в утвърдената дизайн система на приложението, така че новото изживяване да се усеща като част от продукта, а не като добавка.",
            })}
          </Paragraph>
        </div>

        {/* "How might we" questions on sticky notes, each over its own soft shadow, stuck on one by one. On phones they go one under another */}
        <Collage
          className="mt-10 lg:ml-22.5 lg:mt-15.75"
          width={1253.75}
          height={656.32}
          phone={{
            width: 400,
            height: 1214,
            shifts: [[10, -54], [10, -54], [10, -54], [-435, 144], [-435, 144], [-435, 144], [-864, 821], [-864, 821], [-864, 821]],
          }}
          items={[
            { note: "blue", src: "/equine/sticky_blue_shadow.webp", x: 0, y: 95.13, w: 344.68, h: 349.92 },
            { note: "blue", src: "/equine/sticky_blue.webp", x: 5.79, y: 54.01, w: 374.64, h: 386.77 },
            noteText({
              note: "blue",
              fontSize: noteSize,
              text: t({
                en: "How might we translate complex horse data into a simple narrative story about today's ride?",
                bg: "Как бихме могли да превърнем сложните данни за коня в простичка история за днешната езда?",
              }),
              x: 63.45,
              y: 143.62,
              w: 250.64,
              h: 251.95,
              rotate: 7.2,
            }),
            { note: "yellow", src: "/equine/sticky_yellow_shadow.webp", x: 443.32, y: 286.71, w: 347.71, h: 369.61 },
            { note: "yellow", src: "/equine/sticky_yellow.webp", x: 466.96, y: 266.9, w: 360.23, h: 375.37 },
            noteText({
              note: "yellow",
              fontSize: noteSize,
              text: t({
                en: "How might we design a training history that instantly shows a rider their progress over time at a single glance?",
                bg: "Как бихме могли да създадем история на тренировките, която с един поглед показва на ездача напредъка му?",
              }),
              x: 492.34,
              y: 374.23,
              w: 308.31,
              h: 195,
              rotate: -1.62,
            }),
            // Sized and set off like the blue and yellow notes' shadows, so it shows under the note's lower left edge
            { note: "pink", src: "/equine/sticky_pink_shadow.webp", x: 867.8, y: 33, w: 350, h: 373.7 },
            { note: "pink", src: "/equine/sticky_pink.webp", x: 873.74, y: 0, w: 380.01, h: 393.01 },
            noteText({
              note: "pink",
              fontSize: noteSize,
              text: t({
                en: "How might we frame tracking as the horse's way of \"speaking\" so riders never want to miss a session?",
                bg: "Как бихме могли да превърнем проследяването в „гласа“ на коня, за да не пропуска ездачът тренировка?",
              }),
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
