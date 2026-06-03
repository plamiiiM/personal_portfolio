import React from "react";
import ExperienceCard from "./experience_card_component";

const TimelineExperience = () => {
  return (
    <div className="min-h-screen flex justify-start">
      <div className="relative w-full max-w-2xl">
        <div className="absolute left-3 top-4 bottom-0 flex flex-col">
          <div className="h-112 w-1 rounded-full bg-blue-500"></div>
          <div className="h-20 border-l-2 border-black border-dotted"></div>
        </div>

        <div className="relative pl-12 pt-15 flex flex-col gap-y-20">

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
