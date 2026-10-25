import React from "react";
import Collage from "../case_study/collage";
import { Paragraph, SectionTitle, SubsectionTitle } from "../case_study/typography";
import SideBySide from "../case_study/side_by_side";
import useLanguage from "../global/use_language";

const StatisticsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="mt-20 lg:mt-70.75">
      <SideBySide>
        <div className="lg:ml-33 lg:mt-27.25">
          <SectionTitle>{t({ en: "Player and game statistics", bg: "Статистика за играчите и игрите" })}</SectionTitle>
          <div className="mt-6 lg:mt-10.5 lg:w-113.75">
            <SubsectionTitle>{t({ en: "Statistics", bg: "Статистика" })}</SubsectionTitle>
            <Paragraph className="mt-2">
              {t({
                en: "The most important part of the application is the statistics panel. There all information about the progress is stored and visible for coaches and players.",
                bg: "Най-важната част от приложението е панелът със статистика. Там се пази цялата информация за напредъка и тя е видима за треньорите и играчите.",
              })}
            </Paragraph>
          </div>
        </div>
        {/* Runs off the right edge of the page. Phones only show the notebook's first page, the one about this section */}
        <Collage
          className="lg:-mr-97.25"
          width={1197}
          height={456}
          phone={{ width: 590.5, height: 456, shifts: [[0, 0], null] }}
          items={[
            {
              src: "/smartnet/statistics_sketch.webp",
              alt: t({
                en: "Notebook sketches of the statistics overview and history screens",
                bg: "Скици в тетрадка на екраните с обзора на статистиката и историята",
              }),
            },
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
      </SideBySide>

      <SideBySide isPictureFirst className="mt-14 lg:mt-57.25">
        <Collage
          className="lg:ml-27.25"
          width={683.5}
          height={1084}
          items={[
            {
              src: "/smartnet/past_activities_sketch.webp",
              alt: t({
                en: "Sketch of the Sniper shot results with the target map breakdown",
                bg: "Скица на резултатите от Sniper shot с разбивка по картата на попаденията",
              }),
              x: 0,
              y: 0,
              w: 575,
              h: 617.5,
            },
            {
              src: "/smartnet/past_activities_phone_map.webp",
              alt: t({
                en: "Game results screen with ball speed and the target map of hits and misses",
                bg: "Екранът с резултатите от играта със скоростта на топката и картата на попаденията и пропуските",
              }),
              x: 35,
              y: 461,
              w: 431.5,
              h: 623,
            },
            {
              src: "/smartnet/past_activities_phone.webp",
              alt: t({
                en: "Past activities screen with the Sniper shot level, averages and ball speed",
                bg: "Екранът с минали активности с нивото на Sniper shot, средните стойности и скоростта на топката",
              }),
              x: 339,
              y: 213,
              w: 344.5,
              h: 576.5,
            },
          ]}
        />
        <div className="lg:mr-37.25 lg:mt-53.25 lg:w-113.75">
          <SubsectionTitle>{t({ en: "Past Activities", bg: "Минали активности" })}</SubsectionTitle>
          <Paragraph className="mt-2">
            {t({
              en: "In the ‘Past Activities’ section the coaches are most happy. They are able to see all past exercises and filter them through each team and even player.",
              bg: "Секцията „Минали активности“ е любимата на треньорите. В нея виждат всички минали упражнения и могат да ги филтрират по отбор и дори по играч.",
            })}
          </Paragraph>
          <Paragraph className="mt-4.75">
            {t({
              en: "Each game consists of information about it’s level, the results and finally the most interactive part - ‘The target map’, which allows the user to see where the ball hit for each sequence.",
              bg: "Всяка игра съдържа информация за нивото си, резултатите и накрая най-интерактивната част – „Картата на попаденията“, която показва къде е попаднала топката при всяка серия.",
            })}
          </Paragraph>
        </div>
      </SideBySide>

      <SideBySide className="mt-14 lg:mt-43.75">
        <div className="lg:ml-51.5 lg:mt-39 lg:w-113.75">
          <SubsectionTitle>{t({ en: "Player Statistics", bg: "Статистика на играчите" })}</SubsectionTitle>
          <Paragraph className="mt-2">
            {t({
              en: "This section is with the purpose of gathering all the information about each registered player. You are able to see their position, team and even which area they are lacking in.",
              bg: "Тази секция събира цялата информация за всеки регистриран играч. В нея се виждат позицията му, отборът и дори в коя област изостава.",
            })}
          </Paragraph>
        </div>
        <Collage
          className="lg:mr-37.25"
          width={637}
          height={678}
          items={[
            {
              src: "/smartnet/player_stats_list_phone.webp",
              alt: t({
                en: "Team statistics screen listing players with improving or declining trends",
                bg: "Екранът със статистика на отбора, който показва кои играчи се подобряват и кои изостават",
              }),
              x: 0,
              y: 0,
              w: 280,
              h: 566,
            },
            {
              src: "/smartnet/player_stats_profile_phone.webp",
              alt: t({
                en: "Player profile screen with overview and game performance graph",
                bg: "Екранът с профила на играча с обзор и графика на представянето в игрите",
              }),
              x: 357,
              y: 112,
              w: 280,
              h: 566,
            },
          ]}
        />
      </SideBySide>
    </section>
  );
};

export default StatisticsSection;
