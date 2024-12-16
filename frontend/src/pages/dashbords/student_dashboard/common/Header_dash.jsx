import React from 'react';
import { FaSearch, FaEnvelope, FaBell, FaTh, FaBars } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="main-header">
      <div className="header-left">
        <button className="d-lg-none btn btn-link p-0" onClick={toggleSidebar}>
          <FaBars size={20} />
        </button>
        <div className="search-bar">
          <FaSearch className="text-muted" />
          <input type="text" placeholder="Search here..." className="ms-2" />
        </div>
      </div>
      
      <div className="header-actions">
        <button className="header-btn">
          <FaEnvelope size={18} />
          <span className="badge">1</span>
        </button>
        <button className="header-btn">
          <FaBell size={18} />
          <span className="badge">2</span>
        </button>
        <button className="header-btn">
          <FaTh size={18} />
        </button>
        <div className="user-profile">
          <img src="/avatars/profile.jpg" alt="Profile" className="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;