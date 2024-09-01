import { useRef, useState } from "react";
import { Canvas } from "../canvas/Canvas";
import { drawCircle, createBullet } from "../../utils";
// import { useGameLogic } from "../../hooks";
import { canvasSize } from "../../constants";

export const Game = () => {
  return <Canvas width={canvasSize.width} height={canvasSize.height} />;
};
