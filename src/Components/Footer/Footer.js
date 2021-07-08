import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.contact}>
        <h3>Contact Us</h3>
        <div className={styles.contactdetails}>
          <li>
            <span className={styles.highlight}>Email</span>: abiram902@gmail.com
          </li>
          <li>
            <span className={styles.highlight}>phone</span>: 9790440471
          </li>
        </div>
      </div>
      <div className={styles.contact}>
        <h3>Address</h3>
        <div className={styles.contactdetails}>
          <li>ShareBnB Pvt Ltd (Head quaters),</li>
          <li>Coimbatore,Tamilnadu,</li>
          <li>India.</li>
        </div>
      </div>
    </div>
  );
}

export default Footer;
