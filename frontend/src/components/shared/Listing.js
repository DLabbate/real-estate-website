import React, { useState } from "react";
import "./Listing.css";
import { FiHeart, FiTrash, FiHome } from "react-icons/fi";

const Listing = ({ data, variant }) => {
  const { price, address, owner } = data;

  const renderIcon = () => {
    if (variant === "publishedListing") {
      return <FiTrash size={35} className={"listing__icon--bin"} />;
    } else {
      return <FiHeart size={35} className={"listing__icon--heart"} />;
    }
  };

  const renderContactInfo = () => {
    if (variant === "publishedListing") {
      return <></>;
    } else {
      return (
        <div className="listing__contact">
          <p className="listing__contact-text">
            {owner.firstName} {owner.lastName}
          </p>
          <p className="listing__contact-text">{owner.email}</p>
          <p className="listing__contact-text">{owner.phoneNumber}</p>
        </div>
      );
    }
  };
  return (
    <div className="listing">
      <img
        alt="Property for Sale"
        src="http://cdn.home-designing.com/wp-content/uploads/2017/05/wood-white-and-charcoal-modern-exterior-paint-themes.jpg"
        className="listing__image"
      ></img>
      <div className="listing__details">
        <h3>${Number(price).toLocaleString()}</h3>
        <h5>{address}</h5>
        {renderContactInfo()}
      </div>
      {renderIcon()}
    </div>
  );
};

export default Listing;
