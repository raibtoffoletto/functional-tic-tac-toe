import React, { useReducer } from "react";
import { Square } from "./";

const Board = () => {
  const [boardState, setBoardState] = useReducer(
    (state, action) => ({
      ...state,
      [action.square]: action.player,
    }),
    { ...Array(9).fill(null) }
  );

  const status = "Next player: X";

  const renderSquare = (i) => (
    <Square
      handleClick={() => setBoardState({ square: i, player: "X" })}
      value={boardState[i]}
    />
  );

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
