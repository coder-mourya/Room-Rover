import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import authUtils from "../utils/auth";
import axios from 'axios';
import "./style.css";
import Carousel from 'react-bootstrap/Carousel';
import defoultImg from "./defoult.jpg"

const HomePage = ({ searchLocation, getUser, theme }) => {

  const [properties, setProperties] = useState([]);

  const [getId, setId] = useState("");// for pass data to property details compo using props
  const [UserName, setUserName] = useState(''); // for getting current  loggedIn user name from Api 

  const navigate = useNavigate();  // for navigate propertyDetsial compo



  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "https://room-rover-deploy.onrender.com/properties";

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
        if (authUtils.isLoggedIn()) {  // checck authticat with manual
          const token = localStorage.getItem('token')
          const response = await axios.get("https://room-rover-deploy.onrender.com/auth/users", {

            headers: { Authorization: `Bearer ${token}` }
          });

          const { data } = response.data
          setUserName(data.username)
        } else if (authUtils.isAuthanticateddGoogle()) {  // checck authticat with google 

          const googleProfile = localStorage.getItem('googleProfile')

          const response = await axios.get('https://room-rover-deploy.onrender.com/auth/getUserDetailsWithGoogle', {
            headers: { Authorization: `Bearer ${googleProfile}` }
          })

          const { data } = response.data;

          setUserName(data.username)
        }


      } catch (error) {
        console.log(error);
      }


    }

    fetchUserName();



  }, [searchLocation]);




  const handleViewDetails = (propertyId) => {

    setId(propertyId);
    getUser(propertyId);
    console.log("View details clicked for property ID:", getId, propertyId);


    // for checking user logged in or logout
    if (authUtils.isLoggedIn() || authUtils.isAuthanticateddGoogle()) {

      navigate("./PropertyDetails")
    } else {

      alert("You need to login first");
      navigate("/login")
    }

  }


  return (
    <div className={`container mt-4  ${theme === 'dark' ? 'text-light' : ''}`}>

      <div className='container text-light'>
        <p>Hey , Its a test version of this app and its Running free web server so its can't manage heavy load !! if you face any difficulties just relogin or <b>login as test@gmail.com password : test1234</b></p>
      </div>

      <h2 className='text-light'> Welcome , {UserName}</h2>


      <h2 className="mb-4 text-light">Available Properties</h2>


      <div className="row">


        {properties.map((property) => (
          <div key={property._id} className="col-lg-4 col-md-6 mb-4">

            <div className="card">


              <div className="card-image-container">
                <Carousel>
                  
                  {property.images.map((image, index) => (
                    <Carousel.Item key={index} >

                      <img

                        className="d-block w-100"
                        src={`https://room-rover-deploy.onrender.com/${image}`}
                        alt={`Property ${index + 1 }`}

                        onLoad={() => console.log(`Image ${index + 1} loaded: ${image}`)}
                        onError={(e) =>{
                          e.target.src = defoultImg;
                        } }
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>

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
