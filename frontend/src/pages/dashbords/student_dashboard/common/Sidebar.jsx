import React from 'react';
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
  FaTimes
} from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <img src="/logo.png" alt="Weeducate" className="logo" />
        </div>
        <button className="btn btn-link text-white d-lg-none p-0" onClick={toggleSidebar}>
          <FaTimes size={20} />
        </button>
      </div>
      
      <nav className="nav-menu">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FaThLarge /> <span>Dashboard</span>
        </NavLink>
        
        <div className="nav-section">
          <h6 className="nav-header">Weeducate</h6>
          <NavLink to="/professors" className="nav-link">
            <FaUserGraduate /> <span>Professors</span>
          </NavLink>
          <NavLink to="/courses" className="nav-link">
            <FaBook /> <span>Courses</span>
          </NavLink>
          <NavLink to="/students" className="nav-link">
            <FaUsers /> <span>Student</span>
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
  );
};

export default Sidebar;