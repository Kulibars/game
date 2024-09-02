import styles from "./menu.module.css";
import { colors } from "../../constants";

export const Menu = ({ heroes, contextMenu, setContextMenu }) => {
  const colorSelection = (colorCode) => {
    heroes.forEach((hero) => {
      if (hero.id === contextMenu.heroId) {
        hero.bulletColor = colorCode;
        setContextMenu({ ...contextMenu, visible: false });
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
        </div>
      ))}
    </div>
  );
};
