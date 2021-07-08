import React from "react";
import styles from "./Location.module.css";
import marker from "../../assets/mapsMarker.png";

function Location(props) {
  return (
    <div className={styles.location}>
      <img src={marker} alt="marker" width="15px" />
      {props.location}
    </div>
  );
}

export default Location;
