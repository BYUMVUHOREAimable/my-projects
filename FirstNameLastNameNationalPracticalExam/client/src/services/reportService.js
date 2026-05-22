import axios from 'axios';
import { toast } from 'react-toastify';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || 'An error occurred';
      toast.error(message);
      
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } else if (error.request) {
      toast.error('No response from server. Please check your connection.');
    } else {
      toast.error('An error occurred while setting up the request');
    }
    return Promise.reject(error);
  }
);

const reportService = {
  // Get stock status
  getStockStatus: async () => {
    try {
      return await api.get('/stock/status');
    } catch (error) {
      console.error('Error fetching stock status:', error);
      throw error;
    }
  },

  // Get stock movements
  getStockMovements: async (params) => {
    try {
      return await api.get('/stock/movements', { params });
    } catch (error) {
      console.error('Error fetching stock movements:', error);
      throw error;
    }
  },

  // Download stock status report
  downloadStockStatus: async () => {
    try {
      const response = await api.get('/stock/status/download', {
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      console.error('Error downloading stock status:', error);
      throw error;
    }
  },

  // Download stock movements report
  downloadStockMovements: async (params) => {
    try {
      const response = await api.get('/stock/movements/download', {
        params,
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      console.error('Error downloading stock movements:', error);
      throw error;
    }
  }
};

export default reportService;