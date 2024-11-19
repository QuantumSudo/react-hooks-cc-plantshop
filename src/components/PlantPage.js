import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]); // Initializes with an empty array
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch plants from the API
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => {
        // Ensure that the data is an array before setting it to the state
        if (Array.isArray(data)) {
          setPlants(data);
        } else {
          console.error('Fetched data is not an array:', data);
          // You might want to handle this case, such as setting an error state
        }
      })
      .catch((error) => {
        console.error("Error fetching plants:", error);
        // Handle error by perhaps setting a state for errors
      });
  }, []);

  // Ensure plants is always an array before calling filter
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm setPlants={setPlants} />
      <Search setSearchQuery={setSearchQuery} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
