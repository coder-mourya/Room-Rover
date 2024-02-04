import React, {useState}from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar  from './components/Navbar';
import HomePage from './pages/HomePage'
import Login from "./pages/Login";
import Register from './pages/Register';
import PropertyForm from "./components/PropertyForm"
import Dashboard from './components/Dashboard';
import PropertyDetails from './components/PropertyDetails';
import Footer from './components/Footer';






function App() {

  const [searchLocation, setSearchLocation] = useState('');
  const [propertyId, setPropertyId] = useState('');

  const handleSearch = (location) =>{
    console.log('Search location received in App:', location);
    setSearchLocation(location)
  }
 const handleUser = (propertyId) =>{

   console.log("recieved in app" , propertyId);
  setPropertyId(propertyId);
}
  
  return (
    <>
    <Navbar  onSearch={handleSearch} />
    <BrowserRouter>
    
      <Routes>
      <Route exact path="/" element={<HomePage searchLocation={searchLocation} getUser={handleUser} />} />

        <Route exact path="/login" element ={<Login/>} />
        <Route exact path="/Register" element ={<Register/>} />
        <Route exact path="/PropertyForm" element ={<PropertyForm/>} />    
        <Route exact path='/Dashboard' element={<Dashboard />} />
        <Route exact path='/PropertyDetails'  element={<PropertyDetails  propertyId={propertyId} />} />
      </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  );
}

export default App;
