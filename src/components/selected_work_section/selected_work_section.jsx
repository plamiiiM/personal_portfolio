import React from "react";
import Button from "../global/buttons";
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
      <main>
        <div className="flex flex-row items-center justify-start gap-x-55">
          <img
            className="w-[20rem] max-w-md"
            src="/smartnet_collage_bigger.png"
            alt="Collection of wireframes of the smartnet app and their logo"
          />
          {/* Wrapper for whole description */}
          <div className="flex flex-col justify-start items-start gap-y-20">
            {/* Title and description with filters */}
            <div className="flex flex-col justify-start items-start gap-y-8">
              <h3 className="font-[PlamenasHandwriting] text-[3rem] leading-9 bg-white p-3 -rotate-5">
                SmartNet App
              </h3>
              <p className="font-[poppins] text-left inline-block text-[1rem] leading-8 w-[25rem]">
                The SmartNet app is a project I worked on during my internship
                at Spinnov. Responsible for the UX/UI design of the app, I
                created wireframes and prototypes to enhance the user
                experience.
              </p>
              <div className="flex flex-row items-center justify-start gap-x-9">
                <div>
                  <p className="font-[poppins] text-[1rem] leading-8">
                    Journey Mapping
                  </p>
                  <img src="/underline_for_filters.png" alt="" />
                </div>
                <div>
                  <p className="font-[poppins] text-[1rem] leading-8">
                    User Personas
                  </p>
                  <img src="/underline_for_filters.png" alt="" />
                </div>
              </div>
            </div>

            {/* Button */}
            <Button.Secondary onClick={() => open("_blank")}>
              View Case Study
            </Button.Secondary>
          </div>
        </div>
      </main>
    </>
  );
};

export default SelectedWorkSection;
