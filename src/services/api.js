// src/services/api.js
import axios from 'axios';
import cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      if (typeof window !== 'undefined') {
        cookies.remove('token');
        cookies.remove('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

api.setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Prevent duplicate redirects if already logging out
      if (window.location.pathname !== "/login") {
        cookies.remove("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);



// // src/services/api.js
// import axios from 'axios';

// const API_URL = process.env.NEXT_PUBLIC_API_URL

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 10000, // 10 second timeout
// });

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     // Only add token if we're in browser environment
//     if (typeof window !== 'undefined') {
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
    
//     // Log requests in development
//     if (process.env.NODE_ENV === 'development') {
//       console.log('API Request:', {
//         method: config.method?.toUpperCase(),
//         url: config.url,
//         data: config.data,
//       });
//     }
    
//     return config;
//   },
//   (error) => {
//     console.error('Request interceptor error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     // Log responses in development
//     if (process.env.NODE_ENV === 'development') {
//       console.log('API Response:', {
//         status: response.status,
//         url: response.config.url,
//         data: response.data,
//       });
//     }
    
//     return response;
//   },
//   (error) => {
//     // Log errors in development
//     if (process.env.NODE_ENV === 'development') {
//       console.error('API Error:', {
//         status: error.response?.status,
//         url: error.config?.url,
//         message: error.response?.data?.message || error.message,
//         details: error.response?.data?.details || error.response?.data?.error,
//       });
//     }

//     // Handle different error scenarios based on your backend
//     if (error.response) {
//       const { status, data } = error.response;
      
//       switch (status) {
//         case 401:
//           // Handle unauthorized - matches your auth middleware
//           if (typeof window !== 'undefined') {
//             // Only clear storage if we're in browser
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');
            
//             // Redirect to login if not already there
//             if (window.location.pathname !== '/login') {
//               window.location.href = '/login';
//             }
//           }
//           break;
          
//         case 403:
//           // Handle forbidden access
//           console.error('Access forbidden:', data?.message || 'Insufficient permissions');
//           break;
          
//         case 404:
//           // Handle not found - could be user not found, school not found, etc.
//           console.error('Resource not found:', data?.message || 'Resource not found');
//           break;
          
//         case 500:
//           // Handle server errors
//           console.error('Server error:', data?.message || 'Internal server error');
//           break;
          
//         default:
//           console.error('API Error:', data?.message || error.message);
//       }
//     } else if (error.request) {
//       // Network error
//       console.error('Network error:', error.message);
//     } else {
//       // Other error
//       console.error('API Error:', error.message);
//     }
    
//     return Promise.reject(error);
//   }
// );

// // Method to set auth token
// api.setAuthToken = (token) => {
//   if (token) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common['Authorization'];
//   }
// };

// // Helper method to handle file uploads
// api.upload = (url, formData, config = {}) => {
//   return api.post(url, formData, {
//     ...config,
//     headers: {
//       ...config.headers,
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// };

// // Helper method for authenticated requests
// api.authenticated = {
//   get: (url, config = {}) => api.get(url, config),
//   post: (url, data, config = {}) => api.post(url, data, config),
//   put: (url, data, config = {}) => api.put(url, data, config),
//   patch: (url, data, config = {}) => api.patch(url, data, config),
//   delete: (url, config = {}) => api.delete(url, config),
// };

// export default api;