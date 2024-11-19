import React, { useState } from "react";

function NewPlantForm({ setPlants }) {
  // Initial state for the form fields
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Ensure price is a valid number
    const newPlant = {
      name,
      image,
      price: parseFloat(price), // Convert price to a number
    };

    // Make a POST request to add the new plant to the database
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((data) => {
        // Add the new plant to the current list of plants
        setPlants((prevPlants) => [...prevPlants, data]);
      })
      .catch((error) => {
        console.error("Error adding new plant:", error);
      });

    // Reset form fields after submission
    setName("");
    setImage("");
    setPrice("");
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Plant name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update name state
        />
        <input
          name="image"
          placeholder="Image URL"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)} // Update image state
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)} // Update price state
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
