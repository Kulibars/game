import { Canvas } from "../canvas/Canvas";
import { canvasSize, circleRadius } from "../../constants";
import { Menu } from "../menu/menu";
import { useRef, useState } from "react";
import { getHeroPosition } from "../../utils";
import { RangeSlider } from "../range_slider.js/rangeSlider";

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
      y: canvasSize.height - circleRadius,
      x: circleRadius,
      circleRadius,
      speed: 2,
      color: "Red",
      bulletColor: "green",
    },
    {
      id: 2,
      y: 0 + circleRadius,
      x: canvasSize.width - circleRadius,
      circleRadius,
      speed: 1,
      color: "blue",
      bulletColor: "green",
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
      <div>
        <RangeSlider />
        <RangeSlider />
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
