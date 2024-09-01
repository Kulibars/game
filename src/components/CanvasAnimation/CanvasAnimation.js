import React, { useRef, useEffect, useState } from "react";

export function CanvasAnimation() {
  const canvasRef = useRef(null);
  const [bullets, setBullets] = useState([]);
  const [lastShotTime, setLastShotTime] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Определение больших кругов
    const circle1 = { x: 50, y: 50, radius: 30, color: "red", speedY: 2 };
    const circle2 = {
      x: canvas.width - 50,
      y: canvas.height - 50,
      radius: 30,
      color: "blue",
      speedY: -2,
    };

    function animate(timestamp) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Обновляем положение больших кругов
      circle1.y += circle1.speedY;
      circle2.y += circle2.speedY;

      // Если круг достигает верхнего или нижнего края канваса, меняем направление
      if (
        circle1.y - circle1.radius <= 0 ||
        circle1.y + circle1.radius >= canvas.height
      ) {
        circle1.speedY = -circle1.speedY;
      }
      if (
        circle2.y - circle2.radius <= 0 ||
        circle2.y + circle2.radius >= canvas.height
      ) {
        circle2.speedY = -circle2.speedY;
      }

      // Рисуем большие круги
      ctx.beginPath();
      ctx.arc(circle1.x, circle1.y, circle1.radius, 0, Math.PI * 2);
      ctx.fillStyle = circle1.color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(circle2.x, circle2.y, circle2.radius, 0, Math.PI * 2);
      ctx.fillStyle = circle2.color;
      ctx.fill();

      // Обновляем и рисуем пули
      setBullets((prevBullets) => {
        const updatedBullets = prevBullets
          .map((bullet) => ({
            ...bullet,
            x: bullet.x + bullet.velocityX,
            y: bullet.y + bullet.velocityY,
          }))
          .filter(
            (bullet) =>
              bullet.x >= 0 &&
              bullet.x <= canvas.width &&
              bullet.y >= 0 &&
              bullet.y <= canvas.height
          );
        return updatedBullets;
      });

      bullets.forEach((bullet) => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fillStyle = bullet.color;
        ctx.fill();
      });

      // Запуск функции стрельбы, если прошел интервал
      if (timestamp - lastShotTime > 1000) {
        // Измените интервал, чтобы контролировать частоту выстрелов
        setLastShotTime(timestamp);
        shootBullets(circle1, circle2, 1);
        shootBullets(circle2, circle1, 1);
      }

      requestAnimationFrame(animate);
    }

    // Вычисление угла и скорости пули
    function calculateBulletParams(fromCircle, toCircle) {
      const angle = Math.atan2(
        toCircle.y - fromCircle.y,
        toCircle.x - fromCircle.x
      );
      const spreadAngle = angle + (Math.random() - 0.5) * 0.2; // Рассеивание пуль
      const speed = 3 + Math.random() * 3; // Изменение скорости пули от 3 до 6
      return { spreadAngle, speed };
    }

    // Создание новой пули
    function createBullet(fromCircle, spreadAngle, speed) {
      return {
        x: fromCircle.x,
        y: fromCircle.y,
        radius: 5,
        color: "black",
        velocityX: Math.cos(spreadAngle) * speed,
        velocityY: Math.sin(spreadAngle) * speed,
      };
    }

    // Добавление пуль в массив
    function addBullets(newBullets) {
      setBullets((prevBullets) => [...prevBullets, ...newBullets]);
    }

    // Основная функция стрельбы
    function shootBullets(fromCircle, toCircle) {
      const newBullets = [];
      const { spreadAngle, speed } = calculateBulletParams(
        fromCircle,
        toCircle
      );

      newBullets.push(createBullet(fromCircle, spreadAngle, speed));

      addBullets(newBullets);
    }

    // Начальный вызов анимации
    requestAnimationFrame(animate);
  }, [bullets]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      style={{ border: "1px solid black" }}
    />
  );
}

// import React, { useRef, useEffect, useState } from "react";

// export function CanvasShootingAnimation() {
//   const canvasRef = useRef(null);
//   const [lastShotTime, setLastShotTime] = useState(0);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     // Определение больших кругов
//     const circle1 = { x: 50, y: 50, radius: 30, color: "red", speedY: 2 };
//     const circle2 = {
//       x: canvas.width - 50,
//       y: canvas.height - 50,
//       radius: 30,
//       color: "blue",
//       speedY: -2,
//     };

//     const bullets = [];

//     function animate(timestamp) {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Обновляем положение больших кругов
//       circle1.y += circle1.speedY;
//       circle2.y += circle2.speedY;

//       // Если круг достигает верхнего или нижнего края канваса, меняем направление
//       if (
//         circle1.y - circle1.radius <= 0 ||
//         circle1.y + circle1.radius >= canvas.height
//       ) {
//         circle1.speedY = -circle1.speedY;
//       }
//       if (
//         circle2.y - circle2.radius <= 0 ||
//         circle2.y + circle2.radius >= canvas.height
//       ) {
//         circle2.speedY = -circle2.speedY;
//       }

