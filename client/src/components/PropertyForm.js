import React, { useState } from 'react';
import "../pages/style.css"
import axios from 'axios';
const PropertyForm = () => {
  const [propertyData, setPropertyData] = useState({
    owner: '',
    title: '',
    description: '',
    location: '',
    price: '',
    image: '',
  });

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('owner', propertyData.owner);
    formData.append('title', propertyData.title);
    formData.append('description', propertyData.description);
    formData.append('location', propertyData.location);
    formData.append('price', propertyData.price);
    formData.append('image', propertyData.image);

    try {
      await axios.post('http://localhost:5000/properties/create', formData,{
        headers: {
          "Content-Type": 'multipart/form-data'
        },

      });
      console.log("proprty data : ", propertyData)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className='custom-style'>

      <h2>Upload Property</h2>
      <form action='upload' onSubmit={handleUpload} className="container">
      <div className="form-group">
          <label>Owner</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your Name"
            value={propertyData.owner}
            onChange={(e) => setPropertyData({ ...propertyData, owner: e.target.value })}
            required
            />
        </div>

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
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter property title"
            value={propertyData.description}
            onChange={(e) => setPropertyData({ ...propertyData, description: e.target.value })}
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
            onChange={(e) => setPropertyData({ ...propertyData, image: e.target.files[0] })}
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
