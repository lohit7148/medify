import React, { useContext } from 'react';
import "./SearchResults.css";
import checkIcon from "../../assets/checkBadge.svg"
import ResultCard from '../ResultCard/ResultCard';
import { FoundHospitalsContext } from '../../contexts/AllContexts';

const headline0 = "Search with State and City name for Hospitals above";
const subText = "Book appointments with minimum wait-time & verified doctor details";

const SearchResults = () => {

  const [foundHospitals] = useContext(FoundHospitalsContext);

  const displayCards = () => {

    if(!foundHospitals?.hospitals?.length) return null;

    return foundHospitals.hospitals.map((item,index) => (

      <ResultCard
        key={index}
        hospitalName={item["Hospital Name"]}
        county={item["County Name"]}
        city={item["City"]}
        rating={item["Hospital overall rating"]}
        hospitalType={item["Hospital Type"]}
      />

    ));

  };

  return (

    <div className='SearchResults'>

      <div className='commonContainer resultsBody'>

        <div className='resultsHead'>

          {

            foundHospitals.noSearchYet
            ?

            <h1>{headline0}</h1>

            :

            <h1>
              {foundHospitals.hospitals.length}
              {" "}
              medical centers available in
              {" "}
              {foundHospitals.cityName.toLowerCase()}
            </h1>

          }

          <p>

            <img src={checkIcon} alt="" />

            <span>{subText}</span>

          </p>

        </div>

        <div className='cardAndSensodyne'>

          <aside className='resultCardsArray'>

            {displayCards()}

          </aside>

          <aside className='sensodyne'></aside>

        </div>

      </div>

    </div>

  );

};

export default SearchResults;
