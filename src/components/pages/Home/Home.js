import React from "react";
import SectionName from "../../layout/SectionName";
import HomeButtons from "./HomeButtons";

const Home = () => {
  return (
    <div className="flex w-full flex-col justify-start items-center">
      <SectionName text="Start" />
      <HomeButtons />
    </div>
  );
};

export default Home;
