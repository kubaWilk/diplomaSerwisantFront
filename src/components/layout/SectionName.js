import React, { Fragment } from "react";

const SectionName = ({ text }) => {
  return (
    <Fragment>
      <h1 className="mt-5 text-3xl uppercase">{text}</h1>
      <div className="w-[90%] mt-3 mb-2 border-b border-black"></div>
    </Fragment>
  );
};

export default SectionName;
