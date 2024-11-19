import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../components/App';
import '@testing-library/jest-dom';

describe('2nd Deliverable', () => {
  // Mock fetch to simulate the backend API responses
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        id: 1, // Ensure we return an ID for the plant
        name: 'foo',
        image: 'foo_plant_image_url',
        price: 10,
      }),
    });
  });

  test('adds a new plant when the form is submitted', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(<App />);

    const firstPlant = { name: 'foo', image: 'foo_plant_image_url', price: '10' };

    // Simulate filling out the form
    fireEvent.change(getByPlaceholderText('Plant name'), { target: { value: firstPlant.name } });
    fireEvent.change(getByPlaceholderText('Image URL'), { target: { value: firstPlant.image } });
    fireEvent.change(getByPlaceholderText('Price'), { target: { value: firstPlant.price } });

    // Simulate clicking the "Add Plant" button
    fireEvent.click(getByText('Add Plant'));

    // Wait for the new plant to appear in the DOM
    await waitFor(() => {
      expect(getByText('foo')).toBeInTheDocument();
    });

    // Verify fetch was called with correct arguments
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: firstPlant.name,
        image: firstPlant.image,
        price: Number(firstPlant.price), // Ensure price is passed as a number
      }),
    });

    // Simulate adding a second plant
    const secondPlant = { name: 'bar', image: 'bar_plant_image_url', price: '5' };
    
    // Mock fetch response for the second plant
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        id: 2, // Ensure the second plant also has an ID
        name: secondPlant.name,
        image: secondPlant.image,
        price: 5,
      }),
    });

    // Simulate filling out the form for the second plant
    fireEvent.change(getByPlaceholderText('Plant name'), { target: { value: secondPlant.name } });
    fireEvent.change(getByPlaceholderText('Image URL'), { target: { value: secondPlant.image } });
    fireEvent.change(getByPlaceholderText('Price'), { target: { value: secondPlant.price } });

    // Simulate clicking the "Add Plant" button
    fireEvent.click(getByText('Add Plant'));

    // Wait for the second plant to appear in the DOM
    await waitFor(() => {
      expect(getByText('bar')).toBeInTheDocument();
    });

    // Verify fetch was called for the second plant
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: secondPlant.name,
        image: secondPlant.image,
        price: Number(secondPlant.price),
      }),
    });
  });
});
