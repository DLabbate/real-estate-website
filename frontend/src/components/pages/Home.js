import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../shared/Button";
import "./Home.css";
import { FiSearch, FiHeart, FiHome, FiFilter, FiFolder } from "react-icons/fi";

const Home = () => {
  let history = useHistory();
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
      <div className="welcome__info">
        <div className="welcome__info-section">
          <FiSearch size={75} strokeWidth={0.5} />
          <p>Search for listings.</p>
        </div>
        <div className="welcome__info-section">
          <FiFilter size={75} strokeWidth={0.5} />
          <p>Filter by location & price.</p>
        </div>
        <div className="welcome__info-section">
          <FiHeart size={75} strokeWidth={0.5} />
          <p>Favorite listings.</p>
        </div>
        <div className="welcome__info-section">
          <FiFolder size={75} strokeWidth={0.5} />
          <p>Organize into categories.</p>
        </div>
        <div className="welcome__info-section">
          <FiHome size={75} strokeWidth={0.5} />
          <p>Publish your own listing!</p>
        </div>
      </div>
      <div className="welcome__row">
        <img
          src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          width="60%"
          alt=""
          className="welcome__image"
        />
        <div className="welcome__paragraph-container">
          <h1 style={{ textAlign: "center" }}>Easy & Intuitive.</h1>
          <p>
            An minimalist interface that makes it easy to filter homes. Blah
            Blah Blah.
          </p>
        </div>
      </div>
      <div className="welcome__row">
        <div className="welcome__paragraph-container">
          <h1 style={{ textAlign: "center" }}>Easy & Intuitive.</h1>
          <p>An minimalist interface that makes it easy to filter homes.</p>
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
