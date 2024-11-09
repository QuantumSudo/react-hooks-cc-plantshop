import React, { useState } from 'react';

function NewPlantForm({ addPlant }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlant = {
      name,
      image,
      price: parseFloat(price),
    };

    // Call addPlant to add the new plant to the list
    addPlant(newPlant);

    // Reset form fields
    setName('');
    setImage('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Image URL:
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default NewPlantForm;
