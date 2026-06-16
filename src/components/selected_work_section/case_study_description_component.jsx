import React from "react";
import FiltersComponent from "./filters_component";
import Button from "../global/buttons";

const CaseStudyDescriptionComponent = ({
  projectCollage,
  titleOfProject,
  description,
  caseStudyLink,
  filters = [],
}) => {
  return (
    <div className="flex flex-row justify-around w-full ">
      <img
        className="w-[52rem] max-w-md object-contain "
        src={projectCollage ? projectCollage : "/fallback_thumbnail_cases.png"}
        alt={`Collection of visual assets and wireframes for`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/fallback_thumbnail_cases.png";
        }}
      />
      <div className="flex flex-col justify-start items-start gap-y-18 w-lg">
        <div className="flex flex-col justify-start items-start gap-y-10">
          <h3 className="font-[PlamenasHandwriting] text-[3rem] leading-8 bg-white p-3 -rotate-5">
            {titleOfProject ? titleOfProject : "Project Name"}
          </h3>
          <p className="font-[poppins] text-left inline-block text-[1rem] leading-8 w-[25rem]">
            {description ? description : "Description of the project......"}
          </p>
          <FiltersComponent filters={filters} />
        </div>

        <Button.Secondary as="a" href={caseStudyLink, "_self"}>
          VIEW CASE STUDY
        </Button.Secondary>
      </div>
    </div>
  );
};
export default CaseStudyDescriptionComponent;
