import React, { createContext, useState, useEffect} from 'react';
import apiService from '../services/api';

// Create a context with initial values
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  checkLoggedIn: async () => {},
});

// AuthProvider component to wrap my  application
const AuthProvider = ({ children }) => {
 
  const [user, setUser] = useState(null);

  // Function to handle user login
  const login = async (credentials) => {
    try {
      const response = await apiService.login(credentials);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      await apiService.logout();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  // Function to check if a user is already logged in (on page load)
   const checkLoggedIn = async () => {
    try {
      const response = await apiService.checkLoggedIn();
      const {loggedIn, user} = response.data;
      
      if(loggedIn){
        return {loggedIn, user};
      }else{
        return {loggedIn}
      }
    } catch (error) {
      console.error('Error checking logged in status:', error.message);
      throw error
    }
  };

  // Run the checkLoggedIn function on component mount
  useEffect(() => {
    checkLoggedIn();
  }, []);

  // Context value to be provided to the components
  const contextValue = {
    user,
    login,
    logout,
    checkLoggedIn
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export {AuthProvider}
