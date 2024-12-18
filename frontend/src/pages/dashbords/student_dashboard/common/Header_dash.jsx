import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
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
                        alt="profile"
                        className="avatar rounded-circle"
                        style={{ width: '35px', height: '35px' }}
                    />
                </div>

                {/* Profile Dropdown - Mobile/Tablet/Desktop (For All Screens) */}
                {showDropdown && (
                    <div
                        className="dropdown-menu-custom d-flex flex-column align-items-center p-2"
                        style={{
                            position: 'absolute',
                            top: '150%',
                            right: '0',
                            backgroundColor: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            zIndex: 1000,
                        }}
                    >
                        {/* Logout Button */}
                        <button className="btn btn-link p-0" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
