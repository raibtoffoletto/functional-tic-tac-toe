import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "./views";
import BoardProvider from "./hooks/useBoard";

ReactDOM.render(
  <BoardProvider>
    <Game />
  </BoardProvider>,
  document.getElementById("root")
);
