import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineAddCircle, MdDelete } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";

import {
    FaThLarge,
    FaBook,
    FaBookOpen,
    FaUsers,
    FaChalkboardTeacher,
    FaUserTie,
    FaBuilding,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import toast from "react-hot-toast";// Import toast
import { useAuth } from "../../../../context/AuthProvider";

const Sidebar = ({ setActiveTab }) => {
    const { logout } = useAuth();  // Get logout function from Auth context
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Clear authentication state

        // Show toast message
        toast.success("Logout Successfully");

        // Redirect to login page after 2 seconds
        setTimeout(() => {
            navigate("/"); // Redirect to home page (login)
        }, 2000);
    };

    const [subbarVisibility, setSubbarVisibility] = useState({
        courses: false,
        students: false,
        staff: false,
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("student")) || {};
    const userName = user.firstName || "Guest";  // Default to "Guest" if firstName is null
    console.log(userName);

    const toggleSubbar = (section) => {
        setSubbarVisibility((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    return (
        <div>
            {/* Hamburger Menu for Tablet and Mobile */}
            <button
                className="hamburger-menu"
                onClick={() => setIsSidebarOpen((prev) => !prev)}
            >
                <FiMenu size={24} />
            </button>

            {/* Sidebar */}
            <div
                className={`sidebar ${isSidebarOpen ? "open" : ""}`}
                style={{
                    backgroundColor: "#fff",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100%",
                    zIndex: 1000,
                    overflowX: "hidden",
                    transition: "0.3s",
                }}
            >
                <div className="userNameShow">
                    <h6 className="my-4 mx-3 fs-5">Hi {userName}</h6>
                </div>
                <nav className="nav-menu p-3 mt-1">
                    {/* Dashboard Tab */}
                    <div
                        className="sidebartab"
                        onClick={() => setActiveTab("dashboard")}
                        style={{ cursor: "pointer" }}
                    >
                        <FaThLarge className="sidebarIcon" />
                        <span>Dashboard</span>
                    </div>

                    {/* Courses Section */}
                    <div
                        className="sidebartab"
                        onClick={() => toggleSubbar("courses")}
                        style={{ cursor: "pointer" }}
                    >
                        <FaBook className="sidebarIcon" />
                        <span>Courses</span>
                    </div>
                    {subbarVisibility.courses && (
                        <div className="subbar">
                            <button
                                className="btn btn-link subbar-link"
                                onClick={() => setActiveTab("addcourse")}
                            >
                                <MdOutlineAddCircle className="sidebarIcon" /> Add Courses
                            </button>

                            <button
                                className="btn btn-link subbar-link"
                                onClick={() => setActiveTab("allcourse")}
                            >
                                <FaBookOpen className="sidebarIcon" /> All Courses
                            </button>
                        </div>
                    )}

                    {/* Students Section */}
                    <div
                        className="sidebartab"
                        onClick={() => toggleSubbar("students")}
                        style={{ cursor: "pointer" }}
                    >
                        <FaUsers className="sidebarIcon" />
                        <span>Students</span>
                    </div>
                    {subbarVisibility.students && (
                        <div className="subbar">
                            <button
                                className="btn btn-link subbar-link"
                                onClick={() => setActiveTab("allstudents")}
                            >
                                <FaChalkboardTeacher className="sidebarIcon" /> All Students
                            </button>
                        </div>
                    )}

                    {/* Staff Section */}
                    <div
                        className="sidebartab"
                        onClick={() => toggleSubbar("staff")}
                        style={{ cursor: "pointer" }}
                    >
                        <FaUserTie className="sidebarIcon" />
                        <span>Staff</span>
                    </div>
                    {subbarVisibility.staff && (
                        <div className="subbar">
                            <button
                                className="btn btn-link subbar-link"
                                onClick={() => setActiveTab("addstaff")}
                            >
                                <FaChalkboardTeacher className="sidebarIcon" /> Add Staff
                            </button>
                            <button
                                className="btn btn-link subbar-link"
                                onClick={() => setActiveTab("allstaff")}
                            >
                                <FaUserTie className="sidebarIcon" /> All Staff
                            </button>
                        </div>
                    )}

                    {/* Enrolled student */}
                    <div
                        className="sidebartab"
                        onClick={() => setActiveTab("enrolledStudent")}
                        style={{ cursor: "pointer" }}
                    >
                        <PiStudentBold className="sidebarIcon" />
                        <span>Enrolled Students</span>
                    </div>
                </nav>
                <button
                    className="btn btn-link text-decoration-none m-auto sidebarLogoutBtn d-flex align-items-center"
                    onClick={handleLogout}
                >
                    <LuLogOut className="fs-4" strokeWidth={3} />
                    <span className="fs-5 m-2">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
