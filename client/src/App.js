import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar  from './components/Navbar';
import HomePage from './pages/HomePage'
import Login from "./pages/Login";
import Register from './pages/Register';
import PropertyUploadPage from "./pages/PropertyUploadPage"
import PropertyForm from "./components/PropertyForm"


function App() {
  return (
    <>
    <Navbar/>
    <BrowserRouter>
    
      <Routes>
        <Route exact path="/" element ={<HomePage/>} />
        <Route exact path="/login" element ={<Login/>} />
        <Route exact path="/Register" element ={<Register/>} />
        <Route exact path="/PropertyUploadPage" element ={<PropertyUploadPage/>} />
        <Route exact path="/PropertyForm" element ={<PropertyForm/>} />     
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
