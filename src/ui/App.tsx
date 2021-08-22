import { useEffect, useMemo, useState } from "react";
import { LinkedList } from "src/lib/classes";

enum Direction {
  right,
  left,
  down,
  up,
}
const SIZE = 15;

export const App = () => {
  const [grid, setGrid] = useState<number[][]>(createGrid(SIZE));
  const start = useMemo(() => randomStartCell(grid), [grid]);
  const [snakeCells, setSnakeCells] = useState<Set<number>>(new Set([start]));
  const [snake, setSnake] = useState<LinkedList>(new LinkedList(start));
  const [direction, setDirection] = useState<Direction>(Direction.right);

  // register keys
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key.indexOf("Arrow") === -1) return;

      e.preventDefault();

      switch (e.key) {
        case "ArrowLeft": {
          setDirection(Direction.left);
          break;
        }
        case "ArrowRight": {
          setDirection(Direction.right);
          break;
        }
        case "ArrowDown": {
          setDirection(Direction.down);
          break;
        }
        case "ArrowUp": {
          setDirection(Direction.up);
          break;
        }
      }
    };
    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  });

  const getNewHead = (currentHead: [number, number], direction: Direction) => {
    let res: [number, number] = [-1, -1];
    const [x, y] = currentHead;

    switch (direction) {
      case Direction.up: {
        res = [x - 1, y];
        break;
      }
      case Direction.down: {
        res = [x + 1, y];
        break;
      }
      case Direction.left: {
        res = [x, y - 1];
        break;
      }
      case Direction.right: {
        res = [x, y + 1];
        break;
      }
    }

    return res;
  };

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
