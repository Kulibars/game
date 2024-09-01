import { Canvas } from "../canvas/Canvas";
import { canvasSize } from "../../constants";

export const Game = () => {
  return <Canvas width={canvasSize.width} height={canvasSize.height} />;
};
