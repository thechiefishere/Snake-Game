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
  const [collisionWithWall, setCollisionWithWall] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [gameSpeed, setGameSpeed] = useState(30);

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
    if (foodEaten) {
      setFoodEaten(false);
      setCollisionWithFood(false);
      const id = setTimeout(() => {
        setShowFood(true);
      }, 6000);
    }
  }, [foodEaten]);

  useEffect(() => {
    if (collisionWithFood === true && showFood === true) {
      setFoodEaten(true);
      setShowFood(false);
      setBodyParts((prev) => prev + 1);
      setScore((prev) => prev + 10);
      setCollisionWithFood(false);
      if (score > 0 && score % 20 === 0) {
        if (score >= 90) {
          setGameSpeed((prev) => prev - 2);
        } else {
          setGameSpeed((prev) => prev - 5);
        }
      }
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

  const checkWallCollision = () => {
    if (direction === "D") {
      if (headPosition.bottom >= fieldDimensions.bottom - 5) {
        setCollisionWithWall(true);
      }
    } else if (direction === "U") {
      if (headPosition.top <= fieldDimensions.top + 5) {
        setCollisionWithWall(true);
      }
    } else if (direction === "R") {
      if (headPosition.right >= fieldDimensions.right - 5) {
        setCollisionWithWall(true);
      }
    } else if (direction === "L") {
      if (headPosition.left <= fieldDimensions.left + 5) {
        setCollisionWithWall(true);
      }
    }
  };

  useEffect(() => {
    if (collisionWithWall) {
      setGameOver(true);
      setCollisionWithWall(false);
    }
  }, [collisionWithWall]);

  const restart = () => {
    setPlaying(false);
    window.location.reload(false);
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
        checkWallCollision,
        gameOver,
        score,
        playing,
        setPlaying,
        restart,
        gameSpeed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
