import React from "react";
import Collage from "../case_study/collage";
import MarkedWord from "../global/marked_word_component";
import { Paragraph, SectionLabel, SectionTitle } from "../case_study/typography";
import SideBySide from "../case_study/side_by_side";
import useLanguage from "../global/use_language";

// Both are sized to the circled words, so they fit the words of either language
const SHOT_PLACEMENT_CIRCLE = { src: "/smartnet/circle_shot_placement.svg", className: "left-1/2 top-1/2 w-[105%] h-[2.2em]" };
const TRACK_ACCURACY_CIRCLE = {
  src: "/smartnet/circle_track_accuracy.svg",
  className: "left-[calc(50%+0.38em)] top-[calc(50%-0.1em)] w-[115%] h-[1.72em]",
};

const OverviewSection = () => {
  const { t } = useLanguage();

  return (
    <>
      <section className="mt-20 lg:mt-44.75">
        <div className="lg:ml-33">
          <SectionLabel>{t({ en: "Project Overview", bg: "Преглед на проекта" })}</SectionLabel>
          <SectionTitle>{t({ en: "What is SmartNet?", bg: "Какво е SmartNet?" })}</SectionTitle>
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
                alt: t({
                  en: "SmartNet device standing in front of a goal fitted with the SmartNet net",
                  bg: "Устройството SmartNet пред врата с мрежата SmartNet",
                }),
                x: 0,
                y: 0,
                w: 619.5,
                h: 385.5,
              },
            ]}
          />
          <Paragraph className="lg:mr-32.25 lg:mt-19.75 lg:w-125.75">
            {t({
              en: (
                <>
                  SmartNet is an <MarkedWord isHighlighted>advanced football training system</MarkedWord> that turns
                  every shot into real, measurable data, providing accurate{" "}
                  <MarkedWord isCircled isDrawn circle={SHOT_PLACEMENT_CIRCLE}>
                    shot-placement analytics
                  </MarkedWord>{" "}
                  that give players and coaches the clarity needed to improve finishing with precision.
                </>
              ),
              bg: (
                <>
                  SmartNet е <MarkedWord isHighlighted>модерна система за футболни тренировки</MarkedWord>, която
                  превръща всеки удар в реални, измерими данни. Тя дава точен{" "}
                  <MarkedWord isCircled isDrawn circle={SHOT_PLACEMENT_CIRCLE}>
                    анализ на попаденията
                  </MarkedWord>{" "}
                  и така осигурява на играчите и треньорите яснотата, нужна за прецизно подобряване на завършващия
                  удар.
                </>
              ),
            })}
          </Paragraph>
        </SideBySide>
      </section>

      <SideBySide as="section" className="mt-20 lg:mt-23.25">
        <div className="lg:ml-33 lg:mt-43 lg:w-121.75">
          <SectionTitle>{t({ en: "The challenge", bg: "Предизвикателството" })}</SectionTitle>
          {/* <Paragraph isPretty className="mt-3 w-119">
            Translate real-world football drills and device tracking metrics into gamified exercises that help players
            and coaches track their accuracy progress and long-term improvement.
          </Paragraph> */}
          <Paragraph isPretty>
            {t({
              en: (
                <>
                  Bring{" "}
                  <MarkedWord isHighlighted isThin>
                    real pitch drills
                  </MarkedWord>{" "}
                  into the app and make progress worth coming back for. The app had to help players and coaches{" "}
                  <MarkedWord isCircled isDrawn circle={TRACK_ACCURACY_CIRCLE}>
                    track accuracy
                  </MarkedWord>{" "}
                  and see{" "}
                  <MarkedWord isHighlighted isThin>
                    improvement over time
                  </MarkedWord>
                  , all gathered in one place.
                </>
              ),
              bg: (
                <>
                  Да пренесем{" "}
                  <MarkedWord isHighlighted isThin>
                    реалните упражнения от терена
                  </MarkedWord>{" "}
                  в приложението и да превърнем напредъка в повод за връщане. Приложението трябваше да помага на
                  играчите и треньорите да{" "}
                  <MarkedWord isCircled isDrawn circle={TRACK_ACCURACY_CIRCLE}>
                    следят точността
                  </MarkedWord>{" "}
                  и да виждат{" "}
                  <MarkedWord isHighlighted isThin>
                    подобрението с времето
                  </MarkedWord>{" "}
                  – всичко събрано на едно място.
                </>
              ),
            })}
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
              alt: t({
                en: "Pitch diagram of the accuracy drill zones: wide zones, half-spaces and the central zone",
                bg: "Схема на терена със зоните на упражнението за точност: крилата, полупространствата и централната зона",
              }),
              x: 12.1,
              y: 7.2,
              w: 734.5,
              h: 541.5,
            },
            {
              src: "/smartnet/challenge_phone.webp",
              alt: t({
                en: "SmartNet exercises screen with the Sniper shot and Sprint and shoot drills",
                bg: "Екранът с упражнения на SmartNet с игрите Sniper shot и Sprint and shoot",
              }),
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
