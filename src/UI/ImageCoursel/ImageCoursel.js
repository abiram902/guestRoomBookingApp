import React, { useState } from "react";
import styles from "./ImageCoursel.module.css";

//image slide component

function ImageCoursel(props) {
  // constant to select images of an array
  const [count, setCount] = useState(0);
  // swithching between images
  const changeImage = (num) => {
    //max number of elements in the given array
    let max = props.images.length - 1;
    // using 1 and 0 to use the same function two way
    if (num === 1) {
      //if next image is not the last image in the array
      if (count + 1 <= max) {
        setCount((prev) => prev + 1);
      } else {
        setCount(0);
      }
    } else {
      //if the image is not the in the array
      if (count - 1 >= 0) {
        setCount((prev) => prev - 1);
      } else {
        setCount(max);
      }
    }
  };
  return (
    <div className={styles.coursel}>
      {props.images.length > 1 && (
        <div className={styles.leftarrow} onClick={(e) => changeImage(0)}>
          {" "}
          ⬅{" "}
        </div>
      )}
      <img src={props.images[count].file} alt={props.images[count].id} />
      {props.images.length > 1 && (
        <div className={styles.rightarrow} onClick={(e) => changeImage(1)}>
          ➡{" "}
        </div>
      )}
    </div>
  );
}

export default ImageCoursel;
