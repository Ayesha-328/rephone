import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/admin',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response?.status === 401) {
      console.log('Unauthorized request, redirecting to login');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 