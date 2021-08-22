import { useEffect } from "react";

export const App = () => {
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

  return <></>;
};
