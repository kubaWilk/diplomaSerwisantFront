import React from "react";
import PropTypes from "prop-types";

const Dialog = ({
  heading,
  prompt,
  approveText,
  cancelText,
  onApprove,
  onCancel,
}) => {
  return (
    <div className="w-screen h-screen z-50 fixed top-0 right-0 bg-gray-200 bg-opacity-70">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="bg-white border-2 border-black p-2 rounded-md flex flex-col items-center justify-center">
          <h2
            data-testid="heading"
            className="uppercase text-center font-bold m-2 text-lg"
          >
            {heading}
          </h2>
          <p data-testid="paragraph">{prompt}</p>
          <div className="flex space-x-2">
            <button
              className="font-bold uppercase border-2 px-2 m-2 border-green-500 hover:bg-green-500 hover:text-white duration-200"
              onClick={() => {
                onApprove();
              }}
            >
              {approveText}
            </button>
            <button
              className="font-bold uppercase border-2 px-2 m-2 border-red-500 hover:bg-red-500 hover:text-white duration-200"
              onClick={() => {
                onCancel();
              }}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Dialog.defaultProps = {
  heading: "Potwierdź operację",
  prompt: "Potwierdź operację",
  approveText: "Tak",
  cancelText: "Nie",
};

Dialog.propTypes = {
  heading: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  approveText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  onApprove: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Dialog;
