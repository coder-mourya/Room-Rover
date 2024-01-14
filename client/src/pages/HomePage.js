import React from 'react';
import jsonData from "./property.json"
const HomePage = () => {
 

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Available Properties</h2>
      <div className="row">
        {jsonData.map((property) => (
          <div key={property.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <img className="card-img-top" src={require(`./img/${property.imgName}`)} alt="Property" />
              <div className="card-body">
                <h5 className="card-title">{property.title}</h5>
                <p className="card-text">
                  <span className="font-weight-bold">Location:</span> {property.location}<br />
                  <span className="font-weight-bold">Price:</span> ${property.price}/month
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
