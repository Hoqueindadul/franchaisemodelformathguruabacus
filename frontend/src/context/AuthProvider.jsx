import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../utils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/users/all-users`);
        setUser(data); // Assuming data contains user information
        setIsAuthenticated(true)
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);