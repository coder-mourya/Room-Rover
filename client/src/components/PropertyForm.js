// PropertyForm.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import apiService from '../services/api';

const PropertyForm = () => {
  const history = useNavigate();
  const { user } = useContext(AuthContext);

  // State to manage form inputs
  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({
      ...propertyData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add logic to associate the property with the current user (owner)
      propertyData.owner = user.id;

      // Call the API to create a new property
      const response = await apiService.createProperty(propertyData);

      // Redirect to the property details page after successful submission
      history.push(`/properties/${response.data._id}`);
    } catch (error) {
      console.error('Error creating property:', error.message);
    }
  };

  return (
    <div>
      <h2>Add a New Property</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={propertyData.title}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={propertyData.description}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={propertyData.location}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={propertyData.price}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default PropertyForm;
