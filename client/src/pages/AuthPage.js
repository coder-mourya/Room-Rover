// AuthPage.js
import React from 'react';
import AuthForm from '../components/AuthForm';

const AuthPage = () => {
  // You can handle form submission here and send the data to the backend

  const handleAuthSubmit = (formData) => {
    // Handle the form data as needed (e.g., send to the backend)
    console.log('Form data submitted:', formData);
  };

  return (
    <div>
      <h1>Authentication Page</h1>
      <AuthForm authType="login" onSubmit={handleAuthSubmit} />
      <AuthForm authType="register" onSubmit={handleAuthSubmit} />
    </div>
  );
};

export default AuthPage;
