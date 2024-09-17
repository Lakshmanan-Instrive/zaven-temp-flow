import axios from "axios";

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT, // Replace with your API base URL
  timeout: 5000, // Set the request timeout (in milliseconds)
});

// Add an interceptor for request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
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
