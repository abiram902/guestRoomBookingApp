import React from "react";
import { useSelector } from "react-redux";
import Card from "../Cards/Card";
import styles from "./YourRooms.module.css";

function YourRooms() {
  const user = useSelector((state) => state.user);
  console.log(user.userRooms);
  return (
    <div className={styles.container}>
      {user.userRooms.map((item) => (
        <Card
          disabled={true}
          rooms={item.rooms}
          email={item.email}
          id={item.id}
          title={item.title}
          price={item.price}
          aminities={item.aminities}
          location={item.location}
          minDays={item.minDays}
          maxDays={item.maxDays}
          image={item.image}
          bookings={item.bookings}
          inYourRoomsPage={true}
        />
      ))}
    </div>
  );
}

export default YourRooms;
