import React from "react";
import video from "../../assets/video1.mp4";
import Button from "../Button";
import "./Login.css";
import { Link } from "react-router-dom";
import VideoBackground from "../VideoBackground";
import Form from "../Form";

const Login = () => {
  const fields = [
    { placeholder: "Email", type: "text" },
    { placeholder: "Password", type: "password" },
  ];
  return (
    <VideoBackground>
      <h1 className="logo">acasa</h1>
      <Form
        fieldInfo={fields}
        buttonText="Login"
        alternativeText={"Don't have an account? Sign Up."}
        navigationPath={"/home"}
        navigationAlternative={"/signup"}
      />
    </VideoBackground>
  );
};

export default Login;
