import { Turn, PlayersName } from "../types";

const Log = ({ turns, players }: { turns: Turn[]; players: PlayersName }) => {
  return (
    <ol id="log">
      {turns.map(({ square, player }, i) => {
        const [row, col] = square;
        return (
          <li key={i}>
            <span className="uppercase">{players[player]}</span> selected {row},{" "}
            {col}
          </li>
        );
      })}
    </ol>
  );
};

export default Log;
