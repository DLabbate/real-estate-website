import React from "react";
import "./Listing.css";
import { FiHeart, FiTrash } from "react-icons/fi";

const Listing = ({ data, variant, onClickIcon, isFavorited }) => {
  const { price, address, owner, _id, imageUrl } = data;

  const renderIcon = () => {
    if (variant === "publishedListing") {
      return (
        <FiTrash
          data-testid={"icon-trash"}
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
          data-testid={"icon-heart"}
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
        src={imageUrl}
        className="listing__image"
      ></img>
      <div className="listing__details">
        <h4>${Number(price).toLocaleString()}</h4>
        <h6>{address}</h6>
        {renderContactInfo()}
      </div>
      {renderIcon()}
    </div>
  );
};

export default Listing;
