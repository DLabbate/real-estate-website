import React from "react";
import Button from "../Button";
import "./Home.css";

const Home = () => {
  return (
    <div className="welcome">
      <img
        src="https://wallpapercave.com/wp/wp4914369.jpg"
        width="100%"
        alt=""
        className="welcome__image"
      />
      <div className="welcome__banner">
        <h1 className="welcome__text">Find your dream home.</h1>
        <Button
          modifiers={"btn-large btn--transparent btn--white"}
          margin={10}
          text={"Start Browsing"}
        />
      </div>
    </div>
  );
};

export default Home;
