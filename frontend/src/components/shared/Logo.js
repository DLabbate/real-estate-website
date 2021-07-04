import React from "react";
import "./Logo.css";
import { ReactComponent as LogoSvg } from "../../assets/logo/logo.svg";
import { useHistory } from "react-router-dom";

const Logo = ({ size }) => {
  let history = useHistory();
  return (
    <div
      className={"logo"}
      onClick={() => {
        history.push("/home");
        // Refresh page
        history.go(0);
      }}
    >
      <LogoSvg
        className={
          size === "small" ? "logo__icon logo__icon--small" : "logo__icon"
        }
      />
      <h1
        className={
          size === "small" ? "logo__text logo__text--small" : "logo__text"
        }
      >
        acasa
      </h1>
    </div>
  );
};

export default Logo;
