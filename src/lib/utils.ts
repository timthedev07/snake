import { useEffect, useRef } from "react";
import { SIZE, Direction, NUM_FOOD, MAX_CELL_COUNT } from "src/ui/App";
import { ListNode, NodeValue } from "./classes";

export const randIntInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const isOutOfBounds = (row: number, col: number) => {
  return row < 0 || row >= SIZE || col < 0 || col >= SIZE;
};

export const createGrid = (n: number): number[][] => {
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

export const randomStartCell = (grid: number[][]) => {
  const m = grid.length / 2;
  const x = Math.round(Math.random() * m);
  const y = Math.round(Math.random() * m);

  return grid[Math.max(3, x)][Math.max(3, y)];
};

export const getNextCoordsInDirection = (
  node: NodeValue,
  direction: Direction
): [number, number] => {
  const { col, row } = node;

  switch (direction) {
    case Direction.up: {
      return [row - 1, col];
    }
    case Direction.down: {
      return [row + 1, col];
    }
    case Direction.left: {
      return [row, col - 1];
    }
    case Direction.right: {
      return [row, col + 1];
    }
  }

  return [-1, -1];
};

export const getOppositeDirection = (direction: Direction) => {
  switch (direction) {
    case Direction.left:
      return Direction.right;
    case Direction.right:
      return Direction.left;
    case Direction.up:
      return Direction.down;
    case Direction.down:
      return Direction.up;
  }
  return Direction.null;
};

export const getInitialSnakeValue = (grid: number[][]): NodeValue => {
  const i = Math.round(grid.length / randIntInRange(2, 4));
  const j = Math.round(grid[0].length / randIntInRange(2, 4));
  return { cell: grid[i][j], row: i, col: j };
};

export const getNextNodeDirection = (
  node: ListNode,
  currentDirection: Direction
) => {
  if (node.next === undefined) return currentDirection;
  const { row: currRow, col: currCol } = node.value;
  const { row: nextRow, col: nextCol } = node.next.value;
  if (nextRow === currRow && nextCol === currCol - 1) {
    return Direction.left;
  }
  if (nextRow === currRow && nextCol === currCol + 1) {
    return Direction.right;
  }
  if (nextCol === currCol && nextRow === currRow - 1) {
    return Direction.up;
  }
  if (nextCol === currCol && nextRow === currRow + 1) {
    return Direction.down;
  }
  return Direction.null;
};

export const getNewNodeCoords = (tail: ListNode, direction: Direction) => {
  const tailNextNodeDirection = getNextNodeDirection(tail, direction);
  const growthDirection = getOppositeDirection(tailNextNodeDirection);
  const currTailCoords = tail.value;
  const growthNodeCoords = getNextCoordsInDirection(
    currTailCoords,
    growthDirection
  );
  return growthNodeCoords;
};

export const useInterval = (callback: () => any, delay: number) => {
  const savedCallback = useRef<() => any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      if (!savedCallback.current) return;
      savedCallback.current();
    };

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }

    return () => {};
  }, [delay]);
};

export const getInitialFoodCells = () => {
  const res = new Set<number>();
  for (let i = 0; i < NUM_FOOD; ++i) {
    let nextFoodCell = randIntInRange(0, MAX_CELL_COUNT);
    while (res.has(nextFoodCell)) {
      nextFoodCell = randIntInRange(0, MAX_CELL_COUNT);
    }
    res.add(nextFoodCell);
  }
  return res;
};
