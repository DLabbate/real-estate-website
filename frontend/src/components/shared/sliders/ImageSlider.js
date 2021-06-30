import React from "react";
import "./ImageSlider.css";

const ImageSlider = ({ imageUrl, title, subtitle, flipped }) => {
  if (!flipped) {
    return (
      <div className="image-slider">
        <img src={imageUrl} width="60%" alt="" className="welcome__image" />
        <div className="image-slider__content">
          <h1 className="image-slider__title">{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="image-slider">
        <div className="image-slider__content">
          <h1 className="image-slider__title">{title}</h1>
          <p>{subtitle}</p>
        </div>
        <img src={imageUrl} width="60%" alt="" className="welcome__image" />
      </div>
    );
  }
};
export default ImageSlider;
