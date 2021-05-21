import React, { useEffect, useState } from "react";
import video from "../../assets/video1.mp4";
import Button from "../Button";
import "./Login.css";
import { Link } from "react-router-dom";
import VideoBackground from "../VideoBackground";
import Form from "../Form";
import update from "immutability-helper";

const Login = () => {
  // const fields = [
  //   { placeholder: "Email", type: "text" },
  //   { placeholder: "Password", type: "password" },
  // ];
  const [fields, setFields] = useState([
    { name: "Email", placeholder: "Email", type: "text", value: "" },
    { name: "Password", placeholder: "Password", type: "password", value: "" },
  ]);

  const onChange = (name, newValue) => {
    const index = fields.findIndex((item) => item.name === name);
    let newFields = update(fields, { [index]: { value: { $set: newValue } } });
    setFields(newFields);
  };

  useEffect(() => {
    console.log(fields);
  });

  return (
    <VideoBackground>
      <h1 className="logo">acasa</h1>
      <Form
        fields={fields}
        buttonText="Login"
        alternativeText={"Don't have an account? Sign Up."}
        navigationPath={"/home"}
        navigationAlternative={"/signup"}
        onChange={onChange}
      />
    </VideoBackground>
  );
};

export default Login;
