import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const toggleDropdown = (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        setShowDropdown((prev) => !prev);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-container')) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <header className="main-header d-flex align-items-center px-3 py-2 flex-wrap">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="search-bar d-flex align-items-center mx-auto flex-grow-1" style={{ maxWidth: '300px' }}>
                <input
                    type="text"
                    className="form-control searchField w-100"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="btn btn-primary ms-2">
                    <FaSearch />
                </button>
            </form>

            {/* Right Section */}
            <div className="header-actions d-flex align-items-center ms-auto position-relative dropdown-container mt-2 mt-md-0">
                {/* Profile Image - Click anywhere inside to open dropdown */}
                <div 
                    className="user-profile ms-3 rounded-circle bg-warning d-flex align-items-center justify-content-center"
                    onClick={toggleDropdown}
                    style={{
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        position: 'relative'
                    }}
                >
                    <img
                        src="/team-1.jpg"
                        className="avatar rounded-circle"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        alt="User Profile"
                    />
                </div>

                {/* Dropdown Menu */}
                {showDropdown && (
                    <div
                        className="dropdown-menu-custom headerDropdown position-absolute bg-white shadow p-2 rounded"
                        style={{
                            top: '100%',
                            right: 0,
                            minWidth: '100px',
                            zIndex: 1000,
                        }}
                    >
                        <Link to="/" className="dropdown-item text-decoration-none">
                            <button className="btn btn-link text-decoration-none dashHeaderBtn w-100">
                                Home
                            </button>
                        </Link>
                        <Link to="/profile" className="dropdown-item text-decoration-none">
                            <button className="btn btn-link text-decoration-none dashHeaderBtn w-100">
                                Profile
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
