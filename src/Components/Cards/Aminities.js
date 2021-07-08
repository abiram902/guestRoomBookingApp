import React from "react";
import styles from "./Aminities.module.css";

function Aminities(props) {
  const splitedArr = props.aminities.split(","); // to split comma seperated amenities string from user input

  return (
    <div className={styles.aminities}>
      {splitedArr.map((item) => (
        <p className={styles["each-aminities"]}>{item}</p>
      ))}
    </div>
  );
}

export default Aminities;
