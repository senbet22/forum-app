import axios from "axios";

const axiosInstance = axios.create();

// Automatically add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Pass through the error so we can handle it in the component
    return Promise.reject(error);
  }
);

export default axiosInstance;
