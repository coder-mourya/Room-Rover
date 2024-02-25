import React, {useState}from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar  from './components/Navbar';
import HomePage from './pages/HomePage'
import Login from "./pages/Login";
import Register from './pages/Register';
import PropertyForm from "./components/PropertyForm"
import Dashboard from './components/Dashboard';
import PropertyDetails from './components/PropertyDetails';
import Footer from './components/Footer';
import About from './components/About';
import ContactForm from "./components/Contact";





function App() {

  const [searchLocation, setSearchLocation] = useState('');
  const [propertyId, setPropertyId] = useState('');

  const handleSearch = (location) =>{  // for recieving location enter by user as prop
    console.log('Search location received in App:', location);
    setSearchLocation(location)
  }

 const handleUser = (propertyId) =>{   // recieving proprty id as prop

   console.log("recieved in app" , propertyId);
  setPropertyId(propertyId);
}
  
  return (
    <>
    <Navbar  onSearch={handleSearch} />

    
      <Routes>
      <Route exact path="/" element={<HomePage searchLocation={searchLocation} getUser={handleUser} />} />

        <Route exact path="/login" element ={<Login/>} />
        <Route exact path="/Register" element ={<Register/>} />
        <Route exact path="/PropertyForm" element ={<PropertyForm/>} />    
        <Route exact path='/Dashboard' element={<Dashboard />} />
        <Route exact path='/PropertyDetails'  element={<PropertyDetails  propertyId={propertyId} />} />
        <Route exact path='/About'  element={<About/>} />
        <Route exact path='/ContactForm' element={<ContactForm/>} />
      </Routes>
   
    <Footer/>
    </>
  );
}

export default App;
