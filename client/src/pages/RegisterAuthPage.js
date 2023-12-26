import React from 'react';
import RegisterForm from '../components/RegisterAuthForm';

const RegisterPage = ({onSubmit}) => {
  const handleRegisterSubmit = async (formData) => {
    console.log('Register form data submitted:', formData);
    

    try {
        const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
        console.log(data);
  
      
        onSubmit(formData, 'register');
      } catch (error) {
        console.error('Error handling registration form submission:', error.message);
      }
  };

  return (
    <div>
      <h1>Register Page</h1>
      <RegisterForm onSubmit={handleRegisterSubmit} />
    </div>
  );
};

export default RegisterPage;
