import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import PropertyPage from './pages/PropertyPage';
import AuthPage from './pages/AuthPage';
import PropertyUploadPage from './pages/PropertyUploadPage'


function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route exact path="/" element ={<HomePage/>} />
        <Route exact path="/properties/id:" element={<PropertyPage/>} />
        <Route exact path="/auth" element={<AuthPage/>}></Route>
        <Route exact path="./upload-property" element={<PropertyUploadPage/>}></Route>
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
