export const createSpell = (fromHero, toHero) => {
  const angle = Math.atan2(toHero.y - fromHero.y, toHero.x - fromHero.x);
  const speed = 5;
  const spread = 0.2;
  const spreadAngle = (Math.random() - 0.5) * spread;

  const finalAngle = angle + spreadAngle;
  return {
    toHeroId: toHero.id,
    x: fromHero.x,
    y: fromHero.y,
    circleRadius: 5,
    color: fromHero.bulletColor,
    velocityX: Math.cos(finalAngle) * speed,
    velocityY: Math.sin(finalAngle) * speed,
  };
};
