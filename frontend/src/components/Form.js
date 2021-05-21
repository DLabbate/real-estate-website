import React from "react";
import Button from "./Button";
import "./VideoBackground.css";
import { Link } from "react-router-dom";
import "./Form.css";
import update from "immutability-helper";

const Form = ({
  fields,
  buttonText,
  alternativeText,
  navigationPath,
  navigationAlternative,
  setFields,
}) => {
  const handleChange = (name, newValue) => {
    const index = fields.findIndex((item) => item.name === name);
    let newFields = update(fields, { [index]: { value: { $set: newValue } } });
    setFields(newFields);
  };

  return (
    <div className="form">
      <form className="form__container">
        {fields.map((item, index) => {
          return (
            <input
              className="form__field"
              type={item.type}
              placeholder={item.placeholder}
              value={item.value}
              onChange={(event) => handleChange(item.name, event.target.value)}
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
