import { GameStatus } from "../types";

const GameOver = ({
  gameStatus,
  onRestart,
}: {
  gameStatus: GameStatus;
  onRestart: () => void;
}) => {
  const { winner, isDraw } = gameStatus;

  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>{winner} won!</p>}
      {isDraw && <p>It's a draw!</p>}
      <button onClick={onRestart}>Rematch!</button>
    </div>
  );
};

export default GameOver;
