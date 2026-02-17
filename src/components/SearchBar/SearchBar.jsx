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

  // ✅ load states immediately
  useEffect(() => {

    axios.get(`${API}/states`)
      .then(res => {
        setStates(res.data || []);
      })
      .catch(() => {
        setStates([]);
      });

  }, []);

  // ✅ load cities when state selected
  useEffect(() => {

    if(!stateName) return;

    axios.get(`${API}/cities/${stateName}`)
      .then(res => {
        setCities(res.data || []);
      })
      .catch(() => {
        setCities([]);
      });

  }, [stateName]);

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

      {/* STATE */}
      <div
        id="state"
        onClick={() => setShowStates(true)}
        style={{ position: "relative" }}
      >

        <input
          value={stateName}
          placeholder="State"
          readOnly
        />

        {/* ALWAYS render UL when clicked */}
        {showStates && (
          <ul style={{
            position: "absolute",
            background: "white",
            zIndex: 999,
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto"
          }}>
            {states.map((state, index) => (
              <li
                key={index}
                onClick={() => {
                  setStateName(state);
                  setShowStates(false);
                }}
                style={{ padding: "6px", cursor: "pointer" }}
              >
                {state}
              </li>
            ))}
          </ul>
        )}

      </div>

      {/* CITY */}
      <div
        id="city"
        onClick={() => setShowCities(true)}
        style={{ position: "relative" }}
      >

        <input
          value={cityName}
          placeholder="City"
          readOnly
        />

        {showCities && (
          <ul style={{
            position: "absolute",
            background: "white",
            zIndex: 999,
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto"
          }}>
            {cities.map((city, index) => (
              <li
                key={index}
                onClick={() => {
                  setCityName(city);
                  setShowCities(false);
                }}
                style={{ padding: "6px", cursor: "pointer" }}
              >
                {city}
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
