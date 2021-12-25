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
  const bodyDirection = useRef("D");
  const ref = useRef(0);

  useEffect(() => {
    bodyRef.current.style.top = `${(bodyParts - index) * 15 + 250}px`;
    if (Object.entries(newBodyPartDetails).length > 0) {
      bodyRef.current.style.top = `${newBodyPartDetails.top}px`;
      bodyRef.current.style.bottom = `${newBodyPartDetails.bottom}px`;
      bodyRef.current.style.left = `${newBodyPartDetails.left}px`;
      bodyRef.current.style.right = `${newBodyPartDetails.right}px`;
      ref.current = newBodyPartDetails.ref;
      bodyDirection.current = newBodyPartDetails.bodyDirection;
    }
  }, []);

  useEffect(() => {
    if (playing && !gameOver) {
      const id = setInterval(() => {
        const pos = bodyRef.current.getBoundingClientRect();
        let update = "";
        if (bodyDirection.current === "D" || bodyDirection.current === "U") {
          if (bodyDirection.current === "D") {
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
        } else if (
          bodyDirection.current === "R" ||
          bodyDirection.current === "L"
        ) {
          if (bodyDirection.current === "R") {
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

          if (bodyDirection.current === "D" && pos.bottom >= parseInt(tValue)) {
            bodyDirection.current = tDirection;
            ref.current = ref.current + 1;
          } else if (
            bodyDirection.current === "R" &&
            pos.right >= parseInt(tValue)
          ) {
            bodyDirection.current = tDirection;
            ref.current = ref.current + 1;
          } else if (
            bodyDirection.current === "U" &&
            pos.top <= parseInt(tValue)
          ) {
            bodyDirection.current = tDirection;
            ref.current = ref.current + 1;
          } else if (
            bodyDirection.current === "L" &&
            pos.left <= parseInt(tValue)
          ) {
            bodyDirection.current = tDirection;
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
