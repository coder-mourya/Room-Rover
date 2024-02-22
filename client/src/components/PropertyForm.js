import React, { useState } from 'react';
import "../pages/style.css"
import axios from 'axios';
import Alerts from './Alerts';



const PropertyForm = () => {
  const [propertyData, setPropertyData] = useState({
    owner: '',
    number: '',
    title: '',
    description: '',
    location: '',
    price: '',
    images: '',
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState('')

  const handleUpload = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const decodedToken = JSON.parse(atob(token.split('.')[1]))

    console.log(decodedToken.email);

    const formData = new FormData();
    formData.append('email', decodedToken.email);

    formData.append('owner', propertyData.owner);
    formData.append('number', propertyData.number);
    formData.append('title', propertyData.title);
    formData.append('description', propertyData.description);
    formData.append('location', propertyData.location);
    formData.append('price', propertyData.price);
    

    for (let i = 0; i < propertyData.images.length; i++) {
      formData.append('images', propertyData.images[i]);
    }

    try {



      await axios.post('http://localhost:5000/properties/create', formData, {
        headers: {
          "Content-Type": 'multipart/form-data',

          Authorization: `Bearer ${token}`
        },

      });
      console.log("proprty data : ", propertyData)

      setAlertMessage("Property uploaded Successfully")
      setAlertType("Success");

      window.location.href = './dashboard'
    } catch (error) {
      console.log(error);

      setAlertMessage("Invalid details. Please try again.");
      setAlertType("error");
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className='custom-style container my-2 d-flex justify-content-center'>
        <div className='adjustWith my-4'>

          <h2 className='text-light'>Upload Property</h2>
          {alertMessage && <Alerts message={alertMessage} type={alertType} />}
          <form action='upload' onSubmit={handleUpload} className="container mt-4">
            <div className="form-group my-2">
              <label className='text-light'>Owner</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Name"
                value={propertyData.owner}
                onChange={(e) => setPropertyData({ ...propertyData, owner: e.target.value })}
                required
              />
            </div>

            <div className="form-grup my-2">
              <label className='text-light'> Mobile number</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter your Mobile number"
                value={propertyData.number}
                onChange={(e) => setPropertyData({ ...propertyData, number: e.target.value })}
              />
            </div>

            <div className="form-group my-2">
              <label className='text-light'>Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter property title"
                value={propertyData.title}
                onChange={(e) => setPropertyData({ ...propertyData, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group my-2">
              <label className='text-light'>Description</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Write Aboout your property"
                value={propertyData.description}
                onChange={(e) => setPropertyData({ ...propertyData, description: e.target.value })}
                required
              />
            </div>

            <div className="form-group my-2">
              <label className='text-light'>Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter property location"
                value={propertyData.location}
                onChange={(e) => setPropertyData({ ...propertyData, location: e.target.value })}
                required
              />
            </div>

            <div className="form-group my-2">
              <label className='text-light'>Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter property price"
                value={propertyData.price}
                onChange={(e) => setPropertyData({ ...propertyData, price: e.target.value })}
                required
              />
            </div>

            <div className="form-group my-2">
              <label className='text-light'>Image Name</label>
              <input
                type="file"

                className="form-control"
                onChange={(e) => setPropertyData({ ...propertyData, images: e.target.files })}
                multiple
                required
              />
            </div>

            <button type="submit" className="btn btn-primary mt-4">
              Upload Property
            </button>
          </form>

          {alertMessage && (
            <Alerts message={alertMessage} type={alertType} />
          )

          }
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
