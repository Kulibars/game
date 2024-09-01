export const updateBulletsPosition = (fromCircle, toCircle) => {
  const angle = Math.atan2(
    toCircle.y - fromCircle.y,
    toCircle.x - fromCircle.x
  );
  const spreadAngle = angle + (Math.random() - 0.5) * 0.2; // Рассеивание пуль
  const speed = 3 + Math.random() * 3; // Изменение скорости пули от 3 до 6
  return { spreadAngle, speed };
};
