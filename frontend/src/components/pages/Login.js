import React from "react";
import "./Login.css";
import VideoBackground from "../shared/VideoBackground";
import LoginForm from "../forms/LoginForm";

const Login = () => {
  return (
    <VideoBackground>
      <h1 className="logo">acasa</h1>
      <LoginForm />
    </VideoBackground>
  );
};

export default Login;
