import React from "react";
import "./IconSlider.css";
import * as Fi from "react-icons/fi";

const IconSlider = ({ entries }) => {
  return (
    <div className="icon-slider">
      {entries.map((item) => {
        const { iconName, iconSize, iconStrokeWidth, iconCaption } = item;
        let Icon = Fi[iconName];
        return (
          <div className="icon-slider__column" key={"Fi." + iconName}>
            <Icon size={iconSize} strokeWidth={iconStrokeWidth} />
            <p>{iconCaption}</p>
          </div>
        );
      })}
    </div>
  );
};

export default IconSlider;
