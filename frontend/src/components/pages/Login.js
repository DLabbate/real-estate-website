import React, { useEffect, useState } from "react";
import video from "../../assets/video1.mp4";
import Button from "../shared/Button";
import "./Login.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import VideoBackground from "../shared/VideoBackground";
import Form from "../shared/Form";
import update from "immutability-helper";
import { loginFieldInfo, initialLoginFormState } from "../../utils/FormConfig";

const Login = () => {
  const [fieldState, setFieldState] = useState(initialLoginFormState);

  useEffect(() => {
    //console.log(fields);
  });

  let history = useHistory();
  const onSubmit = () => {
    history.push("/home");
  };

  return (
    <VideoBackground>
      <h1 className="logo">acasa</h1>
      <Form
        fieldInfo={loginFieldInfo}
        fieldState={fieldState}
        setFields={setFieldState}
        buttonText="Login"
        alternativeText={"Don't have an account? Sign Up."}
        navigationPath={"/home"}
        navigationAlternative={"/signup"}
        onSubmit={onSubmit}
      />
    </VideoBackground>
  );
};

export default Login;
