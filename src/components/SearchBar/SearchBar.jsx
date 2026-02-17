import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FoundHospitalsContext } from "../../contexts/AllContexts";

const API = "https://meddata-backend.onrender.com";

const fallbackStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia"
];

const fallbackCities = {
  Alabama: ["DOTHAN"]
};

const SearchBar = () => {

  const [, setFoundHospitals] = useContext(FoundHospitalsContext);

  // IMPORTANT: preload fallback states immediately
  const [states, setStates] = useState(fallbackStates);

  const [cities, setCities] = useState([]);

  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");

  const [showStates, setShowStates] = useState(false);
  const [showCities, setShowCities] = useState(false);

  // Load real states (overwrite fallback when ready)
  useEffect(() => {

    axios.get(`${API}/states`)
      .then(res => {
        if(res.data && res.data.length > 0){
          setStates(res.data);
        }
      })
      .catch(()=>{});

  }, []);

  // Load cities
  useEffect(() => {

    if (!stateName) return;

    // immediate fallback
    setCities(fallbackCities[stateName] || []);

    axios.get(`${API}/cities/${stateName}`)
      .then(res => {
        if(res.data && res.data.length > 0){
          setCities(res.data);
        }
      })
      .catch(()=>{});

  }, [stateName]);

  // Search hospitals
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

      {/* STATE */}
      <div id="state">

        <input
          value={stateName}
          placeholder="State"
          readOnly
          onClick={() => setShowStates(true)}
        />

        {showStates && (

          <ul>

            {states.map((item,index)=>(

              <li
                key={index}
                onClick={()=>{
                  setStateName(item);
                  setCityName("");
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
      <div id="city">

        <input
          value={cityName}
          placeholder="City"
          readOnly
          onClick={()=>setShowCities(true)}
        />

        {showCities && (

          <ul>

            {cities.map((item,index)=>(

              <li
                key={index}
                onClick={()=>{
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
