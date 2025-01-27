import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../../../../context/AuthProvider";
import toast from 'react-hot-toast';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();  // Use context to access authentication state
    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        // Call logout from context to clear JWT and update state
        logout();

        // Show toast message
        toast.success("Logout Successfully");

        // Redirect to login page after 2 seconds
        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    return (
        <header className="main-header d-flex justify-content-between align-items-center px-3 py-2">
            {/* Right Section */}
            <div className="header-actions d-flex align-items-center ms-auto position-relative">
                {/* Profile Image (Always visible on all devices) */}
                <div className="user-profile ms-3" onClick={toggleDropdown}>
                    <img
                        src="/team-1.jpg"  // Correct path to the image
                        
                        className="avatar rounded-circle bg-warning"
                        style={{ width: '35px', height: '35px' }}
                    />
                </div>

                {/* Profile Dropdown - Mobile/Tablet/Desktop (For All Screens) */}
                {showDropdown && (
                    <div
                        className="dropdown-menu-custom headerDropdown d-flex flex-column align-items-center"
                        
                    >
                        {/* Logout Button */}
                        <Link to="/">
                            <button className="btn btn-link text-decoration-none m-auto dashHeaderBtn">
                                <span>Home</span>
                            </button>
                        </Link>
                        <Link to="">
                            <button className="btn btn-link text-decoration-none m-auto dashHeaderBtn">
                                <span>Profile</span>
                            </button>
                        </Link>
                        <Link to="">
                            <button className="btn btn-link text-decoration-none m-auto dashHeaderBtn" onClick={handleLogout}>
                                <span>Logout</span>
                            </button>
                        </Link>
                        
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
