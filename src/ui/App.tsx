import { useCallback, useEffect, useState } from "react";

type Cell = "empty" | "food" | "snake";

const SIZE = 20;

const isOutOfBounds = (n: number) => {
  return n < 0 || n > SIZE - 1;
};
const randInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const App = () => {
  const [grid, setGrid] = useState<Cell[][]>(
    [...Array(SIZE)].map(() => [...Array(SIZE)].map(() => "empty"))
  );

  return (
    <div>
      {grid.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <div key={`${i}-${j}`} className={`cell ${cell}`}></div>
          ))}
        </div>
      ))}
    </div>
  );
};
