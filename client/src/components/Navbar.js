import React, { useEffect, useState } from 'react';
import logo from "./logo.jpg"
import "./navbar.css"
import authUtils from '../utils/auth'; // for importing authUilts



const Navbar = ({ onSearch }) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [theme, setTheme] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    setUserRole(authUtils.getUserRole()); // get the user role 
    document.body.style.backgroundColor = 'background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(45,253,29,1) 65%, rgba(252,176,69,1) 96%);'
  }, []);

  const handleSearch = () => {
    console.log("sent from navbar:", searchLocation);
    onSearch(searchLocation);
  }


  // manual logout
  const logoutWithApi = () => {

    authUtils.logout()
  }

  // ggoglle logout
  const logoutGoogle = () => {

    authUtils.googleLogout();
  }

  const handleLogout = () => {

    logoutWithApi();
    logoutGoogle();

  }

  const handleUploadProprty = () => {

    if (userRole === 'owner') {
      window.location.href = "./PropertyForm";
    } else {
      alert("you are not owner you have to regsiter as a owner")
      window.location.href = "./Register";
    }
  }



  const handleDashboard = () => {
    window.location.href = "./Dashboard";

  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.body.style.background = '#212529';
    } else {
      document.body.style.background = 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(45,253,29,1) 65%, rgba(252,176,69,1) 96%)';
    }
  }

  const toggleButtonText = () => {
    return theme === 'dark' ? 'Light' : 'Dark';
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
            <button className='nav-link' onClick={handleUploadProprty}>Upload</button>
          </li>


          {userRole === 'owner' && (
            <li className="nav-item">
              <button className='nav-link' onClick={handleDashboard}  >Dashboard</button>
            </li>
          )}

        </ul>


        <ul className="navbar-nav  " id="custom-with">

          <li className='nav-item'>

            <button className='nav-link' onClick={toggleTheme}> {toggleButtonText()} </button>
          </li>

          {authUtils.isLoggedIn()  || authUtils.isAuthanticateddGoogle()? (
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
