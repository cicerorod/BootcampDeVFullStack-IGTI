import React, { Component, useState } from "react";

const BANDMembers = [
  {
    id: 1,
    name: "Neil Peart",
    instrument: "Bateria",
  },
  {
    id: 2,
    name: "Alex Lifeson",
    instrument: "Guitarra",
  },
  {
    id: 3,
    name: "Geddy Lee",
    instrument: "Baixo",
  },
];

export default function Band() {
  const [bandMembers, setbandMembers] = useState(BANDMembers);
  const [bandName, setbandName] = useState("Rush");

  return (
    <div>
      <h4>{bandName}</h4>
      <ul>
        {bandMembers.map(({ id, name, instrument }) => {
          return (
            <li key={id}>
              {name} - {instrument}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
