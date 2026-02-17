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
      .then(res => {
        setStates(res.data);
      })
      .catch(err => console.log(err));

  }, []);

  // Load cities when state selected
  useEffect(() => {

    if (stateName) {

      axios.get(`${API}/cities/${stateName}`)
        .then(res => {
          setCities(res.data);
        })
        .catch(err => console.log(err));

    }

  }, [stateName]);

  // Submit search
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!stateName || !cityName) return;

    try {

      const res = await axios.get(
        `${API}/data?state=${stateName}&city=${cityName}`
      );

      setFoundHospitals({
        hospitals: res.data,
        stateName,
        cityName,
        noSearchYet: false
      });

    }
    catch (err) {
      console.log(err);
    }

  };

  return (

    <form onSubmit={handleSubmit}>

      {/* STATE DROPDOWN */}
      <div
        id="state"
        style={{ position: "relative", width: "200px", marginBottom: "10px" }}
      >

        <input
          type="text"
          value={stateName}
          placeholder="State"
          readOnly
          onClick={() => setShowStates(true)}
          style={{ width: "100%", padding: "8px", cursor: "pointer" }}
        />

        {showStates && (

          <ul style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            background: "white",
            border: "1px solid #ccc",
            position: "absolute",
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 999
          }}>

            {states.map((item, index) => (

              <li
                key={index}
                style={{
                  padding: "8px",
                  cursor: "pointer"
                }}
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
      <div
        id="city"
        style={{ position: "relative", width: "200px", marginBottom: "10px" }}
      >

        <input
          type="text"
          value={cityName}
          placeholder="City"
          readOnly
          onClick={() => {
            if (stateName) setShowCities(true);
          }}
          style={{ width: "100%", padding: "8px", cursor: "pointer" }}
        />

        {showCities && (

          <ul style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            background: "white",
            border: "1px solid #ccc",
            position: "absolute",
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 999
          }}>

            {cities.map((item, index) => (

              <li
                key={index}
                style={{
                  padding: "8px",
                  cursor: "pointer"
                }}
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

      {/* SEARCH BUTTON */}
      <button
        id="searchBtn"
        type="submit"
        style={{
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Search
      </button>

    </form>

  );

};

export default SearchBar;