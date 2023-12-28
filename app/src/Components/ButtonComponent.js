import React from "react";

const ButtonComponent = ({ buttonText, onClickButton, isUpdateDisabled }) => {
  return (
    <button
      type="button"
      disabled={isUpdateDisabled}
      onClick={onClickButton}
      className={`bg-${
        isUpdateDisabled ? "gray-600" : "blue-500"
      } text-white px-5 py-2 flex items-center rounded`}
      style={{ position: "relative" }}
    >
      <span>{buttonText}</span>
    </button>
  );
};

export default ButtonComponent;
