import React from "react";

const SearchPop = ({ locations, clickFunction }) => {

  if(!locations) return null;

  return (

    <ul>

      {locations.map((item,index) => (

        <li
          key={index}
          onClick={() => clickFunction(item)}
        >
          {item}
        </li>

      ))}

    </ul>

  );

};

export default SearchPop;
