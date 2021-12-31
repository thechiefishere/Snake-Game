import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../context";
import { FaPause, FaPlay } from "react-icons/fa";

const PlayingField = () => {
  const fieldRef = useRef();
  const { setFieldDimensions, gameOver, score, playing, setPlaying, restart } =
    useGlobalContext();

  /**
   * Effect that sets fieldDimensions in context.js
   */
  useEffect(() => {
    const fieldBoundingRect = fieldRef.current.getBoundingClientRect();
    const dimensions = {
      top: fieldBoundingRect.top,
      bottom: fieldBoundingRect.bottom,
      left: fieldBoundingRect.left,
      right: fieldBoundingRect.right,
    };
    setFieldDimensions(dimensions);
  }, []);

  return (
    <section ref={fieldRef} className="field">
      <h2 className="score">Score: {score}</h2>
      {playing ? (
        <FaPause
          data-testid="pause"
          className="playpause"
          onClick={() => setPlaying(false)}
        />
      ) : (
        <FaPlay
          data-testid="play"
          className="playpause"
          onClick={() => setPlaying(true)}
        />
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
