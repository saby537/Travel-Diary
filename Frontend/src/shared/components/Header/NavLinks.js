import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "../UIElements/Avatar";
import ProfileBar from "./Profile-Bar";
import "./NavLinks.css";
const NavLinks = () => {
  const [style, setStyle] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false);
      setStyle({});
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });
  const ref = useRef(null);
  const avatarClickHandler = () => {
    setIsVisible(true);
    setStyle({
      backgroundColor: "rgba(255, 255, 255, 0.3)",
    });
  };
  return (
    <React.Fragment>
      <div className="link-container">
        <ul className="nav-links">
          <li>
            <NavLink to="/Diary" exact>
              Diary
            </NavLink>
          </li>
          <li>
            <NavLink to="/Buddy" exact>
              Buddy
            </NavLink>
          </li>
        </ul>
        <div onClick={avatarClickHandler} style={style}>
          <Avatar
            className="link-avatar"
            image={require("../../../Images/avatar-logo.png")}
            alt="Avatar"
          />
          {isVisible && <ProfileBar inputRef={ref} />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavLinks;
