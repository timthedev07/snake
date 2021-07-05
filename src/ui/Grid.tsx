import React from "react";

interface GridProps {}

interface GridItemProps {
  status: "snake" | "food" | "default";
}

export const GridItem: React.FC<GridItemProps> = ({ status }) => {
  return <div className={`grid-item ${status}`}>{status}</div>;
};

export const Grid: React.FC<GridProps> = ({}) => {
  return <div className="grid"></div>;
};
