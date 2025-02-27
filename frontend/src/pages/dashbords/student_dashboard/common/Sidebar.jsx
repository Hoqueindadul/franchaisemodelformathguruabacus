import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineAddCircle } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import {
    FaThLarge,
    FaBook,
    FaBookOpen,
    FaUsers,
    FaChalkboardTeacher,
    FaBuilding
} from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { LuGitBranchPlus } from "react-icons/lu";

import toast from "react-hot-toast";
import { useAuth } from "../../../../context/AuthProvider";

const Sidebar = ({ setActiveTab }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [subbarVisibility, setSubbarVisibility] = useState({
        branches: false,
        courses: false,
        students: false,
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("student")) || {};
    const userName = user.firstName || "Guest";

    const handleLogout = () => {
        logout();
        toast.success("Logout Successfully");
        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    const toggleSubbar = (section) => {
        setSubbarVisibility((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setIsSidebarOpen(false);
    };

    return (
        <div>
            {/* Hamburger Menu for Mobile */}
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
                        onClick={() => handleTabClick("dashboard")}
                        style={{ cursor: "pointer" }}
                    >
                        <FaThLarge className="sidebarIcon" />
                        <span>Dashboard</span>
                    </div>

                    {/* Branch Section */}
                    <div
                        className="sidebartab"
                        onClick={() => toggleSubbar("branches")}
                        style={{ cursor: "pointer" }}
                    >
                        <LuGitBranchPlus className="sidebarIcon" />
                        <span>Branch</span>
                    </div>
                    {subbarVisibility.branches && (
                        <div className="subbar">
                            <button
                                className="btn btn-link subbar-link"
                                onClick={() => handleTabClick("addbranch")}
                            >
                                <MdOutlineAddCircle className="sidebarIcon" /> Add Branch
                            </button>

                            <button
                                className="btn btn-link subbar-link"
                                onClick={() => handleTabClick("allbranches")}
                            >
                                <FaBuilding className="sidebarIcon" /> All Branches
                            </button>
                        </div>
                    )}

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
                                onClick={() => handleTabClick("addcourse")}
                            >
                                <MdOutlineAddCircle className="sidebarIcon" /> Add Courses
                            </button>

                            <button
                                className="btn btn-link subbar-link"
                                onClick={() => handleTabClick("allcourse")}
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
                                onClick={() => handleTabClick("studentAdmission")}
                            >
                                <IoPersonAdd className="sidebarIcon flex-nowrap" />Admission Form
                            </button>
                            <button
                                className="btn btn-link subbar-link"
                                onClick={() => handleTabClick("allstudents")}
                            >
                                <FaChalkboardTeacher className="sidebarIcon" /> All Students
                            </button>
                        </div>
                    )}

                    {/* Enrolled Students */}
                    <div
                        className="sidebartab"
                        onClick={() => handleTabClick("enrolledStudent")}
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
