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

  // LOAD STATES IMMEDIATELY
  useEffect(() => {

    const loadStates = async () => {

      const res = await axios.get(`${API}/states`);

      setStates(res.data);

    };

    loadStates();

  }, []);

  // LOAD CITIES
  useEffect(() => {

    if(stateName){

      const loadCities = async () => {

        const res = await axios.get(`${API}/cities/${stateName}`);

        setCities(res.data);

      };

      loadCities();

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

      {/* STATE */}
      <div id="state">

        <input
          value={stateName}
          placeholder="State"
          readOnly
          onClick={() => setShowStates(true)}
        />

        {showStates && (

          <SearchPop
            locations={states}
            clickFunction={(state) => {
              setStateName(state);
              setShowStates(false);
            }}
          />

        )}

      </div>

      {/* CITY */}
      <div id="city">

        <input
          value={cityName}
          placeholder="City"
          readOnly
          onClick={() => setShowCities(true)}
        />

        {showCities && (

          <SearchPop
            locations={cities}
            clickFunction={(city) => {
              setCityName(city);
              setShowCities(false);
            }}
          />

        )}

      </div>

      <button id="searchBtn" type="submit">
        Search
      </button>

    </form>

  );

};

export default SearchBar;
