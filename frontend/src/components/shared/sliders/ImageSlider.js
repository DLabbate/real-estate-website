import React from "react";
import "./ImageSlider.css";
import { useInView } from "react-intersection-observer";

const ImageSlider = ({ imageUrl, title, subtitle, flipped }) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.15,
  });

  if (!flipped) {
    return (
      <div
        className={inView ? "image-slider image-slider--zoom" : "image-slider"}
        ref={ref}
      >
        <img src={imageUrl} alt="" className="image-slider__photo" />
        <div className="image-slider__content">
          <h1 className="image-slider__title">{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={inView ? "image-slider image-slider--zoom" : "image-slider"}
        ref={ref}
      >
        <div className="image-slider__content">
          <h1 className="image-slider__title">{title}</h1>
          <p>{subtitle}</p>
        </div>
        <img src={imageUrl} alt="" className="image-slider__photo" />
      </div>
    );
  }
};
export default ImageSlider;
