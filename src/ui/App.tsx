import { useEffect, useMemo, useState } from "react";
import { LinkedList, ListNode } from "src/lib/classes";
import {
  createGrid,
  getInitialSnakeValue,
  getNewNodeCoords,
  getNextCoordsInDirection,
  isOutOfBounds,
  randIntInRange,
  useInterval,
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
  const [grid] = useState<number[][]>(createGrid(SIZE));
  const initial = useMemo(() => getInitialSnakeValue(grid), [grid]);
  const [snakeCells, setSnakeCells] = useState<Set<number>>(
    new Set([initial.cell])
  );
  const [snake, setSnake] = useState<LinkedList>(new LinkedList(initial));
  const [foodCell, setFoodCell] = useState<number>(snake.head.value.cell + 3);
  const [score, setScore] = useState<number>(0);
  const [lost, setLost] = useState<boolean>(false);

  console.log(foodCell);

  useInterval(() => {
    handleSnakeMovement();
  }, 150);

  // register keys
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (lost) return;
      if (e.key.indexOf("Arrow") === -1) return;

      e.preventDefault();

      switch (e.key) {
        case "ArrowLeft": {
          setDirection((prev) =>
            prev !== Direction.right ? Direction.left : prev
          );
          break;
        }
        case "ArrowRight": {
          setDirection((prev) =>
            prev !== Direction.left ? Direction.right : prev
          );
          break;
        }
        case "ArrowDown": {
          setDirection((prev) =>
            prev !== Direction.up ? Direction.down : prev
          );
          break;
        }
        case "ArrowUp": {
          setDirection((prev) =>
            prev !== Direction.down ? Direction.up : prev
          );
          break;
        }
      }
    };
    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  });

  const handleLose = () => {
    setLost(true);
  };

  const handleRestart = () => {
    setScore(0);
    setSnake(new LinkedList(initial));
    setDirection(Direction.right);
    setSnakeCells(new Set([initial.cell]));
    setFoodCell(initial.cell + 5);
    setLost(false);
  };

  const handleSnakeMovement = () => {
    const newHeadCoords = getNextCoordsInDirection(snake.head.value, direction);

    // if snake crashes into the border
    if (isOutOfBounds(newHeadCoords[0], newHeadCoords[1])) {
      handleLose();
      return;
    }

    // if snake crashes into himself
    // i.e. the new head crashes into an existing snake grid
    const newHeadCell = grid[newHeadCoords[0]][newHeadCoords[1]];
    if (snakeCells.has(newHeadCell)) {
      handleLose();
      return;
    }

    // create new head node
    const newHead = new ListNode({
      row: newHeadCoords[0],
      col: newHeadCoords[1],
      cell: newHeadCell,
    });

    // update head
    //// store the current head(the rest of the snake is connected to it, this way we don't lose it)
    const currentHead = snake.head;
    //// set the head to the newly created head
    snake.head = newHead;
    //// connect the rest of the snake with the new head
    currentHead.next = newHead;

    // add new head to the set and remove the dangling tail
    const newSnakeCells = new Set(snakeCells);
    newSnakeCells.delete(snake.tail.value.cell);
    newSnakeCells.add(newHeadCell);

    // move the tail pointer to the current tail's next
    snake.tail = snake.tail.next as any;
    // prevent tail from getting detached
    if (snake.tail === null) snake.tail = snake.head;

    // if head is at food(aka, consumed the food)
    if (newHeadCell === foodCell) {
      handleSnakeGrowth(newSnakeCells);
      handleFoodConsumption(newSnakeCells);
    }

    setSnakeCells(newSnakeCells);
  };

  const handleFoodConsumption = (newSnakeCells: Set<number>) => {
    const maxCount = SIZE * SIZE - 1;
    let nextFoodCell: number;
    while (true) {
      nextFoodCell = randIntInRange(0, maxCount);
      if (!newSnakeCells.has(nextFoodCell) && foodCell !== nextFoodCell) break;
    }
    setFoodCell(nextFoodCell);
    setScore((prev) => prev + 1);
  };

  const handleSnakeGrowth = (newSnakeCells: Set<number>) => {
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

    const updatedCells = new Set(newSnakeCells);

    updatedCells.add(newTailCell);

    setSnakeCells(updatedCells);
  };

  return (
    <div>
      <div className="lost-header">
        {lost ? (
          <>
            <h1 className="lost-heading">You Lost</h1>
            <button onClick={() => handleRestart()}>Play Again</button>
          </>
        ) : null}
      </div>
      {grid.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`cell ${
                snakeCells.has(cell)
                  ? "snake"
                  : foodCell === cell
                  ? "food"
                  : "empty"
              }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};
