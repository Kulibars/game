export const createBullet = (fromHero, toHero) => {
  const angle = Math.atan2(toHero.y - fromHero.y, toHero.x - fromHero.x);
  const speed = 5;
  return {
    toHero: toHero.name,
    x: fromHero.x,
    y: fromHero.y,
    radius: 5,
    color: fromHero.bulletColor,
    velocityX: Math.cos(angle) * speed,
    velocityY: Math.sin(angle) * speed,
  };
};
