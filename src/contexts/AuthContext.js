// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';
import cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = cookies.get('token');
      const storedUser = cookies.get('user');

      if (storedToken && storedUser) {
        try {
          api.setAuthToken(storedToken);
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, token } = response.data;
      
      cookies.set('token', token);
      cookies.set('user', JSON.stringify(user));
      api.setAuthToken(token);
      
      setUser(user);
      setToken(token);
      
      // Redirect based on role
      const redirectPath = getDashboardPath(user.role);
      router.push(redirectPath);
      
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    cookies.remove('token');
    cookies.remove('user');
    api.setAuthToken(null);
    setUser(null);
    setToken(null);
    router.push('/login');
  };

  const registerOwner = async (ownerData) => {
    try {
      const response = await api.post('/auth/register/owner', ownerData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await api.post('/auth/forget-password', { email });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Password reset failed' };
    }
  };

  const resetPassword = async (resetData) => {
    try {
      const response = await api.post('/auth/reset-password', resetData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Password reset failed' };
    }
  };

  const getDashboardPath = (role) => {
    switch (role) {
      case 'owner': return '/owner/dashboard';
      case 'admin': return '/admin/dashboard';
      case 'teacher': return '/teacher/dashboard';
      case 'clerk': return '/clerk/dashboard';
      case 'fee_manager': return '/feesManager/dashboard';
      default: return '/dashboard';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        registerOwner,
        forgotPassword,
        resetPassword,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);





// // src/contexts/AuthContext.js
// import { createContext, useContext, useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import api from '../services/api';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('user');

//         if (storedToken && storedUser) {
//           // Validate token is still valid by making a test request
//           api.setAuthToken(storedToken);
          
//           // You can add a token validation endpoint or use any protected route
//           try {
//             // This will trigger the auth middleware on backend
//             await api.get('/auth/verify'); // Add this endpoint to your backend if needed
            
//             setToken(storedToken);
//             setUser(JSON.parse(storedUser));
//           } catch (error) {
//             // Token is invalid, clear storage
//             console.log('Token validation failed:', error);
//             logout();
//           }
//         }
//       } catch (error) {
//         console.error('Auth initialization error:', error);
//         logout();
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializeAuth();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       // Clear any existing auth state
//       api.setAuthToken(null);
      
//       const response = await api.post('/auth/login', { email, password });
//       const { user, token } = response.data;
      
//       // Store auth data
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
      
//       // Set token for future requests
//       api.setAuthToken(token);
      
//       // Update state
//       setUser(user);
//       setToken(token);
      
//       // Redirect based on role - matching your backend user roles
//       const redirectPath = getDashboardPath(user.role);
//       router.push(redirectPath);
      
//       return { success: true, user, token };
//     } catch (error) {
//       console.error('Login error:', error);
      
//       // Handle specific error cases from backend
//       let errorMessage = 'Login failed';
      
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.response?.status === 400) {
//         errorMessage = 'Email and password are required';
//       } else if (error.response?.status === 401) {
//         errorMessage = 'Invalid credentials or account inactive';
//       } else if (error.response?.status === 500) {
//         errorMessage = 'Server error. Please try again later.';
//       }
      
//       return { success: false, message: errorMessage };
//     }
//   };

//   const logout = () => {
//     try {
//       // Clear localStorage
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
      
//       // Clear API token
//       api.setAuthToken(null);
      
//       // Clear state
//       setUser(null);
//       setToken(null);
      
//       // Redirect to login
//       router.push('/login');
//     } catch (error) {
//       console.error('Logout error:', error);
//       // Force redirect even if there's an error
//       router.push('/login');
//     }
//   };

//   const registerOwner = async (ownerData) => {
//     try {
//       const response = await api.post('/auth/register/owner', ownerData);
//       return { success: true, data: response.data };
//     } catch (error) {
//       console.error('Registration error:', error);
      
//       let errorMessage = 'Registration failed';
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       }
      
//       return { success: false, message: errorMessage };
//     }
//   };

//   const forgotPassword = async (email) => {
//     try {
//       const response = await api.post('/auth/forget-password', { email });
//       return { success: true, data: response.data };
//     } catch (error) {
//       console.error('Forgot password error:', error);
      
//       let errorMessage = 'Password reset request failed';
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       }
      
//       return { success: false, message: errorMessage };
//     }
//   };

//   const resetPassword = async (resetData) => {
//     try {
//       const response = await api.post('/auth/reset-password', resetData);
//       return { success: true, data: response.data };
//     } catch (error) {
//       console.error('Reset password error:', error);
      
//       let errorMessage = 'Password reset failed';
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       }
      
//       return { success: false, message: errorMessage };
//     }
//   };

//   // Match the roles from your backend
//   const getDashboardPath = (role) => {
//     switch (role) {
//       case 'owner': 
//         return '/owner/dashboard';
//       case 'admin': 
//         return '/admin/dashboard';
//       case 'teacher': 
//         return '/teacher/dashboard';
//       case 'clerk': 
//         return '/clerk/dashboard';
//       case 'fee_manager': 
//         return 'feesManager/dashboard';
//       case 'student':
//         return '/student/dashboard';
//       default: 
//         return '/dashboard';
//     }
//   };

//   // Check if user has specific role
//   const hasRole = (requiredRole) => {
//     return user?.role === requiredRole;
//   };

//   // Check if user has any of the specified roles
//   const hasAnyRole = (roles) => {
//     return roles.includes(user?.role);
//   };

//   // Get user's school information (for non-owner users)
//   const getSchoolInfo = () => {
//     return user?.school || null;
//   };

//   // Get user's children (for parent role)
//   const getChildren = () => {
//     return user?.children || null;
//   };

//   const value = {
//     user,
//     token,
//     loading,
//     login,
//     logout,
//     registerOwner,
//     forgotPassword,
//     resetPassword,
//     isAuthenticated: !!token && !!user,
//     hasRole,
//     hasAnyRole,
//     getSchoolInfo,
//     getChildren,
//     // Helper methods for common role checks
//     isOwner: () => hasRole('owner'),
//     isAdmin: () => hasRole('admin'),
//     isTeacher: () => hasRole('teacher'),
//     isParent: () => hasRole('parent'),
//     isStudent: () => hasRole('student'),
//     isClerk: () => hasRole('clerk'),
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };