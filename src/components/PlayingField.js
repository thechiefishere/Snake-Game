import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../context";

const PlayingField = () => {
  const fieldRef = useRef();
  const { setFieldDimensions } = useGlobalContext();

  useEffect(() => {
    const pos = fieldRef.current.getBoundingClientRect();
    const dimensions = {
      top: pos.top,
      bottom: pos.bottom,
      left: pos.left,
      right: pos.right,
    };
    setFieldDimensions(dimensions);
  }, []);

  return <section ref={fieldRef} className="field"></section>;
};

export default PlayingField;
