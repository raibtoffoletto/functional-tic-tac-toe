import React, {
  useReducer,
  useState,
  useMemo,
  useCallback,
  createContext,
  useContext,
} from "react";

const BoardContext = createContext();

const BoardProvider = ({ children }) => {
  const [historyIndex, setHistoryIndex] = useState(0);
  const [boardHistory, setBoardHistory] = useReducer(
    (state, action) => {
      const newState = state.slice(0, historyIndex);

      newState.push({
        ...newState[newState.length - 1],
        [action.square]: action.player,
      });

      return newState;
    },
    [{ ...Array(9).fill(null) }]
  );

  const checkWinner = useCallback(() => {
    const boardState = boardHistory[historyIndex];

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
  }, [boardHistory, historyIndex]);

  const nextPlayer = useMemo(
    () => (historyIndex % 2 === 0 ? "X" : "O"),
    [historyIndex]
  );

  const handleSquareClick = (i) => {
    if (!!boardHistory[historyIndex][i] || !!checkWinner()) return;

    setBoardHistory({
      square: i,
      player: nextPlayer,
    });

    setHistoryIndex((i) => i + 1);
  };

  const hooks = {
    historyIndex,
    setHistoryIndex,
    boardHistory,
    handleSquareClick,
    boardState: boardHistory[historyIndex],
    winner: checkWinner(),
    nextPlayer: nextPlayer,
  };

  return <BoardContext.Provider value={hooks} children={children} />;
};

const useBoard = () => {
  return useContext(BoardContext);
};

export { useBoard, BoardContext };

export default BoardProvider;
