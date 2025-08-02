import { useState } from "react";
import AboutModal from "./AboutModal";

const DevBanner = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="bg-blue-700 text-white text-xs py-2 text-center shadow-md">
      ⚠️ This is a <strong>practice/demo project</strong> built for learning purposes only.
      <a
        href="https://github.com/AbdulWasaySaleem"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-blue-200 ml-1"
      >
        Contact me
      </a>
      {" "}for more detail or {" "}<span className="underline cursor-pointer" onClick={() => setIsOpen(true)}>read about this project</span>
    </div>
    {isOpen && <AboutModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default DevBanner;
