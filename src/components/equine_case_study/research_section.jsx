import React from "react";
import Collage from "../case_study/collage";
import Hypothesis, { Autocompleted } from "../case_study/hypothesis";
import InView from "../global/in_view";
import MarkedWord from "../global/marked_word_component";
import { LargeTitle, Paragraph, SectionLabel, SectionTitle } from "../case_study/typography";
import AttachmentDrivers from "./attachment_drivers";
import SideBySide from "../case_study/side_by_side";
import useLanguage from "../global/use_language";

const ResearchSection = () => {
  const { t } = useLanguage();

  return (
    <section className="mt-20 lg:mt-60.75">
      <div className="lg:ml-32.75">
        <SectionLabel>{t({ en: "Research", bg: "Проучване" })}</SectionLabel>
        <SectionTitle>{t({ en: "Shedding light on data", bg: "Светлина върху данните" })}</SectionTitle>
        {/* The marker stroke runs past the sentence on both sides (where it fits on one line). It eases in like a
            paragraph, and the stroke sweeps across after it (.drawn-highlight) */}
        <InView
          as="p"
          isWhole
          className="soft-in relative mt-4 lg:w-174.5 font-poppins text-[1rem] lg:text-[1.125rem] italic tracking-[0.03em]"
        >
          <img
            src="/highlight.svg"
            alt=""
            className={`drawn-highlight absolute hidden lg:block -left-5 top-0.75 h-6 max-w-none ${t({ en: "w-147", bg: "w-160" })}`}
          />
          <span className="relative">
            {t({
              en: (
                <>
                  The problem wasn’t missing data, it was{" "}
                  <MarkedWord
                    isCircled
                    isDrawn
                    circle={{
                      src: "/equine/circle_missing_context.svg",
                      className: "left-1/2 top-1/2 w-[9.728em] h-[2.195em] -rotate-[0.62deg]",
                    }}
                  >
                    missing context.
                  </MarkedWord>
                </>
              ),
              bg: (
                <>
                  Проблемът не беше в данните, а в{" "}
                  <MarkedWord
                    isCircled
                    isDrawn
                    circle={{
                      src: "/equine/circle_missing_context.svg",
                      className: "left-1/2 top-1/2 w-[112%] h-[2.195em] -rotate-[0.62deg]",
                    }}
                  >
                    липсата на контекст.
                  </MarkedWord>
                </>
              ),
            })}
          </span>
        </InView>
      </div>

      <SideBySide isPictureFirst className="mt-8 lg:mt-24.25">
        <Collage
          className="lg:ml-24.75"
          width={589.53}
          height={430.36}
          items={[
            // Pencil frame around the sketch
            { x: 16.13, y: 25.76, w: 557, h: 362, rotate: -5.25, className: "border-2 border-[#262020]" },
            {
              src: "/equine/data_sketch.webp",
              alt: t({
                en: "Sketch of a desk lamp shining on a table of horse data and a red bar chart",
                bg: "Скица на настолна лампа, която осветява таблица с данни за коня и червена стълбовидна диаграма",
              }),
              x: 42.03,
              y: 14.04,
              w: 527.19,
              h: 416.32,
            },
          ]}
        />
        <Paragraph isPretty className="lg:mr-36.5 lg:mt-26.25 lg:w-119.5">
          {t({
            en: (
              <>
                <MarkedWord isHighlighted isDrawn>Understanding</MarkedWord> the data became the foundation for the whole
                redesign. Working through the client’s <MarkedWord isHighlighted isDrawn>raw dataset</MarkedWord> and learning
                the equestrian world gave me a clear picture of how the whole app connects. It became the foundation for
                every design decision.
              </>
            ),
            bg: (
              <>
                <MarkedWord isHighlighted isDrawn>Разбирането</MarkedWord> на данните стана основата на целия редизайн. Работата
                със <MarkedWord isHighlighted isDrawn>суровите данни</MarkedWord> на клиента и опознаването на конния спорт ми
                дадоха ясна представа как се свързва цялото приложение. Това стана основата на всяко дизайн решение.
              </>
            ),
          })}
        </Paragraph>
      </SideBySide>

      <SideBySide className="mt-14 lg:mt-61">
        <div className="lg:ml-32.75 lg:mt-13.25">
          <SectionTitle>{t({ en: "Building an emotional connection", bg: "Изграждане на емоционална връзка" })}</SectionTitle>
          <Paragraph isPretty className="mt-5 lg:w-128.5">
            {t({
              en: (
                <>
                  Reminders are easy to ignore, so I looked into <MarkedWord isHighlighted isDrawn>gamification</MarkedWord> to
                  keep riders tracking. That led to the idea of{" "}
                  <MarkedWord
                    isCircled
                    isDrawn
                    circle={{
                      src: "/equine/circle_virtual_pet.svg",
                      className: "left-1/2 top-1/2 w-[6.443em] h-[1.716em] -rotate-[1.22deg]",
                    }}
                  >
                    a virtual pet,
                  </MarkedWord>{" "}
                  and the question of whether it could create an <MarkedWord isHighlighted isDrawn>emotional bond</MarkedWord>{" "}
                  strong enough to build a habit.
                </>
              ),
              bg: (
                <>
                  Напомнянията лесно се пренебрегват, затова потърсих решение в{" "}
                  <MarkedWord isHighlighted isDrawn>геймификацията</MarkedWord>, за да продължат ездачите да записват
                  тренировките си. Така се роди идеята за{" "}
                  <MarkedWord
                    isCircled
                    isDrawn
                    circle={{
                      src: "/equine/circle_virtual_pet.svg",
                      className: "left-1/2 top-1/2 w-[110%] h-[1.716em] -rotate-[1.22deg]",
                    }}
                  >
                    виртуален любимец
                  </MarkedWord>{" "}
                  и въпросът дали той може да създаде <MarkedWord isHighlighted isDrawn>емоционална връзка</MarkedWord>,
                  достатъчно силна, за да изгради навик.
                </>
              ),
            })}
          </Paragraph>
        </div>
        <Collage
          className="lg:mr-50.5"
          width={292}
          height={319}
          items={[
            {
              src: "/equine/pet_device_sketch.webp",
              alt: t({
                en: "Sketch of the tracking device with a smiling cartoon horse on its screen",
                bg: "Скица на проследяващото устройство с усмихнато анимационно конче на екрана",
              }),
            },
          ]}
        />
      </SideBySide>

      <LargeTitle className="mx-auto mt-16 lg:mt-47.5 lg:w-216.25 text-center">
        {t({ en: "Research points to three drivers of attachment", bg: "Проучванията сочат три двигателя на привързаността" })}
      </LargeTitle>
      <AttachmentDrivers className="mt-8 lg:mt-22.25" />

      {/* Starts under the chalk board, so its first curve rises out of it */}
      <Hypothesis className="mt-16 lg:-mt-12.25">
        {t({
          en: (
            <>
              “If riders get a readable session summary and a virtual pet that reflects their horse’s condition,{" "}
              <Autocompleted>
                they’ll rely less on the chat and build a tracking habit driven by emotional bond, not reminders.
              </Autocompleted>
              ”
            </>
          ),
          bg: (
            <>
              „Ако ездачите получат ясно обобщение на тренировката и виртуален любимец, който отразява състоянието на
              коня им,{" "}
              <Autocompleted>
                ще разчитат по-малко на чата и ще изградят навик за проследяване, воден от емоционална връзка, а не от
                напомняния.
              </Autocompleted>
              “
            </>
          ),
        })}
      </Hypothesis>
    </section>
  );
};

export default ResearchSection;
