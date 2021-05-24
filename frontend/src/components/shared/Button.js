import React from "react";
import "./Button.css";

const Button = ({ text, buttonHandler, modifiers, width, margin }) => {
  const style = { width: width, margin: margin };
  return (
    <button
      className={`btn ${modifiers}`}
      style={style}
      onClick={buttonHandler}
    >
      {text}
    </button>
  );
};

export default Button;
