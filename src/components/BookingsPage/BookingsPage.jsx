import React from 'react';
import Bookings from '../Bookings/Bookings';
import AppTop from '../AppTop/AppTop';
import Navbar from '../Navbar/Navbar';

const BookingsPage = () => {
    return (
        <>
            <AppTop />  
            <Navbar atBookingsPage={true} backColor="whiteBack" />

            <div className="commonContainer">
                <h1>My Bookings</h1>
            </div>

            <Bookings />
        </>
    );
};

export default BookingsPage;
