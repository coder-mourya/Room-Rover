import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar  from './components/Navbar';
import HomePage from './pages/HomePage'
import Login from "./pages/Login";
import Register from './pages/Register';
import PropertyForm from "./components/PropertyForm"
import Dashboard from './components/Dashboard';


function App() {
  return (
    <>
    <Navbar/>
    <BrowserRouter>
    
      <Routes>
        <Route exact path="/" element ={<HomePage/>} />
        <Route exact path="/login" element ={<Login/>} />
        <Route exact path="/Register" element ={<Register/>} />
        <Route exact path="/PropertyForm" element ={<PropertyForm/>} />    
        <Route exact path='/Dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
