import React from "react";
import ReactDOM from "react-dom";
import "./background.css";
const Background = (props) => {
  const Styles = {
    backgroundImage: `url('${props.image}')`,
  };
  const element = <div className="background" style={Styles} />;
  return ReactDOM.createPortal(
    element,
    document.getElementById("background-hook")
  );
};
export default Background;
