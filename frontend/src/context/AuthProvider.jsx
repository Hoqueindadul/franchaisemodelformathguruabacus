import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Context
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check localStorage for JWT token on app load (initial load)
    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            setIsAuthenticated(true); // If token exists, the user is authenticated
        } else {
            setIsAuthenticated(false); // No token, user is not authenticated
        }
    }, []);

    // Login function
    const login = () => {
        setIsAuthenticated(true);
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("jwt"); // Remove the JWT token on logout
        setIsAuthenticated(false); // Update the state to indicate the user is logged out
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
