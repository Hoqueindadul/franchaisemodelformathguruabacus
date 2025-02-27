import React, { createContext, useState, useContext, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { BACKEND_URL } from '../utils';

// Create Context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [courses, setCourses] = useState([]); 
    const [students, setStudents] = useState([]);
    const logoutTimer = useRef(null);
    const inactivityTimer = useRef(null);

    // Function to check authentication status
    const checkAuthStatus = useCallback(() => {
        const token = localStorage.getItem("jwt");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000; // Current time in seconds

                if (decoded.exp < currentTime) {
                    logout();
                } else {
                    setIsAuthenticated(true);
                    setAutoLogout(decoded.exp - currentTime);
                    startInactivityTimer();
                }
            } catch (error) {
                console.error("Invalid token:", error);
                logout();
            }
        } else {
            setIsAuthenticated(false);
            setCourses([]);
            setStudents([]);
        }
    }, []);

    // Function to fetch courses from API and store in state
    const fetchCourses = useCallback(async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/courses/allCourse`);
            if (response.data && Array.isArray(response.data.courses)) {
                setCourses(response.data.courses);
            }
        } catch (error) {
            console.error("Fetch Courses Error:", error);
        }
    }, []);

    // Function to fetch all admitted students
    const fetchAllStudents = useCallback(async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/admission/getAllAdmitedStudents`);
            const data = await response.json();
        
            if (Array.isArray(data)) {
                setStudents(data);
            } else {
                console.error("Invalid student data format:", data);
                setStudents([]);
            }
        } catch (error) {
            console.error("Fetch Students Error:", error);
            setStudents([]);
        }
    }, []);

    // Function to delete a student
    const deleteStudent = async (studentId) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;

        try {
            await axios.delete(`${BACKEND_URL}/api/admission/deleteAdmitedStudent/${studentId}`);
            setStudents(prevStudents => prevStudents.filter(student => student._id !== studentId));
            console.log("Student deleted successfully!");
        } catch (error) {
            console.error("Delete Student Error:", error);
        }
    };

    // Function to automatically log out when token expires
    const setAutoLogout = (seconds) => {
        if (logoutTimer.current) clearTimeout(logoutTimer.current);

        logoutTimer.current = setTimeout(() => {
            logout();
            alert("Session expired! Please log in again.");
        }, seconds * 1000);
    };

    // Function to check activity and start inactivity timer (2 minutes)
    const startInactivityTimer = () => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);

        inactivityTimer.current = setTimeout(() => {
            logout();
            alert("Logged out due to inactivity.");
        }, 2 * 60 * 1000); // 2 minutes

        document.addEventListener("mousemove", resetInactivityTimer);
        document.addEventListener("keydown", resetInactivityTimer);
        document.addEventListener("click", resetInactivityTimer);
    };

    // Reset inactivity timer on user activity
    const resetInactivityTimer = () => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);

        inactivityTimer.current = setTimeout(() => {
            logout();
            alert("Logged out due to inactivity.");
        }, 2 * 60 * 1000);
    };

    // Remove inactivity listeners on logout
    const clearInactivityListeners = () => {
        document.removeEventListener("mousemove", resetInactivityTimer);
        document.removeEventListener("keydown", resetInactivityTimer);
        document.removeEventListener("click", resetInactivityTimer);
    };

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchCourses();
            fetchAllStudents();
        }
    }, [isAuthenticated]); // Runs only when `isAuthenticated` changes
    
    // Login function
    const login = (token, student) => {
        localStorage.setItem("jwt", token);
        localStorage.setItem("student", JSON.stringify(student));

        try {
            const decoded = jwtDecode(token);
            setIsAuthenticated(true);
            fetchCourses();
            fetchAllStudents();
            setAutoLogout(decoded.exp - Date.now() / 1000);
            startInactivityTimer();
        } catch (error) {
            console.error("Login Error:", error);
            logout();
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("student");
        setIsAuthenticated(false);
        setCourses([]);
        setStudents([]);

        clearInactivityListeners(); // 🔹 Ensure this runs to remove event listeners

        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            setIsAuthenticated,
            login, 
            logout, 
            checkAuthStatus,
            fetchCourses,
            courses,
            fetchAllStudents,
            students,
            deleteStudent // Expose delete function globally
        }}>
            {children}
        </AuthContext.Provider>
    );
};
