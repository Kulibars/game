import { useEffect, useRef, useState } from "react";
import styles from "./canvas.module.css";
import { canvasSize } from "../../constants";
import { circleRadius } from "../../constants";
import { drawCircle, updatePosition, createBullet } from "../../utils";
import { newBullets } from "../../utils/newBullets";
import { hitCheck } from "../../utils/hitСheck";
// import { handleMouseMove } from "../../utils";

export const Canvas = ({ ...props }) => {
  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const [heroes, setHeroes] = useState([
    {
      name: "circle1",
      y: canvasSize.height - circleRadius,
      x: circleRadius,
      circleRadius,
      speed: 2,
      color: "Red",
      bulletColor: "green",
    },
    {
      name: "circle2",
      y: 0 + circleRadius,
      x: canvasSize.width - circleRadius,
      circleRadius,
      speed: 1,
      color: "blue",
      bulletColor: "green",
    },
  ]);

  const [hit, setHit] = useState(0);
  const [bullets, setBullets] = useState([]);
  const lastBulletTimeRef = useRef(Date.now());
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.addEventListener("mousemove", handleMouseMove);

    const animate = (currentTime) => {
      const updatedHeroes = heroes.map((hero) =>
        updatePosition(hero, canvasSize, mousePos)
      );

      setHeroes(updatedHeroes);

      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

      updatedHeroes.forEach((hero) => {
        drawCircle(ctx, hero);
      });

      console.log("bullets", bullets);

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

      hitCheck(updatedBullets, updatedHeroes, setHit);

      setBullets(updatedBullets);

      bullets.forEach((bullet) => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fillStyle = bullet.color;
        ctx.fill();
      });
      // =====================================================================\

      ctx.fillRect(mousePos.x, mousePos.y, 15, 15);
    };

    requestAnimationFrame(animate);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroes]);

  return <canvas className={styles.canvas} ref={canvasRef} {...props}></canvas>;
};
