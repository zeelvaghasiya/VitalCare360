import React from "react";
import moment from "moment";

function About() {
  const next7Days = Array.from({ length: 7 }, (_, index) =>
    moment().clone().add(index, 'days').format("DD-MM")
  );

  return (
    <>
      <h1>My name is Zeel</h1>
      <ul>
        {next7Days.map((day, index) => (
          <li key={index}>{day}</li>
        ))}
      </ul>
    </>
  );
}

export default About;
