// apiConfig.js
import axios from "axios";
export const API_BASE_URL = 'http://localhost:5001';  //backend base url

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Attach latest JWT token before every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

