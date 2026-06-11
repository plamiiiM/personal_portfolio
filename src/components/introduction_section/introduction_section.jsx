import React from "react";
import Button from "../global/buttons";

const IntroductionSection = () => {
  return (
    <section className="flex flex-col justify-start items-start gap-y-14 font-[poppins] w-2xl letter-spacing-wide tracking-wide mb-10">
      <div className="flex flex-col gap-y-14">
        <h2 className="text-4xl ">
          Plamena is a <b>curious designer</b>
        </h2>
        <p className="text-lg leading-9 letter-spacing-wide flex flex-col gap-y-5">
          <p>
            Currently obtaining a Bachelor in ICT and Media Design at Fontys
            UAS.
          </p>
          <p>
            An eager junior designer with lots of on-hands practice in
            different real-life projects. Working with real businesses, during my
            studies I've helped several companies in the Eindhoven region better
            their designs and improve quality.
          </p>
        </p>
      </div>
      <div className="flex flex-row gap-6 text-base font-bold">
        <Button.Primary
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/plamena-mincheva-302a58294/",
            )
          }
        >
          LINKEDIN
        </Button.Primary>

        <Button.Secondary
          onClick={() =>
            window.open("/Plamena Mincheva- UI-UX designer and developer.pdf")
          }
        >
          RESUME
        </Button.Secondary>
      </div>
    </section>
  );
};

export default IntroductionSection;
