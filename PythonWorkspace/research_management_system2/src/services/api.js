import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username, password) => {
  const response = await api.post('token/', { username, password });
  return response.data;
};

export const getProjects = async () => {
  const response = await api.get('projects/');
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await api.post('projects/', projectData);
  return response.data;
};

export const getDataCollections = async (projectId) => {
  const response = await api.get(`projects/${projectId}/data_collections/`);
  return response.data;
};

export default api; 