import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo";
import { useHistory } from "react-router-dom";

const navbarLinks = [
  { url: "/home", title: "Home" },
  { url: "/browse", title: "Browse" },
  { url: "/notes", title: "Edit Notes" },
  { url: "/profile", title: "Profile" },
];

const Navbar = ({ transparentEffect }) => {
  // Determines if the "menu icon" was clicked or not. Note that this icon is only visible when the window width is small.
  const [menuClicked, setMenuClicked] = useState(false);

  const [isTransparent, setIsTransparent] = useState(
    transparentEffect ? true : false
  );

  let history = useHistory();

  const toggleMenuClick = () => {
    setMenuClicked(!menuClicked);
  };

  useEffect(() => {
    // Only change the background if the "transparentEffect" prop is true
    if (transparentEffect) {
      const changeBackground = () => {
        if (window.scrollY >= 70) {
          setIsTransparent(false);
        } else {
          setIsTransparent(true);
        }
      };

      window.addEventListener("scroll", changeBackground);

      // Remove event listener to avoid memory leaks
      return () => window.removeEventListener("scroll", changeBackground);
    }
  }, [transparentEffect]);

  return (
    <nav className={isTransparent ? "navbar" : "navbar navbar--opaque"}>
      <Logo
        size={"small"}
        onClick={() => {
          history.push("/home");
          // Refresh page
          history.go(0);
        }}
      />

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
