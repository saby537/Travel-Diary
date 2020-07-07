import React from "react";
import Slider from "../components/Slider";
import Login from "../components/Login";
const SignUp = () => {
  const images = [
    require("../../Images/agustin-diaz-7F65HDP0-E0-unsplash.jpg"),
    require("../../Images/frank-vessia-EoThx95bYPg-unsplash.jpg"),
    require("../../Images/luca-bravo-O453M2Liufs-unsplash.jpg"),
    require("../../Images/mesut-kaya-eOcyhe5-9sQ-unsplash.jpg"),
  ];

  return (
    <React.Fragment>
      <Slider slides={images} autoplay={5} />
      <Login />
    </React.Fragment>
  );
};

export default SignUp;
