import React from "react";
import FiltersComponent from "./filters_component";
import Button from "../global/buttons";
import useLanguage from "../global/use_language";
import InView from "../global/in_view";

// Comes in once it scrolls into view: the collage rises, the title is stuck on over it, then the text and the button follow.
// `collageSize` ([width, height], the collage's own size) keeps its space while it loads, so the page below doesn't move
const CaseStudyDescriptionComponent = ({
  projectCollage,
  collageSize = [631, 693],
  titleOfProject,
  description,
  caseStudyLink,
  filters = [],
  isReversed = false,
  collageClassName = "lg:w-92",
}) => {
  const { t } = useLanguage();

  return (
    <InView
      className={`flex flex-col max-lg:items-start ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} justify-center gap-y-8 lg:gap-x-32 w-full`}
    >
      <img
        className={`rise mx-auto w-full max-w-80 lg:mx-0 lg:max-w-none ${collageClassName} object-contain`}
        src={projectCollage ? projectCollage : "/fallback_thumbnail_cases.png"}
        width={collageSize[0]}
        height={collageSize[1]}
        loading="lazy"
        alt={t({
          en: `Collection of visual assets and wireframes for ${titleOfProject}`,
          bg: `Колекция от визуални материали и скици на екрани за ${titleOfProject}`,
        })}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/fallback_thumbnail_cases.png";
        }}
      />
      <div className="max-lg:contents flex flex-col justify-start items-start gap-y-8 lg:gap-y-18 lg:w-126">
        <div className="max-lg:contents flex flex-col justify-start items-start gap-y-6 lg:gap-y-10">
          <h3 className="stick delay-200 max-lg:order-first font-plamenas text-[2.25rem] lg:text-[3rem] leading-8 bg-white p-3 -rotate-5">
            {titleOfProject ? titleOfProject : "Project Name"}
          </h3>
          <p className="rise delay-300 font-poppins text-left inline-block text-base leading-7 lg:text-[1.125rem] lg:leading-8.75 w-full">
            {description ? description : "Description of the project......"}
          </p>
          <FiltersComponent filters={filters} />
        </div>

        {/* Risen in a box of its own, so the button keeps its own transitions for hovering */}
        <div className="rise delay-450">
          <Button.Secondary as="a" href={caseStudyLink}>
            {t({ en: "View case study", bg: "Разгледай проекта" })}
          </Button.Secondary>
        </div>
      </div>
    </InView>
  );
};
export default CaseStudyDescriptionComponent;
