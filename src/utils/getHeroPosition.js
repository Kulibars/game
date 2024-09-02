export const getHeroPosition = (x, y, heroes) => {
  return heroes.find((hero) => {
    const dx = x - hero.x;
    const dy = y - hero.y;
    return dx * dx + dy * dy <= hero.circleRadius * hero.circleRadius;
  });
};
