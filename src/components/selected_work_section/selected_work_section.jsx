import React from "react";
import Button from "../global/buttons";
import CaseStudyDescriptionComponent from "./case_study_description_component";
import MarkedWord from "../global/marked_word_component";
import useLanguage from "../global/use_language";
import HandLetteredHeading from "../global/hand_lettered_heading";
import InView from "../global/in_view";

const SelectedWorkSection = () => {
  const { t, to } = useLanguage();

  return (
    <section className="lg:mb-40">
      <InView as="section" className="flex flex-row items-center justify-between">
        <HandLetteredHeading
          id="work"
          src="/selected_work_text.png"
          alt="Selected Work"
          bgText={
            <>
              Избрани
              <br />
              <span className="ml-[0.8em]">проекти</span>
            </>
          }
          imageClassName="w-37 lg:w-62"
          className="-rotate-4 mt-10 lg:mt-40"
        />
        {/* The drawing's ear ends in a cut edge on the right (94.6% - 97.8% across), at the far right of the page,
            so it's faded out before the cut when there's paper beside it (--side-room from ScaleToFit), not at the edge of the screen */}
        <img
          src="/elephant.png"
          alt={t({ en: "Elephant", bg: "Слон" })}
          className="relative w-36 lg:w-[20rem] max-w-md lg:-right-4"
          style={{ maskImage: "linear-gradient(to right, black calc(99.5% - 19.5% * var(--side-room, 1)), transparent calc(99.5% - 4.5% * var(--side-room, 1)))" }}
        />
      </InView>
      <main className="flex flex-col justify-start items-start gap-y-20 lg:gap-y-70 mt-12 lg:mt-30 lg:mr-28">
        <CaseStudyDescriptionComponent
          projectCollage="/smartnet_collage_bigger.png"
          titleOfProject="SmartNet App"
          description={t({
            en: (
              <>
                I designed the end-to-end{" "}
                <MarkedWord isHighlighted isDrawn>user experience</MarkedWord> for
                SmartNet, <MarkedWord isCircled isDrawn>bridging the gap</MarkedWord>{" "}
                between physical football training and digital performance
                tracking. Through{" "}
                <MarkedWord isHighlighted isDrawn>user research</MarkedWord> and{" "}
                <MarkedWord isHighlighted isDrawn>gamification design</MarkedWord>, I
                translated complex hardware data into interactive games and
                actionable player profiles.
              </>
            ),
            bg: (
              <>
                Проектирах цялостното{" "}
                <MarkedWord isHighlighted isDrawn>потребителско изживяване</MarkedWord>{" "}
                на SmartNet,{" "}
                <MarkedWord isCircled isDrawn>изграждайки мост</MarkedWord> между
                футболните тренировки на терена и дигиталното проследяване на
                представянето. Чрез{" "}
                <MarkedWord isHighlighted isDrawn>потребителско проучване</MarkedWord> и{" "}
                <MarkedWord isHighlighted isDrawn>геймификация</MarkedWord> превърнах
                сложните данни от устройството в интерактивни игри и полезни
                профили на играчите.
              </>
            ),
          })}
          // filters={[
          //   "UX/UI Design",
          //   "Gamification",
          //   "Prototyping",
          //   "Design System",
          //   "Journey Mapping",
          //   "User Personas",
          // ]}
          caseStudyLink={to("/smartnet")}
        />
        <CaseStudyDescriptionComponent
          projectCollage="/equine_integration_collage_3.png"
          titleOfProject="Equine Integration"
          isReversed
          collageClassName="lg:w-auto lg:h-122"
          // description="To solve a drop in user engagement, I designed and developed five new data-driven features for the Equine Integration app in 2.5 months. I researched equestrian habits to introduce interactive training summaries, progress comparisons, and rewards that encourage device usage. The final delivery upgraded the user experience seamlessly with fully implemented Flutter code."
          description={t({
            en: (
              <>
                I <MarkedWord isHighlighted isDrawn>redesigned and programmed</MarkedWord>{" "}
                a major UX upgrade for Equine Integration, turning{" "}
                <MarkedWord isHighlighted isDrawn>
                  complex horse tracking metrics{" "}
                </MarkedWord>{" "}
                into an engaging, gamified training platform. Through{" "}
                <MarkedWord isCircled isDrawn>
                  data analysis and user interviews
                </MarkedWord>
                , I created five approved features, including training insights,
                performance comparisons, and habit-building achievements.{" "}
              </>
            ),
            bg: (
              <>
                <MarkedWord isHighlighted isDrawn>Преработих и програмирах</MarkedWord>{" "}
                мащабно UX подобрение на Equine Integration, като превърнах{" "}
                <MarkedWord isHighlighted isDrawn>
                  сложните показатели от проследяването на коне
                </MarkedWord>{" "}
                в увлекателна платформа за тренировки с елементи на игра. Чрез{" "}
                <MarkedWord isCircled isDrawn>анализ на данни и интервюта</MarkedWord>{" "}
                създадох пет одобрени функционалности, сред които обобщения на
                тренировките, сравнения на представянето и постижения, които
                изграждат навик.
              </>
            ),
          })}
          // filters={[
          //   "Redesign",
          //   "UX Strategy",
          //   "Prototyping",
          //   "Flutter Development",
          //   "Data-Driven Design",
          // ]}
          caseStudyLink={to("/equine-integration")}
        />
      </main>
    </section>
  );
};

export default SelectedWorkSection;
