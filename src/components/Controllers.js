import React from "react";
import { useGlobalContext } from "../context";
import {
  FaArrowCircleUp,
  FaArrowCircleDown,
  FaArrowCircleRight,
  FaArrowCircleLeft,
} from "react-icons/fa";

const Controllers = () => {
  const { setDirection, direction, setTurningPoints, headPosition, playing } =
    useGlobalContext();

  /**
   * Arrows changes direction of snake by updating
   * snake turningPoints.
   * Direction can not be changed from a side to its
   * opposite i.e up to down.
   */
  return (
    <section className="controllers">
      <FaArrowCircleUp
        onClick={() => {
          if (!playing) return;
          if (direction != "U" && direction != "D") {
            if (direction === "R") {
              setTurningPoints((prev) => [
                ...prev,
                `${headPosition.right + 2} U`,
              ]);
            } else {
              setTurningPoints((prev) => [
                ...prev,
                `${headPosition.left - 2} U`,
              ]);
            }
            setDirection("U");
          }
        }}
        className="controll controllers-up"
      />
      <FaArrowCircleRight
        onClick={() => {
          if (!playing) return;
          if (direction != "R" && direction != "L") {
            if (direction === "D") {
              setTurningPoints((prev) => [
                ...prev,
                `${headPosition.bottom + 2} R`,
              ]);
            } else {
              setTurningPoints((prev) => [
                ...prev,
                `${headPosition.top - 2} R`,
              ]);
            }
            setDirection("R");
          }
        }}
        className="controll controllers-right"
      />
      <FaArrowCircleDown
        onClick={() => {
          if (!playing) return;
          if (direction != "D" && direction != "U") {
            if (direction === "R") {
              setTurningPoints((prev) => [
                ...prev,
                `${headPosition.right + 2} D`,
              ]);
            } else {
              setTurningPoints((prev) => [
                ...prev,
                `${headPosition.left - 2} D`,
              ]);
            }
            setDirection("D");
          }
        }}
        className="controll controllers-down"
      />
      <FaArrowCircleLeft
        onClick={() => {
          if (!playing) return;
          if (direction != "L" && direction != "R") {
            if (direction === "D") {
              setTurningPoints((prev) => [
                ...prev,
                `${headPosition.bottom + 2} L`,
              ]);
            } else {
              setTurningPoints((prev) => [
                ...prev,
                `${headPosition.top - 2} L`,
              ]);
            }
            setDirection("L");
          }
        }}
        className="controll controllers-left"
      />
    </section>
  );
};

export default Controllers;
