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
    FaTimes,
    FaAngleDown,
    FaAngleUp,
    FaFlask,
    FaCalculator,
    FaHistory,
    FaChalkboardTeacher,
    FaUserCog,
    FaDollarSign,
    FaExclamationCircle,
} from 'react-icons/fa';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true); // Default to open sidebar
    const [subbarVisibility, setSubbarVisibility] = useState({
        courses: false,
        students: false,
        staff: false,
        fees: false,
    });

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleSubbar = (section) => {
        setSubbarVisibility((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
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

                <nav className="nav-menu p-3 mt-3">
                    <NavLink to="/dashboard" className={({ isActive }) => `sidebartab sidebarActive${isActive ? 'active' : ''}`}>
                        <FaThLarge className='sidbarIcon'/> <span>Dashboard</span>
                    </NavLink>

                    {/* Courses Section */}
                    <div className="sidebartab " onClick={() => toggleSubbar('courses')} style={{ cursor: 'pointer' }}>
                        <FaBook className="sidebarIcon"/>
                        <span>Courses</span>
                        {subbarVisibility.courses ? <FaAngleUp className="float-end" /> : <FaAngleDown className="float-end" />}
                    </div>
                    {subbarVisibility.courses && (
                        <div className="subbar" style={{ marginLeft: '20px' }}>
                            <NavLink to="/courses/science" className="subbar-link">
                                <FaFlask className="sidebarIcon "/> <span className='subbar-items'>Science</span>
                            </NavLink>
                            <NavLink to="/courses/math" className="subbar-link">
                                <FaCalculator className="sidebarIcon"/> <span className='subbar-items'>Science</span>
                            </NavLink>
                            <NavLink to="/courses/history" className="subbar-link">
                                <FaHistory className="sidebarIcon"/> <span className='subbar-items'>Science</span>
                            </NavLink>
                        </div>
                    )}

                    {/* Students Section */}
                    <div className="sidebartab" onClick={() => toggleSubbar('students')} style={{ cursor: 'pointer' }}>
                        <FaUsers className="sidebarIcon"/>
                        <span>Students</span>
                        {subbarVisibility.students ? <FaAngleUp className="float-end" /> : <FaAngleDown className="float-end" />}
                    </div>
                    {subbarVisibility.students && (
                        <div className="subbar" style={{ marginLeft: '20px' }}>
                            <NavLink to="/students/class-a" className="subbar-link">
                                <FaChalkboardTeacher className="sidebarIcon"/> <span className='subbar-items'>Science</span>
                            </NavLink>
                            <NavLink to="/students/class-b" className="subbar-link">
                                <FaChalkboardTeacher className="sidebarIcon"/> <span className='subbar-items'>Science</span>
                            </NavLink>
                        </div>
                    )}

                    {/* Staff Section */}
                    <div className="sidebartab " onClick={() => toggleSubbar('staff')} style={{ cursor: 'pointer' }}>
                        <FaUserTie className="sidebarIcon"/>
                        <span>Staff</span>
                        {subbarVisibility.staff ? <FaAngleUp className="float-end" /> : <FaAngleDown className="float-end" />}
                    </div>
                    {subbarVisibility.staff && (
                        <div className="subbar" style={{ marginLeft: '20px' }}>
                            <NavLink to="/staff/teachers" className="subbar-link">
                                <FaChalkboardTeacher className="sidebarIcon"/> <span className='subbar-items'>Science</span>
                            </NavLink>
                            <NavLink to="/staff/admin" className="subbar-link">
                                <FaUserCog className="sidebarIcon"/> <span className='subbar-items'>Science</span>
                            </NavLink>
                        </div>
                    )}

                    {/* Fees Section */}
                    <div className="sidebartab " onClick={() => toggleSubbar('fees')} style={{ cursor: 'pointer' }}>
                        <FaMoneyBillWave className="sidebarIcon"/>
                        <span>Fees</span>
                        {subbarVisibility.fees ? <FaAngleUp className="float-end" /> : <FaAngleDown className="float-end" />}
                    </div>
                    {subbarVisibility.fees && (
                        <div className="subbar" style={{ marginLeft: '20px' }}>
                            <NavLink to="/fees/paid" className="subbar-link">
                                <FaDollarSign className="sidebarIcon"/> <span className='subbar-items'>Science</span>
                            </NavLink>
                            <NavLink to="/fees/due" className="subbar-link">
                                <FaExclamationCircle className="sidebarIcon"/><span className='subbar-items'>Science</span>
                            </NavLink>
                        </div>
                    )}

                    <NavLink to="/department" className="sidebartab ">
                        <FaBuilding className="sidebarIcon"/> <span>Department</span>
                    </NavLink>
                    <NavLink to="/holidays" className="sidebartab ">
                        <FaCalendarAlt className="sidebarIcon"/> <span>Holidays</span>
                    </NavLink>
                    <NavLink to="/bonus" className="sidebartab ">
                        <FaGift className="sidebarIcon"/> <span>Bonus Pages</span>
                    </NavLink>
                </nav>
            </div>

            {/* Main Content Area */}
            <div
                className={`main-content ${isOpen ? 'sidebar-open' : ''}`}
                style={{
                    marginLeft: isOpen ? '40px' : '0',
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
