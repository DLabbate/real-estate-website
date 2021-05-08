import React, { useState } from "react";
import "./Navbar.css";
import { FiMenu, FiX } from "react-icons/fi";

const navbarLinks = [
  { url: "/", title: "Home" },
  { url: "/about", title: "Browse" },
  { url: "#", title: "Edit Notes" },
  { url: "#", title: "About Us" },
];

const Navbar = () => {
  // Determines if the "menu icon" was clicked or not. Note that this icon is only visible when the window width is small.
  const [menuClicked, setMenuClicked] = useState(false);

  const toggleMenuClick = () => {
    setMenuClicked(!menuClicked);
  };

  return (
    <nav className="navbarContainer">
      <h1 className="navbarLogo">acasa</h1>

      {menuClicked ? (
        <FiX size={25} className={"menuIcon"} onClick={toggleMenuClick} />
      ) : (
        <FiMenu size={25} className={"menuIcon"} onClick={toggleMenuClick} />
      )}

      <ul className={menuClicked ? "navbarLinks active" : "navbarLinks"}>
        {navbarLinks.map((item, index) => {
          return (
            <li className="navbarLink" key={index}>
              <a href={item.url}>{item.title}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
