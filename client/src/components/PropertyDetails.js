import React, { useEffect, useState } from 'react';
import axios from 'axios';




const PropertyDetails = ({ propertyId }) => {

  const [properties, setProperty] = useState([]);



  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/properties?_id=${propertyId}`);

        console.log("getedd in proprtydetails : ", propertyId);

        setProperty(response.data.data || []);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchProperty();
  }, [propertyId]);

  return (
    <div className="container mt-4">
      <h2>Property Details</h2>
      {properties.map((Property) => (
        <div key={Property._id}>
          <p>Owner Name :- {Property.owner}</p>
          <p>Owner Numbers:-{Property.number} </p>
          <p>Titile :- {Property.title}</p>
          
        </div>
      ))}
    </div>
  );
};

export default PropertyDetails;
