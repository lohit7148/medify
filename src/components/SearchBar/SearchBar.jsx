import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FoundHospitalsContext } from "../../contexts/AllContexts";

const API = "https://meddata-backend.onrender.com";

const SearchBar = () => {

  const [, setFoundHospitals] = useContext(FoundHospitalsContext);

  const [states, setStates] = useState(["Alabama"]);
  const [cities, setCities] = useState([]);

  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");

  const [showStates, setShowStates] = useState(false);
  const [showCities, setShowCities] = useState(false);


  useEffect(() => {

    axios.get(`${API}/states`)
      .then(res=>{
        if(res.data?.length){
          setStates(res.data);
        }
      })
      .catch(()=>{});

  }, []);


  useEffect(() => {

    if(!stateName) return;

    if(stateName==="Alabama"){
      setCities(["DOTHAN"]);
    }

    axios.get(`${API}/cities/${stateName}`)
      .then(res=>{
        if(res.data?.length){
          setCities(res.data);
        }
      })
      .catch(()=>{});

  }, [stateName]);


  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{

      const res = await axios.get(
        `${API}/data?state=${stateName}&city=${cityName}`
      );

      setFoundHospitals({
        hospitals:res.data,
        stateName,
        cityName,
        noSearchYet:false
      });

    }
    catch{

      setFoundHospitals({
        hospitals:[],
        stateName,
        cityName,
        noSearchYet:false
      });

    }
  };


  return(

<form onSubmit={handleSubmit}>


{/* STATE */}
<div
  id="state"
  onClick={()=>setShowStates(true)}
  style={{position:"relative",cursor:"pointer"}}
>

<input
  value={stateName}
  placeholder="State"
  readOnly
/>

{showStates && (

<ul style={{
  position:"absolute",
  background:"white",
  zIndex:999
}}>

{states.map((state,index)=>(
<li
key={index}
onClick={(e)=>{
e.stopPropagation();
setStateName(state);
setCityName("");
setShowStates(false);
}}
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
onClick={()=>setShowCities(true)}
style={{position:"relative",cursor:"pointer"}}
>

<input
value={cityName}
placeholder="City"
readOnly
/>

{showCities && (

<ul style={{
position:"absolute",
background:"white",
zIndex:999
}}>

{cities.map((city,index)=>(
<li
key={index}
onClick={(e)=>{
e.stopPropagation();
setCityName(city);
setShowCities(false);
}}
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
