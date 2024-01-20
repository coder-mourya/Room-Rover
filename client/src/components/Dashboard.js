
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch owner's properties from the backend
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token'); 

        const response = await axios.get('http://localhost:5000/owner/properties', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []); 

  const handleDeleteProperty = async (propertyId) => {
    try {
      const token = localStorage.getItem('token');

      // Delete property on the backend
      await axios.delete(`http://localhost:5000/owner/properties/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the local state after deletion
      setProperties((prevProperties) => prevProperties.filter((property) => property._id !== propertyId));
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  return (
    <>
    <div>
      <h1>Owner Dashboard</h1>
      <div>
        <h2>Your Properties</h2>
        <ul>
          {properties.map((property) => (
              <li key={property._id}>
              <strong>{property.title}</strong> - {property.location} - ${property.price}
              <button onClick={() => handleDeleteProperty(property._id)}>Delete</button>
            </li>
            
            ))}

            <li>
                <p>No properties found.</p>
                <p>Please create a new property.</p>
                <a href="/propertyForm">Create Property</a>
            </li>
        </ul>
      </div>
    </div>
            </>
  );
};

export default Dashboard;
