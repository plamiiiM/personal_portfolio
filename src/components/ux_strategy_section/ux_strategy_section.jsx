import React from "react";

const UXStrategySection = () => {
  return (
    <section className="relative">
      <img
        src="/cup_with_coffee.png"
        alt="Cup with coffee"
        className="absolute  -top-20 -right-30 place-self-end mr-50 -rotate-26 w-[20rem]"
      />
      {/* Whole section */}
      <section className="font-[poppins] flex flex-col items-start gap-y-5 w-2xl">
        <img
          src="/ux_strategy_text.png"
          alt="UX Strategy"
          className="w-[20rem] -rotate-40"
        />
        <p className="text-[1.125rem] leading-9  ">
          An{" "}
          <span className="bg-(--brown) text-(--textOnDark) px-0.5">
            ambitious
          </span>{" "}
          junior{" "}
          <span className="bg-(--brown) text-(--textOnDark) px-0.5">
            UX/UI designer{" "}
          </span>
          that will help you{" "}
          <span className="bg-(--brown) text-(--textOnDark) px-0.5">
            design better
          </span>{" "}
          for your business.{" "}
          <span className="bg-(--brown) text-(--textOnDark) px-0.5">
            Keen eye on details
          </span>{" "}
          and ready to explore the unknown.
        </p>
      </section>
      <img
        src="/strategy_graph.png"
        alt=""
        className="w-[50rem] place-self-center-safe relative mt-20"
      />
    </section>
  );
};

export default UXStrategySection;
