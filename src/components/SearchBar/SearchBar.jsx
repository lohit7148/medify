import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
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
      .then(res => setStates(res.data))
      .catch(() => {});
  }, []);

  // Load cities
  useEffect(() => {
    if(stateName){
      axios.get(`${API}/cities/${stateName}`)
        .then(res => setCities(res.data))
        .catch(() => {});
    }
  }, [stateName]);

  // Submit search
  const handleSubmit = async (e) => {

    e.preventDefault();

    if(!stateName || !cityName) return;

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
      <div id="state" style={{ position: "relative" }}>

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
            zIndex: 999,
            listStyle: "none",
            padding: "0",
            margin: "0",
            width: "100%",
            border: "1px solid #ccc"
          }}>
            {states.map((item, index) => (
              <li
                key={index}
                style={{ padding: "8px", cursor: "pointer" }}
                onClick={() => {
                  setStateName(item);
                  setShowStates(false);
                  setCityName("");
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}

      </div>


      {/* CITY DROPDOWN */}
      <div id="city" style={{ position: "relative", marginTop: "10px" }}>

        <input
          value={cityName}
          placeholder="City"
          readOnly
          onClick={() => stateName && setShowCities(true)}
        />

        {showCities && (
          <ul style={{
            position: "absolute",
            background: "white",
            zIndex: 999,
            listStyle: "none",
            padding: "0",
            margin: "0",
            width: "100%",
            border: "1px solid #ccc"
          }}>
            {cities.map((item, index) => (
              <li
                key={index}
                style={{ padding: "8px", cursor: "pointer" }}
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
