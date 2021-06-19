import React, { useState } from "react";
import "./Listing.css";
import { FiHeart, FiTrash, FiHome } from "react-icons/fi";

const Listing = ({ data, variant, onClickIcon, isFavorited }) => {
  const { price, address, owner, _id, imageUrl } = data;

  const renderIcon = () => {
    if (variant === "publishedListing") {
      return (
        <FiTrash
          size={35}
          className={"listing__icon--bin"}
          onClick={onClickIcon}
        />
      );
    } else {
      const iconClassName = isFavorited
        ? "listing__icon--heart listing__icon--fill"
        : "listing__icon--heart";
      return (
        <FiHeart
          size={35}
          className={iconClassName}
          onClick={() => onClickIcon(_id)}
        />
      );
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
        //src="http://cdn.home-designing.com/wp-content/uploads/2017/05/wood-white-and-charcoal-modern-exterior-paint-themes.jpg"
        src={imageUrl}
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
