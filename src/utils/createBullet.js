export const createBullet = (fromCircle, spreadAngle, speed) => {
  return {
    x: fromCircle.x,
    y: fromCircle.y,
    radius: 5,
    color: "black",
    velocityX: Math.cos(spreadAngle) * speed,
    velocityY: Math.sin(spreadAngle) * speed,
  };
};
