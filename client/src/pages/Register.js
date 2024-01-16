import React, { useState } from 'react';
import "./style.css";
import axios from 'axios';

const RegisterPage = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [role, setRole] = useState('tenant')

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/auth/register", { username, password, email, number, role });
      console.log("Registeration successfull")
    } catch (error) {
      console.log(error);
    }

    console.log('Name:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('mobile number :', number)
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className='custom-style'>

        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Name</label>
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
            <label> Mobile number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter your Mobile number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

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
            Register
          </button>

          <p className='mt-4'>Already have an account? <a href="/login">Login</a></p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
