import axios from "axios";
import { refresh_token_call } from "./store/slices/RefreshTokenSlice";

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT, // Replace with your API base URL
  timeout: 5000, // Set the request timeout (in milliseconds)
});

// Add an interceptor for request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    //intercept the request and check if the token is expired
    const expiryAt = localStorage.getItem("expiryAt");
    if (token && expiryAt) {
      if (expiryAt < Date.now() - 30000) {
        refresh_token_call(localStorage.getItem("user")._id);
      }
    }
    // You can modify the request config here (e.g., add headers, authentication tokens, etc.)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add an interceptor for response
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data here (e.g., transform, filter, etc.)
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      alert(error.response.data.error);
    }
    // Handle response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
