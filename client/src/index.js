import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App';
import "./index.css"
import { BrowserRouter as Router } from 'react-router-dom';


const root = document.getElementById('root');


ReactDOM.createRoot(root).render(

  <Router>
    <GoogleOAuthProvider clientId="991206896659-2vgskdms4idqe01l557odf5d247b4k7m.apps.googleusercontent.com">

      <App />

    </GoogleOAuthProvider>
  </Router>



);

