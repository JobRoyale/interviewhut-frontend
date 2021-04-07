import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ milliseconds }) => {
  const [over, setOver] = useState(false);
  const [time, setTime] = React.useState({
    minutes: parseInt(milliseconds / 60000),
    seconds: parseInt(0),
  });

  // The countdown function
  const tick = () => {
    if (over) return;

    if (time.minutes === 0 && time.seconds === 0) {
      setOver(true);
    } else if (time.seconds === 0) {
      setTime({
        minutes: time.minutes - 1,
        seconds: 59,
      });
    } else {
      setTime({
        ...time,
        seconds: time.seconds - 1,
      });
    }
  };

  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <div className="timer-container">
      <div className="timer-countdown">
        {time.minutes.toString().padStart(2, '0')}:
        {time.seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default Timer;
