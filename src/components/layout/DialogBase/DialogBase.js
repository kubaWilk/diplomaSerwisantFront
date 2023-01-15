import React from "react";

const Dialog = (props) => {
  return (
    <div className="w-screen h-screen z-50 fixed top-0 right-0 bg-gray-200 bg-opacity-70">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="bg-white border-2 border-black p-2 rounded-md flex flex-col items-center justify-center">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
