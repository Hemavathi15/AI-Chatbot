import React, { useState, useEffect } from "react";

const Container = () => {
  const [size, setSize] = useState(100); // Initial size in percentage
  const [showHeart, setShowHeart] = useState(false);
    const [stopped, setStopped] = useState(false);
  const heartExplode = () => {
    setShowHeart(true); // Show the heart
    setSize(100); // Reset size to 100%
    setStopped(false);
  };

  useEffect(() => {
    let interval;
    if (showHeart) {
      interval = setInterval(() => {
        setSize((prevSize) => {
          if (prevSize < 1000) {
            // Stop at 1000%
            return prevSize + 50; // Increase size by 10%
          } else {
            clearInterval(interval); // Clear interval when max size is reached
            setStopped(true);
            return prevSize;
          }
        });
      }, 500); // Increase size every half second
    }
    return () => {
       
        clearInterval(interval);} // Cleanup interval on unmount
  }, [showHeart]);

  return (
    <>
      <div className={`note ${showHeart ? "hide-note" : ""}`}>
        <div className="text">
          <h2>To know how much </h2>
          <img src="src/assets/peacock.png" alt="" />
          <h2>Loves you!</h2>
        </div>
        <button className="btn" onClick={heartExplode}>
          Click here
        </button>
      </div>
      <div className={`final ${stopped ? "show-final" : ""}`}>
        <h1 className={`mx-auto p-2 text-xl  text-black-200 `}>
          The heart stopped growing because thats the max size it can reach but
          my love for has the limit of the sky...{" "}
          <span className="text-red-600 font-bold">Love you baby!</span>
        </h1>
      </div>
      <div
        className={`heart ${showHeart ? "show-heart" : ""}`}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <img
          src="src/assets/heart.png"
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </>
  );
};

export default Container;
