import React, { useRef, useEffect, useState } from "react";
import { useGlobalContext } from "../context";

const BodyPart = ({ index }) => {
  const bodyRef = useRef();
  const {
    turningPoints: allTurningPoints,
    bodyParts,
    newBodyPartDetails,
    setNewBodyPartDetails,
    setHeadPosition,
    checkIfFoodIsEaten,
    checkWallCollision,
    playing,
    gameOver,
    gameSpeed,
    bodyMoveLength,
  } = useGlobalContext();
  const [bodyPosition, setBodyPosition] = useState({});
  const bodyDirection = useRef("D");
  const turnRef = useRef(0);
  const [bodyWidthAndHeight, setBodyWidthAndHeight] = useState(15);
  let bodyTop = useRef(0);
  let bodyLeft = useRef(0);

  /**
   * Effect that initializes bodyParts.
   */
  useEffect(() => {
    const top = (bodyParts - index) * 15 + 250;
    const left = window.innerWidth / 2 - 7;
    bodyRef.current.style.top = `${top}px`;
    bodyRef.current.style.left = `${left}px`;
    bodyTop.current = top;
    bodyLeft.current = left;

    //Sets the positioning and other values of bodyParts
    //added after every food eating.
    if (Object.entries(newBodyPartDetails).length > 0) {
      bodyRef.current.style.top = `${newBodyPartDetails.top}px`;
      bodyRef.current.style.bottom = `${newBodyPartDetails.bottom}px`;
      bodyRef.current.style.left = `${newBodyPartDetails.left}px`;
      bodyRef.current.style.right = `${newBodyPartDetails.right}px`;
      turnRef.current = newBodyPartDetails.ref;
      bodyDirection.current = newBodyPartDetails.bodyDirection;
      bodyTop.current = newBodyPartDetails.bodyTop;
      bodyLeft.current = newBodyPartDetails.bodyLeft;
    }
  }, []);

  /**
   * Effect that handles movement of bodypart.
   */
  useEffect(() => {
    if (playing && !gameOver) {
      const id = setInterval(() => {
        const updatedTopAndLeft = updateBodyPartBoundingRect(
          bodyTop.current,
          bodyLeft.current,
          bodyDirection.current
        );
        makeBodyPartTurn(
          bodyTop.current,
          bodyLeft.current,
          allTurningPoints,
          turnRef.current
        );

        if (index === 0) {
          checkHeadCollisions();
          setUpdatedHeadPosition(bodyTop.current, bodyLeft.current);
        }

        if (index === bodyParts - 1) {
          const details = locationOfPotentialNewBodyPart(
            bodyPosition,
            bodyDirection
          );
          setNewBodyPartDetails(details);
        }
        bodyTop.current = updatedTopAndLeft.top;
        bodyLeft.current = updatedTopAndLeft.left;
      }, gameSpeed);
      return () => {
        clearInterval(id);
      };
    }
  }, [bodyPosition, playing]);

  /**
   * Move the bodypart from it's current position to the next position.
   * @param {The bounding rectangle of the body part to be updated.} bodyPartBoundingRect
   */
  const updateBodyPartBoundingRect = (top, left, bodyDirection) => {
    let newPosition = "";
    if (bodyDirection === "D") {
      newPosition = top += bodyMoveLength;
      updateBodyPosition(top, "Top", newPosition);
    } else if (bodyDirection === "U") {
      newPosition = top -= bodyMoveLength;
      updateBodyPosition(bodyWidthAndHeight, "Top", newPosition);
    } else if (bodyDirection === "R") {
      newPosition = left += bodyMoveLength;
      updateBodyPosition(left, "Left", newPosition);
    } else if (bodyDirection === "L") {
      newPosition = left -= bodyMoveLength;
      updateBodyPosition(bodyWidthAndHeight, "Left", newPosition);
    }

    return {
      top: top,
      left: left,
    };
  };

  /**
   * Set body position to its new top or left
   * @param {Height or width of the bodypart} width
   * @param {It is either the top or left side that needs to
   * be updated} sideToUpdate
   * @param {The new position to place the sideToUpdate} newPosition
   */
  const updateBodyPosition = (width, sideToUpdate, newPosition) => {
    if (sideToUpdate === "Top") {
      bodyRef.current.style.top = `${newPosition}px`;
      setBodyPosition({
        ...bodyPosition,
        top: newPosition,
        bottom: newPosition + width,
      });
    } else {
      bodyRef.current.style.left = `${newPosition}px`;
      setBodyPosition({
        ...bodyPosition,
        left: newPosition,
        right: newPosition + width,
      });
    }
  };

  /**
   * Changes body part direction.
   * @param {Top dimension of the bodyPart} top
   * @param {Left dimension of the bodyPart} left
   * @param {An array of all points (e.g "122 R") where direction was changed} allTurningPoints
   * @param {the index of the last turn made by the body part} indexOfLastTurn
   */
  const makeBodyPartTurn = (top, left, allTurningPoints, indexOfLastTurn) => {
    if (allTurningPoints.length > indexOfLastTurn) {
      const tPoint = allTurningPoints[indexOfLastTurn];
      const arr = tPoint.split(" ");
      const tValue = arr[0];
      const tDirection = arr[1];

      if (
        (bodyDirection.current === "D") &
        (top + bodyWidthAndHeight >= parseInt(tValue))
      ) {
        bodyDirection.current = tDirection;
        turnRef.current = indexOfLastTurn + 1;
      } else if (
        bodyDirection.current === "R" &&
        left + bodyWidthAndHeight >= parseInt(tValue)
      ) {
        bodyDirection.current = tDirection;
        turnRef.current = indexOfLastTurn + 1;
      } else if (bodyDirection.current === "U" && top <= parseInt(tValue)) {
        bodyDirection.current = tDirection;
        turnRef.current = indexOfLastTurn + 1;
      } else if (bodyDirection.current === "L" && left <= parseInt(tValue)) {
        bodyDirection.current = tDirection;
        turnRef.current = indexOfLastTurn + 1;
      }
    }
  };

  /**
   * Check if the head(bodypart 0) has
   * collided with wall or food.
   */
  const checkHeadCollisions = () => {
    checkIfFoodIsEaten();
    checkWallCollision();
  };

  /**
   * Updates headPosition in context.js
   * @param {Top dimension of the head(index 0)} top
   * @param {Left dimension of the head(index 0)} left
   */
  const setUpdatedHeadPosition = (top, left) => {
    setHeadPosition({
      top: top,
      bottom: top + bodyWidthAndHeight,
      left: left,
      right: left + bodyWidthAndHeight,
    });
  };

  /**
   * Uses the location of the last body part to set location
   * of a potential new body part
   * @param {The position of the last body part} bodyPosition
   * @param {The direction of the last body part} bodyDirection
   * @returns
   */
  const locationOfPotentialNewBodyPart = (bodyPosition, bodyDirection) => {
    const details = {
      top: bodyPosition.top,
      bottom: bodyPosition.bottom,
      left: bodyPosition.left,
      right: bodyPosition.right,
      ref: turnRef.current,
      bodyDirection: bodyDirection.current,
      bodyTop: bodyTop.current,
      bodyLeft: bodyLeft.current,
    };
    if (bodyDirection.current === "D") {
      details.top = details.top - 13;
      details.bodyTop -= 13;
    } else if (bodyDirection.current === "U") {
      details.top = details.top + 13;
      details.bodyTop += 13;
    } else if (bodyDirection.current === "R") {
      details.left = details.left - 13;
      details.bodyLeft -= 13;
    } else if (bodyDirection.current === "L") {
      details.left = details.left + 13;
      details.bodyLeft += 13;
    }

    return details;
  };

  return (
    <div
      data-testid={`bodyPart${index}`}
      ref={bodyRef}
      className={`bodypart ${index === 0 && "head"}`}
    ></div>
  );
};

export default BodyPart;
