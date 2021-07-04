import React from "react";
import "./Signup.css";
import VideoBackground from "../shared/VideoBackground";
import SignupForm from "../forms/SignupForm";
import Logo from "../shared/Logo";

const Signup = () => {
  return (
    <VideoBackground>
      <Logo />
      <SignupForm />
    </VideoBackground>
  );
};

export default Signup;
