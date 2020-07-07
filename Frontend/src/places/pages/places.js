import React, { useState, useEffect, useContext } from "react";
import PlaceList from "../components/place-list";
import Background from "../components/background";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";
import BottomBar from "../components/bottom-bar";
import "./places.css";
const Places = (props) => {
  const [option, setOption] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const auth = useContext(AuthContext);
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userID = auth.userID;
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/places/Diary`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        setLoadedPlaces(responseData);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userID, auth.token]);

  const optionHandler = (name) => {
    setOption(name);
    setIsVisible(true);
  };
  return (
    <React.Fragment>
      <Background
        image={require("../../Images/andrew-neel-1-29wyvvLJA-unsplash.jpg")}
      />
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="placeWait">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList
          places={loadedPlaces}
          option={option}
          isVisible={isVisible}
        />
      )}
      {!isLoading && !loadedPlaces && (
        <div className="placeWait">
          <Card className="place-empty">
            <h2>Place not found !!</h2>
          </Card>
        </div>
      )}
      <BottomBar clickHandler={optionHandler} hasItems={!!loadedPlaces} />
    </React.Fragment>
  );
};
export default Places;
