import React, { useState } from 'react';

function PlantCard({ plant, markAsSoldOut }) {
  const [soldOut, setSoldOut] = useState(plant.soldOut || false);

  const handleMarkSoldOut = () => {
    setSoldOut(true);
    markAsSoldOut(plant.id);
  };

  return (
    <div className="plant-card">
      <h3>{plant.name}</h3>
      <img src={plant.image} alt={plant.name} />
      <p>Price: ${plant.price}</p>
      {soldOut ? (
        <p style={{ color: 'red' }}>Sold Out</p>
      ) : (
        <button onClick={handleMarkSoldOut}>Mark as Sold Out</button>
      )}
    </div>
  );
}

export default PlantCard;
