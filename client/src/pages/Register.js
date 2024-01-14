import React, { useState } from 'react';
import "./style.css";

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber]  = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    // for Add my registration logic here (e.g., calling an API)
    // For now, let's log the name, email, and password to the console
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('mobile number :',  number)
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
            value={name}
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

        <button type="submit" className="btn btn-primary mt-4">
          Register
        </button>
      </form>
            </div>
    </div>
  );
};

export default RegisterPage;
