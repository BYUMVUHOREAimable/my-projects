// services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://67ac71475853dfff53dab929.mockapi.io/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- User API ---
export const loginUser = async (username) => {
  try {
    const response = await apiClient.get(`/users?username=${username}`);
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error('Login API error:', error.response || error.message);
    throw error;
  }
};

// NEW: Update User (for setting budgets)
export const updateUser = async (userId, userData) => {
  try {
    const response = await apiClient.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Update User ${userId} API error:`, error.response?.data || error.message);
    throw error;
  }
};


// --- Expense API ---
export const getAllExpenses = async () => {
  try {
    const response = await apiClient.get('/expenses');
    return response.data;
  } catch (error) {
    console.error('Get All Expenses API error:', error.response || error.message);
    throw error;
  }
};

export const getExpenseById = async (expenseId) => {
  try {
    const response = await apiClient.get(`/expenses/${expenseId}`);
    return response.data;
  } catch (error) {
    console.error(`Get Expense ${expenseId} API error:`, error.response || error.message);
    throw error;
  }
};

export const createExpense = async (expenseData) => {
  const dataToPost = {
    ...expenseData,
    amount: parseFloat(expenseData.amount) || 0,
    createdAt: new Date().toISOString(), // MockAPI likely sets this, but good practice
  };
  try {
    const response = await apiClient.post('/expenses', dataToPost);
    return response.data;
  } catch (error) {
    console.error('Create Expense API error:', error.response?.data || error.message);
    throw error;
  }
};

// NEW: Update Expense
export const updateExpenseById = async (expenseId, expenseData) => {
  const dataToPut = {
    ...expenseData,
    amount: parseFloat(expenseData.amount) || 0,
  };
  try {
    const response = await apiClient.put(`/expenses/${expenseId}`, dataToPut);
    return response.data;
  } catch (error) {
    console.error(`Update Expense ${expenseId} API error:`, error.response?.data || error.message);
    throw error;
  }
};

export const deleteExpenseById = async (expenseId) => {
  try {
    const response = await apiClient.delete(`/expenses/${expenseId}`);
    return response.data;
  } catch (error) {
    console.error(`Delete Expense ${expenseId} API error:`, error.response || error.message);
    throw error;
  }
};