import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Slide from "./Slide";
// import Arrow from "../components/Arrow";
// import Dots from "./Dots";
import "./Slider.css";

const getWidth = () => window.innerWidth;
const Slider = (props) => {
  const slides = props.slides;
  const firstSlide = slides[0];
  const SecondSlide = slides[1];
  const lastSlide = slides[slides.length - 1];
  const [state, setState] = useState({
    translate: getWidth(),
    transition: 0.45,
    activeIndex: 0,
    _slides: [lastSlide, firstSlide, SecondSlide],
  });
  const { translate, transition, _slides, activeIndex } = state;
  const curSlide = useRef();
  const transitionEnd = useRef();
  const resizeRef = useRef();
  useEffect(() => {
    curSlide.current = nextSlide;
    transitionEnd.current = smoothTransition;

    resizeRef.current = handleResize;
  });
  useEffect(() => {
    if (transition === 0) setState({ ...state, transition: 0.45 });
  }, [transition, state]);

  useEffect(() => {
    const play = () => curSlide.current();
    const smooth = () => transitionEnd.current();
    const resize = () => resizeRef.current();
    const interval = setInterval(play, props.autoplay * 1000);
    const transitionComplete = window.addEventListener("transitionend", smooth);
    const onResize = window.addEventListener("resize", resize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("transitionend", transitionComplete);
      window.removeEventListener("resize", onResize);
    };
  }, [props.autoplay]);
  const handleResize = () => {
    setState({ ...state, translate: getWidth(), transition: 0 });
  };
  const smoothTransition = () => {
    let slideList = [];
    if (activeIndex === slides.length - 1)
      slideList = [slides[slides.length - 2], lastSlide, firstSlide];
    else if (activeIndex === 0)
      slideList = [lastSlide, firstSlide, SecondSlide];
    else slideList = slides.slice(activeIndex - 1, activeIndex + 2);

    setState({
      ...state,
      translate: getWidth(),
      transition: 0,
      _slides: slideList,
    });
  };

  const nextSlide = () =>
    setState({
      ...state,
      translate: translate + getWidth(),
      activeIndex: activeIndex === slides.length - 1 ? 0 : activeIndex + 1,
    });

  // const prevSlide = () =>
  //   setState({
  //     ...state,
  //     translate: 0,
  //     activeIndex: activeIndex === 0 ? slides.length - 1 : activeIndex - 1,
  //   });

  const styles = {
    transform: `translate(-${translate}px, 0px)`,
    transition: `transform ease-out ${transition}s`,
    width: `${getWidth() * _slides.length}px`,
  };

  const slideBack = (
    <div className="Slider">
      <div className="SlideComponent" style={styles}>
        {_slides.map((slide, i) => (
          <Slide key={i} content={slide} />
        ))}
      </div>
      {/* <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />
      <Dots slides={props.slides} activeIndex={state.activeIndex} /> */}
    </div>
  );
  return ReactDOM.createPortal(
    slideBack,
    document.getElementById("background-hook")
  );
};

export default Slider;
