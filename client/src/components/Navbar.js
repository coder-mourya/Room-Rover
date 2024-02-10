import React, { useState } from 'react';
import logo from "./logo.jpg"
import "./navbar.css"
import authUtils from '../utils/auth'; // for importing authUilts


const Navbar = ({ onSearch }) => {
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearch = () => {
    console.log("sent from navbar:", searchLocation);
    onSearch(searchLocation);
  }


  const handleLogout = () => {
    authUtils.logout(); // Call logout function from 
    
    
  }

  const handleUploadProprty = () =>{

      if(!authUtils.isLoggedIn()){

        alert("you need to login first");

        window.location.href = "./login"

      }else{
        window.location.href = "./PropertyForm";

      }
  }


  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        <img src={logo} alt="Logo" className="logo mx-4" />
        Room Rover
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a href="/" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <button className='nav-link' onClick={handleUploadProprty}>Upload Property</button>
          </li>
        </ul>
        <ul className="navbar-nav  " id="custom-with">



          {authUtils.isLoggedIn() ? (  
          <li className='nav-item'>
            <button className='nav-link' onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li className='nav-item'>
                <a href="/Login" className='nav-link'>Login</a>
              </li>
              <li className='nav-item'>
                <a href="/Register" className='nav-link'>Register</a>
              </li>
            </>
          )}


          <form className="d-flex">
            <input
              type="Search"
              id="search"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="form-control me-3"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="button" onClick={handleSearch}>Search</button>
          </form>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
