import React, { useState, useEffect, useRef } from "react";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./place-item";
import Arrow from "../../users/components/Arrow";
import Dots from "./Dots";
import "./place-list.css";
const getWidth = () => {
  return 452;
};

const PlaceList = (props) => {
  const [isVisible, setIsVisible] = useState(props.isVisible);
  const ref = useRef(null);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });
  const places = props.places;
  const len = places.length;
  const maxDotIndex = len / 3 + 1;
  let initalPlace = places;
  if (len > 5) initalPlace = places.slice(0, 6);
  const [state, setState] = useState({
    translate: getWidth(),
    transition: 0.45,
    activeIndex: 0,
    dotIndex: 0,
    _places: initalPlace,
  });

  const { translate, transition, activeIndex, dotIndex, _places } = state;
  const transitionEnd = useRef();
  useEffect(() => {
    transitionEnd.current = smoothTransition;
  });
  useEffect(() => {
    if (transition === 0) setState({ ...state, transition: 0.45 });
  }, [transition, state]);
  useEffect(() => {
    const smooth = () => transitionEnd.current();
    const transitionComplete = window.addEventListener("transitionend", smooth);
    return () => {
      window.removeEventListener("transitionend", transitionComplete);
    };
  }, []);

  const smoothTransition = () => {
    let placeList = [];
    let backarray = [];
    let middlearray = [];
    let frontarray = [];
    const size = 1 + ((len - dotIndex * 3) % 3);
    if (dotIndex > 0) {
      backarray = places.splice((dotIndex - 1) * 3, (dotIndex - 1) * 3 + size);
    }
    if (dotIndex < maxDotIndex) {
      frontarray = places.splice((dotIndex + 1) * 3, (dotIndex + 1) * 3 + size);
    }
    middlearray = places.splice(
      (dotIndex - 1) * 3 + size,
      (dotIndex - 1) * 3 + size + 3
    );
    placeList = backarray.concat(middlearray).concat(frontarray);
    setState({
      ...state,
      translate: getWidth(),
      transition: 0,
      _places: placeList,
    });
  };

  const nextSlide = () => {
    if (dotIndex < 1) {
      setState({
        ...state,
        translate: translate + getWidth(),
        dotIndex: dotIndex + 1,
        activeIndex: activeIndex === places.length - 1 ? 0 : activeIndex + 1,
      });
    }
  };

  const prevSlide = () => {
    if (dotIndex > 0) {
      setState({
        ...state,
        translate: translate - getWidth(),
        dotIndex: dotIndex - 1,
        activeIndex: activeIndex === 0 ? places.length - 1 : activeIndex - 1,
      });
    }
  };

  const styles = {
    transform: `translate(-${translate}px, 0px)`,
    transition: `transform ease-out ${transition}s`,
    width: `${getWidth() * (props.places.length + 1)}px`,
  };

  if (props.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Journal Entry!!</h2>
        </Card>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div className="place-slider">
        <ul ref={ref} className="place-list" style={styles}>
          {_places.map((place, i) => (
            <PlaceItem
              key={i}
              id={place.id}
              title={place.title}
              country={place.country}
              imageURL={place.image}
              description={place.description}
              option={props.option}
              optionVisible={isVisible}
            />
          ))}
        </ul>
      </div>
      {len > 3 && <Arrow direction="left" handleClick={prevSlide} />}
      {len > 3 && <Arrow direction="right" handleClick={nextSlide} />}
      {len > 3 && <Dots count="2" activeIndex={activeIndex % 2} />}
    </React.Fragment>
  );
};

export default PlaceList;
