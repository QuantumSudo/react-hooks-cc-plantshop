import React from 'react';

function PlantCard({ plant, markAsSoldOut }) {
  return (
    <div className="card">
      <img src={plant.image} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>${plant.price}</p>
      <button onClick={() => markAsSoldOut(plant.id)}>
        {plant.soldOut ? 'Sold Out' : 'Mark as Sold Out'}
      </button>
    </div>
  );
}

export default PlantCard;
