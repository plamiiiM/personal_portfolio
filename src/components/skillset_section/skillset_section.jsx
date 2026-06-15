import React from "react";
import SkillsCard from "./skills_card";

const SkillsetSection = () => {
  return (
    <section className="flex flex-col justify-center items-center gap-y-5 mr-28">
      <img
        src="/skillset_text.png"
        alt="The heading of the section- Skillset"
        className="w-[21rem]"
      />
      <div className="flex flex-row justify-around w-full">
        <SkillsCard
          area="Design"
          skills={[
            "Figma",
            "Adobe Photoshop",
            "Adobe Illustrator",
            "Adobe After Effects",
            "Adobe InDesign",
          ]}
        />
        <SkillsCard
          area="UX/UI"
          skills={[
            "Researching",
            "User Testing",
            "Journey Mapping",
            "Wireframing & Prototyping",
            "Design Systems",
            "Interaction Design",
            "Gamification",
          ]}
        />
        <SkillsCard
          area="Front-End"
          skills={["ReactJS", "Tailwind CSS", "Flutter"]}
        />
      </div>
    </section>
  );
};

export default SkillsetSection;
