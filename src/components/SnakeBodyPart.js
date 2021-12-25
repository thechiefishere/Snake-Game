import React, { useRef, useEffect, useState } from "react";
import { useGlobalContext } from "../context";

const SnakeBodyPart = ({ index }) => {
  const bodyRef = useRef();
  const {
    turningPoints,
    bodyParts,
    newBodyPartDetails,
    setNewBodyPartDetails,
    setHeadPosition,
    checkIfFoodIsEaten,
    checkWallCollision,
    playing,
    gameOver,
    gameSpeed,
  } = useGlobalContext();
  const [bodyPosition, setBodyPosition] = useState({});
  const [bodyDirection, setBodyDirection] = useState("D");
  const ref = useRef(0);

  useEffect(() => {
    bodyRef.current.style.top = `${(bodyParts - index) * 15 + 250}px`;
    if (Object.entries(newBodyPartDetails).length > 0) {
      bodyRef.current.style.top = `${newBodyPartDetails.top}px`;
      bodyRef.current.style.bottom = `${newBodyPartDetails.bottom}px`;
      bodyRef.current.style.left = `${newBodyPartDetails.left}px`;
      bodyRef.current.style.right = `${newBodyPartDetails.right}px`;
      ref.current = newBodyPartDetails.ref;
      setBodyDirection(newBodyPartDetails.bodyDirection);
    }
  }, []);

  useEffect(() => {
    if (playing && !gameOver) {
      const id = setInterval(() => {
        const pos = bodyRef.current.getBoundingClientRect();
        let update = "";
        if (bodyDirection === "D" || bodyDirection === "U") {
          if (bodyDirection === "D") {
            update = pos.top + 1;
          } else {
            update = pos.top - 1;
          }
          bodyRef.current.style.top = `${update}px`;
          setBodyPosition({
            ...bodyPosition,
            top: update,
            bottom: update + pos.height,
          });
        } else if (bodyDirection === "R" || bodyDirection === "L") {
          if (bodyDirection === "R") {
            update = pos.left + 1;
          } else {
            update = pos.left - 1;
          }
          bodyRef.current.style.left = `${update}px`;
          setBodyPosition({
            ...bodyPosition,
            left: update,
            right: update + pos.width,
          });
        }

        if (turningPoints.length > ref.current) {
          const tPoint = turningPoints[ref.current];
          const arr = tPoint.split(" ");
          const tValue = arr[0];
          const tDirection = arr[1];

          if (bodyDirection === "D" && pos.bottom === parseInt(tValue)) {
            setBodyDirection(tDirection);
            ref.current = ref.current + 1;
          } else if (bodyDirection === "R" && pos.right === parseInt(tValue)) {
            setBodyDirection(tDirection);
            ref.current = ref.current + 1;
          } else if (bodyDirection === "U" && pos.top === parseInt(tValue)) {
            setBodyDirection(tDirection);
            ref.current = ref.current + 1;
          } else if (bodyDirection === "L" && pos.left === parseInt(tValue)) {
            setBodyDirection(tDirection);
            ref.current = ref.current + 1;
          }
        }
        if (index === 0) {
          checkIfFoodIsEaten();
          checkWallCollision();
          setHeadPosition({
            top: pos.top,
            bottom: pos.bottom,
            left: pos.left,
            right: pos.right,
          });
        }
        if (index === bodyParts - 1) {
          const details = {
            top: bodyPosition.top,
            bottom: bodyPosition.bottom,
            left: bodyPosition.left,
            right: bodyPosition.right,
            ref: ref.current,
            bodyDirection: bodyDirection,
          };
          if (bodyDirection === "D") {
            details.top = details.top - 13;
          } else if (bodyDirection === "U") {
            details.top = details.top + 13;
          } else if (bodyDirection === "R") {
            details.left = details.left - 13;
          } else if (bodyDirection === "L") {
            details.left = details.left + 13;
          }

          setNewBodyPartDetails(details);
        }
      }, gameSpeed);
      return () => {
        clearInterval(id);
      };
    }
  }, [bodyPosition, playing]);

  return (
    <div ref={bodyRef} className={`bodypart ${index === 0 && "head"}`}></div>
  );
};

export default SnakeBodyPart;
