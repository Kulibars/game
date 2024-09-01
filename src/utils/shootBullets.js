// export const shootBullets = (ctx, bullets, circle, setBullets) => {
//   console.log(bullets);
//   bullets.forEach((bullet, index) => {
//     bullet.x += bullet.velocityX;
//     bullet.y += bullet.velocityY;

//     ctx.beginPath();
//     ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
//     ctx.fillStyle = bullet.color;
//     ctx.fill();
//   });

//   if (
//     bullet.x < 0 ||
//     bullet.x > canvas.width ||
//     bullet.y < 0 ||
//     bullet.y > canvas.height
//   ) {
//     bullets.splice(index, 1);
//   }

//   const angle = Math.atan2(
//     circle[1]?.y - circle[0]?.y,
//     circle[1]?.x - circle[0]?.x
//   );
//   const spreadAngle = angle + (Math.random() - 0.5) * 0.2;

//   let newBullets = {
//     x: circle[0].x,
//     y: circle[0].y,
//     radius: 5,
//     color: "black",
//     velocityX: Math.cos(spreadAngle) * 5,
//     velocityY: Math.sin(spreadAngle) * 5,
//   };

//   setBullets((bullets) => [...bullets, newBullets]);
// };
