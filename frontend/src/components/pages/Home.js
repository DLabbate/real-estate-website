import React from "react";
import "./Home.css";
import IconSlider from "../shared/sliders/IconSlider";
import ImageSlider from "../shared/sliders/ImageSlider";
import WelcomeSlider from "../shared/sliders/WelcomeSlider";
import welcomeSlider_01 from "../../assets/welcome-sliders/welcome-slider-01.jpg";
import welcomeSlider_02 from "../../assets/welcome-sliders/welcome-slider-02.jpg";
import welcomeSlider_03 from "../../assets/welcome-sliders/welcome-slider-03.jpg";
import welcomeSlider_04 from "../../assets/welcome-sliders/welcome-slider-04.jpg";
import welcomeSlider_05 from "../../assets/welcome-sliders/welcome-slider-05.jpg";
import welcomeSlider_06 from "../../assets/welcome-sliders/welcome-slider-06.jpg";
import welcomeSlider_07 from "../../assets/welcome-sliders/welcome-slider-07.jpg";

const Home = () => {
  const icons = [
    {
      iconName: "FiSearch",
      iconSize: 75,
      iconStrokeWidth: 0.5,
      iconCaption: "Search for listings.",
    },
    {
      iconName: "FiFilter",
      iconSize: 75,
      iconStrokeWidth: 0.5,
      iconCaption: "Filter by location & price.",
    },
    {
      iconName: "FiHeart",
      iconSize: 75,
      iconStrokeWidth: 0.5,
      iconCaption: "Favorite listings.",
    },
    {
      iconName: "FiFolder",
      iconSize: 75,
      iconStrokeWidth: 0.5,
      iconCaption: "Organize into categories",
    },
    {
      iconName: "FiHome",
      iconSize: 75,
      iconStrokeWidth: 0.5,
      iconCaption: "Publish your own listing!.",
    },
  ];

  const welcomeSliderUrls = [
    welcomeSlider_01,
    welcomeSlider_02,
    welcomeSlider_03,
    welcomeSlider_04,
    welcomeSlider_05,
    welcomeSlider_06,
    welcomeSlider_07,
  ];

  return (
    <div className="home-container">
      <WelcomeSlider imageUrls={welcomeSliderUrls} />
      <IconSlider entries={icons} />
      <ImageSlider
        imageUrl={
          "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        }
        title={"Simple & Intuitive."}
        subtitle={
          " A minimalist approach that removes the headache of house hunting. Your dream home is only a couple clicks away."
        }
      />
      <ImageSlider
        imageUrl={
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        }
        title={"Stay Organized."}
        subtitle={
          "Our platform offers the ability to keep track of your favorite listings and organize them into different categories with ease!"
        }
        flipped={true}
      />
    </div>
  );
};

export default Home;
