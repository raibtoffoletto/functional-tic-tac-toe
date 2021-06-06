import React from "react";
import { useBoard } from "../hooks/useBoard";
import { Square } from "./";

const Board = () => {
  const { handleSquareClick, boardState } = useBoard();

  const renderSquare = (i) => (
    <Square handleClick={() => handleSquareClick(i)} value={boardState[i]} />
  );

  return (
    <div>
      {[0, 3, 6].map((row) => (
        <div className="board-row" key={`row-${row}`}>
          {renderSquare(0 + row)}
          {renderSquare(1 + row)}
          {renderSquare(2 + row)}
        </div>
      ))}
    </div>
  );
};

export default Board;
