import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import {
    FaFacebook,
    FaYoutube,
    FaEnvelope,
    FaMapMarkerAlt,
    FaShoppingCart,
    FaUser
} from 'react-icons/fa';
import { Container, Navbar, Nav, Button, NavDropdown, Dropdown } from 'react-bootstrap';
import toast from 'react-hot-toast';
import OffcanvasMenu from './Offcanvusmenubar';

function NavBar() {
    const { isAuthenticated, logout } = useAuth();
    const [firstInitial, setFirstInitial] = useState('');
    const [username, setUsername] = useState('User');
    const [hoveredDropdown, setHoveredDropdown] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedStudent = JSON.parse(localStorage.getItem("student"));
        if (storedStudent?.firstName) {
            const initial = storedStudent.firstName.charAt(0).toUpperCase();
            setFirstInitial(initial);
            setUsername(initial); // only first capital letter
        } else {
            setFirstInitial('U');
            setUsername('U');
        }
    }, []);



    const handleLogout = () => {
        logout();
        toast.success("Logout Successfully");
        setTimeout(() => navigate("/login"), 2000);
    };

    return (
        <>
            {/* Top Info Bar */}
            <div className="bg-info text-white py-2 d-none d-md-block">
                <Container className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-4">
                        <span><FaMapMarkerAlt className="me-1 text-white" /> 6391 Elgin St. Celina, USA</span>
                        <span><FaEnvelope className="me-1 text-white" /> info@example.com</span>
                    </div>
                    <div className="d-flex align-items-center gap-3 text-white">
                        <span className="me-1">Follow Us On:</span>
                        <Link to="https://www.facebook.com/profile.php?id=61566500032820"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="iconimage me-2"
                        >
                            <FaFacebook className="header-social-icon facebook" />
                        </Link>
                        <Link to="https://www.youtube.com/@mathguruabacusho"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="iconimage"
                        >
                            <FaYoutube className="header-social-icon youtube" />
                        </Link>

                    </div>
                </Container>
            </div>

            {/* Main Navbar */}
            <Navbar expand="lg" bg="white" className="shadow-sm">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            src="https://i.ibb.co/bmN4W3k/logo.png"
                            alt="Logo"
                            style={{ height: '40px' }}
                            className="me-2"
                        />
                        <span className="fw-bold fs-4 text-primary d-none d-sm-inline">Kidsa</span>
                    </Navbar.Brand>

                    {/* Removed default Bootstrap hamburger */}

                    <Navbar.Collapse id="main-navbar">
                        <Nav className="mx-auto">
                            <Nav.Link as={Link} to="/" className='me-4'>Home</Nav.Link>
                            <Nav.Link as={Link} className='me-4' to="/about">About Us</Nav.Link>
                            <Nav.Link as={Link} to="/courses" className='me-4'>Courses</Nav.Link>

                            <NavDropdown
                                title="Franchise"
                                id="pages-dropdown"
                                className='me-4'
                                show={hoveredDropdown === "pages"}
                                onMouseEnter={() => setHoveredDropdown("pages")}
                                onMouseLeave={() => setHoveredDropdown(null)}
                            >
                                <NavDropdown.Item>Benifit</NavDropdown.Item>
                                <NavDropdown.Item>Criteria</NavDropdown.Item>
                                <NavDropdown.Item>Registration</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown
                                title="Trainer"
                                id="blog-dropdown"
                                className='me-4'
                                show={hoveredDropdown === "blog"}
                                onMouseEnter={() => setHoveredDropdown("blog")}
                                onMouseLeave={() => setHoveredDropdown(null)}
                            >
                                <NavDropdown.Item>Become a Trainer</NavDropdown.Item>
                                <NavDropdown.Item>Our Certified Trainer</NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link as={Link} className='me-4' to="/studymaterials">Study materials</Nav.Link>
                            <Nav.Link as={Link} className='me-4' to="/contact">Contact Us</Nav.Link>
                        </Nav>
                        <Link to="/cart"><FaShoppingCart className='addToCartBtn' /></Link>
                        {/* Desktop Right Side */}
                        {!isAuthenticated ? (
                            <div className='d-flex item-center'>

                                <Button
                                    as={Link}
                                    to="/login"
                                    variant="primary"
                                    className="rounded-pill fw-bold ms-3 d-none d-lg-block loginBtn"
                                >
                                    Login
                                </Button>

                            </div>

                        ) : (
                            <Dropdown className="ms-3 d-none d-lg-block">
                                <Dropdown.Toggle
                                    variant="primary"
                                    id="dropdown-user"
                                    className="rounded-pill fw-bold"
                                    style={{ padding: '6px 14px', border: 'none', position: 'relative', right: '70px' }}
                                >
                                    {username.charAt(0).toUpperCase()}
                                </Dropdown.Toggle>

                                <Dropdown.Menu align="end">
                                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </Navbar.Collapse>

                    {/* Mobile User Section */}
                    <div className="d-lg-none d-flex align-items-center gap-2 ms-auto position-relative right-3">
                        <Link to="/cart"><FaShoppingCart className='addToCartBtn d-none' /></Link>
                        {!isAuthenticated ? (
                            <div className='d-flex item-center'>
                                <Link to="/cart"><FaShoppingCart className='addToCartBtn' /></Link>
                                <Button
                                    as={Link}
                                    to="/login"
                                    variant="primary"
                                    className="rounded-pill fw-bold loginBtn mr-2 mr-md-0"
                                    style={{ fontSize: '14px', padding: '6px 14px' }}
                                >
                                    Login
                                </Button>


                            </div>


                        ) : (
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="primary"
                                    id="dropdown-user-mobile"
                                    className="rounded-pill fw-bold afterLoginDropdown"
                                >
                                    {username}
                                </Dropdown.Toggle>

                                <Dropdown.Menu align="end">
                                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}

                        {/* Custom Orange Hamburger */}
                        <OffcanvasMenu />
                    </div>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;
