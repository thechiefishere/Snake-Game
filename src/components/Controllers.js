import React, { useRef } from "react";
import { useGlobalContext } from "../context";
import {
  FaArrowCircleUp,
  FaArrowCircleDown,
  FaArrowCircleRight,
  FaArrowCircleLeft,
} from "react-icons/fa";

const Controllers = () => {
  const addOne = useRef(1.5);
  const { setDirection, direction, setTurningPoints, headPosition } =
    useGlobalContext();

  return (
    <section className="controllers">
      <FaArrowCircleUp
        onClick={() => {
          if (direction != "U" && direction != "D") {
            console.log("addOne.current is ", addOne.current);
            if (direction === "R") {
              setTurningPoints((prev) => [...prev, `${headPosition.right} U`]);
            } else {
              setTurningPoints((prev) => [...prev, `${headPosition.left} U`]);
            }
            setDirection("U");
            if (addOne.current === 1.5) {
              console.log("I enter here");
              addOne.current = 0;
            } else {
              addOne.current = 1.5;
            }
          }
        }}
        className="controll controllers-up"
      />
      <FaArrowCircleRight
        onClick={() => {
          if (direction != "R" && direction != "L") {
            console.log("addOne.current is ", addOne.current);
            if (direction === "D") {
              setTurningPoints((prev) => [...prev, `${headPosition.bottom} R`]);
            } else {
              setTurningPoints((prev) => [...prev, `${headPosition.top} R`]);
            }
            setDirection("R");
            if (addOne.current === 1.5) {
              console.log("I enter here");
              addOne.current = 0;
            } else {
              addOne.current = 1.5;
            }
          }
        }}
        className="controll controllers-right"
      />
      <FaArrowCircleDown
        onClick={() => {
          if (direction != "D" && direction != "U") {
            console.log("addOne.current is ", addOne.current);
            if (direction === "R") {
              setTurningPoints((prev) => [...prev, `${headPosition.right} D`]);
            } else {
              setTurningPoints((prev) => [...prev, `${headPosition.left} D`]);
            }
            setDirection("D");
            if (addOne.current === 1.5) {
              console.log("I enter here");
              addOne.current = 0;
            } else {
              addOne.current = 1.5;
            }
          }
        }}
        className="controll controllers-down"
      />
      <FaArrowCircleLeft
        onClick={() => {
          if (direction != "L" && direction != "R") {
            console.log("addOne.current is ", addOne.current);
            if (direction === "D") {
              setTurningPoints((prev) => [...prev, `${headPosition.bottom} L`]);
            } else {
              setTurningPoints((prev) => [...prev, `${headPosition.top} L`]);
            }
            setDirection("L");
            if (addOne.current === 1.5) {
              console.log("I enter here");
              addOne.current = 0;
            } else {
              addOne.current = 1.5;
            }
          }
        }}
        className="controll controllers-left"
      />
    </section>
  );
};

export default Controllers;
