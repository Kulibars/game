export const hitCheck = (updatedBullets, updatedHeroes, setHit) => {
  const dx = updatedHeroes.x - updatedBullets.x;
  const dy = updatedHeroes.y - updatedBullets.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  console.log(updatedHeroes);
  if (distance >= updatedHeroes.circleRadius) {
    setHit((pre) => pre + 1);
  }
};
