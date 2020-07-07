import React from "react";
import leftArrow from "../../Images/left-arrow.png";
import rightArrow from "../../Images/right-arrow.png";
import "./Arrow.css";

const Arrow = ({ direction, handleClick }) => {
  const arrowStyles =
    direction === "right" ? { right: `25px` } : { left: `25px` };
  return (
    <div className="arrow" onClick={handleClick} style={arrowStyles}>
      {direction === "right" ? (
        <img
          src={rightArrow}
          style={{ transform: `translate(-2px, 0px)` }}
          alt="Left Arrow"
        />
      ) : (
        <img
          src={leftArrow}
          style={{ transform: `translate(2px, 0px)` }}
          alt="Right Arrow"
        />
      )}
    </div>
  );
};

export default Arrow;
