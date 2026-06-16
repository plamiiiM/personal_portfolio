import React from "react";
import Button from "../global/buttons";
import CaseStudyDescriptionComponent from "./case_study_description_component";

const SelectedWorkSection = () => {
  return (
    <section className="mb-40">
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
      <main className="flex flex-col justify-start items-start gap-y-70 mt-30 mr-28">
        <CaseStudyDescriptionComponent
          projectCollage="/smartnet_collage_bigger.png"
          titleOfProject="SmartNet App"
          description="I designed the end-to-end user experience for SmartNet, bridging the gap between physical football training and digital performance tracking. Through user research and gamification design, I translated complex hardware data into interactive games and actionable player profiles."
          filters={[
            "UX/UI Design",
            "Gamification",
            "Prototyping",
            "Design System",
            "Journey Mapping",
            "User Personas",
          ]}
          caseStudyLink="https://example.com/smartnet-case-study"
        />
        <CaseStudyDescriptionComponent
          projectCollage="/equine_integration_collage_2.png"
          titleOfProject="Equine Integration"
          // description="To solve a drop in user engagement, I designed and developed five new data-driven features for the Equine Integration app in 2.5 months. I researched equestrian habits to introduce interactive training summaries, progress comparisons, and rewards that encourage device usage. The final delivery upgraded the user experience seamlessly with fully implemented Flutter code."
          description="I redesigned and programmed a major UX upgrade for Equine Integration, turning complex horse tracking metrics into an engaging, gamified training platform. Through data analysis and user interviews, I created five approved features—including training insights, performance comparisons, and habit-building achievements. "
          filters={[
            "Redesign",
            "UX Strategy",
            "Prototyping",
            "Flutter Development",
            "Data-Driven Design",
          ]}
          caseStudyLink="https://example.com/equine-integration-case-study"
        />
      </main>
    </section>
  );
};

export default SelectedWorkSection;
