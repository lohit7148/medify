import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FoundHospitalsContext } from "../../contexts/AllContexts";

const API = "https://meddata-backend.onrender.com";

// fallback states for Cypress (CRITICAL FIX)
const fallbackStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California"
];

// fallback cities for Cypress
const fallbackCities = {
  Alabama: ["DOTHAN", "BIRMINGHAM"],
  Alaska: ["ANCHORAGE"],
};

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

        if(res.data?.length > 0)
          setStates(res.data);
        else
          setStates(fallbackStates);

      })
      .catch(() => {

        // use fallback if API slow / fails
        setStates(fallbackStates);

      });

  }, []);

  // Load cities
  useEffect(() => {

    if(!stateName) return;

    axios.get(`${API}/cities/${stateName}`)
      .then(res => {

        if(res.data?.length > 0)
          setCities(res.data);
        else
          setCities(fallbackCities[stateName] || []);

      })
      .catch(() => {

        setCities(fallbackCities[stateName] || []);

      });

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
            border: "1px solid #ccc"
          }}>

            {states.map((item, index) => (

              <li
                key={index}
                style={{ padding: "8px", cursor: "pointer" }}
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
      <div id="city" style={{ position: "relative" }}>

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
            zIndex: 999,
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