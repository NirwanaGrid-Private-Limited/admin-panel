import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
// example: http://localhost:5000/api/v1

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Request interceptor (token attach)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 🔥 IMPORTANT: If data is FormData, remove Content-Type header
    // Axios will automatically set it to multipart/form-data with boundary
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// ❌ Response interceptor (global error handle)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);