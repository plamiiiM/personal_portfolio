import React from "react";

const SkillsCard = ({ area, skills = [] }) => {
  return (
    <div className="w-fit flex flex-col items-center gap-[2rem] rounded-[1.25rem] border-(--darkBrown) border-solid border-[0.188rem] py-[4rem] px-[4rem] text-black font-[poppins]">
      <h4 className="font-black text-[1.25rem] tracking-wider inline-block">
        {area ? area : "Design"}
      </h4>

      <ul className="flex flex-col gap-y-2 items-center">
        {skills.length > 0 ? (
          skills.map((tech, index) => <li key={index}>{tech}</li>)
        ) : (
          <>
            <li>Adobe Illustrator</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default SkillsCard;
