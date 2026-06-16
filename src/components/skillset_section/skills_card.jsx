import React from "react";

const SkillsCard = ({ area, skills = [] }) => {
  return (
    <div className="w-[22rem] min-h-[28rem] flex flex-col items-center gap-[2rem] rounded-[1.25rem] border-(--darkBrown) border-solid border-[0.188rem] py-[4rem] px-6 text-black font-[poppins] bg-transparent">
      <h4 className="font-black text-[1.438rem] tracking-wider text-center max-w-[15rem]">
        {area ? area : "Design"}
      </h4>

      <ul className="flex flex-col gap-y-3 items-center text-center text-[1.125rem]">
        {skills.length > 0 ? (
          skills.map((tech, index) => <li key={index}>{tech}</li>)
        ) : (
          <li>Adobe Illustrator</li>
        )}
      </ul>
    </div>
  );
};

export default SkillsCard;
