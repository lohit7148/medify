import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import "./SearchBar.css"
import searchIcon from "../../assets/search.svg"
import location from "../../assets/location.svg"
import loadingIcon from "../../assets/loading.svg";
import Button from '../Button/Button';
import { findLocations, findBookings } from '../../functions/functions';
import SearchPop from './SearchPop';
import { BookingsContext, FoundHospitalsContext } from '../../contexts/AllContexts';

const api = "https://meddata-backend.onrender.com";
const allSates = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","DC","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","PR","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","VI","Wyoming","AS","GU","MP"]

const SearchBar = props => {

    const { customClass, atBookingsPage, atHomePage } = props;

    const [bookings, setBookings] = useContext(BookingsContext)
    const [foundHospitals, setFoundHospitals] = useContext(FoundHospitalsContext)

    const [stateName, setStateName] = useState("");
    const [cityName, setCityName] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [filteredStates, setFilteredStates] = useState([]);
    const [allCities, setAllCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [disableCityInput, setDisableCityInput] = useState(undefined);
    const [filteredHospitals, setFilteredHospitals] = useState([]);
    const [fetchingHospitals, setFetchingHospitals] = useState(false)

    const stateName_onChange = useRef(false);
    const cityName_onChange = useRef(false);
    const fetchingCities = useRef(false);

    useEffect(()=> {
        if(stateName_onChange.current) filterStatesFunc();
    }, [stateName])

    useEffect(()=> {
        if(cityName_onChange.current) filterCitiesFunc();
    }, [cityName])

    useEffect(() => {
        filterBookingsFunc();
    }, [hospitalName])

    const handleSubmit = async event => {
        event.preventDefault();
        getLocationData("hospitals")
    }

    const getLocationData = async (dataType, location) => {

        if(dataType === "cities"){
            fetchingCities.current = true;
            const cities = await axios.get(`${api}/cities/${location}`);
            setAllCities(cities.data);
            fetchingCities.current = false;
            setDisableCityInput(undefined);
        }

        if(dataType === "hospitals"){
            setFetchingHospitals(true);
            const hospitals = await axios.get(`${api}/data?state=${stateName}&city=${cityName}`);
            setFoundHospitals({hospitals: hospitals.data, cityName, stateName, noSearchYet:false});
            setFetchingHospitals(false);
        }
    }

    const handleChange = event => {

        const {value, name} = event.target;

        if(name === "state"){
            stateName_onChange.current = true;
            setStateName(value)
            setDisableCityInput("disableCityInput");
            cityName_onChange.current = false;
            setCityName("")
        }

        if(name === "city"){
            cityName_onChange.current = true;
            setCityName(value)
        }

        if(name === "hospitalName"){
            setHospitalName(value);
        }
    }

    const filterStatesFunc = () => {
        let foundStates = findLocations(allSates, stateName);
        setFilteredStates(foundStates);
    }

    const filterCitiesFunc = () => {
        let foundCities = findLocations(allCities, cityName);
        setFilteredCities(foundCities);
    }

    const filterBookingsFunc = () => {
        let hospitals = findBookings(bookings, hospitalName);
        setFilteredHospitals(hospitals);
    }

    const clickStateSuggestions = (nameOfState) => {
        setFilteredStates([]);
        stateName_onChange.current = false;
        setStateName(nameOfState)
        getLocationData("cities", nameOfState);
    }

    const clickCitySuggetions = (nameOfCity) => {
        setFilteredCities([]);
        cityName_onChange.current = false;
        setCityName(nameOfCity)
    }

    const displayInputs = () => {

        if(atBookingsPage){
            return (
            <span className='inputWrapper'>
                <img src={location}/>
                <input 
                type='text' 
                value={hospitalName} 
                name='hospitalName' 
                onChange={handleChange}
                placeholder='Search By Hospital'
                required
                />
                <SearchPop atBookingsPage={true} hospitals={filteredHospitals} clickFunction={clickStateSuggestions}/>
            </span>
        )
    }

        return(
            <>
            
            <div id="state">
            <span className='inputWrapper'>
                <img src={location}/>
                <input 
                type='text' 
                value={stateName} 
                name='state' 
                onChange={handleChange}
                placeholder='state'
                required
                />
                <SearchPop locations={filteredStates} clickFunction={clickStateSuggestions}/>
            </span>
            </div>

            <div id="city">
            <span className={`inputWrapper ${disableCityInput}`}>
                <img src={fetchingCities.current ? loadingIcon : location}/>
                <input 
                type='text' 
                value={cityName} 
                name='city' 
                onChange={handleChange}
                placeholder={fetchingCities.current ? "Fetching cities..." :'city'}
                required
                />
                <SearchPop locations={filteredCities} clickFunction={clickCitySuggetions}/>
            </span>
            </div>

            </>
        )
    }

    return (

        <form onSubmit={handleSubmit} className={`SearchBar ${customClass}`}>

            {displayInputs()}

            <button type="submit" id="searchBtn" className="longButton">
                {fetchingHospitals ? "Fetching..." : "Search"}
            </button>

        </form>
    );
};

export default SearchBar;
