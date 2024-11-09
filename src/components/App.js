import React, { useState, useEffect } from 'react';
import Header from './Header';
import NewPlantForm from './NewPlantForm';
import PlantList from './PlantList';
import Search from './Search';

export default function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(response => response.json())
      .then(data => setPlants(data));
  }, []);

  const addPlant = (newPlant) => {
    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlant),
    })
      .then(response => response.json())
      .then(data => setPlants([...plants, data]));
  };

  const markAsSoldOut = (id) => {
    const updatedPlants = plants.map(plant => 
      plant.id === id ? { ...plant, soldOut: true } : plant
    );
    setPlants(updatedPlants);
  };

  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <NewPlantForm addPlant={addPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList plants={filteredPlants} markAsSoldOut={markAsSoldOut} />
    </div>
  );
}