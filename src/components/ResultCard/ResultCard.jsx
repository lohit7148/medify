import React, { useContext, useState } from 'react';
import "./ResultCard.css";
import hospitalImg from "../../assets/hospitalCircle.svg";
import likeIcon from "../../assets/like.svg";
import Slots from '../Slots/Slots';
import { BookingsContext } from '../../contexts/AllContexts';

const ResultCard = props => {

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

    const [bookings,setBookings]=useContext(BookingsContext);

    const [dateTime,setDateTime]=useState({date:"",time:""});

    const [slotsON,setSlotsON]=useState(false);

    const handleBooking=()=>{

        if(atBookingsPage)return;

        if(!slotsON){

            setSlotsON(true);

            return;

        }

        if(!dateTime.date||!dateTime.time){

            alert("Select Slot");

            return;

        }

        const newBooking={

            hospitalName,

            county,

            city,

            rating,

            hospitalType,

            dateTime

        };

        const existing=

            JSON.parse(localStorage.getItem("bookings"))||[];

        const updated=[...existing,newBooking];

        localStorage.setItem(

            "bookings",

            JSON.stringify(updated)

        );

        setBookings(updated);

    };

    return(

        <div>

            <h3>{hospitalName}</h3>

            <p>{county},{city}</p>

            <p>{rating}</p>

            {!atBookingsPage&&(

                <button onClick={handleBooking}>

                    Book FREE Center Visit

                </button>

            )}

            {atBookingsPage&&(

                <>

                    <p>{bookedDate}</p>

                    <p>{bookedTime}</p>

                </>

            )}

            <Slots

                slotsON={slotsON}

                slotClick={(date,time)=>

                    setDateTime({date,time})

                }

                dateTime={dateTime}

            />

        </div>

    )

}

export default ResultCard
