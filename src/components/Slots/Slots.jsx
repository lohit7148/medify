import React from "react";

const Slots = ({ slotsON }) => {

  if(!slotsON) return null;

  return (

    <div>

      <p>Today</p>

      <p>Morning</p>

      <p>Afternoon</p>

      <p>Evening</p>

    </div>

  );

};

export default Slots;
