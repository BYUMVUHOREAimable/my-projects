import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, login, logout, getMe } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await getMe();
          setUser(userData);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleRegister = async (username, password) => {
    try {
      setError(null);
      const data = await register(username, password);
      setUser(data.shopkeeper);
      navigate('/');
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      setError(null);
      const data = await login(username, password);
      setUser(data.shopkeeper);
      navigate('/');
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register: handleRegister,
        login: handleLogin,
        logout: handleLogout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;