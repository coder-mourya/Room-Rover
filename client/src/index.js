import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
//import  { AuthProvider } from './context/AuthContext';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
   
      <App />
   
  </React.StrictMode>
);

