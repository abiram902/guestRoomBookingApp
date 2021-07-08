import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import "./Cards.css";

function Cards() {
  const listing = useSelector((state) => state.listings); //pulling data from redux store

  const mapped = listing.map((item) => {
    return (
      <Card
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
        bookings={null}
        inYourRoomsPage={false}
      />
    );
  });

  return <div className="cards-container">{mapped}</div>;
}

export default Cards;
