import React, {   useState } from 'react';
import logo from "./logo.jpg"
import "./navbar.css"



const Navbar = () => {

  const [searchQuery, setSearchQuery] = useState(" ");



  const handleSearch = (value) =>{

    setSearchQuery(value);

    console.log(setSearchQuery)
  
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
            <a href="/PropertyForm" className="nav-link">Upload Property</a>
          </li>
        </ul>

        <ul className="navbar-nav  " id="custom-with">
          <li className='nav-item'>
            <a href="/Login" className='nav-link'>Login</a>
          </li>
          <li className='nav-item'>
            <a href="/Register" className='nav-link'>Register</a>
          </li>
          <form className="d-flex">
            
            <input

            

              type="Search"
              id="search"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="form-control me-3"
              placeholder="Search"
              aria-label="Search"
              />
             
              
              <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
