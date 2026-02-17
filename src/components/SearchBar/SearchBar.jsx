import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import "./SearchBar.css"
import searchIcon from "../../assets/search.svg"
import location from "../../assets/location.svg"
import loadingIcon from "../../assets/loading.svg";
import SearchPop from './SearchPop';
import { findLocations, findBookings } from '../../functions/functions';
import { BookingsContext, FoundHospitalsContext } from '../../contexts/AllContexts';

const api = "https://meddata-backend.onrender.com";

const allSates = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","DC","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","PR","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","VI","Wyoming","AS","GU","MP"]

const SearchBar = props => {

    const { customClass, atBookingsPage } = props;

    const [bookings] = useContext(BookingsContext)

    const [, setFoundHospitals] = useContext(FoundHospitalsContext)

    const [stateName, setStateName] = useState("");

    const [cityName, setCityName] = useState("");

    const [hospitalName, setHospitalName] = useState("");

    const [filteredStates, setFilteredStates] = useState([]);

    const [allCities, setAllCities] = useState([]);

    const [filteredCities, setFilteredCities] = useState([]);

    const [filteredHospitals, setFilteredHospitals] = useState([]);

    const [fetchingHospitals, setFetchingHospitals] = useState(false)

    const stateName_onChange = useRef(false);

    const cityName_onChange = useRef(false);

    const fetchingCities = useRef(false);

    useEffect(()=> {

        if(stateName_onChange.current){

            setFilteredStates(findLocations(allSates,stateName))

        }

    }, [stateName])

    useEffect(()=> {

        if(cityName_onChange.current){

            setFilteredCities(findLocations(allCities,cityName))

        }

    }, [cityName])

    useEffect(()=> {

        setFilteredHospitals(findBookings(bookings,hospitalName))

    }, [hospitalName])

    const handleSubmit = async e => {

        e.preventDefault();

        setFetchingHospitals(true);

        const hospitals = await axios.get(

            `${api}/data?state=${stateName}&city=${cityName}`

        );

        setFoundHospitals({

            hospitals: hospitals.data,

            cityName: cityName,

            stateName: stateName,

            noSearchYet: false

        });

        setFetchingHospitals(false);

    }

    const fetchCities = async state => {

        fetchingCities.current = true;

        const res = await axios.get(`${api}/cities/${state}`);

        setAllCities(res.data);

        fetchingCities.current = false;

    }

    return (

        <form onSubmit={handleSubmit} className={`SearchBar ${customClass}`}>

            <div id="state">

                <input

                    type="text"

                    name="state"

                    value={stateName}

                    placeholder="State"

                    onChange={e=>{

                        setStateName(e.target.value);

                        stateName_onChange.current=true;

                        fetchCities(e.target.value);

                    }}

                    required

                />

                <SearchPop

                    locations={filteredStates}

                    clickFunction={name=>{

                        setStateName(name);

                        fetchCities(name);

                        setFilteredStates([]);

                    }}

                />

            </div>

            <div id="city">

                <input

                    type="text"

                    name="city"

                    value={cityName}

                    placeholder="City"

                    onChange={e=>{

                        setCityName(e.target.value);

                        cityName_onChange.current=true;

                    }}

                    required

                />

                <SearchPop

                    locations={filteredCities}

                    clickFunction={name=>{

                        setCityName(name);

                        setFilteredCities([]);

                    }}

                />

            </div>

            <button type="submit" id="searchBtn">

                {fetchingHospitals?"Fetching...":"Search"}

            </button>

        </form>

    )
}

export default SearchBar
