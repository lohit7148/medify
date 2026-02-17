import React, { useContext, useEffect } from 'react';
import "./Bookings.css";
import { BookingsContext } from '../../contexts/AllContexts';
import ResultCard from '../ResultCard/ResultCard';

const Bookings = () => {

    const [bookings, setBookings] = useContext(BookingsContext);

    const displayCards = () => {

        if(!bookings || bookings.length === 0) return null;

        return bookings.map((item, index) => {

            return (
                <ResultCard 
                    key={index}
                    hospitalName={item.hospitalName}
                    county={item.county}
                    city={item.city}
                    rating={item.rating}
                    hospitalType={item.hospitalType}
                    atBookingsPage={true}
                    bookedDate={item.dateTime.date}
                    bookedTime={item.dateTime.time}
                />
            )
        });
    }

    useEffect(() => {

        const localBookings = localStorage.getItem("bookings");

        if(localBookings){

            setBookings(JSON.parse(localBookings));

        }

    }, []);

    return (

        <div className='SearchResults' >

            <div className='commonContainer resultsBody'>

                <div className='resultsHead'>
                    <h5></h5>
                    <p></p>
                </div>

                <div className='cardAndSensodyne'>

                    <aside className='resultCardsArray'>

                        {displayCards()}

                    </aside>

                    <aside className='sensodyne'></aside>

                </div>

            </div>

        </div>
    );
};

export default Bookings;
