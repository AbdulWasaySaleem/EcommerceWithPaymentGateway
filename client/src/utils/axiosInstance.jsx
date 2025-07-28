// src/utils/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // keep this if you're using cookies (e.g., JWT auth with session)
});

// Optional: Add interceptors (e.g., auth token, error handling)
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Add token to headers
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can log errors globally or redirect to login on 401
    if (error.response?.status === 401) {
      console.warn('Unauthorized. Redirecting...');
      // window.location.href = '/login'; (optional)
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
