import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Context
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loggedInUsername, setLoggedInUsername] = useState(''); // State for the full name

    // Check localStorage for JWT token and full name on app load
    useEffect(() => {
        const token = localStorage.getItem("jwt");
        const firstName = localStorage.getItem("firstName"); // Retrieve full name from localStorage
        if (token) {
            setIsAuthenticated(true); // If token exists, the user is authenticated
            setLoggedInUsername(firstName || ''); // Set the full name if it exists
        } else {
            setIsAuthenticated(false); // No token, user is not authenticated
            setLoggedInUsername(''); // Clear the full name
        }
    }, []);

    // Login function
    const login = (firstName) => {
        setIsAuthenticated(true);
        const trimmedFirstName = `${firstName}`.trim(); // Trim the first name
        setLoggedInUsername(trimmedFirstName); // Set the full name in state
        localStorage.setItem("firstName", trimmedFirstName); // Store the full name in localStorage
    };
    

    // Logout function
    const logout = () => {
        localStorage.removeItem("jwt"); // Remove the JWT token
        localStorage.removeItem("firstName"); // Remove the full name
        setIsAuthenticated(false); // Update the state to indicate the user is logged out
        setLoggedInUsername(''); // Clear the full name state
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, setIsAuthenticated, loggedInUsername }}>
            {children}
        </AuthContext.Provider>
    );
};
