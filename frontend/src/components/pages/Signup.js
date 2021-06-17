import React from "react";
import "./Signup.css";
import VideoBackground from "../shared/VideoBackground";
import SignupForm from "../forms/SignupForm";

const Signup = () => {
  return (
    <VideoBackground>
      <h1 className="logo">acasa</h1>
      <SignupForm />
    </VideoBackground>
  );
};

export default Signup;
