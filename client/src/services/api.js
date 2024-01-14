import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update with your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include credentials for cross-origin requests
});

const apiService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error.message);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await api.post('/logout');
      return response.data;
    } catch (error) {
      console.error('Error logging out:', error.message);
      throw error;
    }
  },

  checkLoggedIn: async () => {
    try {
      const response = await api.get('/checkLoggedIn');
      return response.data.loggedIn;
    } catch (error) {
      console.error('Error checking logged-in status:', error.message);
      throw error;
    }
  },

  getAllProperties: async () => {
    try {
      const response = await api.get('/properties');
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error.message);
      throw error;
    }
  },

  // Add other API functions as needed
};

export default apiService;
