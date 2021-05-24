import React, { useEffect, useState } from "react";
import video from "../../assets/video1.mp4";
import Button from "../shared/Button";
import "./Login.css";
import { Link } from "react-router-dom";
import VideoBackground from "../shared/VideoBackground";
import Form from "../shared/Form";
import update from "immutability-helper";

const Login = () => {
  const [fields, setFields] = useState([
    { name: "Email", placeholder: "Email", type: "text", value: "" },
    { name: "Password", placeholder: "Password", type: "password", value: "" },
  ]);

  useEffect(() => {
    //console.log(fields);
  });

  return (
    <VideoBackground>
      <h1 className="logo">acasa</h1>
      <Form
        fields={fields}
        buttonText="Login"
        alternativeText={"Don't have an account? Sign Up."}
        navigationPath={"/home"}
        navigationAlternative={"/signup"}
        setFields={setFields}
      />
    </VideoBackground>
  );
};

export default Login;
