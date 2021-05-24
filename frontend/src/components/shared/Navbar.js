import React, { useState } from "react";
import "./Navbar.css";
import { FiMenu, FiX } from "react-icons/fi";

const navbarLinks = [
  { url: "/home", title: "Home" },
  { url: "/browse", title: "Browse" },
  { url: "/notes", title: "Edit Notes" },
];

const Navbar = ({ transparentEffect }) => {
  // Determines if the "menu icon" was clicked or not. Note that this icon is only visible when the window width is small.
  const [menuClicked, setMenuClicked] = useState(false);

  const [isTransparent, setIsTransparent] = useState(
    transparentEffect ? true : false
  );

  const toggleMenuClick = () => {
    setMenuClicked(!menuClicked);
  };

  if (transparentEffect) {
    const changeBackground = () => {
      if (window.scrollY >= 70) {
        setIsTransparent(false);
      } else {
        setIsTransparent(true);
      }
      console.log(isTransparent);
    };

    window.addEventListener("scroll", changeBackground);
  }

  return (
    <nav className={isTransparent ? "navbar" : "navbar navbar--opaque"}>
      <h1 className="navbar__logo">acasa</h1>

      {menuClicked ? (
        <FiX size={25} className={"navbar__icon"} onClick={toggleMenuClick} />
      ) : (
        <FiMenu
          size={25}
          className={"navbar__icon"}
          onClick={toggleMenuClick}
        />
      )}

      <ul
        className={
          menuClicked ? "navbar__list navbar__list--active" : "navbar__list"
        }
      >
        {navbarLinks.map((item, index) => {
          return (
            <li className="navbar__item" key={index}>
              <a className="navbar__link" href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
