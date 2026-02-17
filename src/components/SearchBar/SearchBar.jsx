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

  useEffect(() => {
    axios.get(`${API}/states`)
      .then(res => setStates(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (stateName) {
      axios.get(`${API}/cities/${stateName}`)
        .then(res => setCities(res.data))
        .catch(() => {});
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
        onClick={() => setShowStates(true)}
      >

        <input
          value={stateName}
          placeholder="State"
          readOnly
        />

        {showStates && (
          <ul style={{
            position: "absolute",
            background: "white",
            zIndex: 999,
            listStyle: "none",
            padding: "0",
            margin: "0",
            border: "1px solid #ccc"
          }}>
            {states.map((item, index) => (
              <li
                key={index}
                style={{ padding: "8px", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
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


      {/* CITY */}
      <div
        id="city"
        style={{ position: "relative" }}
        onClick={() => stateName && setShowCities(true)}
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
            listStyle: "none",
            padding: "0",
            margin: "0",
            border: "1px solid #ccc"
          }}>
            {cities.map((item, index) => (
              <li
                key={index}
                style={{ padding: "8px", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
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
