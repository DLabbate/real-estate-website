import React, { useState } from "react";
import Button from "../Button";
import "./Signup.css";
import { Link } from "react-router-dom";
import VideoBackground from "../VideoBackground";
import Form from "../Form";
import update from "immutability-helper";

const Signup = () => {
  const [fields, setFields] = useState([
    { name: "Name", placeholder: "Name", type: "text", value: "" },
    { name: "Lastname", placeholder: "Lastname", type: "text", value: "" },
    { name: "Email", placeholder: "Email", type: "text", value: "" },
    { name: "Password", placeholder: "Password", type: "password", value: "" },
  ]);

  return (
    <VideoBackground>
      <h1 className="logo">acasa</h1>
      <Form
        fields={fields}
        buttonText="Sign Up"
        alternativeText={"Already have an account? Login."}
        navigationPath={"/home"}
        navigationAlternative={"/login"}
        setFields={setFields}
      />
    </VideoBackground>
  );
};

export default Signup;
