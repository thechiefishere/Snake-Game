import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [bodyParts, setBodyParts] = useState(4);
  const [bodyArr, setBodyArr] = useState([]);
  const [fieldDimensions, setFieldDimensions] = React.useState(0);
  const [headPosition, setHeadPosition] = React.useState(0);
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
  const [playing, setPlaying] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(30);
  const [bodyMoveLength, setBodyMoveLength] = useState(1);

  /**
   * Effect that initializes bodyArr.
   * bodyArr is used to loop through the amounts of bodyPart in JSX.
   * e.g bodyArr.map()
   */
  useEffect(() => {
    for (let i = 0; i < bodyParts; i++) {
      setBodyArr((prev) => [...prev, i]);
    }
  }, []);

  /**
   * Effect that updates bodyArr each time food is eaten.
   */
  useEffect(() => {
    if (bodyParts > 4) {
      setBodyArr((prev) => [...prev, bodyParts - 1]);
    }
  }, [bodyParts]);

  /**
   * Effect that runs after food is eaten.
   */
  useEffect(() => {
    if (foodEaten) {
      setFoodEaten(false);
      setCollisionWithFood(false);
      const id = setTimeout(() => {
        setShowFood(true);
      }, 6000);
    }
  }, [foodEaten]);

  /**
   * Effect that runs whenever there is a collision with food.
   */
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
      if (gameSpeed <= 10) {
        setGameSpeed(10);
      }
    }
  }, [collisionWithFood]);

  /**
   * Checks if snake has eaten food.
   */
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

  /**
   * Checks if snake collided with wall.
   */
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

  /**
   * Effect that triggers gameOver whenever there is
   * collision with wall.
   */
  useEffect(() => {
    if (collisionWithWall) {
      setGameOver(true);
      setCollisionWithWall(false);
    }
  }, [collisionWithWall]);

  /**
   * Restarts game by reloading page.
   */
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
        bodyMoveLength,
        setBodyMoveLength,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
