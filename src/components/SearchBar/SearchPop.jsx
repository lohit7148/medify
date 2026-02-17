import React from "react";

const SearchPop = ({ locations, clickFunction }) => {

  return (

    <ul style={{
      position: "absolute",
      background: "white",
      zIndex: 999,
      listStyle: "none",
      padding: "0",
      margin: "0",
      width: "100%",
      border: "1px solid #ccc"
    }}>

      {locations.map((item, index) => (

        <li
          key={index}
          onClick={() => clickFunction(item)}
          style={{
            padding: "8px",
            cursor: "pointer"
          }}
        >
          {item}
        </li>

      ))}

    </ul>

  );

};

export default SearchPop;
