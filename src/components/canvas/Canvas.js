import { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./canvas.module.css";
import { canvasSize } from "../../constants";
import { circleRadius } from "../../constants";
import { drawCircle, updatePosition, createBullet } from "../../utils";
import { newBullets } from "../../utils/newBullets";
import { hitCheck } from "../../utils/hitСheck";
// import { handleMouseMove } from "../../utils";

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
    const [bullets, setBullets] = useState([]);
    const lastBulletTimeRef = useRef(Date.now());

    useEffect(() => {
      const canvas = ref.current;
      const ctx = canvas.getContext("2d");

      const animate = (currentTime) => {
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
        const updatedHeroes = heroes.map((hero) =>
          updatePosition(hero, canvasSize, mousePos)
        );

        setHeroes(updatedHeroes);

        updatedHeroes.forEach((hero) => {
          drawCircle(ctx, hero);
        });

        // console.log("bullets", bullets);

        const updatedBullets = newBullets(
          bullets,
          updatedHeroes,
          lastBulletTimeRef,
          createBullet
        )
          .map((bullet) => ({
            ...bullet,
            x: bullet.x + bullet.velocityX,
            y: bullet.y + bullet.velocityY,
          }))
          .filter(
            (bullet) =>
              bullet.x > 0 &&
              bullet.x < canvasSize.width &&
              bullet.y > 0 &&
              bullet.y < canvasSize.height
          );

        setBullets(updatedBullets);

        bullets.forEach((bullet) => {
          ctx.beginPath();
          ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
          ctx.fillStyle = bullet.color;
          ctx.fill();
        });

        ctx.fillRect(mousePos.x, mousePos.y, 15, 15);
      };
      canvas.addEventListener("mousemove", handleMouseMove);
      requestAnimationFrame(animate);

      return () => {
        canvas.addEventListener("contextmenu", handleContextMenu);
        canvas.removeEventListener("mousemove", handleMouseMove);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [heroes, ref]);

    return (
      <>
        <canvas className={styles.canvas} ref={ref} {...props}></canvas>
        {/* className={styles.canvas} */}
        {/* {contextMenu.visible && (
        <div
          className={styles.contextMenu}
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <ul>
            <li>Опция 1</li>
            <li>Опция 2</li>
            <li>Опция 3</li>
          </ul>
        </div>
      )} */}
      </>
    );
  }
);
