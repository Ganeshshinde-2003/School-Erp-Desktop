import React from "react";

const ButtonComponent = ({ buttonText, onClickButton }) => {
  return (
    <button
      type="button"
      onClick={onClickButton}
      className="bg-[#3076FF] text-white px-5 py-2 flex items-center rounded"
      style={{ position: "relative" }}
    >
      <span>{buttonText}</span>
    </button>
  );
};

export default ButtonComponent;
