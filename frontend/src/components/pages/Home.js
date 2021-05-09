import React from "react";
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
      <h1 className="welcome__text">Find your dream home.</h1>
      <button className="welcome__btn">Start Browsing</button>
    </div>
  );
};

export default Home;
