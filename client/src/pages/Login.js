import React, { useState } from 'react';
import "./style.css"
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    
    e.preventDefault();

    // Add my authentication logic here (e.g., calling an API)
    // For now, let's log the email and password to the console
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

        <button type="submit" className="btn btn-primary mt-4">
          Login
        </button>
      </form>
      </div>
    </div>
  );
};

export default LoginPage;
