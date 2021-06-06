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

  const winner = useMemo(() => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        !!boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        return boardState[a];
      }
    }

    return null;
  }, [boardState]);

  const renderSquare = (i) => (
    <Square
      handleClick={() => {
        if (!!boardState[i] || !!winner) return;

        setBoardState({ square: i, player: getNextPlayer });
        setIsXNext((x) => !x);
      }}
      value={boardState[i]}
    />
  );

  return (
    <div>
      <div className="status">
        {!!winner ? `${winner} won the game!` : `Next player: ${getNextPlayer}`}
      </div>
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
