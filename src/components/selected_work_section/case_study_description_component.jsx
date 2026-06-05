import React from "react";
import FiltersComponent from "./filters_component";
import Button from "../global/buttons";

// This component will have the title, descripton, filters imported from the component and button?

const CaseStudyDescriptionComponent = ({
  projectCollage,
  titleOfProject,
  description,
  caseStudyLink,
  filters = [],
}) => {
  return (
    // Wrapper for image and description
    <div className="flex flex-row items-center justify-start gap-x-45">
      <img
        className="w-full max-w-md"
        src={projectCollage ? `${projectCollage}` : "?"}
        alt="Collection of wireframes of the smartnet app and their logo"
      />
      {/* // Wrapper for whole description */}
      <div className="flex flex-col justify-start items-start gap-y-18 w-lg">
        {/* Title and description with filters */}
        <div className="flex flex-col justify-start items-start gap-y-10">
          <h3 className="font-[PlamenasHandwriting] text-[3rem] leading-9 bg-white p-3 -rotate-5">
            {titleOfProject ? `${titleOfProject}` : "Title of Project"}
          </h3>
          <p className="font-[poppins] text-left inline-block text-[1rem] leading-8 w-[25rem]">
            {description
              ? `${description}`
              : "Description of the project......"}
          </p>
          <FiltersComponent filters={filters} />
        </div>

        {/* Button */}
        <Button.Secondary onClick={() => window.open(caseStudyLink, "_blank")}>
          View Case Study
        </Button.Secondary>
      </div>
    </div>
  );
};
export default CaseStudyDescriptionComponent;
