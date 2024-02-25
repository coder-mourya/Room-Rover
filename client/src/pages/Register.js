import React, { useState } from 'react';
import "./style.css";
import axios from 'axios';
import Alerts from '../components/Alerts';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tenant')
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('');


  const navigate = useNavigate();

  // Register with manual 
  const handleRegister = async (e) => {
    e.preventDefault();



    try {
      const response = await axios.post("http://localhost:5000/auth/register", { username, password, email, role });
      console.log("Registeration successfull")
      setAlertMessage("Registeration successfull")
      setAlertType("sucessful")

      const { token } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);


      if (role === 'owner') {

        navigate('/Dashboard')
      } else {
        navigate('/')
      }

    } catch (error) {
      console.log(error);
      setAlertMessage("invalid details")
      setAlertType("error");
    }


    console.log('Name:', username);
    console.log('Email:', email);
    console.log('Password:', password);

  };


  // Register with google 
  const handleRegisterWithGoogle = async (credentialResponse) => {

    try {

      const decodedToken = jwtDecode(credentialResponse?.credential);



      const response = await axios.post("http://localhost:5000/auth/google/register", {
        username: decodedToken.name,

        email: decodedToken.email,
        role,
      });


      const { googleProfile } = response.data;
      localStorage.setItem('googleProfile', googleProfile);
      localStorage.setItem('role', role);





      if (role === 'owner') {

        navigate('/Dashboard')
      } else {
        navigate('/')
      }

    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className='custom-style container d-flex justify-content-center'>

        <div className='adjustWith my-4'>
          {alertMessage && <Alerts message={alertMessage} type={alertType} />}
          <h2 className='text-light'>Register</h2>

          <form onSubmit={handleRegister}>
            <div className="form-group my-2">
              <label className='text-light'>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>



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
              onSuccess={handleRegisterWithGoogle}

              onError={() => {
                console.log('Login Failed');
              }}
            />;



            <button type="submit" className="btn btn-primary mt-4">
              Register
            </button>



            <p className='mt-4 text-light'>Already have an account? <Link to="/login">Login</Link></p>

          </form>

          {alertMessage && (
            <Alerts message={alertMessage} type={alertType} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
