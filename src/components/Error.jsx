import { useSelector } from "react-redux";

import emoji from "/assets/images/emoji.svg";
import { selectDarkMode } from "../../utils/darkModeSlice";

const Error = () => {
  const isDarkMode = useSelector(selectDarkMode);
  const bgColour = isDarkMode ? "bg-[#050505]" : "";
  const textColour = isDarkMode ? "text-white" : "";
  
  return (
    <main
      className={`flex flex-col items-center justify-center w-[328px] lg:w-[739px] md:[689px] gap-y-5 mx-auto ${bgColour} ${textColour}`}
    >
      <div>
        <img src={emoji} alt="emoji" className="md:w-16 " />
      </div>
      <div>
        <p className="font-Inter font-bold text-xl">No definitions found</p>
      </div>
      <div>
        <p className="font-Inter font-normal text-lg leading-6 text-[#757575]">
          Sorry pal, we couldn&apos;t find definitions for the word you were
          looking for. You can try the search again at later time or head to the
          web instead.
        </p>
      </div>
    </main>
  );
};

export default Error;
