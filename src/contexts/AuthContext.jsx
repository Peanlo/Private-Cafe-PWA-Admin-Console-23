import React, { createContext, useContext, useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default admin credentials
  const DEFAULT_ADMIN = {
    username: 'admin',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // peterl123
    role: 'admin'
  };

  useEffect(() => {
    // Check for existing session
    const token = Cookies.get('admin_token');
    const userData = Cookies.get('admin_user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        Cookies.remove('admin_token');
        Cookies.remove('admin_user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // Get stored credentials or use defaults
      const storedCredentials = localStorage.getItem('admin_credentials');
      const credentials = storedCredentials ? JSON.parse(storedCredentials) : DEFAULT_ADMIN;
      
      if (username === credentials.username && await bcrypt.compare(password, credentials.password)) {
        const userData = {
          username: credentials.username,
          role: credentials.role
        };
        
        // Create session
        const token = btoa(JSON.stringify({ ...userData, timestamp: Date.now() }));
        Cookies.set('admin_token', token, { expires: 1 }); // 1 day
        Cookies.set('admin_user', JSON.stringify(userData), { expires: 1 });
        
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    Cookies.remove('admin_token');
    Cookies.remove('admin_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const storedCredentials = localStorage.getItem('admin_credentials');
      const credentials = storedCredentials ? JSON.parse(storedCredentials) : DEFAULT_ADMIN;
      
      if (await bcrypt.compare(currentPassword, credentials.password)) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const newCredentials = {
          ...credentials,
          password: hashedNewPassword
        };
        
        localStorage.setItem('admin_credentials', JSON.stringify(newCredentials));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Password change error:', error);
      return false;
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};