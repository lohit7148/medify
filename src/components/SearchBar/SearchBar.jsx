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

  // Load states
  useEffect(() => {

    axios.get(`${API}/states`)
      .then(res => {
        setStates(res.data);
      });

  }, []);

  // Load cities
  useEffect(() => {

    if(stateName){

      axios.get(`${API}/cities/${stateName}`)
        .then(res => {
          setCities(res.data);
        });

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
      <div
        id="state"
        style={{ position: "relative" }}
      >

        <input
          value={stateName}
          placeholder="State"
          readOnly
          onClick={() => setShowStates(true)}
        />

        {showStates && (

          <ul style={{
            position: "absolute",
            background: "white",
            zIndex: 999
          }}>

            {states.map((item, index) => (

              <li
                key={index}
                onClick={() => {
                  setStateName(item);
                  setShowStates(false);
                }}
              >
                {item}
              </li>

            ))}

          </ul>

        )}

      </div>

      {/* CITY */}
      <div
        id="city"
        style={{ position: "relative" }}
      >

        <input
          value={cityName}
          placeholder="City"
          readOnly
          onClick={() => setShowCities(true)}
        />

        {showCities && (

          <ul style={{
            position: "absolute",
            background: "white",
            zIndex: 999
          }}>

            {cities.map((item, index) => (

              <li
                key={index}
                onClick={() => {
                  setCityName(item);
                  setShowCities(false);
                }}
              >
                {item}
              </li>

            ))}

          </ul>

        )}

      </div>

      <button id="searchBtn" type="submit">
        Search
      </button>

    </form>

  );

};

export default SearchBar;
