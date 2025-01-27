import React, { useState } from "react";
import { MdOutlineAddCircle, MdDelete } from "react-icons/md";
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

const Sidebar = ({ setActiveTab }) => {
  const [subbarVisibility, setSubbarVisibility] = useState({
    courses: false,
    students: false,
    staff: false,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <nav className="nav-menu p-3 mt-5">
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
                onClick={() => setActiveTab("deletecourse")}
              >
                <MdDelete className="sidebarIcon" /> Delete Courses
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

          {/* Department Tab */}
          <div
            className="sidebartab"
            onClick={() => setActiveTab("department")}
            style={{ cursor: "pointer" }}
          >
            <FaBuilding className="sidebarIcon" />
            <span>Department</span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
