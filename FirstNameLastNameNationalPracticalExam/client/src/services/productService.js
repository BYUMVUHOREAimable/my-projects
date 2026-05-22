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
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const message = error.response.data?.message || 'An error occurred';
      toast.error(message);
      
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } else if (error.request) {
      // The request was made but no response was received
      toast.error('No response from server. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      toast.error('An error occurred while setting up the request');
    }
    return Promise.reject(error);
  }
);

// Get all products
const getProducts = async () => {
  try {
    return await api.get('/products');
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get single product
const getProduct = async (id) => {
  try {
    return await api.get(`/products/${id}`);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Create a product
const createProduct = async (data) => {
  try {
    const response = await api.post('/products', data);
    toast.success('🎉 Product created!');
    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update a product
const updateProduct = async (id, data) => {
  try {
    const response = await api.put(`/products/${id}`, data);
    toast.success('✅ Product updated!');
    return response;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    toast.success('🗑️ Product deleted!');
    return response;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Add stock in
const addStockIn = async (id, data) => {
  try {
    const response = await api.post(`/products/${id}/stock-in`, data);
    toast.success('📦 Stock-in recorded!');
    return response;
  } catch (error) {
    console.error('Error recording stock-in:', error);
    throw error;
  }
};

// Add stock out
const addStockOut = async (id, data) => {
  try {
    const response = await api.post(`/products/${id}/stock-out`, data);
    toast.success('📤 Stock-out recorded!');
    return response;
  } catch (error) {
    console.error('Error recording stock-out:', error);
    throw error;
  }
};

export default {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addStockIn,
  addStockOut,
};
