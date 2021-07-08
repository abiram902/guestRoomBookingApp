import styles from "./DateAvailability.module.css";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function DateAvailability(props) {
  const [dateErr, setDateErr] = useState("");
  const [count, setCount] = useState(0); // keep track of no of booking on a given date
  const [fromDateTouched, setFromDateTouched] = useState(false);
  const [toDateTouched, settoDateTouched] = useState(false);
  /*a host can list upto 5 rooms in a listing and guests can book all the five rooms in the same date one at a time. if the no of bookings 
in a day go beyond no of rooms listed then the form turns invalid with apropriate message */

  useEffect(() => {
    //validation function
    const validateBookingDate = (fromDate, toDate) => {
      let checkF = new Date(props.date.startDate).getTime();
      let checkT = new Date(props.date.endDate).getTime();
      let from = new Date(fromDate).getTime();
      let to = new Date(toDate).getTime();

      if (
        (checkF >= from && checkF <= to) ||
        (checkT >= from && checkT <= to)
      ) {
        setCount((prev) => prev + 1);
        if (count < props.rooms) {
          console.log("c", count);
          props.setIsValid(true);
          return true;
        } else {
          setDateErr("*Room are full on these dates");
          props.setIsValid(false);
          return false;
        }
      } else {
        setDateErr("");
        return true;
      }
    };
    //looping through each bookings made before this and validating
    for (let obj of props.bookings) {
      if (!props.date.startDate || !props.date.endDate) {
        props.setIsValid(false);
        return;
      }
      if (!validateBookingDate(obj.fromDate, obj.toDate)) {
        return;
      }
    }
    // validating min and max days of stays allowed
    if (props.date.startDate && props.date.endDate) {
      let date1 = new Date(props.date.startDate).getTime();
      let date2 = new Date(props.date.endDate).getTime();
      let diffInDays = (date2 - date1) / (1000 * 3600 * 24);

      if (diffInDays >= props.minDays && diffInDays <= props.maxDays) {
        props.setIsValid(true);
      } else {
        props.setIsValid(false);
        setDateErr("*please select days within the range");
      }
    } else {
      return;
    }
  }, [props]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setFromDateTouched(true);
    } else {
      settoDateTouched(true);
    }

    props.setDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className={styles.container}>
      <label htmlFor="startDate" className={styles.label}>
        <p>Check-in</p>
        <input
          type="date"
          name="startDate"
          id="startDate"
          min={new Date().toLocaleDateString()}
          value={props.date.startDate}
          onChange={handleChange}
          className={
            props.isValid && fromDateTouched
              ? styles["validdate"]
              : !props.isValid && fromDateTouched
              ? styles["invaliddate"]
              : styles.dateinput
          }
        />
      </label>
      <label htmlFor="endDate" className={styles.label}>
        <p>Check-out</p>
        <input
          type="date"
          name="endDate"
          id="endDate"
          value={props.date.endDate}
          onChange={handleChange}
          className={
            props.isValid && toDateTouched
              ? styles["validdate"]
              : !props.isValid && toDateTouched
              ? styles["invaliddate"]
              : styles.dateinput
          }
        />
      </label>

      <p className={styles.error}>{dateErr}</p>
    </div>
  );
}

export default DateAvailability;
