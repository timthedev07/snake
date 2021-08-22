import React from "react";
import { useMemo } from "react";
import { useState } from "react";

interface GridProps {
  dimensions: DimensionsType;
}

interface GridItemProps {
  status: "snake" | "food" | "default";
}

interface DimensionsType {
  rows: number;
  cols: number;
}

interface Coord {
  i: number;
  j: number;
}

export const GridItem: React.FC<GridItemProps> = ({ status }) => {
  return <div className={`grid-item ${status}`}>{status}</div>;
};

/**
 * Snake direction:
 *
 * ```javascript
 * {
 *   0: "right",
 *   1: "down",
 *   2: "left",
 *   3: "up"
 * }
 * ```
 */

export const NumToStatus: Record<number, string> = {
  0: "snake",
  1: "food",
  2: "default",
};

interface Snake {
  headDirection: number;
  headCoords: Coord[];
  tailDirection: number;
  tailCoords: Coord[];
}

export const Grid: React.FC<GridProps> = ({ dimensions: { rows, cols } }) => {
  const [foodCoord, setFoodCoord] = useState<Coord>({ i: 0, j: 0 });

  const grids: Array<Array<JSX.Element>> = useMemo(() => {
    const res: Array<Array<JSX.Element>> = [];
    for (let i = 0; i < rows; i++) {
      const tmp: Array<JSX.Element> = [];
      for (let j = 0; j < cols; j++) {
        tmp.push(<GridItem status={"default"} />);
      }
      res.push(tmp);
    }
    return res;
  }, [rows, cols]);

  return <div className="grid"></div>;
};
