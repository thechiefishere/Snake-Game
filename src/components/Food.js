import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../context";

const Food = () => {
  const foodRef = useRef();
  const { showFood, fieldDimensions, setFoodLocation } = useGlobalContext();

  useEffect(() => {
    if (showFood) {
      let top = Math.floor(Math.random() * fieldDimensions.bottom);
      let left = Math.floor(Math.random() * fieldDimensions.right);

      if (top < fieldDimensions.top) {
        top += fieldDimensions.top;
      }
      if (left < fieldDimensions.left) {
        left += fieldDimensions.left;
      }
      foodRef.current.style.top = `${top}px`;
      foodRef.current.style.left = `${left}px`;

      const pos = foodRef.current.getBoundingClientRect();
      const location = {
        top: top,
        left: left,
        bottom: top + pos.width,
        right: top + pos.height,
      };
      setFoodLocation(location);
      console.log("foodLocation", foodRef.current.getBoundingClientRect());
    }
  }, [showFood]);

  return (
    <div ref={foodRef} className={`food ${showFood && "show-food"}`}></div>
  );
};

export default Food;
