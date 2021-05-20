import React from "react";
import video from "../../assets/video1.mp4";
import Button from "../Button";
import "./Login.css";

const Login = () => {
  return (
    <div className="login">
      <video className="login__video" width={"100%"} autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      <h1 className="login__logo">acasa</h1>
      <div className="login__container">
        <form className="login__form">
          <input
            className="login__field"
            type="text"
            placeholder="Email"
          ></input>
          <input
            className="login__field"
            type="password"
            placeholder="Password"
          ></input>
        </form>
        <Button
          text="Login"
          width={"90%"}
          margin={"10px"}
          modifiers={"btn--solid btn--white"}
        />
        <Button
          text="Sign Up"
          width={"90%"}
          margin={"10px"}
          modifiers={"btn--solid btn--white"}
        />
      </div>
    </div>
  );
};

export default Login;
