import { useState } from "react";
import styles from "./sliders.module.css";

export const Sliders = ({ heroes, id }) => {
  const [rangeShotIntervalValue, setRangeShotIntervalValue] = useState(1);
  const [speed, setSpeed] = useState(1);

  const shotIntervalChange = (event) => {
    heroes.forEach((hero) => {
      if (hero.id === id) {
        hero.shotsInterval = Number(event.target.value);
        setRangeShotIntervalValue(event.target.value);
      }
    });
  };

  const speedChange = (event) => {
    heroes.forEach((hero) => {
      if (hero.id === id) {
        if (hero.speed < 0) {
          hero.speed = Number(-event.target.value);
        } else if (hero.speed > 0) {
          hero.speed = Number(event.target.value);
        } else {
          hero.speed = Number(event.target.value);
        }

        setSpeed(event.target.value);
      }
    });
  };

  return (
    <>
      <div className={styles.range_box}>
        <div>
          <div>shot</div>
          <input
            type="range"
            min="1"
            max="10"
            value={rangeShotIntervalValue}
            onChange={shotIntervalChange}
          />
          <span className={styles.rangeValu}>{rangeShotIntervalValue}</span>
        </div>

        <div>
          <div>speed</div>
          <input
            type="range"
            min="1"
            max="10"
            value={speed}
            onChange={speedChange}
          />
          <span className={styles.rangeValu}>{speed}</span>
        </div>
      </div>
    </>
  );
};
