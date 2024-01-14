import React, { useState } from 'react';
import "../pages/style.css"
const PropertyForm = () => {
  const [propertyData, setPropertyData] = useState({
    title: '',
    location: '',
    price: '',
    imgName: '',
  });

  const handleUpload = (e) => {
    e.preventDefault();

    // for Add my property upload logic here (e.g., calling an API)
    // For now, let's log the property data to the console
    console.log('Property Data:', propertyData);
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className='custom-style'>

      <h2>Upload Property</h2>
      <form onSubmit={handleUpload} className="container">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter property title"
            value={propertyData.title}
            onChange={(e) => setPropertyData({ ...propertyData, title: e.target.value })}
            required
            />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter property location"
            value={propertyData.location}
            onChange={(e) => setPropertyData({ ...propertyData, location: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter property price"
            value={propertyData.price}
            onChange={(e) => setPropertyData({ ...propertyData, price: e.target.value })}
            required
            />
        </div>

        <div className="form-group">
          <label>Image Name</label>
          <input
            type="file"
            className="form-control"
            value={propertyData.imgName}
            onChange={(e) => setPropertyData({ ...propertyData, imgName: e.target.value })}
            required
            />
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Upload Property
        </button>
      </form>
    </div>
            </div>
  );
};

export default PropertyForm;
