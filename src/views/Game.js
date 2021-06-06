import React from "react";
import { Board } from "../components";
import { useBoard } from "../hooks/useBoard";

const Game = () => {
  const { boardHistory, setHistoryIndex, winner, nextPlayer } = useBoard();

  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div className="status">
          {!!winner ? `${winner} won the game!` : `Next player: ${nextPlayer}`}
        </div>
        <ul>
          {boardHistory.map((movement, index) => (
            <li key={index}>
              <button onClick={() => setHistoryIndex(index)}>
                {!!index ? `Move #${index}` : `Start of the Game`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;
