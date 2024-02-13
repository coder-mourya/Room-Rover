import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import authUtils from "../utils/auth";
import axios from 'axios';
import "./style.css";

const HomePage = ({ searchLocation, getUser, theme }) => {

  const [properties, setProperties] = useState([]);

  const [getId, setId] = useState("");// for pass data to property details compo using props
  const [UserName, setUserName] = useState(''); // for getting current  loggedIn user name from Api 

  const navigate = useNavigate();  // for navigate propertyDetsial compo
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "http://localhost:5000/properties";

        if (searchLocation.trim() !== '') {

          url += `?location=${searchLocation}`;
        }


        const response = await axios.get(url)
        

        setProperties(response.data.data);

      } catch (error) {
        console.log(error);
      }
    };



    fetchData();


    const fetchUserName = async () => {
      try {

        

        const token = localStorage.getItem('token')
        
        
        
        const response = await axios.get(`http://localhost:5000/auth/users`,{
          headers: { Authorization: `Bearer ${token}` }
        
        });

      
    
        const {data} = response.data;

        setUserName(data.username);
      } catch (error) {
        console.log(error);
      }
    }
    

    if(authUtils.isLoggedIn()){

      fetchUserName();
    }


  }, [searchLocation]);




  const handleViewDetails = (propertyId) => {

    setId(propertyId);
    getUser(propertyId);
    console.log("View details clicked for property ID:", getId, propertyId);


// for checking user logged in or logout
    if (!authUtils.isLoggedIn()) {

      alert("You need to login first");
      navigate("./login")
    } else {
      navigate("./PropertyDetails")

    }

  }


  return (
    <div className={`container mt-4  ${theme === 'dark' ? 'text-light' : ''}`}>
      
      <div className='container'>
        <p>Hey , Its a test version of this app !! if you face any difficulties just relogin or <b>login as test@gmail.com password : test1234</b></p>
      </div>

        <h2 className='text-light'> Welcome , {UserName}</h2>
      

      <h2 className="mb-4 text-light">Available Properties</h2>
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
