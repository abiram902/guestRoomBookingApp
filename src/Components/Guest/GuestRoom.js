import React, { useState } from "react";
import styles from "./GuestRoom.module.css";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Aminities from "../Cards/Aminities";
import Location from "../Cards/Location";
import ImageCoursel from "../../UI/ImageCoursel/ImageCoursel";
import DateAvailability from "./DateAvailability";
import { bookRoom } from "../../redux/listings/listingAction";

function GuestRoom(props) {
  // using url parameter to pass the id of a specific room
  const { id } = useParams();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user.email);
  const [isValid, setIsValid] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const history = useHistory();

  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  // accessing data from the redux store by the id
  const room = useSelector((state) => {
    for (let item of state.listings) {
      if (item.id === id) {
        return item;
      }
    }
  });

  const handleBooking = (e) => {
    // validation before submiting
    if (!auth) {
      setErrMsg("*please login to continue");
    } else if (!isValid) {
      return;
    } else {
      setErrMsg("");
      let dispatchItem = {
        ...room,
        bookings: [
          {
            fromDate: date.startDate,
            toDate: date.endDate,
            bookedBy: auth,
          },
        ],
      };

      dispatch(bookRoom(dispatchItem));
      history.push("/guestRoomBookingApp/");
    }
  };
  return (
    <div className={styles["guestroom-container"]}>
      <div className={styles.jumbotron}>
        <div className={styles.imagecoursel}>
          <ImageCoursel images={room.image} />
        </div>
        <div className={styles.titlesection}>
          <h2>{room.title}</h2>
          <div className={styles.roomdesc}>
            <span> {room.rooms} rooms available</span>
            <span> x{room.area}sqft</span>
          </div>

          <Location location={room.location} />
          <p>Rs. {room.price} / day</p>
          <Aminities aminities={room.aminities} />
          <p>
            rooms are availble for min of {room.minDays} to max of{" "}
            {room.maxDays} days
          </p>
          <div className={styles.availability}>
            <DateAvailability
              minDays={room.minDays}
              maxDays={room.maxDays}
              bookings={room.bookings}
              isValid={isValid}
              setIsValid={setIsValid}
              date={date}
              rooms={room.rooms}
              setDate={setDate}
            />
          </div>

          <div className={styles.warn}>{errMsg}</div>
          <input
            type="button"
            value="Book This Room"
            disabled={!isValid}
            className={styles.button}
            onClick={handleBooking}
          />
        </div>
      </div>
    </div>
  );
}

export default GuestRoom;
