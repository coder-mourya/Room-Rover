import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import apiService from '../services/api';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch properties from the backend when the component mounts
    const fetchProperties = async () => {
      try {
        const response = await apiService.getAllProperties();
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error.message);
      }
    };

    fetchProperties();
  }, []);

  console.log('Properties:', properties); // Log properties to console

  return (
    <div>
      <h2>Available Properties</h2>
      <ul>
        {properties.map((property) => (
          <li key={property._id}>
            <Link to={`/properties/${property._id}`}>{property.title}</Link>
          </li>
        ))}
      </ul>

      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          {user.role === 'owner' && (
            <p>
              Are you a property owner?{' '}
              <Link to="/dashboard">Go to Dashboard</Link>
            </p>
          )}
          {user.role === 'owner' && (
            <p>
              Add a new property: <Link to="/add-property">Add Property</Link>
            </p>
          )}
        </div>
      ) : (
        <div>
          <p>Log in or register to see more details and add properties.</p>
          <Link to="/login">Log In</Link> | <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
