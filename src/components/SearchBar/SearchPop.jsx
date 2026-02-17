import React from "react";

const SearchPop = ({ locations, clickFunction }) => {

  if(!locations || locations.length === 0) return null;

  return (

    <ul>

      {locations.map((item, index) => (

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
