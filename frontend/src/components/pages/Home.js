import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../shared/Button";
import "./Home.css";
import { FiSearch, FiHeart, FiHome, FiFilter, FiFolder } from "react-icons/fi";
import IconSlider from "../shared/sliders/IconSlider";

const Home = () => {
  let history = useHistory();

  const icons = [
    {
      iconName: "FiSearch",
      iconSize: 75,
      iconStrokeWidth: 0.5,
      iconCaption: "Search for listings.",
    },
    {
      iconName: "FiFilter",
      iconSize: 75,
      iconStrokeWidth: 0.5,
      iconCaption: "Filter by location & price.",
    },
    {
      iconName: "FiHeart",
      iconSize: 75,
      iconStrokeWidth: 0.5,
      iconCaption: "Favorite listings.",
    },
    {
      iconName: "FiFolder",
      iconSize: 75,
      iconStrokeWidth: 0.5,
      iconCaption: "Organize into categories",
    },
    {
      iconName: "FiHome",
      iconSize: 75,
      iconStrokeWidth: 0.5,
      iconCaption: "Publish your own listing!.",
    },
  ];
  return (
    <div className="welcome">
      <div className="welcome__banner-container">
        <img
          src="https://wallpapercave.com/wp/wp4914369.jpg"
          width="100%"
          alt=""
          className="welcome__image"
        />
        <div className="welcome__banner">
          <h1 className="welcome__text">Find your dream home.</h1>
          <Button
            modifiers={"btn--large btn--background-transparent btn--text-white"}
            margin={10}
            text={"Start Browsing"}
            buttonHandler={() => {
              history.push("/notes");
              // Refresh page
              history.go(0);
            }}
          />
        </div>
      </div>
      <IconSlider entries={icons} />
      <div className="welcome__row">
        <img
          src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          width="60%"
          alt=""
          className="welcome__image"
        />
        <div className="welcome__paragraph-container">
          <h1 style={{ textAlign: "center" }}>Simple & Intuitive.</h1>
          <p>
            A minimalist approach that removes the headache of house hunting.
            Your dream home is only a couple clicks away.
          </p>
        </div>
      </div>
      <div className="welcome__row">
        <div className="welcome__paragraph-container">
          <h1 style={{ textAlign: "center" }}>Stay Organized.</h1>
          <p>
            Our platform offers the ability to keep track of your favorite
            listings and organize them into different categories with ease!
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          width="60%"
          alt=""
          className="welcome__image"
        />
      </div>
    </div>
  );
};

export default Home;
