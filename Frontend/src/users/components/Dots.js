import React from "react";
import "./Dots.css";
const Dot = (active) => {
  const dotStyle = active.active
    ? { background: "white" }
    : { background: "black" };
  return <span className="dot" style={dotStyle} />;
};

const Dots = ({ slides, activeIndex }) => (
  <div className="dots">
    {slides.map((slide, i) => (
      <Dot key={slide} active={activeIndex === i} />
    ))}
  </div>
);

export default Dots;
