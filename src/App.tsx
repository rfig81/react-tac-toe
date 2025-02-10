import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { PlayersName, Board, Turn, GameStatus } from "./types";

const PLAYERS: PlayersName = {
  X: "Player 1",
  O: "Player 2",
};
const INITIAL_GAME_BOARD: Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns: Turn[]) {
  return gameTurns.length === 0 || gameTurns[0].player === "O" ? "X" : "O";
}
function deriveGameBoard(gameTurns: Turn[]) {
  const gameBoard = INITIAL_GAME_BOARD.map((innerArray) => [...innerArray]);
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const [row, col] = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function deriveGameStatus(
  players: PlayersName,
  gameBoard: Board,
  gameTurns: Turn[]
): GameStatus {
  const boardSize = gameBoard.length;

  // Check rows and columns for a win
  for (let i = 0; i < boardSize; i++) {
    //If row has the same symbol
    if (
      gameBoard[i][0] &&
      gameBoard[i].every((col) => col === gameBoard[i][0])
    ) {
      return { winner: players[gameBoard[i][0] as "X" | "O"] };
    }
    //If col has the same symbol
    if (
      gameBoard[0][i] &&
      gameBoard.every((row) => row[i] === gameBoard[0][i])
    ) {
      return { winner: players[gameBoard[0][i] as "X" | "O"] };
    }
  }
  // Check left diagonal for a win
  if (
    gameBoard[0][0] &&
    gameBoard.every((row, index) => row[index] === gameBoard[0][0])
  ) {
    return { winner: players[gameBoard[0][0] as "X" | "O"] };
  }
  //Check right diagonal for a win
  if (
    gameBoard[0][boardSize - 1] &&
    gameBoard.every(
      (row, index) => row[boardSize - 1 - index] === gameBoard[0][boardSize - 1]
    )
  ) {
    return { winner: players[gameBoard[0][boardSize - 1] as "X" | "O"] };
  }

  return { isDraw: gameTurns.length === boardSize * boardSize };
}

function App() {
  const [players, setPlayers] = useState<PlayersName>(PLAYERS);
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const gameStatus = deriveGameStatus(players, gameBoard, gameTurns);

  const handlePlayerNameChange = (symbol: string, newName: string) => {
    setPlayers((prevPlayers) => ({ ...prevPlayers, [symbol]: newName }));
  };
  const handleSelectSquare = (row: number, col: number) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns: Turn[] = [
        { square: [row, col], player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };
  const handleRestart = () => {
    setGameTurns([]);
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(gameStatus.winner || gameStatus.isDraw) && (
          <GameOver gameStatus={gameStatus} onRestart={handleRestart} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          gameBoard={gameBoard}
          gameStatus={gameStatus}
        />
      </div>
      <Log turns={gameTurns} players={players} />
    </main>
  );
}

export default App;
