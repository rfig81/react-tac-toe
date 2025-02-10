export type PlayersName = {
  X: string;
  O: string;
};

export type Board = ("X" | "O" | null)[][];

export type Turn = {
  square: [number, number];
  player: "X" | "O";
};

export type GameStatus = {
  winner?: string;
  isDraw?: boolean;
};
