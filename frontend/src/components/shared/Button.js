import React from "react";
import "./Button.css";

const Button = ({ text, buttonHandler, modifiers, width, margin, type }) => {
  const style = { width: width, margin: margin };
  return (
    <button
      type={type || "input"}
      className={`btn ${modifiers}`}
      style={style}
      onClick={buttonHandler}
    >
      {text}
    </button>
  );
};

export default Button;
