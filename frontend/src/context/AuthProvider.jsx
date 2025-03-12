import React, { createContext, useState, useContext, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BACKEND_URL } from "../utils";

// Create Context
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]); // New state for enrolled courses
    const logoutTimer = useRef(null);
    const inactivityTimer = useRef(null);
    // Check authentication status
    const checkAuthStatus = useCallback(() => {
        const token = localStorage.getItem("jwt");
        const storedUser = localStorage.getItem("student");

        if (token && storedUser) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                    logout();
                } else {
                    setIsAuthenticated(true);
                    setUserRole(JSON.parse(storedUser).role);
                    setAutoLogout(decoded.exp - currentTime);
                    startInactivityTimer();
                }
            } catch (error) {
                console.error("Invalid token:", error);
                logout();
            }
        } else {
            setIsAuthenticated(false);
            setUserRole(null);
            setCourses([]);
            setStudents([]);
            setEnrolledCourses([]);
        }
    }, []);

    // Fetch courses from API
    const fetchCourses = useCallback(async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/courses/allCourse`);
            if (response.data?.courses && Array.isArray(response.data.courses)) {
                setCourses(response.data.courses);
            } else {
                console.error("Invalid course data format:", response.data);
            }
        } catch (error) {
            console.error("Fetch Courses Error:", error);
        }
    }, []);

    // Fetch all students
    const fetchAllStudents = useCallback(async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/admission/getAllAdmitedStudents`);
            if (Array.isArray(response.data)) {
                setStudents(response.data);
            } else {
                console.error("Invalid student data format:", response.data);
                setStudents([]);
            }
        } catch (error) {
            console.error("Fetch Students Error:", error);
            setStudents([]);
        }
    }, []);

    // Fetch enrolled courses for the logged-in user
    const fetchEnrolledCourses = useCallback(async () => {
        const token = localStorage.getItem("jwt");
    
        if (!token) {
            setEnrolledCourses([]);
            return;
        }
    
        try {
            const decoded = jwtDecode(token); // Extract user info from JWT
            const userId = decoded.id; // Ensure this matches the backend user ID field
    
            if (!userId) {
                console.error("User ID missing from token.");
                setEnrolledCourses([]);
                return;
            }
    
            const response = await axios.get(`${BACKEND_URL}/api/enrollment/user-courses/${userId}`);
            
            if (Array.isArray(response.data)) {
                setEnrolledCourses(response.data);
            } else {
                console.error("Invalid enrolled courses data format:", response.data);
                setEnrolledCourses([]);
            }
        } catch (error) {
            console.error("Fetch Enrolled Courses Error:", error);
            setEnrolledCourses([]);
        }
    }, []);
     

    // Delete student
    const deleteStudent = async (studentId) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;

        try {
            await axios.delete(`${BACKEND_URL}/api/admission/deleteAdmitedStudent/${studentId}`);
            setStudents(prevStudents => prevStudents.filter(student => student._id !== studentId));
        } catch (error) {
            console.error("Delete Student Error:", error);
        }
    };

    // Auto logout when token expires
    const setAutoLogout = (seconds) => {
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        logoutTimer.current = setTimeout(() => {
            logout();
            alert("Session expired! Please log in again.");
        }, seconds * 1000);
    };

    // Start inactivity timer (5 min)
    const startInactivityTimer = () => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        inactivityTimer.current = setTimeout(() => {
            logout();
            alert("Logged out due to inactivity.");
        }, 5 * 60 * 1000);

        document.addEventListener("mousemove", resetInactivityTimer);
        document.addEventListener("keydown", resetInactivityTimer);
        document.addEventListener("click", resetInactivityTimer);
    };

    // Reset inactivity timer on activity
    const resetInactivityTimer = () => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        inactivityTimer.current = setTimeout(() => {
            logout();
            alert("Logged out due to inactivity.");
        }, 5 * 60 * 1000);
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
            fetchEnrolledCourses(); // Fetch enrolled courses when authenticated
        }
    }, [isAuthenticated, fetchCourses, fetchAllStudents, fetchEnrolledCourses]);

    // Login function
    const login = (token, student) => {
        localStorage.setItem("jwt", token);
        localStorage.setItem("student", JSON.stringify(student));

        try {
            const decoded = jwtDecode(token);
            setIsAuthenticated(true);
            setUserRole(student.role);
            fetchCourses();
            fetchAllStudents();
            fetchEnrolledCourses(); // Fetch enrolled courses on login
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
        setUserRole(null);
        setCourses([]);
        setStudents([]);
        setEnrolledCourses([]);
        clearInactivityListeners();

        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            userRole, 
            students, 
            courses, 
            enrolledCourses, // Provide enrolled courses to the context
            login, 
            logout, 
            fetchCourses, 
            fetchAllStudents, 
            fetchEnrolledCourses, 
            deleteStudent 
        }}>
            {children}
        </AuthContext.Provider>
    );
};
