import { useRef, useState } from "react";
import styles from "./rangeSlider.module.css";

export const RangeSlider = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const inputRef = useRef(null);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  return (
    <>
      <div className={styles.range_box}>
        <input
          type="range"
          ref={inputRef}
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
        />
        <span className={styles.rangeValu}>{sliderValue}</span>
      </div>
    </>
  );
};
