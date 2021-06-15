import React, { useContext } from "react";
import "./Login.css";
import VideoBackground from "../shared/VideoBackground";
import LoginForm from "../forms/LoginForm";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  return (
    <VideoBackground>
      <h1 className="logo">acasa</h1>
      <LoginForm />
    </VideoBackground>
  );
};

export default Login;
