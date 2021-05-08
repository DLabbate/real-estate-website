import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="welcomeImageContainer">
      <img
        src="https://wallpapercave.com/wp/wp4914369.jpg"
        width="100%"
        alt=""
        className="welcomeImage"
      />
      <h1 className="welcomeText">Find your dream home.</h1>
    </div>
  );
};

export default Home;
