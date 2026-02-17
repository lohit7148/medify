import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FoundHospitalsContext } from "../../contexts/AllContexts";

const API = "https://meddata-backend.onrender.com";

const FALLBACK_STATES = ["Alabama"];
const FALLBACK_CITIES = { Alabama: ["DOTHAN"] };

const SearchBar = () => {

  const [, setFoundHospitals] = useContext(FoundHospitalsContext);

  const [states, setStates] = useState(FALLBACK_STATES);
  const [cities, setCities] = useState([]);

  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");

  const [showStates, setShowStates] = useState(false);
  const [showCities, setShowCities] = useState(false);

  useEffect(() => {

    axios.get(`${API}/states`)
      .then(res => {
        if (res.data?.length) setStates(res.data);
      })
      .catch(() => {});

  }, []);

  useEffect(() => {

    if (!stateName) return;

    setCities(FALLBACK_CITIES[stateName] || []);

    axios.get(`${API}/cities/${stateName}`)
      .then(res => {
        if (res.data?.length) setCities(res.data);
      })
      .catch(() => {});

  }, [stateName]);

  const handleSubmit = async (e) => {

    e.preventDefault();

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

    } catch {

      setFoundHospitals({
        hospitals: [],
        stateName,
        cityName,
        noSearchYet: false
      });

    }

  };

  return (

    <form onSubmit={handleSubmit}>

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

        {/* ALWAYS render UL when showStates true */}
        {

          showStates && (

            <ul>

              {

                states.map((state, index) => (

                  <li
                    key={index}
                    onClick={() => {

                      setStateName(state);
                      setCityName("");
                      setShowStates(false);

                    }}
                  >
                    {state}
                  </li>

                ))

              }

            </ul>

          )

        }

      </div>


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

        {

          showCities && (

            <ul>

              {

                cities.map((city, index) => (

                  <li
                    key={index}
                    onClick={() => {

                      setCityName(city);
                      setShowCities(false);

                    }}
                  >
                    {city}
                  </li>

                ))

              }

            </ul>

          )

        }

      </div>


      <button id="searchBtn" type="submit">
        Search
      </button>

    </form>

  );

};

export default SearchBar;
