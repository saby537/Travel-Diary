import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { NavLink } from "react-router-dom";
import "./Profile-Bar.css";
const ProfileBar = (props) => {
  const auth = useContext(AuthContext);
  return (
    <div ref={props.inputRef} className="profile-drp-dwn">
      <ul className="profile-list">
        <li className="profile-title">Username</li>
        <li className="profile-options">
          <NavLink to="/Diary" exact>
            Account Settings
          </NavLink>
        </li>
        <li className="profile-options">
          <button className="profile-btn" onClick={auth.logout}>
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileBar;
