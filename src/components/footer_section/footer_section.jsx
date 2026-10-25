import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import useLanguage from "../global/use_language";
import InView from "../global/in_view";

// The red marker stroke is drawn across the words once they scroll into view: a copy of them on the stroke is
// uncovered over the plain ones (.drawn-highlight), laid in the same spot so the two line up exactly
const HighlightedWords = ({ children }) => (
  <span className="inline-grid">
    <span className="col-start-1 row-start-1 px-1">{children}</span>
    <InView as="span" className="drawn-highlight col-start-1 row-start-1 px-1 bg-(--red) text-(--textOnDark)" aria-hidden="true">
      {children}
    </InView>
  </span>
);

// On phones it's a centred sign-off: the whole pencil line shrunk to the column, then the text, the links and the
// fish one under another
const FooterSection = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="relative mt-20 pb-10 lg:mt-[10rem] lg:pb-0 flex flex-col items-center gap-y-8 lg:flex-row lg:justify-between">
      <img src="/footer_line.png" alt="" className="w-full lg:absolute lg:top-0 lg:-left-30 lg:w-auto" />
      <div className="flex flex-col items-center text-center gap-y-6 lg:items-stretch lg:text-left">
        <div className="font-poppins text-[1.375rem] lg:text-[1.75rem]">
          <p className="font-bold">{t({ en: "You think I'm a good fit?", bg: "Смятате, че съм подходяща?" })}</p>
          <p className="font-light italic">
            {t({
              en: (
                <>
                  Reach out and say <HighlightedWords>Hi :)</HighlightedWords>
                </>
              ),
              bg: (
                <>
                  Пишете ми и кажете <HighlightedWords>здрасти :)</HighlightedWords>
                </>
              ),
            })}
          </p>
        </div>
        <div className="flex flex-row gap-6 text-5xl">
          <a
            href="https://www.linkedin.com/in/plamena-mincheva-302a58294/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-(--red) transition-all duration-300"
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-4xl" />
          </a>

          <a
            href="mailto:pl.mincheva28@gmail.com"
            className=" hover:text-(--red) transition-all duration-300"
          >
            <FontAwesomeIcon icon={faEnvelope} className="text-4xl" />
          </a>
        </div>
      </div>
      {/* The picture has a lot of empty paper around the fish, so on phones it's pulled in closer above and below.
          It comes up on the paper once it scrolls into view, like the elephant */}
      <InView
        as="img"
        className="fade-in delay-300 w-48 -mt-7 -mb-1 lg:my-0 lg:w-auto"
        src="/fishy_footer.png"
        alt={t({ en: "hand-drawn fish with graphite pencils", bg: "ръчно нарисувана риба с графитни моливи" })}
      />
    </footer>
  );
};

export default FooterSection;
