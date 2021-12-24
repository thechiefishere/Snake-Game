import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../context";

const SnakeHead = () => {
  const headRef = useRef();
  const {
    setHeadPosition,
    headPosition,
    direction,
    bodyParts,
    checkIfFoodIsEaten,
  } = useGlobalContext();

  useEffect(() => {
    const pos = headRef.current.getBoundingClientRect();
    headRef.current.style.top = `${(bodyParts + 1) * 15 + 250}px`;
    const position = {
      top: pos.top,
      left: pos.left,
      bottom: pos.bottom,
      right: pos.right,
    };
    setHeadPosition(position);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const pos = headRef.current.getBoundingClientRect();
      let update = "";
      if (direction === "D" || direction === "U") {
        if (direction === "D") {
          update = pos.top + 1;
        } else {
          update = pos.top - 1;
        }
        headRef.current.style.top = `${update}px`;
        setHeadPosition({
          ...headPosition,
          top: update,
          bottom: update + pos.height,
        });
      } else if (direction === "R" || direction === "L") {
        if (direction === "R") {
          update = pos.left + 1;
        } else {
          update = pos.left - 1;
        }
        headRef.current.style.left = `${update}px`;
        setHeadPosition({
          ...headPosition,
          left: update,
          right: update + pos.width,
        });
      }

      checkIfFoodIsEaten();
    }, 50);
    return () => {
      clearInterval(id);
    };
  }, [headPosition]);

  return (
    <div className="head head-y" ref={headRef}>
      <div className="head-eye"></div>
      <div className="head-eye"></div>
    </div>
  );
};

export default SnakeHead;
