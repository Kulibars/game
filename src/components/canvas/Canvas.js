import { useEffect, useRef, useState } from "react";
import styles from "./canvas.module.css";
import { canvasSize } from "../../constants";
import { circleRadius } from "../../constants";
import { drawCircle, updatePosition } from "../../utils";
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
    },
    {
      name: "circle2",
      y: 0 + circleRadius,
      x: canvasSize.width - circleRadius,
      circleRadius,
      speed: 1,
      color: "blue",
    },
  ]);
  // ====================================================================
  const createBullet = (fromHero, toHero) => {
    const angle = Math.atan2(toHero.y - fromHero.y, toHero.x - fromHero.x);
    const speed = 5;
    return {
      x: fromHero.x,
      y: fromHero.y,
      radius: 5,
      color: "black",
      velocityX: Math.cos(angle) * speed,
      velocityY: Math.sin(angle) * speed,
    };
  };
  // ===================================================================

  const [bullets, setBullets] = useState([]);

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
      // ===================================================================\
      updatedHeroes.forEach((hero) => {
        drawCircle(ctx, hero);
      });
      // =======================================================================
      const newBullets = [];
      updatedHeroes.forEach((hero, index) => {
        const targetHero = updatedHeroes[(index + 1) % updatedHeroes.length]; // Находим цель
        newBullets.push(createBullet(hero, targetHero));
      });
      setBullets(newBullets);

      // Обновляем и отрисовываем пули
      const updatedBullets = bullets
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

      updatedBullets.forEach((bullet) => {
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
