import React, { useState } from "react";
import "./Card.css";
import { FiHeart } from "react-icons/fi";

const Card = ({ data }) => {
  const { price, type, address, extraInfo } = data;

  return (
    <div className="card">
      <img
        alt="Property for Sale"
        src="http://cdn.home-designing.com/wp-content/uploads/2017/05/wood-white-and-charcoal-modern-exterior-paint-themes.jpg"
        className="card__image"
      ></img>
      <div className="card__details">
        <h3>{price}</h3>
        <h5>{type}</h5>
        <h5>{address}</h5>
        <h6>{extraInfo}</h6>
      </div>

      <FiHeart size={35} className={"card__icon"} />
    </div>
  );
};

export default Card;
