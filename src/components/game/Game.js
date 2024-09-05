import styles from "./game.module.css";
import { Canvas } from "../canvas/Canvas";
import { canvasSize, circleRadius } from "../../constants";
import { Menu } from "../menu/menu";
import { useRef, useState } from "react";
import { getHeroPosition } from "../../utils";
import { Sliders } from "../sliders/sliders.js";
import { Scoreboard } from "../scoreboard/scoreboard";

export const Game = () => {
  const canvasRef = useRef(null);

  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: null,
    y: null,
    hero: null,
  });

  const [heroes, setHeroes] = useState([
    {
      id: 1,
      y: canvasSize.height - circleRadius - 1,
      x: circleRadius,
      circleRadius,
      speed: 1,
      color: "Red",
      bulletColor: "green",
      shotsInterval: 1,
      hit: 0,
      lastShotTime: new Date(),
    },
    {
      id: 2,
      y: 0 + circleRadius + 1,
      x: canvasSize.width - circleRadius,
      circleRadius,
      speed: 1,
      hit: 0,
      color: "blue",
      bulletColor: "green",
      shotsInterval: 1,
      lastShotTime: new Date(),
    },
  ]);

  const handleMouseMove = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setMousePos({
      x,
      y,
    });
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    event.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const hero = getHeroPosition(x, y, heroes);

    if (hero) {
      setContextMenu({
        visible: true,
        x: event.clientX,
        y: event.clientY,
        heroId: hero.id,
      });
    } else {
      setContextMenu({ visible: false });
    }
  };

  return (
    <>
      <Scoreboard heroes={heroes} />
      <Canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        mousePos={mousePos}
        handleMouseMove={handleMouseMove}
        handleContextMenu={handleContextMenu}
        heroes={heroes}
        setHeroes={setHeroes}
      />
      <div className={styles.sliderContainer}>
        <Sliders heroes={heroes} id={1} />
        <Sliders heroes={heroes} id={2} />
      </div>
      {contextMenu.visible && (
        <Menu
          heroes={heroes}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
        />
      )}
    </>
  );
};
