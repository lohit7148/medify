import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import SearchPop from "./SearchPop";
import { FoundHospitalsContext } from "../../contexts/AllContexts";

const API = "https://meddata-backend.onrender.com";

const SearchBar = () => {

  const [, setFoundHospitals] = useContext(FoundHospitalsContext);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");

  const [showStates, setShowStates] = useState(false);
  const [showCities, setShowCities] = useState(false);

  useEffect(() => {

    axios.get(`${API}/states`)
      .then(res => setStates(res.data));

  }, []);

  useEffect(() => {

    if(stateName){

      axios.get(`${API}/cities/${stateName}`)
        .then(res => setCities(res.data));

    }

  }, [stateName]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const res = await axios.get(
      `${API}/data?state=${stateName}&city=${cityName}`
    );

    setFoundHospitals({
      hospitals: res.data,
      stateName,
      cityName,
      noSearchYet: false
    });

  };

  return (

    <form onSubmit={handleSubmit}>

      {/* STATE DROPDOWN */}
      <div
        id="state"
        onClick={() => setShowStates(true)}
      >

        <input
          value={stateName}
          placeholder="State"
          readOnly
        />

        {showStates && (
          <SearchPop
            locations={states}
            clickFunction={(state)=>{
              setStateName(state);
              setShowStates(false);
            }}
          />
        )}

      </div>

      {/* CITY DROPDOWN */}
      <div
        id="city"
        onClick={() => setShowCities(true)}
      >

        <input
          value={cityName}
          placeholder="City"
          readOnly
        />

        {showCities && (
          <SearchPop
            locations={cities}
            clickFunction={(city)=>{
              setCityName(city);
              setShowCities(false);
            }}
          />
        )}

      </div>

      <button
        id="searchBtn"
        type="submit"
      >
        Search
      </button>

    </form>

  );

};

export default SearchBar;
