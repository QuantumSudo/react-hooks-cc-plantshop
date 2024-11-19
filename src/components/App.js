import React, { useState, useEffect } from "react";
import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState([]);

  // Fetch the plants data when the component is mounted
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data))
      .catch((error) => {
        console.error("Error fetching plants:", error);
      });
  }, []);

  return (
    <div className="app">
      <header>
        <h1>
          Plantsy <span role="img" className="logo">🌱</span>
        </h1>
      </header>
      <main>
        {/* Passing setPlants as a prop to PlantPage */}
        <PlantPage plants={plants} setPlants={setPlants} />
      </main>
    </div>
  );
}

export default App;
