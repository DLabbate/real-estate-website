import React, { useEffect } from "react";
import Button from "./Button";
import "./VideoBackground.css";
import { Link } from "react-router-dom";
import "./Form.css";
import update from "immutability-helper";

const Form = ({
  fieldInfo,
  fieldState,
  setFields,
  buttonText,
  alternativeText,
  navigationPath,
  navigationAlternative,
  onSubmit,
}) => {
  const handleChange = (name, newValue) => {
    let newFields = update(fieldState, { [name]: { $set: newValue } });
    console.log(newFields);
    setFields(newFields);
  };

  return (
    <div className="form">
      <form className="form__container">
        {fieldInfo.map((item, index) => {
          return (
            <input
              className="form__field"
              type={item.type}
              placeholder={item.placeholder}
              value={fieldState[item.name]}
              onChange={(event) => handleChange(item.name, event.target.value)}
            ></input>
          );
        })}
      </form>
      {/* <Link className="form__link" to={navigationPath}> */}
      <Button
        text={buttonText}
        width={"90%"}
        margin={"10px"}
        modifiers={"btn--solid btn--white"}
        buttonHandler={onSubmit}
      />
      {/* </Link> */}
      <Link className="form__link" to={navigationAlternative}>
        <p className="form__alternative">{alternativeText}</p>
      </Link>
    </div>
  );
};

export default Form;
