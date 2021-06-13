import React, { useState } from "react";
import Button from "../shared/Button";
import "./Signup.css";
import { Link } from "react-router-dom";
import VideoBackground from "../shared/VideoBackground";
import Form from "../shared/Form";
import update from "immutability-helper";
import {
  signupFieldInfo,
  initialSignupFormState,
} from "../../utils/FormConfig";
import SignupForm from "../forms/SignupForm";

const Signup = () => {
  const [fieldState, setFieldState] = useState(initialSignupFormState);

  return (
    // <VideoBackground>
    //   <h1 className="logo">acasa</h1>
    //   <Form
    //     fieldInfo={signupFieldInfo}
    //     fieldState={fieldState}
    //     buttonText="Sign Up"
    //     alternativeText={"Already have an account? Login."}
    //     navigationPath={"/home"}
    //     navigationAlternative={"/login"}
    //     setFields={setFieldState}
    //   />
    // </VideoBackground>
    <VideoBackground>
      <h1 className="logo">acasa</h1>
      <SignupForm />
    </VideoBackground>
  );
};

export default Signup;
