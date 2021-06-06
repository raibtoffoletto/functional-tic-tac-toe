import React, { useReducer, useState, useMemo } from "react";
import { Square } from "./";

const Board = () => {
  const [isXNext, setIsXNext] = useState(true);

  const getNextPlayer = useMemo(() => (!!isXNext ? "X" : "O"), [isXNext]);

  const [boardState, setBoardState] = useReducer(
    (state, action) => ({
      ...state,
      [action.square]: action.player,
    }),
    { ...Array(9).fill(null) }
  );

  const renderSquare = (i) => (
    <Square
      handleClick={() => {
        setBoardState({ square: i, player: getNextPlayer });
        setIsXNext((x) => !x);
      }}
      value={boardState[i]}
    />
  );

  return (
    <div>
      <div className="status">{`Next player: ${getNextPlayer}`}</div>
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
