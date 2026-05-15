import React from "react";

const UXStrategySection = () => {
  return (
    <>
      <section className="font-[poppins] flex flex-col items-start gap-y-5 w-2xl  mb-10">
        <img
          src="/src/assets/ux_strategy_text.PNG"
          alt="UX Strategy"
          className="w-90 -rotate-40"
        />
        <p className="text-lg leading-9  ">
          An{" "}
          <span className="bg-(--brown) text-(--textOnDark) px-1 py-1">
            ambitious
          </span>{" "}
          junior{" "}
          <span className="bg-(--brown) text-(--textOnDark) px-1 py-1">
            UX/UI designer{" "}
          </span>
          that will help you{" "}
          <span className="bg-(--brown) text-(--textOnDark) px-1 py-1">
            design better
          </span>{" "}
          for your business.{" "}
          <span className="bg-(--brown) text-(--textOnDark) px-1 py-1">
            Keen eye on details
          </span>{" "}
          and ready to explore the unknown.
        </p>
      </section>
      <img src="/src/assets/strategy_graph.png" alt="" className="place-self-end-safe realtive mt-20"/>
    </>
  );
};

export default UXStrategySection;
