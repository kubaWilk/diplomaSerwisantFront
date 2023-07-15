import React from "react";
import SectionName from "../layout/SectionName";
const Error = () => {
  return (
    <div className="flex w-full flex-col justify-start items-center">
      <SectionName text="Błąd" />
      <p>Coś poszło nie tak. Sprawdź połaczenie internetowe. </p>
    </div>
  );
};

export default Error;
