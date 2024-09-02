export const newBullets = (
  bullets,
  updatedHeroes,
  lastBulletTimeRef,
  createBullet
) => {
  const newBullets = [...bullets];
  const now = Date.now();

  if (now - lastBulletTimeRef.current >= 1000) {
    updatedHeroes.forEach((hero, index) => {
      const targetHero = updatedHeroes[(index + 1) % updatedHeroes.length];
      let foo = createBullet(hero, targetHero);
      newBullets.push(foo);
    });

    lastBulletTimeRef.current = now;
  }

  return newBullets;
};
