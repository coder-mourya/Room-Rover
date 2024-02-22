import React, { useState } from 'react';
import "./style.css"
import axios from 'axios';
import Alerts from '../components/Alerts';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode"


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tanant');
  const [alertMessage ,  setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('')



  // Manual login
  const handleLogin = async (e) => {  
    e.preventDefault();


    try {
     const response = await axios.post("http://localhost:5000/auth/login", {email, password, role});

    console.log("Login successfull" , response.data);

    const {token} = response.data;

    localStorage.setItem('token', token)
    localStorage.setItem('role', role);

    setAlertMessage("login successfully")
    setAlertType("success")
      
    if(role === 'owner'){

      window.location.href ='/dashboard';
    }else{
      window.location.href = '/';
    }
      
    } catch (error) {
      setAlertMessage("Invalid details. Please try again.");
      setAlertType("error");
     
      console.log(error);
    }
   
    console.log('Email:', email);
    console.log('Password:', password);
  };



  // login with google 
  const handleLoginWithGoogle = async (credentialResponse) =>{

    try {
      const decodedToken = jwtDecode(credentialResponse?.credential);

      const response = await axios.post("http://localhost:5000/auth/google/login", {
        email : decodedToken.email,
        role : role
      });

      console.log("Login successfull" , response.data);
  
      
      const {googleProfile} = response.data;

  
      localStorage.setItem('googleProfile', googleProfile)
      localStorage.setItem('role', role);
  
      setAlertMessage("login successfully")
      setAlertType("success")
        
      if(role === 'owner'){
  
        window.location.href ='/dashboard';
      }else{
        window.location.href = '/';
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  
 

  return (

    <div className="container d-flex justify-content-center mt-4  ">
      <div className='custom-style container  d-flex justify-content-center'>
      <div className='adjustWith my-4'>
          
      <h2 className='text-light'>Login</h2>
      <form onSubmit={handleLogin}>

      
      
        <div className="form-group my-2">
          <label className='text-light'>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group my-2">
          <label className='text-light'>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

      <div className='form-grup my-2'>
            <label className='text-light'> Role</label>

            <select className='form-control' value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="tanant"> Tanant </option>
              <option value="owner">Owner</option>
            </select>

          </div>

          <GoogleLogin
              onSuccess={handleLoginWithGoogle}

              onError={() => {
                console.log('Login Failed');
              }}
            />



        <button type="submit" className="btn btn-primary mt-4">
          Login
        </button>

        <p className='mt-4 text-light'>Don't have an account? <a href="/register">Register</a></p>
      </form>

      {alertMessage &&(
        <Alerts message={alertMessage} type={alertType} />
      )

      }
      </div>
      </div>
    </div>
  );
};

export default LoginPage;
