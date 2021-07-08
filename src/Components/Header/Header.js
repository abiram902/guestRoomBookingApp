import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header(props) {
  const email = useSelector((state) => state.user.email);
  const userRooms = useSelector((state) => state.user.userRooms); //notification icon with noOf bookingd

  const textToRender = email.length > 3 ? email : "Welcome!";
  return (
    <div id="header">
      <div className="header-title">
        <Link
          to="/guestRoomBookingApp"
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <h3>ShareBnB</h3>
        </Link>
      </div>
      <div>
        <p className="header-email">{textToRender}</p>
      </div>
      <div className="header-avatar" onClick={props.toggleLogin}>
        <h1>{email ? <span className="a1">{email[0]}</span> : "👱‍♂️"}</h1>
        {email && <span className="notification">{userRooms.length}</span>}
      </div>
    </div>
  );
}

export default Header;
