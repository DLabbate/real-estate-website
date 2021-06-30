import React from "react";
import "./IconSlider.css";
import * as Fi from "react-icons/fi";

const IconSlider = ({ entries }) => {
  return (
    <div className="icon-slider">
      {entries.map((item) => {
        const { iconName, iconSize, iconStrokeWidth, iconCaption } = item;
        console.log(Fi[iconName]);
        let Icon = Fi[iconName];
        console.log("Fi." + iconName);
        return (
          <div className="icon-slider__column">
            <Icon size={iconSize} strokeWidth={iconStrokeWidth} />
            <p>{iconCaption}</p>
          </div>
        );
      })}
    </div>
  );
};

export default IconSlider;
