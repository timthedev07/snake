import { useEffect, useMemo, useState } from "react";
import { LinkedList, ListNode, NodeValue } from "src/lib/classes";
import {
  createGrid,
  getInitialSnakeValue,
  getNewNodeCoords,
  getOppositeDirection,
  isOutOfBounds,
  randIntInRange,
} from "src/lib/utils";

export enum Direction {
  right,
  left,
  down,
  up,
  null,
}
export const SIZE = 15;

export const App = () => {
  const [direction, setDirection] = useState<Direction>(Direction.right);
  const [grid, setGrid] = useState<number[][]>(createGrid(SIZE));
  const initial = useMemo(() => getInitialSnakeValue(grid), [grid]);
  const [snakeCells, setSnakeCells] = useState<Set<number>>(
    new Set([initial.cell])
  );
  const [snake, setSnake] = useState<LinkedList>(new LinkedList(initial));
  const [foodCell, setFoodCell] = useState<number>(
    randIntInRange(0, SIZE ** 2 - 1)
  );
  const [score, setScore] = useState<number>(0);

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

  const handleFoodConsumption = () => {
    const maxCount = SIZE * SIZE - 1;
    let nextFoodCell: number;
    while (true) {
      nextFoodCell = randIntInRange(0, maxCount);
      if (!snakeCells.has(nextFoodCell) && foodCell !== nextFoodCell) break;
    }
    setFoodCell(nextFoodCell);
    setScore((prev) => prev + 1);
  };

  const handleSnakeGrowth = () => {
    const newNodeCoords = getNewNodeCoords(snake.tail, direction);
    // can't grow
    if (isOutOfBounds(newNodeCoords[0], newNodeCoords[1])) {
      return;
    }
    const newTailCell = grid[newNodeCoords[0]][newNodeCoords[1]];
    const newTail = new ListNode({
      cell: newTailCell,
      row: newNodeCoords[0],
      col: newNodeCoords[1],
    });
    const currTail = snake.tail;
    newTail.next = currTail;
    snake.tail = newTail;

    const updatedCells = new Set(snakeCells);

    updatedCells.add(newTailCell);

    setSnakeCells(updatedCells);
  };

  return (
    <div>
      <button
        onClick={() => {
          handleSnakeGrowth();
        }}
      >
        Grow
      </button>
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
