import styles from "./scoreboard.module.css";

export const Scoreboard = ({ heroes }) => {
  return (
    <div className={styles.score_box}>
      <div className={styles.score}>
        <div>{heroes[0].color}</div>
        <div>{heroes[1].hit}</div>
      </div>
      <div className={styles.score}>
        <div>{heroes[1].color}</div>
        <div>{heroes[0].hit}</div>
      </div>
    </div>
  );
};
