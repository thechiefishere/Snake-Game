import React from "react";
import { useGlobalContext } from "../context";
import {
  FaArrowCircleUp,
  FaArrowCircleDown,
  FaArrowCircleRight,
  FaArrowCircleLeft,
} from "react-icons/fa";

const Controllers = () => {
  const { setDirection, direction, setTurningPoints, headPosition } =
    useGlobalContext();

  return (
    <section className="controllers">
      <FaArrowCircleUp
        onClick={() => {
          if (direction != "U" && direction != "D") {
            setTurningPoints((prev) => [...prev, `${headPosition.left} U`]);
            setDirection("U");
          }
        }}
        className="controll controllers-up"
      />
      <FaArrowCircleRight
        onClick={() => {
          if (direction != "R" && direction != "L") {
            setTurningPoints((prev) => [...prev, `${headPosition.top} R`]);
            setDirection("R");
          }
        }}
        className="controll controllers-right"
      />
      <FaArrowCircleDown
        onClick={() => {
          if (direction != "D" && direction != "U") {
            setTurningPoints((prev) => [...prev, `${headPosition.left} D`]);
            setDirection("D");
          }
        }}
        className="controll controllers-down"
      />
      <FaArrowCircleLeft
        onClick={() => {
          if (direction != "L" && direction != "R") {
            setTurningPoints((prev) => [...prev, `${headPosition.top} L`]);
            setDirection("L");
          }
        }}
        className="controll controllers-left"
      />
    </section>
  );
};

export default Controllers;
