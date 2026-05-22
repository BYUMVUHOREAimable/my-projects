// state/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('currentUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error("Failed to load user from storage", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    try {
      await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
    } catch (e) {
      console.error("Failed to save user to storage", e);
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem('currentUser');
    } catch (e) {
      console.error("Failed to remove user from storage", e);
    }
  };

  // NEW: Function to update user data in context and storage
  const updateUserContext = async (updatedUserData) => {
    setUser(updatedUserData);
    try {
      await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUserData));
    } catch (e) {
      console.error("Failed to save updated user to storage", e);
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserContext, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);