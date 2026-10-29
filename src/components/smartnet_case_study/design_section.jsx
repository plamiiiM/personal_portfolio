import React from "react";
import Collage from "../case_study/collage";
import {
  Paragraph,
  SectionLabel,
  SectionTitle,
  SubsectionTitle,
} from "../case_study/typography";
import SideBySide from "../case_study/side_by_side";
import useLanguage from "../global/use_language";

const DesignSection = () => {
  const { t } = useLanguage();

  return (
    <section className="mt-20 lg:mt-11">
      <SideBySide>
        <div className="lg:ml-33 lg:mt-13.5 lg:w-126.5">
          <SectionLabel>
            {t({ en: "Design and approach", bg: "Дизайн и подход" })}
          </SectionLabel>
          <SectionTitle className="mt-3.5">
            {t({ en: "Mood board & aesthetics", bg: "Мууд борд и естетика" })}
          </SectionTitle>
          <Paragraph className="mt-3">
            {t({
              en: "For the brand identity of the app, I followed clients wishes of brand representation and adapted them to a new visual system of custom colors, fonts, illustrations and UI.",
              bg: "За визуалната идентичност на приложението следвах желанията на клиента за представянето на бранда и ги пренесох в нова визуална система от собствени цветове, шрифтове, илюстрации и интерфейс.",
            })}
          </Paragraph>
        </div>
        <Collage
          className="lg:mr-5"
          width={804}
          height={536}
          items={[
            {
              src: "/smartnet/moodboard.webp",
              alt: t({
                en: "Mood board with football imagery, the orange type scale in Anton and Montserrat, icons and player cards",
                bg: "Мууд борд с футболни изображения, оранжевата типографска скала с Anton и Montserrat, икони и карти на играчи",
              }),
            },
          ]}
        />
      </SideBySide>
      {/* Laid over the bottom corner of the mood board */}
      <Collage
        className="mt-6 lg:ml-31.5 lg:-mt-44.5"
        width={637.5}
        height={434.5}
        items={[
          {
            src: "/smartnet/design_system.webp",
            alt: t({
              en: "Design system: Anton and Montserrat type, buttons, cards and the orange, light grey and dark grey palette",
              bg: "Дизайн система: шрифтовете Anton и Montserrat, бутони, карти и палитрата от оранжево, светлосиво и тъмносиво",
            }),
          },
        ]}
      />

      <SideBySide className="mt-14 lg:mt-54.5">
        <div className="lg:ml-34 lg:mt-24.75 lg:w-126.5">
          <SectionTitle>
            {t({ en: "Gamified drills", bg: "Упражнения като игри" })}
          </SectionTitle>
          <Paragraph className="mt-3">
            {t({
              en: "I crafted 6 different games targeting the skills needed for a footballer to succeed. Focusing on training accuracy through progressive difficulty, speed and precision.",
              bg: "Създадох 6 различни игри, насочени към уменията, които са нужни на футболиста, за да успее. Фокусът е върху точността чрез постепенно нарастваща трудност, бързина и прецизност.",
            })}
          </Paragraph>
        </div>
        <Collage
          className="lg:mr-18.5"
          width={708}
          height={531}
          items={[
            {
              src: "/smartnet/gamified_drills_ideation.webp",
              alt: t({
                en: "Notebook sketches of the NET logo and ideas for shooting, number and close goal games",
                bg: "Скици в тетрадка на логото NET и идеи за игри със стрелба, с числа и с близка врата",
              }),
            },
          ]}
        />
      </SideBySide>
      <Collage
        className="mt-6 lg:ml-34 lg:-mt-43"
        width={741}
        height={556}
        items={[
          {
            src: "/smartnet/gamified_drills_ideation_2.webp",
            alt: t({
              en: "Notebook notes on reaction, timed, challenge and ghost keeper drills",
              bg: "Бележки в тетрадка за упражнения за реакция, на време, с предизвикателства и с въображаем вратар",
            }),
          },
        ]}
      />

      <div className="relative z-10 mt-14 lg:ml-205 lg:mt-50.75 lg:w-126.5">
        <SubsectionTitle>
          {t({ en: "Level Mastery", bg: "Овладяване на нивата" })}
        </SubsectionTitle>
        <Paragraph>
          {t({
            en: "Gamification was a crucial key to the drills. By adding difficulty levels, revealing instant scores and providing feedback, I keep player motivation and ensure user retention.",
            bg: "Геймификацията беше ключът към упражненията. С нивата на трудност, моменталните резултати и обратната връзка поддържам мотивацията на играчите и ги задържам в приложението.",
          })}
        </Paragraph>
      </div>
      {/* Runs off the left edge of the page. On phones the second sketch goes under the first */}
      <Collage
        className="mt-6 lg:-ml-60.75 lg:-mt-21"
        width={1407}
        height={631}
        phone={{
          width: 828,
          height: 1083,
          shifts: [
            [0, 0],
            [-701, 452],
          ],
        }}
        items={[
          {
            src: "/smartnet/level_mastery_stats.webp",
            alt: t({
              en: "Notebook sketches of the statistics priorities and the training setup screens",
              bg: "Скици в тетрадка на приоритетите в статистиката и екраните за настройка на тренировката",
            }),
            x: 0,
            y: 0,
            w: 828,
            h: 621,
          },
          {
            src: "/smartnet/level_mastery_levels.webp",
            alt: t({
              en: "Notebook sketches of the pre-set and custom level options",
              bg: "Скици в тетрадка на готовите и персонализираните нива",
            }),
            x: 823,
            y: 193,
            w: 584,
            h: 438,
          },
        ]}
      />
      {/* On phones the two screens close up */}
      <Collage
        className="mt-6 lg:ml-82.5 lg:mt-11.75"
        width={809.5}
        height={478}
        phone={{
          width: 513,
          height: 478,
          shifts: [
            [0, 0],
            [-296.5, 0],
          ],
        }}
        items={[
          {
            src: "/smartnet/level_mastery_phone_training.webp",
            alt: t({
              en: "Choose training screen with All areas and Goal corners",
              bg: "Екранът за избор на тренировка с All areas и Goal corners",
            }),
            x: 0,
            y: 0,
            w: 236.5,
            h: 478,
          },
          {
            src: "/smartnet/level_mastery_phone_levels.webp",
            alt: t({
              en: "Levels screen with easy, medium and hard levels",
              bg: "Екранът с нивата: лесно, средно и трудно",
            }),
            x: 573,
            y: 0,
            w: 236.5,
            h: 478,
          },
        ]}
      />

      <SideBySide className="mt-14 lg:mt-10.75">
        <div className="lg:ml-33 lg:mt-59.75 lg:w-126.5">
          <SubsectionTitle>
            {t({ en: "During the game", bg: "По време на игра" })}
          </SubsectionTitle>
          <Paragraph>
            {t({
              en: "Inside the game, I provided clear visuals and modern approach to what coaches and players are seeing, showing user need’s prioritization. The SmartNet design works by allowing the coach to see in real time which sector of the goal is the aim, the score board and time.",
              bg: "В самата игра осигурих ясна визуализация и модерен подход към това, което виждат треньорите и играчите, подредено според нуждите им. Дизайнът на SmartNet позволява на треньора да вижда в реално време към кой сектор на вратата се цели, резултата и времето.",
            })}
          </Paragraph>
        </div>
        {/* Its transparent left edge overlaps the text column by 20px */}
        <Collage
          className="lg:-ml-5 lg:mr-8"
          width={880}
          height={721.5}
          items={[
            {
              src: "/smartnet/during_game.webp",
              alt: t({
                en: "In-game Sniper shot screen showing a goal, the score and the shot power, over the notebook sketches it came from",
                bg: "Екранът на играта Sniper shot с вратата, резултата и силата на удара, върху скиците в тетрадката, от които е тръгнал",
              }),
            },
          ]}
        />
      </SideBySide>

      <SideBySide isPictureFirst className="mt-14 lg:mt-32">
        <Collage
          className="lg:ml-44.25"
          width={559}
          height={582}
          items={[
            {
              src: "/smartnet/user_flow.webp",
              alt: t({
                en: "Hand-drawn user flow from start, team and player selection through training choice and play to the game end and results",
                bg: "Ръчно нарисуван потребителски поток от началото и избора на отбор и играч, през избора на тренировка и играта, до края на играта и резултатите",
              }),
            },
          ]}
        />
        <div className="lg:mr-59.5 lg:mt-43 lg:w-113.75">
          <SubsectionTitle>
            {t({ en: "User Flow", bg: "Потребителски поток" })}
          </SubsectionTitle>
          <Paragraph>
            {t({
              en: "The whole game is coordinated in a simple user flow, giving the freedom and ease for both users to start and track field progression.",
              bg: "Цялата игра е подредена в прост потребителски поток, който дава на играча и треньора свободата и лекотата да започнат и да следят напредъка на терена.",
            })}
          </Paragraph>
        </div>
      </SideBySide>

      <SectionTitle className="mt-14 lg:ml-45 lg:mt-65.5">
        {t({ en: "Illustrations", bg: "Илюстрации" })}
      </SectionTitle>
      <Collage
        className="mt-6 lg:ml-30.25 lg:mt-10.5"
        width={1220}
        height={815.7}
        items={[
          {
            src: "/smartnet/illustrations_goal.webp",
            alt: t({
              en: "Illustration of a ball flying into a goal with lit-up target zones",
              bg: "Илюстрация на топка, която влита във врата със светнали целеви зони",
            }),
            x: 526,
            y: 512.7,
            w: 397,
            h: 272,
          },
          {
            src: "/smartnet/illustrations_sketch_speed.webp",
            alt: t({
              en: "Pencil sketches for the speed drill illustrations",
              bg: "Скици с молив за илюстрациите на упражнението за бързина",
            }),
            x: 0,
            y: 114.7,
            w: 595.5,
            h: 485,
          },
          {
            src: "/smartnet/illustrations_sketch_zones.webp",
            alt: t({
              en: "Pencil sketches of the half-space and wide shooting zones",
              bg: "Скици с молив на зоните за стрелба в полупространствата и по крилата",
            }),
            x: 613.5,
            y: 0,
            w: 571.5,
            h: 453,
          },
          {
            src: "/smartnet/illustrations_zones.webp",
            alt: t({
              en: "Illustration of a pitch with green, yellow and red distance zones",
              bg: "Илюстрация на терен със зелена, жълта и червена зона според разстоянието",
            }),
            x: 847,
            y: 396.8,
            w: 373,
            h: 231,
          },
          {
            src: "/smartnet/illustrations_speed.webp",
            alt: t({
              en: "Illustration of a player sprinting to shoot at the goal",
              bg: "Илюстрация на играч, който спринтира, за да стреля към вратата",
            }),
            x: 74,
            y: 584.7,
            w: 373,
            h: 231,
          },
          {
            src: "/smartnet/illustrations_arrow_right.webp",
            x: 687.2,
            y: 381.6,
            w: 171.5,
            h: 167.5,
          },
          {
            src: "/smartnet/illustrations_arrow_left.webp",
            x: 148,
            y: 463.7,
            w: 168.5,
            h: 172.5,
          },
        ]}
      />
    </section>
  );
};

export default DesignSection;
