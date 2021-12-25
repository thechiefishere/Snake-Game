import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../context";
import { FaPause, FaPlay } from "react-icons/fa";

const PlayingField = () => {
  const fieldRef = useRef();
  const { setFieldDimensions, gameOver, score, playing, setPlaying, restart } =
    useGlobalContext();

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

  return (
    <section ref={fieldRef} className="field">
      <h2 className="score">Score: {score}</h2>
      {playing ? (
        <FaPause className="playpause" onClick={() => setPlaying(false)} />
      ) : (
        <FaPlay className="playpause" onClick={() => setPlaying(true)} />
      )}
      {gameOver && (
        <div className="gameover">
          <h1 className="gameover-title">Game Over</h1>
          <button className="btn" onClick={() => restart()}>
            Restart
          </button>
        </div>
      )}
    </section>
  );
};

export default PlayingField;
