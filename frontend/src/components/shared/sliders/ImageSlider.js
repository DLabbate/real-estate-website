import React, { useLayoutEffect, useRef, useState } from "react";
import "./ImageSlider.css";

const ImageSlider = ({ imageUrl, title, subtitle, flipped }) => {
  const [className, setClassName] = useState("image-slider");

  const positionRef = useRef(null);

  useLayoutEffect(() => {
    const topPos = (element) => element.getBoundingClientRect().top;

    const pos = topPos(positionRef.current);

    console.log(topPos, window.scrollY + window.innerHeight);

    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight;

      if (pos < scrollPos) {
        setClassName("image-slider image-slider--zoom");
      } else {
        setClassName("image-slider");
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!flipped) {
    return (
      <div className={className} ref={positionRef}>
        <img src={imageUrl} alt="" className="image-slider__photo" />
        <div className="image-slider__content">
          <h1 className="image-slider__title">{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={className} ref={positionRef}>
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
