import React from "react";
import TimelineExperience from "./timeline_experience";

const ExperienceSection = () => {
    return (
        <section id="experience" className="mt-10">
            <img className="w-[20rem] -rotate-40" src="/experience_text.png" alt="Experience" />
            <TimelineExperience />
        </section>
    );
};

export default ExperienceSection;
