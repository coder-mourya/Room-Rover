import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../services/api';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await apiService.getPropertyById(id);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property details:', error.message);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  return (
    <div>
      {property ? (
        <div>
          <h2>{property.title}</h2>
          <p>Description: {property.description}</p>
          <p>Location: {property.location}</p>
          <p>Price: ${property.price}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading property details...</p>
      )}
    </div>
  );
};

export default PropertyDetails;
