import api from './api';

const propertyService = {
  getAllProperties: async () => {
    try {
      const response = await api.get('/properties');
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error.message);
      throw error;
    }
  },
  
};

export default propertyService;
