import styles from "./GotoAddListing.module.css";
import React from "react";
import { Link } from "react-router-dom";

function GotoAddListing() {
  return (
    <Link to="addListing">
      <div className={styles.addbutton}>+</div>
    </Link>
  );
}

export default GotoAddListing;
