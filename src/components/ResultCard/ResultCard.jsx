import React, { useContext, useState } from "react";
import "./ResultCard.css";
import hospitalImg from "../../assets/hospitalCircle.svg";
import likeIcon from "../../assets/like.svg";
import Button from "../Button/Button";
import Slots from "../Slots/Slots";
import { BookingsContext } from "../../contexts/AllContexts";

const ResultCard = (props) => {

  const {
    hospitalName,
    county,
    city,
    rating,
    hospitalType,
    atBookingsPage,
    bookedDate,
    bookedTime
  } = props;

  const [bookings, setBookings] = useContext(BookingsContext);

  const [slotsON, setSlotsON] = useState(false);

  const [dateTime, setDateTime] = useState({
    date: "",
    time: ""
  });

  const handleBooking = () => {

    if(atBookingsPage) return;

    if(!slotsON){
      setSlotsON(true);
      return;
    }

    if(!dateTime.date || !dateTime.time){
      return;
    }

    const newBooking = {
      hospitalName,
      city,
      county,
      rating,
      hospitalType,
      dateTime
    };

    const existing =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const updated = [...existing,newBooking];

    localStorage.setItem("bookings",JSON.stringify(updated));

    setBookings(updated);

  };

  const slotClick = (date,time)=>{
    setDateTime({date,time});
  };

  return (

    <div>

      <h3>{hospitalName}</h3>

      <Button
        clickFuntion={handleBooking}
        text="Book FREE Center Visit"
      />

      <Slots
        slotsON={slotsON}
        slotClick={slotClick}
        dateTime={dateTime}
      />

      {atBookingsPage && (
        <>
          <p>{bookedDate}</p>
          <p>{bookedTime}</p>
        </>
      )}

    </div>

  );

};

export default ResultCard;
