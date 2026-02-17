import React,{useContext,useEffect} from 'react';
import {BookingsContext} from '../../contexts/AllContexts';
import ResultCard from '../ResultCard/ResultCard';

const Bookings=()=>{

    const [bookings,setBookings]=useContext(BookingsContext);

    useEffect(()=>{

        const saved=

            JSON.parse(localStorage.getItem("bookings"))||[];

        setBookings(saved);

    },[]);

    return(

        <div>

            {bookings.map((item,i)=>(

                <ResultCard

                    key={i}

                    hospitalName={item.hospitalName}

                    county={item.county}

                    city={item.city}

                    rating={item.rating}

                    hospitalType={item.hospitalType}

                    atBookingsPage={true}

                    bookedDate={item.dateTime.date}

                    bookedTime={item.dateTime.time}

                />

            ))}

        </div>

    )

}

export default Bookings
