import React from "react";
import "./Card.css";
import Aminities from "./Aminities";
import { useHistory } from "react-router";
import Location from "./Location";
import ImageCoursel from "../../UI/ImageCoursel/ImageCoursel";
import OptionButton from "../../UI/OptionButton/OptionButton";
import { useSelector } from "react-redux";

function Card(props) {
  const history = useHistory(); //to programatically change url
  const user = useSelector((state) => state.user);
  const errMsg = "*No rooms left";

  const handleClick = () => {
    history.push("/room/" + props.id); //navigating to the booking page
  };

  //console.log(props.bookings);

  const renderOption = () => {
    if (!user.isHost) {
      return; // checking host access to edit or delete this card
    } else {
      if (props.email === user.email && !props.inYourRoomsPage) {
        return (
          <OptionButton //component to edit or delete card
            items={[
              { name: "edit", type: "EDIT", id: props.id },
              { name: "delete", type: "REMOVE", id: props.id },
            ]}
          />
        );
      } else {
        return;
      }
    }
  };

  const datesToRender =
    props.inYourRoomsPage && props.bookings.length > 0 ? (
      props.bookings.map((item, id) => {
        return (
          <ul key={id} className="card-booked-date">
            <li style={{ color: "green", fontWeight: 800 }}>
              booked from: {item.fromDate}
            </li>
            <li style={{ color: "green", fontWeight: 800 }}>
              till: {item.toDate}
            </li>
          </ul>
        );
      })
    ) : props.inYourRoomsPage && props.bookings.length === 0 ? (
      <p style={{ color: "green", fontWeight: 800 }}>Your AD</p>
    ) : null;

  return (
    <div className={props.bookings ? "card-long" : "card"}>
      <div className="card-image-container">
        <ImageCoursel images={props.image} />
      </div>

      <p className="card-desc" onClick={handleClick}>
        {props.title}
      </p>
      {props.rooms <= 0 && <p className="warn">{errMsg}</p>}
      <Location location={props.location} />

      <p className="card-price" onClick={handleClick}>
        rs.{props.price} /day
      </p>

      <div className="current-user-bookings">{datesToRender}</div>

      <div className="card-aminities">
        <h4>Aminities</h4>
        <Aminities aminities={props.aminities} />
      </div>
      {renderOption()}
    </div>
  );
}

export default Card;
