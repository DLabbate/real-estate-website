import React, { useEffect, useState } from "react";
import "./WelcomeSlider.css";
import { useHistory } from "react-router-dom";
import Button from "../../shared/Button";

const WelcomeSlider = ({ imageUrls }) => {
  let history = useHistory();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      let newIndex = (activeIndex + 1) % imageUrls.length;
      setActiveIndex(newIndex);
    }, 5000);
  }, [activeIndex, imageUrls.length]);

  return (
    <div className="welcome-slider">
      {imageUrls.map((url, index) => {
        const imageStyle =
          index === activeIndex
            ? "welcome-slider__image welcome-slider__image--active"
            : "welcome-slider__image";
        return (
          <img key={url} src={url} width="100%" alt="" className={imageStyle} />
        );
      })}
      <div className="welcome-slider__banner">
        <h1 className="welcome-slider__text">Find your dream home.</h1>
        <Button
          modifiers={"btn--large btn--background-transparent btn--text-white"}
          margin={10}
          text={"Start Browsing"}
          buttonHandler={() => {
            history.push("/browse");
            // Refresh page
            history.go(0);
          }}
        />
      </div>
    </div>
  );
};

export default WelcomeSlider;
