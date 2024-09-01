import { drawCircle } from "./drawCircle";
import { updatePosition } from "./updatePosition";

export const draw = ({ ctx, heroBodys }) => {
  heroBodys.forEach((heroBody) => {
    updatePosition(heroBody);
    drawCircle(ctx, heroBody);
  });
};

//     let circle1Y = canvas.height - circleRadius;
//     let circle1X = circleRadius;

// ctx.beginPath();
// ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
// ctx.fillStyle = calor;
// ctx.fill();
