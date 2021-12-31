import React from "react";
import BodyPart from "./BodyPart";
import { useGlobalContext } from "../context";

const Snake = () => {
  const { bodyArr } = useGlobalContext();

  return (
    <section className="snake">
      {bodyArr.map((arr, index) => {
        return <BodyPart key={index} index={index} />;
      })}
    </section>
  );
};

export default Snake;
