import React from "react";
import SnakeBodyPart from "./SnakeBodyPart";
import { useGlobalContext } from "../context";

const Snake = () => {
  const { bodyArr } = useGlobalContext();

  return (
    <section className="snake">
      {bodyArr.map((arr, index) => {
        return <SnakeBodyPart key={index} index={index} />;
      })}
    </section>
  );
};

export default Snake;
