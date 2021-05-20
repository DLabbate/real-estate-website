import React from "react";
import video from "../assets/video1.mp4";
import Button from "./Button";
import "./VideoBackground.css";
import { Link } from "react-router-dom";

const VideoBackground = (props) => {
  return (
    <div className="background">
      <video className="background__video" width={"100%"} autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      {props.children}
    </div>
  );
};

export default VideoBackground;
