import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants }) {
  // Ensure that plants is an array and has data
  if (!Array.isArray(plants) || plants.length === 0) {
    return <p>No plants available</p>;
  }

  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </ul>
  );
}

export default PlantList;
