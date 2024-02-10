import React, { useState } from 'react';
import "./style.css"
import axios from 'axios';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tanant');

  const handleLogin = async (e) => {  
    e.preventDefault();


    try {
     const response = await axios.post("http://localhost:5000/auth/login", {email, password, role});

    console.log("Login successfull" , response.data);

    const {token} = response.data;

    localStorage.setItem('token', token)
      
    if(role === 'owner'){

      window.location.href ='/dashboard';
    }else{
      window.location.href = '/';
    }
      
    } catch (error) {
      window.alert("invalid details")
      console.log(error);
    }
   
    console.log('Email:', email);
    console.log('Password:', password);
  };

 

  return (
    <div className="container d-flex justify-content-center mt-4 ">
      <div className='custom-style'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email address</label>
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
          <label>Password</label>
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
            <label> Role</label>

            <select className='form-control' value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="tanant"> Tanant </option>
              <option value="owner">Owner</option>
            </select>

          </div>

        <button type="submit" className="btn btn-primary mt-4">
          Login
        </button>

        <p className='mt-4'>Don't have an account? <a href="/register">Register</a></p>
      </form>
      </div>
    </div>
  );
};

export default LoginPage;
