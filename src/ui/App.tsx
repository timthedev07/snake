import { useState } from "react";

export type Cell = "empty" | "food" | "snake";
const SIZE = 15;

export const App = () => {
  const [grid, setGrid] = useState<number[][]>(createGrid(SIZE));
  const [snakeCells, setSnakeCells] = useState<Set<number>>(
    new Set([randomStartCell(grid)])
  );

  return (
    <div>
      {grid.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`cell ${snakeCells.has(cell) ? "snake" : "empty"}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

const isOutOfBounds = (n: number) => {
  return n < 0 || n > SIZE - 1;
};
const randInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};
const createGrid = (n: number): number[][] => {
  let count = 0;
  let board: number[][] = [];
  for (let i = 0; i < n; ++i) {
    let row: number[] = [];
    for (let j = 0; j < n; ++j) {
      row.push(count++);
    }
    board.push(row);
  }
  return board;
};

const randomStartCell = (grid: number[][]) => {
  const m = grid.length / 2;
  const x = Math.round(Math.random() * m);
  const y = Math.round(Math.random() * m);

  return grid[Math.max(3, x)][Math.max(3, y)];
};
