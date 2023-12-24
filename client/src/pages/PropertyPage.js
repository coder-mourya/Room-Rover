import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const PropertyPage = () => {
  const history = useNavigate();
  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to create a new property
      const response = await apiService.createProperty(propertyData);

      // Redirect to the property details page after successful creation
      history.push(`/properties/${response.data._id}`);
    } catch (error) {
      console.error('Error creating property:', error.message);
    }
  };

  return (
    <div>
      <h2>Add a New Property</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={propertyData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Description:
          <textarea
            name="description"
            value={propertyData.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={propertyData.location}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={propertyData.price}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default PropertyPage;
