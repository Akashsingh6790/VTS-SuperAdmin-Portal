// src/services/organizationService.js
import axios from 'axios';

// Axios Instance Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.request.use(
  (config) => {
    const superAdmin = JSON.parse(localStorage.getItem('superAdmin') || '{}');
    const token = superAdmin.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || error.response.statusText;
      
      // Handle 401 Unauthorized - redirect to login
      if (error.response.status === 401) {
        localStorage.removeItem('superAdmin');
        window.location.href = '/login';
      }
      
      // Handle 403 Forbidden
      if (error.response.status === 403) {
        console.error('Access forbidden');
      }
      
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Request made but no response received
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Something else happened
      return Promise.reject(new Error(error.message || 'An error occurred'));
    }
  }
);


export const organizationService = {
 
  async fetchAll() {
    try {
      const response = await apiClient.get('org/getAllOrg');
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch organizations');
    }
  },

  
 
  async create(data) {
    try {
      const response = await apiClient.post('org/orgRegister', data);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to create organization');
    }
  },

 
  async update(id, data) {
    try {
      
      const response = await apiClient.patch(`/org/update/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to update organization');
    }
  },


  async delete(id) {
    try {
      const response = await apiClient.delete(`/org/delete/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete organization');
    }
  },


  async getById(id) {
    try {
      const response = await apiClient.get(`/org/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch organization details');
    }
  },

 
  async search(query) {
    try {
      const response = await apiClient.get('/superadmin/organizations/search', {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to search organizations');
    }
  },


  async getPaginated(page = 1, limit = 10) {
    try {
      const response = await apiClient.get('/superadmin/organizations', {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch organizations');
    }
  },
};


export default apiClient;