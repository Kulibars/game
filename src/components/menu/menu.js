import { useState } from "react";
import styles from "./menu.module.css";
import { colors } from "../../constants";

export const Menu = ({ heroes, setHeroes, contextMenu }) => {
  // const current = heroes.find

  const colorSelection = (colorCode) => {
    heroes.forEach((hero) => {
      if (hero.id === contextMenu.heroId) {
        hero.bulletColor = colorCode;
      }
    });
  };

  return (
    <div
      className={styles.menu}
      style={{
        top: contextMenu.y,
        left: contextMenu.x,
      }}
    >
      {colors.map(({ colorName, colorCode, id }) => (
        <div
          onClick={() => colorSelection(colorCode)}
          style={{ background: `${colorCode}`, cursor: "pointer" }}
          key={id}
        >
          <div>{colorName}</div>
          <div></div>
        </div>
      ))}
    </div>
  );
};
