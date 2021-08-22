import { useEffect, useState } from "react";

type Cell = "empty" | "food" | "snake";
type GameStatus = "lost" | "playing" | "won";

const SIZE = 20;

export const App = () => {
  const [status, setStatus] = useState<GameStatus>("playing");
  const [grids, setGrids] = useState<Cell[][]>(
    [...Array(SIZE)].map(() => [...Array(SIZE)].map(() => "empty"))
  );

  // register keys
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft": {
          break;
        }
        case "ArrowRight": {
          break;
        }
        case "ArrowDown": {
          break;
        }
        case "ArrowUp": {
          break;
        }
      }
    };
    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <div>
      {grids.map((row) => (
        <div className="row">
          {row.map((cell) => (
            <div className={`cell ${cell}`}></div>
          ))}
        </div>
      ))}
    </div>
  );
};
