import React, { useEffect, useState } from 'react';
import logo from "./logo.jpg"
import "./navbar.css"
import authUtils from '../utils/auth'; // for importing authUilts
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




const Navbar = ({ onSearch }) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [theme, setTheme] = useState('');
  const [userRole, setUserRole] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    
    setUserRole(authUtils.getUserRole()); // get the user role 

    document.body.style.backgroundColor = ''
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

    navigate('/login')

  }

  const handleUploadProprty = () => {

    if (userRole === 'owner') {
      navigate("/PropertyForm")
    } else {
      alert("you are not owner you have to regsiter as a owner")
       navigate("/Register")
    }
  }



  const handleDashboard = () => {

    navigate('/Dashboard')

  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.body.style.background = '#212529';
    } else {
      document.body.style.background = '';
    }
  }

  const toggleButtonText = () => {
    return theme === 'dark' ? 'Light' : 'Dark';
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      
        <Link to="/" className='navbar-brand'>
        <img src={logo} alt="Logo" className="logo mx-4" />
        Room Rover
        </Link>
      
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
            
            <Link to="/" className='nav-link'>Home</Link>
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

          {authUtils.isLoggedIn() || authUtils.isAuthanticateddGoogle() ? (
            <li className='nav-item'>
              <button className='nav-link' onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li className='nav-item'>

                <Link to="/Login" className='nav-link'>Login</Link>

              </li>
              <li className='nav-item'>

                <Link to="/Register" className='nav-link'>Register</Link>

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
