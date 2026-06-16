import React from "react";
import ExperienceCard from "./experience_card_component";

const TimelineExperience = () => {
  return (
    <div className="flex justify-start h-[80vh] w-full">
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
            recommendation="Plamena did her internship with us (Spinnov) as an UI/UX designer and front-end software developer. She worked very structured and with great discipline, open to feedback, good tempo in her work and not afraid to take on different design challenges. She worked well in our project team and functioned as a full team member despite being an intern."
            showRecommendation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineExperience;
