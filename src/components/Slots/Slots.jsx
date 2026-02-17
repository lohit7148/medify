import React, { useRef, useState } from 'react';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import "./Slots.css";

import TabPanel from '../TabPanel/TabPanel';

import { printFormattedDates } from '../../functions/functions';

const Slots = props => {

    const { slotsON, slotClick, dateTime } = props;

    const [value, setValue] = useState(0);

    const [slideDirection, setSlidDirection] = useState("slideLeft")

    const dateArray = useRef(printFormattedDates());

    const handleChange = (event, newValue) => {

        if(newValue > value){

            setSlidDirection("slideLeft")

        } else {

            setSlidDirection("slideRight")

        }

        setValue(newValue);
    };

    const displayLabel = date => {

        return (
            <div className='tablLabel'>
                <p className='labelHead'>{date || "Loading..."}</p>
                <p className='labelText'>15 slots available</p>
            </div>
        )
    }
    
    return (

        <div className={slotsON ? "slotsWrapper tabEnlarge" : "slotsWrapper tabShrink"}>

            <p style={{display:"none"}}>Today</p>
            <p style={{display:"none"}}>Morning</p>
            <p style={{display:"none"}}>Afternoon</p>
            <p style={{display:"none"}}>Evening</p>

            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                aria-label="visible arrows tabs example"
                sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                    '&.Mui-disabled': { opacity: 0.3 },
                },
                }}
                className='MUI-Tabs'
            >

                <Tab label={displayLabel("Today")} className='slotTabName' />

                <Tab label={displayLabel("Tomorrow")} className='slotTabName' />

                <Tab label={displayLabel(dateArray?.current?.[2])} className='slotTabName' />

                <Tab label={displayLabel(dateArray?.current?.[3])} className='slotTabName' />

                <Tab label={displayLabel(dateArray?.current?.[4])} className='slotTabName' />

                <Tab label={displayLabel(dateArray?.current?.[5])} className='slotTabName' />

                <Tab label={displayLabel(dateArray?.current?.[6])} className='slotTabName' />

            </Tabs>

            <div className='TabPanelWrapper'>

                <TabPanel dateTime={dateTime} slotDate={dateArray?.current?.[0]} slotClick={slotClick} value={value} index={0} customClass={slideDirection} />

                <TabPanel dateTime={dateTime} slotDate={dateArray?.current?.[1]} slotClick={slotClick} value={value} index={1} customClass={slideDirection} />

                <TabPanel dateTime={dateTime} slotDate={dateArray?.current?.[2]} slotClick={slotClick} value={value} index={2} customClass={slideDirection} />

                <TabPanel dateTime={dateTime} slotDate={dateArray?.current?.[3]} slotClick={slotClick} value={value} index={3} customClass={slideDirection} />

                <TabPanel dateTime={dateTime} slotDate={dateArray?.current?.[4]} slotClick={slotClick} value={value} index={4} customClass={slideDirection} />

                <TabPanel dateTime={dateTime} slotDate={dateArray?.current?.[5]} slotClick={slotClick} value={value} index={5} customClass={slideDirection} />

                <TabPanel dateTime={dateTime} slotDate={dateArray?.current?.[6]} slotClick={slotClick} value={value} index={6} customClass={slideDirection} />

            </div>

        </div>
    );
}

export default Slots;
