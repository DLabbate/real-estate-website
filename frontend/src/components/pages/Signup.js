import React from "react";
import Button from "../Button";
import "./Signup.css";
import { Link } from "react-router-dom";
import VideoBackground from "../VideoBackground";
import Form from "../Form";

const Signup = () => {
  const fields = [
    { placeholder: "Name", type: "text" },
    { placeholder: "Lastname", type: "text" },
    { placeholder: "Email", type: "text" },
    { placeholder: "Password", type: "password" },
  ];
  return (
    <VideoBackground>
      <h1 className="logo">acasa</h1>
      <Form
        fieldInfo={fields}
        buttonText="Sign Up"
        alternativeText={"Already have an account? Login."}
        navigationPath={"/home"}
        navigationAlternative={"/login"}
      />
    </VideoBackground>
  );
};

export default Signup;
