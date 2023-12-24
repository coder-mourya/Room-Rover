// AuthForm.js
import React, { useState } from 'react';

const AuthForm = ({ authType, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the form data to the backend for authentication or registration
    const formData = { username, password, authType };

    try {
      const response = await fetch(`http://localhost:3000/api/${authType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      // Call the onSubmit prop with the form data
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{authType === 'login' ? 'Login' : 'Register'}</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">{authType === 'login' ? 'Login' : 'Register'}</button>
    </form>
  );
};

export default AuthForm;
