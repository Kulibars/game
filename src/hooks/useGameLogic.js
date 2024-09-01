import { useState } from "react";
// import { canvasSize } from "../constants";
import { canvasSize } from "../constants";
import { circleRadius } from "../constants";
export const useGameLogic = () => {
  const [heroBodys, setHeroBodys] = useState([
    {
      y: canvasSize.height - circleRadius,
      x: circleRadius,
      circleRadius,
      speed: 1,
      color: "Red",
    },
    {
      y: 0 + circleRadius,
      x: canvasSize.width - circleRadius,
      circleRadius,
      speed: 1,
      color: "blue",
    },
  ]);

  return { heroBodys };
};

//     let circle1Y = canvas.height - circleRadius;
//     let circle1X = circleRadius;
