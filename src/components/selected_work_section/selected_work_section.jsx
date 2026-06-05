import React from "react";
import Button from "../global/buttons";
import CaseStudyDescriptionComponent from "./case_study_description_component";

const SelectedWorkSection = () => {
  return (
    <>
      <section className="flex flex-row items-center justify-between">
        <img
          src="/selected_work_text.png"
          alt="Selected Work"
          className="w-[20rem] max-w-md -rotate-40 mt-40"
        />
        <img
          src="/elephant.png"
          alt="Elephant"
          className="relative w-[20rem] max-w-md -right-4"
        />
      </section>
      <main className="flex flex-col justify-start items-center gap-y-80 mt-30 mr-28">
        <CaseStudyDescriptionComponent
          projectCollage="/smartnet_collage_bigger.png"
          titleOfProject="SmartNet App"
          description="The SmartNet app is a project I worked on during my internship at Spinnov. Responsible for the UX/UI design of the app, I created wireframes and prototypes to enhance the user experience."
          filters={[
            "Journey Mapping",
            "User Personas",
            "Wireframing",
            "Prototyping",
            "User Testing",
            "UI Design",
          ]}
          caseStudyLink="https://example.com/smartnet-case-study"
        />
        <CaseStudyDescriptionComponent
          projectCollage="/equine_integration_collage.png"
          titleOfProject="Equine Integration"
          description="This project focused on integrating equine-themed elements into a digital platform, enhancing user engagement and satisfaction."
          filters={[
            "Journey Mapping",
            "User Personas",
            "Wireframing",
            "Prototyping",
          ]}
          caseStudyLink="https://example.com/equine-integration-case-study"
        />
      </main>
    </>
  );
};

export default SelectedWorkSection;
