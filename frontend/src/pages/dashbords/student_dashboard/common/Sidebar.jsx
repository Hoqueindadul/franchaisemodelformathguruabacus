import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaThLarge, FaBookOpen, FaChalkboardTeacher, FaBuilding, FaFileDownload, FaHistory } from "react-icons/fa";
import { MdBorderColor } from "react-icons/md";

import { IoPersonAdd } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import toast from "react-hot-toast";
import { useAuth } from "../../../../context/AuthProvider";

const Sidebar = ({ setActiveTab }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("student")) || {};
    const userName = user.firstName|| "Guest";
    const handleLogout = () => {
        logout();
        toast.success("Logout Successfully");
        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setIsSidebarOpen(false);
    };

    return (
        <div>
            {/* Hamburger Menu for Mobile */}
            <button className="hamburger-menu" onClick={() => setIsSidebarOpen((prev) => !prev)}>
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
                    {/* Dashboard */}
                    <div className="sidebartab" onClick={() => handleTabClick("dashboard")} style={{ cursor: "pointer" }}>
                        <FaThLarge className="sidebarIcon" />
                        <span>Dashboard</span>
                    </div>

                    {/* My Courses */}
                    <div className="sidebartab" onClick={() => handleTabClick("myCourses")} style={{ cursor: "pointer" }}>
                        <FaBookOpen className="sidebarIcon" />
                        <span>My Courses</span>
                    </div>

                    {/* Assignments & Exams */}
                    <div className="sidebartab" onClick={() => handleTabClick("downloads")} style={{ cursor: "pointer" }}>
                        <FaFileDownload className="sidebarIcon" />
                        <span>Downloads</span>
                    </div>

                    {/* Payment History */}
                    <div className="sidebartab" onClick={() => handleTabClick("paymentHistory")} style={{ cursor: "pointer" }}>
                        <FaHistory className="sidebarIcon" />
                        <span>Fees History</span>
                    </div>

                    {/* Studymat order and history */}
                    <div className="sidebartab" onClick={() => handleTabClick("studymatOrder")} style={{ cursor: "pointer" }}>
                        <MdBorderColor className="sidebarIcon" />
                        <span>Studymat Order</span>
                    </div>

                    {/* Order History */}
                    <div className="sidebartab" onClick={() => handleTabClick("orderHistory")} style={{ cursor: "pointer" }}>
                        <FaHistory className="sidebarIcon" />
                        <span>Order History</span>
                    </div>
                </nav>

                {/* Logout Button */}
                <button className="btn btn-link text-decoration-none m-auto sidebarLogoutBtn d-flex align-items-center" onClick={handleLogout}>
                    <LuLogOut className="fs-4" strokeWidth={3} />
                    <span className="fs-5 m-2">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;

