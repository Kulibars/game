export const drawCircle = (ctx, { x, y, circleRadius, color }) => {
  ctx.beginPath();
  ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};
