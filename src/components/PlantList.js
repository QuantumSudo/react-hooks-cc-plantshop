import React from 'react';
import PlantCard from './PlantCard';


function PlantList({ plants, markAsSoldOut }) {
  return (
    <div className="cards"> 
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          markAsSoldOut={markAsSoldOut}
        />
      ))}
    </div>
  );
}

export default PlantList;
