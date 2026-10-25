import React from "react";
import Hypothesis from "../case_study/hypothesis";
import useLanguage from "../global/use_language";

// The design has it 37.5px right of centre
const HypothesisSection = () => {
  const { t } = useLanguage();

  return (
    <Hypothesis className="mt-20">
      {t({
        en: "“If accuracy drills become leveled games, with difficulty tuned by shot metrics, players will want to replay them and unlock the next level, and every game will produce data that shows how their accuracy improves.”",
        bg: "„Ако упражненията за точност станат игри с нива, чиято трудност се настройва според показателите на ударите, играчите ще искат да ги играят отново и да отключат следващото ниво, а всяка игра ще дава данни, които показват как се подобрява точността им.“",
      })}
    </Hypothesis>
  );
};

export default HypothesisSection;
