import React from "react";
import "./Slide.css";
const Slide = ({ content }) => {
  const slideStyles = {
    backgroundImage: `url('${content}')`,
  };
  return <div className="slide" style={slideStyles}></div>;
};

export default Slide;
