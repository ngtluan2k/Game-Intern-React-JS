import React, { useState, useEffect } from 'react';
import Circle from './Circle';

const GameBoard = ({ points, onScoreChange, onGameOver, started }) => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    if (started && points > 0) {
      const randomNumbers = Array.from({ length: points }, (_, i) => i + 1);
      setNumbers(randomNumbers);
    }
  }, [started, points]);

  const handleClick = (number) => {
    if (number !== Math.min(...numbers)) {
      onGameOver();
      return;
    }

    setNumbers(numbers.filter(n => n !== number));
    onScoreChange(points - numbers.length + 1);
  };

  return (
    <div className="game-board">
      {numbers.map(number => (
        <Circle key={number} number={number} onClick={handleClick} />
      ))}
    </div>
  );
};

export default GameBoard;
