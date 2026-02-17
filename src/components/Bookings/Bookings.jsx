import React, { useContext, useEffect } from "react";
import { BookingsContext } from "../../contexts/AllContexts";
import ResultCard from "../ResultCard/ResultCard";

const Bookings = () => {

  const [bookings, setBookings] = useContext(BookingsContext);

  useEffect(()=>{

    const saved =
      JSON.parse(localStorage.getItem("bookings")) || [];

    setBookings(saved);

  },[]);

  return (

    <div>

      <h1>My Bookings</h1>

      {bookings.map((item,index)=>(

        <ResultCard
          key={index}
          hospitalName={
            item.hospitalName ||
            item["Hospital Name"]
          }
          city={item.city || item["City"]}
          atBookingsPage={true}
          bookedDate={
            item.dateTime?.date ||
            item.bookingDate
          }
          bookedTime={
            item.dateTime?.time ||
            item.bookingTime
          }
        />

      ))}

    </div>

  );

};

export default Bookings;
