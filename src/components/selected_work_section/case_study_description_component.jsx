import React from "react";
import FiltersComponent from "./filters_component";
import Button from "../global/buttons";
import useLanguage from "../global/use_language";

const CaseStudyDescriptionComponent = ({
  projectCollage,
  titleOfProject,
  description,
  caseStudyLink,
  filters = [],
  isReversed = false,
  collageClassName = "lg:w-92",
}) => {
  const { t } = useLanguage();

  return (
    <div
      className={`flex flex-col max-lg:items-start ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} justify-center gap-y-8 lg:gap-x-32 w-full`}
    >
      <img
        className={`mx-auto w-full max-w-80 lg:mx-0 lg:max-w-none ${collageClassName} object-contain`}
        src={projectCollage ? projectCollage : "/fallback_thumbnail_cases.png"}
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
          <h3 className="max-lg:order-first font-plamenas text-[2.25rem] lg:text-[3rem] leading-8 bg-white p-3 -rotate-5">
            {titleOfProject ? titleOfProject : "Project Name"}
          </h3>
          <p className="font-poppins text-left inline-block text-base leading-7 lg:text-[1.125rem] lg:leading-8.75 w-full">
            {description ? description : "Description of the project......"}
          </p>
          <FiltersComponent filters={filters} />
        </div>

        <Button.Secondary as="a" href={caseStudyLink}>
          {t({ en: "View case study", bg: "Разгледай проекта" })}
        </Button.Secondary>
      </div>
    </div>
  );
};
export default CaseStudyDescriptionComponent;
