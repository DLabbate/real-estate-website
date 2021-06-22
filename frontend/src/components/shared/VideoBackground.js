import React from "react";
import video from "../../assets/background-video.mp4";
import "./VideoBackground.css";

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
