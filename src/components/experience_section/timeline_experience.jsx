import React from "react";
import ExperienceCard from "./experience_card_component";

const TimelineExperience = () => {
  return (
    <div className="flex justify-start h-screen w-full">
      <div className="absolute w-full">
        <div className="absolute left-4.5 top-4 bottom-0 flex flex-col">
          <div className="h-full w-1 rounded-full bg-black"></div>
        </div>

        <div className="pl-12 pt-15 flex flex-col gap-y-20 overflow-y-auto h-[70vh] no-scrollbar">
          <ExperienceCard
            year="2026"
            role="ICT & Media Design"
            company="Fontys University of Applied Sciences"
            date="Sept 2023 - Jan 2027"
            sentence="Currently obtaining a Bachelor's degree in"
          />
          <ExperienceCard
            date="Sept 25- Jan 26"
            year="2025"
            sentence="Completed an internship as a"
            role="UX/ UI Designer"
            company="Spinnov"
            nameEmployer="Chris Heger"
            positionEmployer="COO"
            imageOfEmployer="/chris_photo.jpeg"
            recommendation="Plamena is....."
            showRecommendation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineExperience;
