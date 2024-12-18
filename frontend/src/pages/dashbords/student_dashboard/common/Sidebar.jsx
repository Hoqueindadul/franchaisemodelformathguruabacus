import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaThLarge, 
  FaUserGraduate, 
  FaBook, 
  FaUsers, 
  FaUserTie,
  FaMoneyBillWave,
  FaBuilding,
  FaCalendarAlt,
  FaGift,
  FaBars, 
  FaTimes
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Default to open sidebar

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger Icon (Visible on all screens) */}
      <button
        className="hamburger-icon btn btn-link text-white"
        onClick={toggleSidebar}>
            <FaBars size={30} />
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar ${isOpen ? 'open' : ''}`}
        style={{
          width: '250px',
          backgroundColor: '#fff',
          color: '#fff',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          zIndex: 1000,
        }}
      >
        <div className="sidebar-header">
          {/* Close button inside sidebar */}
          <button
            className="btn btn-link text-white d-lg-none p-0"
            onClick={toggleSidebar}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="nav-menu">
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <FaThLarge /> <span>Dashboard</span>
          </NavLink>

          <div className="nav-section">
            <NavLink to="/professors" className="nav-link">
              <FaUserGraduate /> <span>Professors</span>
            </NavLink>
            <NavLink to="/courses" className="nav-link">
              <FaBook /> <span>Courses</span>
            </NavLink>
            <NavLink to="/students" className="nav-link">
              <FaUsers /> <span>Students</span>
            </NavLink>
            <NavLink to="/staff" className="nav-link">
              <FaUserTie /> <span>Staff</span>
            </NavLink>
            <NavLink to="/fees" className="nav-link">
              <FaMoneyBillWave /> <span>Fees</span>
            </NavLink>
            <NavLink to="/department" className="nav-link">
              <FaBuilding /> <span>Department</span>
            </NavLink>
            <NavLink to="/holidays" className="nav-link">
              <FaCalendarAlt /> <span>Holidays</span>
            </NavLink>
            <NavLink to="/bonus" className="nav-link">
              <FaGift /> <span>Bonus Pages</span>
            </NavLink>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div
        className={`main-content ${isOpen ? 'sidebar-open' : ''}`}
        style={{
          marginLeft: isOpen ? '200px' : '0',
          transition: 'margin-left 0.3s ease',
          paddingTop: '50px', // adjust header height
        }}
      >
        {/* The rest of your content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
