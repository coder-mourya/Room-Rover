import React, { useEffect, useState } from 'react';
import logo from "./logo.jpg"
import "./navbar.css"
import authUtils from '../utils/auth'; // for importing authUilts
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import  Form  from 'react-bootstrap/Form';
import Navbar  from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import FormControl from "react-bootstrap/FormControl";





const NavbarCompo = ({ onSearch }) => {
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
   <>
  
  <Navbar expand="lg" variant="dark" bg="dark">
      <Navbar.Brand as={Link} to="/">
        <img src={logo} alt="Logo" className="logo mx-4" />
        Room Rover
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link}  onClick={handleUploadProprty}>Upload</Nav.Link>
          </Nav.Item>
          {userRole === 'owner' && (
            <Nav.Item>
              <Button variant="link" onClick={handleDashboard}>Dashboard</Button>
            </Nav.Item>
          )}
        </Nav>
        <Nav className="ml-auto" id="custom-with">
          <Nav.Item>
            <Nav.Link as={Link} onClick={toggleTheme}>{toggleButtonText()}</Nav.Link>
          </Nav.Item>
          {authUtils.isLoggedIn() || authUtils.isAuthanticateddGoogle() ? (
            <Nav.Item>
              <Button variant="link" onClick={handleLogout}>Logout</Button>
            </Nav.Item>
          ) : (
            <>
              <Nav.Item>
                <Nav.Link as={Link} to="/Login">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/Register">Register</Nav.Link>
              </Nav.Item>
            </>
          )}
          <Form className="d-flex">
            <FormControl
              type="search"
              id="search"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Search"
              aria-label="Search"
            />
            <Button variant="outline-success" onClick={handleSearch}>Search</Button>
          </Form>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
   </>
  );
};

export default NavbarCompo;
