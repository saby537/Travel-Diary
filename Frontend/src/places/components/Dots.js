import React from "react";
import "./Dots.css";
const Dot = (active, key) => {
  const dotStyle = active ? { background: "white" } : { background: "black" };
  return <span key={key} className="dot" style={dotStyle} />;
};

const Dots = ({ count, activeIndex }) => {
  const createDots = (count, activeIndex) => {
    let Dots = [];

    for (let i = 0; i < count; i++) {
      Dots.push(Dot(activeIndex === i, i));
    }
    return Dots;
  };
  return <div className="places-dots">{createDots(count, activeIndex)}</div>;
};

export default Dots;
