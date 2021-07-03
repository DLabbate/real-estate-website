import React from "react";
import "./Login.css";
import VideoBackground from "../shared/VideoBackground";
import LoginForm from "../forms/LoginForm";
import Logo from "../shared/Logo";

const Login = () => {
  return (
    <VideoBackground>
      <Logo />
      <LoginForm />
    </VideoBackground>
  );
};

export default Login;
