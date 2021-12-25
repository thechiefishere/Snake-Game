import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../context";

const Food = () => {
  const foodRef = useRef();
  const { showFood, fieldDimensions, setFoodLocation, playing, gameOver } =
    useGlobalContext();

  useEffect(() => {
    if (showFood) {
      let top =
        Math.floor(
          Math.random() * (fieldDimensions.bottom - fieldDimensions.top)
        ) + fieldDimensions.top;
      let left =
        Math.floor(
          Math.random() * (fieldDimensions.right - fieldDimensions.left)
        ) + fieldDimensions.left;

      if (top <= fieldDimensions.top + 5) {
        top += 15;
      } else if (top + 20 >= fieldDimensions.bottom - 5) {
        top -= 15;
      }
      if (left <= fieldDimensions.left - 5) {
        left += 15;
      } else if (left + 20 >= fieldDimensions.right + 5) {
        left -= 15;
      }
      foodRef.current.style.top = `${top}px`;
      foodRef.current.style.left = `${left}px`;

      const pos = foodRef.current.getBoundingClientRect();
      const location = {
        top: top,
        left: left,
        bottom: top + pos.height,
        right: left + pos.width,
      };
      setFoodLocation(location);
    }
  }, [showFood]);

  return (
    <div
      ref={foodRef}
      className={`food ${showFood && playing && !gameOver && "show-food"}`}
    ></div>
  );
};

export default Food;
