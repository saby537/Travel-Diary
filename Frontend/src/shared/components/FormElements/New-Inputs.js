import React, { useState } from "react";
import "./New-Inputs.css";
const NewInput = (props) => {
  const [isFocus, setIsFocus] = useState(false);

  const inputHandler = (event) => {
    if (event.target.value === "") {
      setIsFocus(false);
    } else {
      setIsFocus(true);
    }
  };
  return (
    <div className={`input-container ${props.class}`}>
      <div className="new-input">
        {isFocus && <span>{props.placeholder}</span>}
        <input
          type={props.type}
          id={props.id}
          placeholder={props.placeholder}
          onInput={inputHandler}
        />
      </div>
      <div className="new-input-btn">
        {props.showButton === "search" && isFocus && (
          <img
            src="https://w7.pngwing.com/pngs/456/948/png-transparent-computer-icons-desktop-web-search-engine-wordpress-com-search-icon-search-logo-website-circle-wordpresscom.png"
            alt="search"
          />
        )}
        {props.showButton === "password" && isFocus && <p>Show</p>}
      </div>
    </div>
  );
};

export default NewInput;
