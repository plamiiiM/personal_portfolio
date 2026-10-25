import React from "react";
import Button from "../global/buttons";
import MarkedWord from "../global/marked_word_component";
import useLanguage from "../global/use_language";
import CV from "../global/cv";

const IntroductionSection = () => {
  const { t } = useLanguage();

  return (
    <section className="flex flex-col justify-start items-start gap-y-8 lg:gap-y-14 font-poppins lg:w-2xl tracking-wide mb-10">
      <div className="flex flex-col gap-y-6 lg:gap-y-14">
        <h2 className="text-[1.75rem] lg:text-4xl">
          {t({
            en: (
              <>
                Plamena is a <strong>curious designer</strong>
              </>
            ),
            bg: (
              <>
                Пламена е <strong>любопитна дизайнерка</strong>
              </>
            ),
          })}
        </h2>
        <div className="text-base leading-8 lg:text-lg lg:leading-9 tracking-wide flex flex-col gap-y-5">
          {t({
            en: (
              <>
                <p>
                  An eager <MarkedWord isHighlighted>junior designer</MarkedWord>{" "}
                  with lots of{" "}
                  <MarkedWord isHighlighted>hands-on practice</MarkedWord> in
                  different real-life projects. Working with real businesses,
                  during my studies I've helped several companies in the
                  Eindhoven region better their designs and improve quality.
                </p>
                <p>
                  Currently obtaining a Bachelor in{" "}
                  <MarkedWord isHighlighted>
                    ICT & Media Design at Fontys UAS.
                  </MarkedWord>
                </p>
              </>
            ),
            bg: (
              <>
                <p>
                  Амбициозна{" "}
                  <MarkedWord isHighlighted>junior дизайнерка</MarkedWord> с
                  много <MarkedWord isHighlighted>практически опит</MarkedWord>{" "}
                  в различни реални проекти. По време на следването си работих
                  с истински бизнеси и помогнах на няколко компании в региона на
                  Айндховен да подобрят дизайна и качеството на продуктите си.
                </p>
                <p>
                  В момента следвам бакалавърска програма по{" "}
                  <MarkedWord isHighlighted>
                    ICT & Media Design във Fontys UAS.
                  </MarkedWord>
                </p>
              </>
            ),
          })}
        </div>
      </div>
      <div className="flex flex-row gap-6 text-base font-bold">
        <Button.Primary
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/plamena-mincheva-302a58294/",
            )
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          LINKEDIN
        </Button.Primary>

        <Button.Secondary
          onClick={() => window.open(t(CV))}
          target="_blank"
          rel="noopener noreferrer"
        >
          CV
        </Button.Secondary>
      </div>
    </section>
  );
};

export default IntroductionSection;
