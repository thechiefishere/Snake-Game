import React, { useRef, useEffect, useState } from "react";
import { useGlobalContext } from "../context";

const SnakeBodyPart = ({ index }) => {
  const bodyRef = useRef();
  const { turningPoints } = useGlobalContext();
  const [bodyPosition, setBodyPosition] = useState({});
  const [bodyDirection, setBodyDirection] = useState("D");
  const [turningIndex, setTurningIndex] = useState(0);

  useEffect(() => {
    bodyRef.current.style.top = `${index * 15 + 250}px`;
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const pos = bodyRef.current.getBoundingClientRect();
      let update = "";
      if (bodyDirection === "D" || bodyDirection === "U") {
        if (bodyDirection === "D") {
          update = pos.top + 5;
        } else {
          update = pos.top - 5;
        }
        bodyRef.current.style.top = `${update}px`;
        setBodyPosition({
          ...bodyPosition,
          top: update,
          bottom: update + pos.height,
        });
      } else if (bodyDirection === "R" || bodyDirection === "L") {
        if (bodyDirection === "R") {
          update = pos.left + 5;
        } else {
          update = pos.left - 5;
        }
        bodyRef.current.style.left = `${update}px`;
        setBodyPosition({
          ...bodyPosition,
          left: update,
          right: update + pos.width,
        });
      }

      if (turningPoints.length > turningIndex) {
        const tPoint = turningPoints[turningIndex];
        const arr = tPoint.split(" ");
        const tValue = arr[0];
        const tDirection = arr[1];
        if (update === parseInt(tValue)) {
          setBodyDirection(tDirection);
          setTurningIndex((prev) => prev + 1);
        }
      }
    }, 100);
    return () => {
      clearInterval(id);
    };
  }, [bodyPosition]);

  //   if(index === bodyParts - 1) {
  //     turningPoints.shift();
  //     setTurningPoints([...turningPoints]);
  //   }

  return <div ref={bodyRef} className="bodypart"></div>;
};

export default SnakeBodyPart;
