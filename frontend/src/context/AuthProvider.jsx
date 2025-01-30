import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loggedInUsername, setLoggedInUsername] = useState('');

    // Function to check authentication status
    const checkAuthStatus = () => {
        const token = localStorage.getItem("jwt");
        const firstName = localStorage.getItem("firstName");

        if (token) {
            setIsAuthenticated(true);
            setLoggedInUsername(firstName || '');
        } else {
            setIsAuthenticated(false);
            setLoggedInUsername('');
        }
    };

    // Check authentication status on app load
    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Login function (stores token and username)
    const login = (token, firstName) => {
        localStorage.setItem("jwt", token);
        localStorage.setItem("firstName", firstName.trim());
        setIsAuthenticated(true);
        setLoggedInUsername(firstName.trim());
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("firstName");
        setIsAuthenticated(false);
        setLoggedInUsername('');
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            setIsAuthenticated,  // ✅ Added this to fix the error
            login, 
            logout, 
            checkAuthStatus, 
            loggedInUsername 
        }}>
            {children}
        </AuthContext.Provider>
    );
};
