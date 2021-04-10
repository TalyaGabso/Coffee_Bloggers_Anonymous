import React, { useState, useEffect } from 'react';
const Timer = ({ timerOn }) => {
  const [time, setTime] = useState(0);
  const resetTime = {
    min: ("0" + Math.floor((time / 60000) % 60)).slice(-2),
    sec: ("0" + Math.floor((time / 1000) % 60)).slice(-2),
    milSec: ("0" + ((time / 10) % 100)).slice(-2)
  }
  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  return (
    <span className="timer-container">
      <span>{resetTime.min}:</span>
      <span>{resetTime.sec}:</span>
      <span>{resetTime.milSec}</span>
    </span>
  );
};
export default Timer;