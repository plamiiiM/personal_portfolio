import React from "react";

const ProfessionTitleName = ({}) => {
  return (
    <div className="relative flex flex-col items-start justify-end gap-y-30 w-fit font-[zodiak] text-4xl text-(--red) tracking-wide">
      <div className="flex flex-col gap-3  align-baseline">
        <div className="flex flex-row gap-5 items-end">
          <p className="inline text-left font-medium ">UX/UI Designer</p>
          <p className="inline font-[zodiak] text-7xl text-(--brown) font-thin">
            &
          </p>
        </div>
        <p
          className="inline text-left font-normal tracking-widest after:content-[''] 
                after:absolute 
                after:left-0 
                after:bottom-30
                after:w-full 
                after:h-[1.5rem] 
                after:bg-[url('/scribble_underline.png')] 
                after:bg-contain 
                after:bg-no-repeat"
        >
          Mobile Developer
        </p>
      </div>
      <p
        className="relative inline text-right w-full font-normal text-2xl 
    after:content-[''] 
    after:absolute
    
    after:left-10
    after:top-full 
    
    after:w-[6rem]
    after:h-[6rem]
    after:bg-[url('/arrow.png')] 
    after:bg-contain
    after:bg-no-repeat 
    after:mix-blend-multiply
    after:rotate-20
    after:origin-left"
      >
        Plamena Mincheva
      </p>
    </div>
  );
};

export default ProfessionTitleName;
