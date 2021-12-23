import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [bodyParts, setBodyParts] = useState(3);
  const [bodyArr, setBodyArr] = useState([]);
  const [fieldDimensions, setFieldDimensions] = useState(0);
  // const [headPosition, setHeadPosition] = useState({});
  const [direction, setDirection] = useState("D");
  const [turningPoints, setTurningPoints] = useState([]);
  const [showFood, setShowFood] = useState(false);
  const [foodEaten, setFoodEaten] = useState(true);
  const [regulateFoodEaten, setRegulateFoodEaten] = useState(false);
  const [foodLocation, setFoodLocation] = useState(0);

  useEffect(() => {
    for (let i = 0; i < bodyParts; i++) {
      setBodyArr((prev) => [...prev, i]);
    }
  }, [bodyParts]);

  useEffect(() => {
    let id = "";
    if (foodEaten) {
      setFoodEaten(false);
      id = setTimeout(() => {
        setShowFood(true);
      }, 6000);
    }

    return () => {
      if (id) {
        // clearTimeout(id);
      }
    };
  }, [foodEaten]);

  const checkIfFoodIsEaten = () => {
    let collide = false;

    if (direction === "D") {
      if (
        headPosition.right >= foodLocation.left &&
        headPosition.left <= foodLocation.right &&
        headPosition.bottom >= foodLocation.top &&
        headPosition.top <= foodLocation.bottom
      ) {
        collide = true;
      }
    } else if (direction === "U") {
      if (
        headPosition.right >= foodLocation.left &&
        headPosition.left <= foodLocation.right &&
        headPosition.top <= foodLocation.bottom &&
        headPosition.bottom >= foodLocation.top
      ) {
        collide = true;
      }
    } else if (direction === "R") {
      if (
        headPosition.top <= foodLocation.bottom &&
        headPosition.bottom >= foodLocation.top &&
        headPosition.right >= foodLocation.left &&
        headPosition.left <= foodLocation.right
      ) {
        collide = true;
      }
    } else if (direction === "L") {
      if (
        headPosition.top <= foodLocation.bottom &&
        headPosition.bottom >= foodLocation.top &&
        headPosition.left <= foodLocation.right &&
        headPosition.right >= foodLocation.left
      ) {
        collide = true;
      }
    }
    if (collide === true) {
      setFoodEaten(true);
      setShowFood(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        headPosition,
        fieldDimensions,
        setFieldDimensions,
        setHeadPosition,
        setDirection,
        direction,
        bodyArr,
        bodyParts,
        setBodyParts,
        turningPoints,
        setTurningPoints,
        showFood,
        setFoodEaten,
        foodLocation,
        setFoodLocation,
        checkIfFoodIsEaten,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