//       // Рисуем большие круги
//       ctx.beginPath();
//       ctx.arc(circle1.x, circle1.y, circle1.radius, 0, Math.PI * 2);
//       ctx.fillStyle = circle1.color;
//       ctx.fill();

//       ctx.beginPath();
//       ctx.arc(circle2.x, circle2.y, circle2.radius, 0, Math.PI * 2);
//       ctx.fillStyle = circle2.color;
//       ctx.fill();

//       function shootBullets(fromCircle, toCircle, numBullets = 3) {
//         for (let i = 0; i < numBullets; i++) {
//           const angle = Math.atan2(
//             toCircle.y - fromCircle.y,
//             toCircle.x - fromCircle.x
//           );

//           const spreadAngle = angle + (Math.random() - 0.5) * 0.2; // Рассеивание пуль;
//           bullets.push({
//             x: fromCircle.x,
//             y: fromCircle.y,
//             radius: 5,
//             color: "black",
//             velocityX: Math.cos(spreadAngle) * 5,
//             velocityY: Math.sin(spreadAngle) * 5,
//           });
//         }
//       }

//       // Рисуем пули и обновляем их позиции
//       bullets.forEach((bullet, index) => {
//         bullet.x += bullet.velocityX;
//         bullet.y += bullet.velocityY;

//         ctx.beginPath();
//         ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
//         ctx.fillStyle = bullet.color;
//         ctx.fill();

//         // Удаляем пули, которые выходят за пределы канваса
//         if (
//           bullet.x < 0 ||
//           bullet.x > canvas.width ||
//           bullet.y < 0 ||
//           bullet.y > canvas.height
//         ) {
//           bullets.splice(index, 1);
//         }
//       });

//       // Проверяем, прошло ли достаточно времени с последнего выстрела

//       // 200 миллисекунд

//       shootBullets(circle1, circle2, 1); // Стреляет 5 пуль
//       shootBullets(circle2, circle1, 1); // Стреляет 5 пуль

//       requestAnimationFrame(animate);
//     }

//     // Начальный вызов анимации
//     requestAnimationFrame(animate);
//   }, [lastShotTime]);

//   return (
//     <canvas
//       ref={canvasRef}
//       width={800}
//       height={400}
//       style={{ border: "1px solid black" }}
//     />
//   );
// }

// export const Canvas = forwardRef(
//   ({ drawGame, heroes, setHeroes, bullets, setBullets, shotInterval, setShotInterval, lastShotTime, setLastShotTime, ...props }, canvasRef) => {
//     const [mousePos, setMousePos] = useState({ x: null, y: null });

//     useEffect(() => {
//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");

//       const handleMouseMove = (event) => {
//         const rect = canvas.getBoundingClientRect();
//         setMousePos({
//           x: event.clientX - rect.left,
//           y: event.clientY - rect.top,
//         });
//       };

//       const animate = (timestamp) => {
//         context.clearRect(0, 0, canvas.width, canvas.height);

//         // Обновляем положение героев
//         setHeroes((prevHeroes) =>
//           prevHeroes.map((hero) => updatePosition(hero, canvasSize, mousePos))
//         );

//         // Обновляем пули
//         setBullets((prevBullets) => {
//           const updatedBullets = prevBullets.map((bullet) => ({
//             ...bullet,
//             x: bullet.x + bullet.velocityX,
//             y: bullet.y + bullet.velocityY,
//           })).filter((bullet) =>
//             bullet.x >= 0 &&
//             bullet.x <= canvas.width &&
//             bullet.y >= 0 &&
//             bullet.y <= canvas.height
//           );

//           return updatedBullets;
//         });

//         drawGame(context);

//         // Проверяем, прошло ли достаточно времени с последнего выстрела
//         if (timestamp - lastShotTime >= shotInterval) {
//           // Стреляет пулями
//           const newBullets = [
//             ...shootBullets(heroes[0], heroes[1]),
//             ...shootBullets(heroes[1], heroes[0]),
//           ];
//           setBullets((prevBullets) => [...prevBullets, ...newBullets]);
//           setLastShotTime(timestamp);
//         }

//         requestAnimationFrame(animate);
//       };

//       canvas.addEventListener("mousemove", handleMouseMove);

//       animate(0);

//       return () => {
//         canvas.removeEventListener("mousemove", handleMouseMove);
//       };
//     }, [canvasRef, drawGame, heroes, mousePos, bullets, setHeroes, setBullets, shotInterval, lastShotTime, setLastShotTime]);

//     return (
//       <canvas className={styles.canvas} ref={canvasRef} {...props}></canvas>
//     );
//   }
// );
