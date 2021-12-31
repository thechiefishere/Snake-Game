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

  /**
   * Effect that initializes bodyParts.
   */
  useEffect(() => {
    bodyRef.current.style.top = `${(bodyParts - index) * 15 + 250}px`;

    //Sets the positioning and other values of bodyParts
    //added after every food eating.
    if (Object.entries(newBodyPartDetails).length > 0) {
      bodyRef.current.style.top = `${newBodyPartDetails.top}px`;
      bodyRef.current.style.bottom = `${newBodyPartDetails.bottom}px`;
      bodyRef.current.style.left = `${newBodyPartDetails.left}px`;
      bodyRef.current.style.right = `${newBodyPartDetails.right}px`;
      turnRef.current = newBodyPartDetails.ref;
      bodyDirection.current = newBodyPartDetails.bodyDirection;
    }
  }, []);

  /**
   * Effect that handles movement of bodypart.
   */
  useEffect(() => {
    if (playing && !gameOver) {
      const id = setInterval(() => {
        const bodyPartBoundingRect = bodyRef.current.getBoundingClientRect();
        updateBodyPartBoundingRect(bodyPartBoundingRect, bodyDirection.current);
        makeBodyPartTurn(
          bodyPartBoundingRect,
          allTurningPoints,
          turnRef.current
        );

        if (index === 0) {
          checkHeadCollisions();
          setUpdatedHeadPosition(bodyPartBoundingRect);
        }

        if (index === bodyParts - 1) {
          const details = locationOfPotentialNewBodyPart(
            bodyPosition,
            bodyDirection
          );
          setNewBodyPartDetails(details);
        }
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
  const updateBodyPartBoundingRect = (bodyPartBoundingRect, bodyDirection) => {
    let newPosition = "";
    if (bodyDirection === "D") {
      newPosition = bodyPartBoundingRect.top + bodyMoveLength;
      updateBodyPosition(bodyPartBoundingRect, "Top", newPosition);
    } else if (bodyDirection === "U") {
      newPosition = bodyPartBoundingRect.top - bodyMoveLength;
      updateBodyPosition(bodyPartBoundingRect, "Top", newPosition);
    } else if (bodyDirection === "R") {
      newPosition = bodyPartBoundingRect.left + bodyMoveLength;
      updateBodyPosition(bodyPartBoundingRect, "Left", newPosition);
    } else if (bodyDirection === "L") {
      newPosition = bodyPartBoundingRect.left - bodyMoveLength;
      updateBodyPosition(bodyPartBoundingRect, "Left", newPosition);
    }
  };

  /**
   * Set body position to its new bounding rectangle
   * @param {The bounding rectange of the body part} bodyPartBoundingRect
   * @param {It is either the top or left side that needs to
   * be updated} sideToUpdate
   * @param {The new position to place the sideToUpdate} newPosition
   */
  const updateBodyPosition = (
    bodyPartBoundingRect,
    sideToUpdate,
    newPosition
  ) => {
    if (sideToUpdate === "Top") {
      bodyRef.current.style.top = `${newPosition}px`;
      setBodyPosition({
        ...bodyPosition,
        top: newPosition,
        bottom: newPosition + bodyPartBoundingRect.height,
      });
    } else {
      bodyRef.current.style.left = `${newPosition}px`;
      setBodyPosition({
        ...bodyPosition,
        left: newPosition,
        right: newPosition + bodyPartBoundingRect.width,
      });
    }
  };

  /**
   * Changes body part direction.
   * @param {The bounding rectangle of the bodypart} bodyPartBoundingRect
   * @param {An array of all points (e.g "122 R") where direction was changed} allTurningPoints
   * @param {the index of the last turn made by the body part} indexOfLastTurn
   */
  const makeBodyPartTurn = (
    bodyPartBoundingRect,
    allTurningPoints,
    indexOfLastTurn
  ) => {
    if (allTurningPoints.length > indexOfLastTurn) {
      const tPoint = allTurningPoints[indexOfLastTurn];
      const arr = tPoint.split(" ");
      const tValue = arr[0];
      const tDirection = arr[1];

      if (
        (bodyDirection.current === "D") &
        (bodyPartBoundingRect.bottom >= parseInt(tValue))
      ) {
        bodyDirection.current = tDirection;
        turnRef.current = indexOfLastTurn + 1;
      } else if (
        bodyDirection.current === "R" &&
        bodyPartBoundingRect.right >= parseInt(tValue)
      ) {
        bodyDirection.current = tDirection;
        turnRef.current = indexOfLastTurn + 1;
      } else if (
        bodyDirection.current === "U" &&
        bodyPartBoundingRect.top <= parseInt(tValue)
      ) {
        bodyDirection.current = tDirection;
        turnRef.current = indexOfLastTurn + 1;
      } else if (
        bodyDirection.current === "L" &&
        bodyPartBoundingRect.left <= parseInt(tValue)
      ) {
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
   * @param {The boounding rect of the head(index 0)} bodyPartBoundingRect
   */
  const setUpdatedHeadPosition = (bodyPartBoundingRect) => {
    setHeadPosition({
      top: bodyPartBoundingRect.top,
      bottom: bodyPartBoundingRect.bottom,
      left: bodyPartBoundingRect.left,
      right: bodyPartBoundingRect.right,
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
    };
    if (bodyDirection.current === "D") {
      details.top = details.top - 13;
    } else if (bodyDirection.current === "U") {
      details.top = details.top + 13;
    } else if (bodyDirection.current === "R") {
      details.left = details.left - 13;
    } else if (bodyDirection.current === "L") {
      details.left = details.left + 13;
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
