import React from "react";

const ButtonComponent = ({ buttonText, onClickButton, color = "#3076FF" }) => {
  return (
    <button
      type="button"
      onClick={onClickButton}
      className={`bg-[${color}] text-white px-5 py-2 flex items-center rounded`}
      style={{ position: "relative" }}
    >
      <span>{buttonText}</span>
    </button>
  );
};

export default ButtonComponent;
