import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./style.css";

const HomePage = ({ searchLocation , getUser}) => {

  const [properties, setProperties] = useState([]);

  const [getId, setId] = useState("");
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "http://localhost:5000/properties";

        if (searchLocation.trim() !== '') {

          url += `?location=${searchLocation}`;
        }


        const response = await axios.get(url)
        console.log("recieved in home :", searchLocation);
        
        setProperties(response.data.data || []);

      } catch (error) {
        console.log(error);
      }
    };



    fetchData();


  }, [searchLocation]);


  const handleViewDetails = (propertyId) =>{
    
    setId(propertyId);
    getUser(propertyId);
    console.log("View details clicked for property ID:", getId, propertyId);

  }
  

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
                <button className="btn btn-primary custom-btn" onClick={() => handleViewDetails(property._id)}>
                <Link to={`/PropertyDetails`}>View Details</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
