import React from "react";
import "./Browse.css";
import { FiHeart } from "react-icons/fi";
import Listing from "../shared/Listing";
import { mockProperties } from "../../constants/mock.js";

const Browse = () => {
  return (
    <>
      <div className="filter">
        <div className="filter__row">
          <label>Location</label>
          <input
            type="search"
            placeholder="Location"
            className="filter__textinput"
          ></input>
        </div>
        <div className="filter__row">
          <label>Price</label>
          <input type="range" className="filter__textinput"></input>
        </div>
        <div className="filter__row">
          <label>Location</label>
          <input className="filter__textinput"></input>
        </div>
        <div className="filter__row">
          <label>Location</label>
          <input className="filter__textinput"></input>
        </div>
      </div>
      <div className="properties">
        {mockProperties.map((item) => (
          <Listing data={item} />
        ))}
      </div>
    </>
  );
};

export default Browse;
