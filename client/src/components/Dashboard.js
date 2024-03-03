
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import authUtils from "../utils/auth"


const Dashboard = () => {
  const [properties, setProperties] = useState([]);




  useEffect(() => {
    // Fetch owner's properties from the backend
    const fetchProperties = async () => {
      try {

        const token = localStorage.getItem('token');

        const response = await axios.get(`https://room-rover-deploy.onrender.com/properties/owner`, {

          headers: { Authorization: `Bearer ${token}`}

        })

        setProperties(response.data.data);
        console.log(response.data.data);

      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    if(authUtils.isLoggedIn()){

      fetchProperties();
    }

  }, []);

  const handleDeleteProperty = async (propertyId) => {
    try {
      const token = localStorage.getItem('token');

      // Delete property on the backend
      await axios.delete(`https://room-rover-deploy.onrender.com/properties/properties/${propertyId}`, {
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
    <div className='container'>
      <h1 className='mt-4'>Owner Dashboard</h1>
      <div className='mt-4'>
        <h2>Your Properties</h2>
  
        <ul className='list-group'>
          
          {properties.map((property) => (
            <li key={property._id} className='list-group-item'>
              <div className='row align-items-center'>
                <div className='col-md-6'>
                  <strong>{property.title}</strong> - {property.location} - &#8377;{property.price}
                </div>
                <div className='col-md-6 text-right'>
                  <button className='btn btn-danger mr-2' onClick={() => handleDeleteProperty(property._id)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
          {properties.length === 0 && (
            <li className='list-group-item'>
              <p>No properties found.</p>
              <p>Please create a new property.</p>
              <a href="/propertyForm">Create Property</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  </>
  
  );
};

export default Dashboard;
