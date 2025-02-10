import { useState } from "react";

const Player = ({
  initialName,
  symbol,
  isActive,
  onNameChange,
}: {
  initialName: string;
  symbol: string;
  isActive: boolean;
  onNameChange: (symbol: string, name: string) => void;
}) => {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    if (!name) return;
    setIsEditing((editing) => !editing);
    if (isEditing) onNameChange(symbol, name);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleEditClick();
    }
  };

  let playerName = <span className="player-name">{name}</span>;
  if (isEditing)
    playerName = (
      <input
        type="text"
        required
        value={name}
        onChange={handleNameChange}
        onKeyDown={handleKeyDown}
      />
    );

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      </span>
    </li>
  );
};

export default Player;
