import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import PropertyPage from './pages/PropertyPage';
import PropertyUploadPage from './pages/PropertyUploadPage'
import LoginPage from './pages/LoginAuthPage';
import RegisterPage from './pages/RegisterAuthPage';


function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route exact path="/" element ={<HomePage/>} />
        <Route exact path="/properties/id:" element={<PropertyPage/>} />
        <Route exact path="/login" element={<LoginPage/>}/>
        <Route exact path="/Register" element={<RegisterPage/>}/>
        <Route exact path="/upload-property" element={<PropertyUploadPage/>}/>
        
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
