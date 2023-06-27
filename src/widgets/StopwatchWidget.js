import React, { useState, useEffect } from 'react';

const StopwatchWidget = () => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        const currentTime = Date.now();
        setElapsedTime(currentTime - startTime);
      }, 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, startTime]);

  const handleStart = () => {
    if (!isRunning) {
      const currentTime = Date.now();
      setStartTime(currentTime);
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    if (isRunning) {
      const currentTime = Date.now();
      setPausedTime(currentTime);
      setIsRunning(false);
    }
  };

  const handleResume = () => {
    if (!isRunning) {
      const currentTime = Date.now();
      const elapsedPausedTime = currentTime - pausedTime;
      setStartTime((prevStartTime) => prevStartTime + elapsedPausedTime);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setStartTime(null);
    setElapsedTime(0);
    setIsRunning(false);
    setPausedTime(0);
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor(time / 1000 / 3600);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ minWidth: 300 }}>
      <h2 style={{ marginBottom: '1rem' }}>Stopwatch</h2>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Elapsed Time:</strong> {formatTime(elapsedTime)}
      </div>
      <div>
        {!isRunning ? (
          <>
            {elapsedTime > 0 && (
              <>
                <button style={resumeButtonStyle} onClick={handleResume}>Resume</button>
                <button style={resetButtonStyle} onClick={handleReset}>Reset</button>
              </>
            )}
            {!elapsedTime && (
              <button style={startButtonStyle} onClick={handleStart}>Start</button>
            )}
          </>
        ) : (
          <button style={pauseButtonStyle} onClick={handlePause}>Pause</button>
        )}
      </div>
    </div>
  );
};

const startButtonStyle = {
  padding: '10px 20px',
  margin: '5px',
  fontSize: '16px',
  fontWeight: 'bold',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const resumeButtonStyle = {
  ...startButtonStyle,
  backgroundColor: '#2196F3',
};

const pauseButtonStyle = {
  ...startButtonStyle,
  backgroundColor: '#f44336',
};

const resetButtonStyle = {
  ...startButtonStyle,
  backgroundColor: '#9E9E9E',
};

export default StopwatchWidget;
