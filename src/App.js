import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import './App.css';

const App = () => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [title, setTitle] = useState("LET'S PLAY");
  const [points, setPoints] = useState(0);
  const [started, setStarted] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  useEffect(() => {
    let interval = null;
    if (started) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);
    } else if (!started && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [started, time]);

  const handleStartOrRestart = () => {
    setStarted(true);
    setTime(0);
    setTitle("LET'S PLAY");
    setScore(0);
    setGameKey((prevKey) => prevKey + 1);
  };

  const handleScoreChange = (newScore) => {
    setScore(newScore);
    if (newScore >= points) {
      setTitle("ALL CLEARED");
      setStarted(false);
    }
  };

  const handleGameOver = () => {
    setTitle("GAME OVER");
    setStarted(false);
  };

  const handlePointsChange = (e) => {
    setPoints(parseInt(e.target.value) || 0);
    setScore(0);
    setTime(0);
    setTitle("LET'S PLAY");
    setStarted(false);
  };

  return (
    <div className="app">
      <div className="game-header">
        <div className="header-column">
          <h1 className={title === "GAME OVER" ? "red" : title === "ALL CLEARED" ? "green" : "status-default"}>
            {title}
          </h1>
          <div className="game-details">
            <div className="row">
              <label>Points:</label>
              <input type="text" value={points} onChange={handlePointsChange} disabled={started} />
            </div>
            <div className="row">
              <label>Time:</label>
              <label>{`${time.toFixed(1)}s`}</label>
            </div>
          </div>
          <button onClick={handleStartOrRestart} className="btn_play">
            {started ? "Restart" : "Play"}
          </button>
        </div>
      </div>
      <div className="game-board-wrapper">
        <GameBoard
          key={gameKey}
          points={points}
          onScoreChange={handleScoreChange}
          onGameOver={handleGameOver}
          started={started}
        />
      </div>
    </div>
  );

};

export default App;
