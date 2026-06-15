import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const FooterSection = () => {
  return (
    <footer className="relative mt-[10rem] flex flex-row items-center justify-between">
      <img src="/footer_line.png" alt="" className="absolute top-0 -left-30 " />
      <div className="flex flex-col gap-y-6">
        <div className="font-[poppins] text-[1.75rem]">
          <p className="font-bold">You think I'm a good fit?</p>
          <p className="font-light italic">
            Say {""}
            <span className="bg-(--red) text-(--textOnDark) px-1">
              {" "}
              Hi :)
            </span>{" "}
            {""}and reach out!
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
      <img
        src="/fishy_footer.png"
        alt="hand-drawn fish with graphite pencils"
      />
    </footer>
  );
};

export default FooterSection;
