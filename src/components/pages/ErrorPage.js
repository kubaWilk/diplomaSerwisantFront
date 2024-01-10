import React from "react";
import SectionName from "../layout/SectionName";

const ErrorPage = () => {
  return (
    <div className="flex w-full flex-col justify-start items-center">
      <SectionName text="BŁĄD" />
      <div>
        <p>Coś poszło nie tak. Skontaktuj się z administratorem IT.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
