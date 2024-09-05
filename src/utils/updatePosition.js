export const updatePosition = (hero, canvasSize, mousePos) => {
  let newY = (hero.y += hero.speed);
  if (
    hero.y + hero.circleRadius >= canvasSize.height ||
    hero.y - hero.circleRadius <= 0
  ) {
    hero.speed = -hero.speed;
  }

  const dx = hero.x - mousePos.x;
  const dy = hero.y - mousePos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < hero.circleRadius) {
    hero.speed = -hero.speed;
  }

  if (distance < hero.circleRadius) {
    hero.y = mousePos.y;
  }

  return { ...hero, y: newY };
};
