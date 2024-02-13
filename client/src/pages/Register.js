import React, { useState } from 'react';
import "./style.css";
import axios from 'axios';
import Alerts from '../components/Alerts';


const RegisterPage = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [role, setRole] = useState('tenant')
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('');


  const handleRegister = async (e) => {
    e.preventDefault();

    try {
   const response =   await axios.post("http://localhost:5000/auth/register", { username, password, email, number, role });
      console.log("Registeration successfull")
      setAlertMessage("Registeration successfull")
      setAlertType("sucessful")

      const {token} = response.data;

      localStorage.setItem('token' , token)

      if(role === 'owner'){
        window.location.href = '/dashboard'
      }else{
        window.location.href ='/'
      }

    } catch (error) {
      console.log(error);
      setAlertMessage("invalid details")
      setAlertType("error");
    }


    console.log('Name:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('mobile number :', number)
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className='custom-style'>

      {alertMessage && <Alerts  message={alertMessage} type={alertType}/>}
        <h2 className='text-light'>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
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

          <div className="form-grup">
            <label className='text-light'> Mobile number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter your Mobile number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          <div className="form-group">
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

          <div className="form-group">
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

          <div className='form-grup'>
            <label className='text-light'> Role</label>

            <select className='form-control' value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="tanant"> Tanant </option>
              <option value="owner">Owner</option>
            </select>

          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Register
          </button>

          

          <p className='mt-4 text-light'>Already have an account? <a href="/login">Login</a></p>
          
        </form>

        {alertMessage &&(
        <Alerts message={alertMessage} type={alertType} />
      )}
      </div>
    </div>
  );
};

export default RegisterPage;
