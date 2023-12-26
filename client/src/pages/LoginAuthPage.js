import React from 'react';
import LoginForm from '../components/LoginAuthForm';

const LoginPage = ({onSubmit}) => {
  const handleLoginSubmit = async (formData) => {
    console.log('Login form data submitted:', formData);
    // Handle login logic here
    try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
        console.log(data);

        onSubmit (formData, 'login');
    }catch (error) {
        console.error('Error handling registration form submission:', error.message);
    
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm onSubmit={handleLoginSubmit} />
    </div>
  );
};

export default LoginPage;
