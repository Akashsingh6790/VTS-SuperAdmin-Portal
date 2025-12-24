// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import  apiClient  from '../services/organizationService.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Initialize user from localStorage on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setLoading(true);
      const storedUser = localStorage.getItem('superAdmin');
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        
        // Verify token is still valid
        if (userData.token) {
          try {
            // Optional: verify token with backend
            await verifyToken();
            setUser(userData);
          } catch (error) {
            // Token invalid, clear storage
            console.error('Token verification failed:', error);
            localStorage.removeItem('superAdmin');
            setUser(null);
          }
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      localStorage.removeItem('superAdmin');
      setUser(null);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };


  const login = async (email, password) => {
    try {
      setLoading(true);

     
      const response = await apiClient.post('user/superAdminLogin', {
        email,
        password,
      });

      // Extract user data from response
      const userData = {
        id: response?.data?.data?.id,
        name: response?.data?.data?.name,
        email: response?.data?.data?.email,
        role: response?.data?.data?.role,
        token: response?.data?.data?.token,
      };

      // Update state
      setUser(userData);

      // Store in localStorage
      localStorage.setItem('superAdmin', JSON.stringify(userData));

      return { success: true, data: userData };
    } catch (error) {
      console.error('Login error:', error);

      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        'Failed to login. Please check your credentials.';

      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };


  const logout = async () => {
    try {
     setUser(null);
      localStorage.removeItem('superAdmin');
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      
     
      setUser(null);
      localStorage.removeItem('superAdmin');
      
      return { success: false, error: error.message };
    }
  };


  const verifyToken = async () => {
    try {
      if (!user?.token) {
        return false;
      }

      
      await apiClient.get('/user/verify-token');
      return true;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  };


  const updateProfile = async (updates) => {
    try {
      setLoading(true);

      const response = await apiClient.put('/user/profile', updates);

      const updatedUser = {
        ...user,
        ...response.data,
      };

      setUser(updatedUser);
      localStorage.setItem('superAdmin', JSON.stringify(updatedUser));

      return { success: true, data: updatedUser };
    } catch (error) {
      console.error('Profile update error:', error);

      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        'Failed to update profile';

      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };


  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);

      await apiClient.put('/user/change-password', {
        currentPassword,
        newPassword,
      });

      return { success: true };
    } catch (error) {
      console.error('Password change error:', error);

      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        'Failed to change password';

      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => {
    return !!user && !!user.token;
  };


  const hasRole = (role) => {
    return user?.role === role;
  };

  const value = {
    // State
    user,
    loading,
    initialized,

    // Methods
    login,
    logout,
    verifyToken,
    updateProfile,
    changePassword,
   

    // Helpers
    isAuthenticated,
    hasRole,
  };

  // Don't render children until auth is initialized
  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
};

export default AuthContext;