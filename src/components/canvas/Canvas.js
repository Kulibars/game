import { forwardRef, useEffect, useState } from "react";
import styles from "./canvas.module.css";
import { canvasSize } from "../../constants";

import {
  drawCircle,
  updatePosition,
  createSpell,
  newSpellsAndUpdatedSpells,
} from "../../utils";

export const Canvas = forwardRef(
  (
    {
      mousePos,
      handleMouseMove,
      handleContextMenu,
      heroes,
      setHeroes,
      ...props
    },
    ref
  ) => {
    const [spells, setSpells] = useState([]);

    useEffect(() => {
      const canvas = ref.current;
      const ctx = canvas.getContext("2d");

      const animate = () => {
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

        const updatedHeroes = heroes.map((hero) =>
          updatePosition(hero, canvasSize, mousePos)
        );

        setHeroes(updatedHeroes);

        updatedHeroes.forEach((hero) => {
          drawCircle(ctx, hero);
        });

        const updatedSpells = newSpellsAndUpdatedSpells(
          spells,
          updatedHeroes,
          createSpell,
          canvasSize
        );

        setSpells(updatedSpells);

        updatedSpells.forEach((spell) => {
          drawCircle(ctx, spell);
        });

        // ctx.fillRect(mousePos.x, mousePos.y, 15, 15);
      };
      canvas.addEventListener("contextmenu", handleContextMenu);
      canvas.addEventListener("mousemove", handleMouseMove);
      requestAnimationFrame(animate);

      return () => {
        canvas.removeEventListener("contextmenu", handleContextMenu);
        canvas.removeEventListener("mousemove", handleMouseMove);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [heroes, ref]);

    return <canvas className={styles.canvas} ref={ref} {...props}></canvas>;
  }
);
