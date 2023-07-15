import React from "react";
import Alert from "./Alert";
import SectionName from "./SectionName";

const Loading = () => {
  return (
    <div className="flex w-full flex-col h-full justify-start items-center">
      <p>Trwa ładowanie...</p>
      <Alert />
    </div>
  );
};

export default Loading;
