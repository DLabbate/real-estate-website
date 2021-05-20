import React from "react";
import Button from "./Button";
import "./VideoBackground.css";
import { Link } from "react-router-dom";
import "./Form.css";

const Form = ({
  fieldInfo,
  buttonText,
  alternativeText,
  navigationPath,
  navigationAlternative,
}) => {
  return (
    <div className="form">
      <form className="form__container">
        {fieldInfo.map((item, index) => {
          return (
            <input
              className="form__field"
              type={item.type}
              placeholder={item.placeholder}
            ></input>
          );
        })}
      </form>
      <Link className="form__link" to={navigationPath}>
        <Button
          text={buttonText}
          width={"90%"}
          margin={"10px"}
          modifiers={"btn--solid btn--white"}
        />
      </Link>
      <Link className="form__link" to={navigationAlternative}>
        <p className="form__alternative">{alternativeText}</p>
      </Link>
    </div>
  );
};

export default Form;
