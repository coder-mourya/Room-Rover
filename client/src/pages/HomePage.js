import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/properties");
        setProperties(response.data.data); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Available Properties</h2>
      <div className="row">
        {properties.map((property) => (
          <div key={property._id} className="col-lg-4 col-md-6 mb-4">
            <div className="card">
             
              <img className="card-img-top" src={`http://localhost:5000/${property.image}`} alt="Property" />
              <div className="card-body">
                <h5 className="card-title">{property.title}</h5>
                <p className="card-text">
                  <span className="font-weight-bold">Location:</span> {property.location}<br />
                  <span className="font-weight-bold">Price:</span> Rs.{property.price}/month
                </p>
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
