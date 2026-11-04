import React from "react";
import Button from "../global/buttons";
import MarkedWord from "../global/marked_word_component";
import useLanguage from "../global/use_language";
import CV from "../global/cv";
import InView from "../global/in_view";
import TypewriterHeading from "./typewriter_heading";

// Comes in once it scrolls into view: the heading starts typing, the paragraphs (then their highlights) and the buttons rise
const IntroductionSection = () => {
  const { t } = useLanguage();

  return (
    <InView
      as="section"
      className="flex flex-col justify-start items-start gap-y-8 lg:gap-y-14 font-poppins lg:w-2xl tracking-wide mb-10"
    >
      <div className="flex flex-col gap-y-6 lg:gap-y-14">
        {/* On desktop each phrase stays on one line, as in the design, running past the paragraphs' width if it has to */}
        <TypewriterHeading className="text-[1.75rem] lg:text-4xl lg:whitespace-nowrap" />
        <div className="text-base leading-8 lg:text-lg lg:leading-9 tracking-wide flex flex-col gap-y-5">
          {t({
            en: (
              <>
                <p className="rise delay-150">
                  In the world of{" "}
                  <MarkedWord isHighlighted isDrawn>
                    UX design for 3+ years
                  </MarkedWord>
                  , I have passionately worked in various real-life projects. I
                  have helped several companies in the Eindhoven region improve
                  their designs and quality.
                </p>
                <p className="rise delay-250">
                  Currently obtaining a Bachelor in{" "}
                  <MarkedWord isHighlighted isDrawn>
                    ICT & Media Design at Fontys UAS.
                  </MarkedWord>
                </p>
              </>
            ),
            bg: (
              <>
                <p className="rise delay-150">
                  В областта на
                  <MarkedWord isHighlighted isDrawn>
                    UX дизайна от 3+ години
                  </MarkedWord>{" "}
                  амбициозно съм работила по различни проекти в реални условия.
                  Помогнала съм на няколко компании в региона на Айндховен да
                  подобрят своите дизайни и качество.
                </p>
                <p className="rise delay-250">
                  В момента следвам бакалавърска програма по{" "}
                  <MarkedWord isHighlighted isDrawn>
                    ICT & Media Design във Fontys UAS.
                  </MarkedWord>
                </p>
              </>
            ),
          })}
        </div>
      </div>
      <div className="rise delay-400 flex flex-row gap-6 text-base font-bold">
        <Button.Primary
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/plamena-mincheva-302a58294/",
            )
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </Button.Primary>

        <Button.Secondary
          onClick={() => window.open(t(CV))}
          target="_blank"
          rel="noopener noreferrer"
        >
          CV
        </Button.Secondary>
      </div>
    </InView>
  );
};

export default IntroductionSection;
