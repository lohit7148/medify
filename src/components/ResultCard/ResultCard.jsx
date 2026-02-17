import React, { useContext, useState } from 'react';
import "./ResultCard.css";
import hospitalImg from "../../assets/hospitalCircle.svg";
import likeIcon from "../../assets/like.svg";
import Button from '../Button/Button';
import Slots from '../Slots/Slots';
import { BookingsContext } from '../../contexts/AllContexts';

const resultCardOffer = "Consultation fee at clinic";

const ResultCard = props => {

    const { hospitalName, county, city, rating, hospitalType, atBookingsPage, bookedDate, bookedTime } = props;

    const [bookings, setBookings] = useContext(BookingsContext)

    const [dateTime, setDateTime] = useState({date: "", time: ""});

    const [slotsON, setSlotsON] = useState(false);

    const handleCardClick = () => {

        if(atBookingsPage) return;

        setSlotsON(!slotsON)
    };

    const handleButton = () => {

        if(atBookingsPage) return;

        if(!slotsON) return setSlotsON(true);

        if(!dateTime.date.length || !dateTime.time.length){

            return alert("Select Slot Date to book.");
        }

        let saveBookings = [...bookings, {

            dateTime,

            hospitalName,

            county,

            city,

            rating,

            hospitalType

        }]

        localStorage.setItem("bookings", JSON.stringify(saveBookings))

        setBookings(saveBookings);

        alert("New Booking Created!");
    }

    const displayRightSideOfCard = () => {

        if(atBookingsPage){

            return(

                <div className='resultContent-right resultContent-top'>

                    <Button text={bookedTime} buttonClass={`smallButton blueButton-outlined`}/>

                    <Button text={bookedDate} buttonClass={`smallButton greenButton-outlined`}/>

                </div>

            )
        }

        return (

            <div className='resultContent-right'>

                <span className='available'>Available Today</span>

                <Button clickFuntion={handleButton} buttonClass={"bookingButton longButton"} text={"Book FREE Center Visit"}/>

            </div>

        )
    }

    const slotClick = (date, time) => {

        setDateTime({time, date});
    }

    return (

        <div className='ResultCardWrapper'>

            <div className='ResultCard' onClick={handleCardClick}>

                <div className='resultCardImageWrapper'>

                    <img src={hospitalImg} alt="hospital icon" />

                </div>

                <div className='resultCardContent'>

                    <div className='resultContent-left'>

                        <h3 className='resultCardTitle'>{hospitalName}</h3>

                        <div className='resultLocation'>

                            <span className='resultCity'>{`${county}, ${city}`}</span>

                            <span className='resultCardSubtext'>{hospitalType}</span>

                            <span className='resultCardSubtext'>more</span>

                        </div>

                        <div className='resultCardOfferLine'>

                            <span className='FREE'>FREE</span>

                            <span className='strikeThrough'>₹500</span>

                            <span>{resultCardOffer}</span>

                        </div>

                        <Button buttonClass={"smallButton greenButton rating"} text={rating} icon={likeIcon} />

                    </div>

                    {displayRightSideOfCard()}

                </div>

            </div>

            <Slots dateTime={dateTime} slotsON={slotsON} slotClick={slotClick}/>

        </div>
    );
};

export default ResultCard;
