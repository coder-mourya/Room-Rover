// src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import propertyService from '../services/propertyService';

const HomePage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesData = await propertyService.getAllProperties();
        setProperties(propertiesData);
      } catch (error) {
        // Handle error
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <h2>Available Properties</h2>
      <ul>
        {properties.map((property) => (
          <li key={property._id}>{property.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
