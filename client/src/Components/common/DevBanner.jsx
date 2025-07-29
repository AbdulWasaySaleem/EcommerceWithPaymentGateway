import React from "react";

const DevBanner = () => {
  return (
    <div className="bg-blue-600 text-white text-xs py-2 text-center shadow-md">
      ⚠️ This is a <strong>practice/demo project</strong> built for learning purposes only.
      <a
        href="https://github.com/AbdulWasaySaleem"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-blue-200 ml-1"
      >
        Contact me
      </a>
      for more detail
    </div>
  );
};

export default DevBanner;
