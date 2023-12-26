import axios from 'axios';

const api = axios.create({
  
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// api.js
export const checkLoggedIn = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/checkLoggedIn', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
       
      },
      
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to check logged-in status');
    }

    const data = await response.json();
    return data.loggedIn;
  } catch (error) {
    console.error('Error checking logged-in status:', error.message);
    throw error;
  }
};



export default api;
