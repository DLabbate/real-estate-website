import React from "react";
import "./Browse.css";
import { FiHeart } from "react-icons/fi";

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
        <div className="card">
          <img
            src="http://cdn.home-designing.com/wp-content/uploads/2017/05/wood-white-and-charcoal-modern-exterior-paint-themes.jpg"
            className="card__image"
          ></img>
          <h3>$990, 000</h3>
          <h5>Manhattan, NY</h5>
          <h6>Extra Information</h6>
          <FiHeart size={35} className={"card__icon"} />
        </div>

        <div className="card">
          <img
            src="https://www.thespruce.com/thmb/d4XQZTLQFE3sLSXvHbxS7pv6Cxk=/2086x1437/filters:fill(auto,1)/Modernhomeexterior-GettyImages-1058471994-014dbd8ca7894cd388ad8c4ff77bb476.jpg"
            className="card__image"
          ></img>
          <h3>$990, 000</h3>
        </div>

        <div className="card">
          <img
            src="http://cdn.home-designing.com/wp-content/uploads/2017/05/wood-white-and-charcoal-modern-exterior-paint-themes.jpg"
            className="card__image"
          ></img>
          <h3>$990, 000</h3>
        </div>

        <div className="card">
          <img
            src="http://cdn.home-designing.com/wp-content/uploads/2017/05/wood-white-and-charcoal-modern-exterior-paint-themes.jpg"
            className="card__image"
          ></img>
          <h3>$990, 000</h3>
        </div>

        <div className="card">
          <img
            src="http://cdn.home-designing.com/wp-content/uploads/2017/05/wood-white-and-charcoal-modern-exterior-paint-themes.jpg"
            className="card__image"
          ></img>
          <h3>$990, 000</h3>
        </div>

        <div className="card">
          <img
            src="http://cdn.home-designing.com/wp-content/uploads/2017/05/wood-white-and-charcoal-modern-exterior-paint-themes.jpg"
            className="card__image"
          ></img>
          <h3>$990, 000</h3>
        </div>

        <div className="card">
          <img
            src="http://cdn.home-designing.com/wp-content/uploads/2017/05/wood-white-and-charcoal-modern-exterior-paint-themes.jpg"
            className="card__image"
          ></img>
          <h3>$990, 000</h3>
        </div>

        <div className="card">
          <img
            src="http://cdn.home-designing.com/wp-content/uploads/2017/05/wood-white-and-charcoal-modern-exterior-paint-themes.jpg"
            className="card__image"
          ></img>
          <h3>$990, 000</h3>
        </div>

        <div className="card">
          <img
            src="http://cdn.home-designing.com/wp-content/uploads/2017/05/wood-white-and-charcoal-modern-exterior-paint-themes.jpg"
            className="card__image"
          ></img>
          <h3>$990, 000</h3>
        </div>
      </div>
    </>
  );
};

export default Browse;
