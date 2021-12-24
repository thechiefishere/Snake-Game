import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [bodyParts, setBodyParts] = useState(4);
  const [bodyArr, setBodyArr] = useState([]);
  const [fieldDimensions, setFieldDimensions] = useState(0);
  const [headPosition, setHeadPosition] = useState({});
  const [direction, setDirection] = useState("D");
  const [turningPoints, setTurningPoints] = useState([]);
  const [showFood, setShowFood] = useState(false);
  const [foodEaten, setFoodEaten] = useState(true);
  const [foodLocation, setFoodLocation] = useState(0);
  const [collisionWithFood, setCollisionWithFood] = useState(false);
  const [newBodyPartDetails, setNewBodyPartDetails] = useState({});

  useEffect(() => {
    for (let i = 0; i < bodyParts; i++) {
      setBodyArr((prev) => [...prev, i]);
    }
  }, []);

  useEffect(() => {
    if (bodyParts > 4) {
      setBodyArr((prev) => [...prev, bodyParts - 1]);
    }
  }, [bodyParts]);

  useEffect(() => {
    let id = "";
    if (foodEaten) {
      setFoodEaten(false);
      setCollisionWithFood(false);
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

  useEffect(() => {
    if (collisionWithFood === true && showFood === true) {
      setFoodEaten(true);
      setShowFood(false);
      setBodyParts((prev) => prev + 1);
      setCollisionWithFood(false);
    }
  }, [collisionWithFood]);

  const checkIfFoodIsEaten = () => {
    setCollisionWithFood(false);

    if (direction === "D") {
      if (
        headPosition.right >= foodLocation.left &&
        headPosition.left <= foodLocation.right &&
        headPosition.bottom >= foodLocation.top &&
        headPosition.top <= foodLocation.bottom
      ) {
        setCollisionWithFood(true);
      }
    } else if (direction === "U") {
      if (
        headPosition.right >= foodLocation.left &&
        headPosition.left <= foodLocation.right &&
        headPosition.top <= foodLocation.bottom &&
        headPosition.bottom >= foodLocation.top
      ) {
        setCollisionWithFood(true);
      }
    } else if (direction === "R") {
      if (
        headPosition.top <= foodLocation.bottom &&
        headPosition.bottom >= foodLocation.top &&
        headPosition.right >= foodLocation.left &&
        headPosition.left <= foodLocation.right
      ) {
        setCollisionWithFood(true);
      }
    } else if (direction === "L") {
      if (
        headPosition.top <= foodLocation.bottom &&
        headPosition.bottom >= foodLocation.top &&
        headPosition.left <= foodLocation.right &&
        headPosition.right >= foodLocation.left
      ) {
        setCollisionWithFood(true);
      }
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
        newBodyPartDetails,
        setNewBodyPartDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
