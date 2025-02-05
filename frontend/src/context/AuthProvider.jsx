import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../utils';
import { LOCAL_BACKEND_URL } from '../local_backend_url';

// Create Context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Function to check authentication status
    const checkAuthStatus = () => {
        const token = localStorage.getItem("jwt");

        if (token) {
            setIsAuthenticated(true);
            fetchCourses(); // Fetch courses if authenticated
        } else {
            setIsAuthenticated(false);
            clearCourses(); // Clear courses if not authenticated
        }
    };

    // Fetch courses from API and store in localStorage
    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/courses/allCourse`);

            if (response.data && Array.isArray(response.data.courses)) {
                localStorage.setItem("courses", JSON.stringify(response.data.courses));
            }
        } catch (error) {
            console.error("Fetch Courses Error:", error);
        }
    };

    // Clear courses from localStorage on logout
    const clearCourses = () => {
        localStorage.removeItem("courses");
    };

    // Check authentication status on app load
    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Login function
    const login = (token, student) => {
        localStorage.setItem("jwt", token);
        localStorage.setItem("student", JSON.stringify(student));

        setIsAuthenticated(true);
        fetchCourses(); // Fetch courses on login
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("student");
        clearCourses(); // Clear courses on logout

        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            setIsAuthenticated,  
            login, 
            logout, 
            checkAuthStatus,
            fetchCourses
        }}>
            {children}
        </AuthContext.Provider>
    );
};
