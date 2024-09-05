export const newSpellsAndUpdatedSpells = (
  spells,
  updatedHeroes,
  createSpell,
  canvasSize
) => {
  const newSpells = [...spells];
  const now = Date.now();

  updatedHeroes.forEach((hero, index) => {
    if (now - hero.lastShotTime >= 1000 / (1 + hero.shotsInterval)) {
      const targetHero = updatedHeroes[(index + 1) % updatedHeroes.length];
      let foo = createSpell(hero, targetHero);
      foo.shooterId = hero.id;
      newSpells.push(foo);
      hero.lastShotTime = now;
    }
  });

  const updateSpells = newSpells
    .map((Spell) => ({
      ...Spell,
      x: Spell.x + Spell.velocityX,
      y: Spell.y + Spell.velocityY,
    }))
    .filter((Spell) => {
      const isOutOfBounds =
        Spell.x < 0 ||
        Spell.x > canvasSize.width ||
        Spell.y < 0 ||
        Spell.y > canvasSize.height;

      if (isOutOfBounds) {
        return false;
      }

      const hit = updatedHeroes.some((hero) => {
        const dx = hero.x - Spell.x;
        const dy = hero.y - Spell.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (Spell.toHeroId === hero.id && distance < hero.circleRadius) {
          hero.hit += 1;
          return true;
        }
        return false;
      });

      return !hit;
    });

  return updateSpells;
};

//
