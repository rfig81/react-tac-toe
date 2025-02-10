import { Board, GameStatus } from "../types";

const GameBoard = ({
  onSelectSquare,
  gameBoard,
  gameStatus,
}: {
  onSelectSquare: (row: number, col: number) => void;
  gameBoard: Board;
  gameStatus: GameStatus;
}) => {
  const { winner, isDraw } = gameStatus;
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={!!playerSymbol || !!winner || isDraw}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
