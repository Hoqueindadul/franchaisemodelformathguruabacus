import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { FaFacebook, FaTwitterSquare, FaYoutube, FaInstagram } from "react-icons/fa";
import Header from './Header';
import toast from 'react-hot-toast';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BACKEND_URL } from '../utils';

function NavBar() {
    const { isAuthenticated, setIsAuthenticated } = useAuth(); // Retrieve auth status

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {

        // Clear local storage and update auth state
        localStorage.removeItem("jwt");

        setIsAuthenticated(false);

        toast.success("Logout Successfully");
        setTimeout(() => {
            navigate("/login");
        }, 2000)

    };

    return (
        <>
            <div className="container-fluid">
                <div className="row pt-0 py-3 py-md-2 py-sm-1 top-header align-items-center">
                    {/* Left Column with Phone Number */}
                    <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-start align-items-center mb-2 mb-md-0">
                        <div className="phoneNumber text-nowrap text-center text-md-start">
                            <h6 className="mb-0 text-item">
                                Need Franchise? +91 9735 2338 08
                            </h6>
                        </div>
                    </div>

                    {/* Center Column with Heading */}
                    <div className="col-12 col-md-5 text-center mb-2 mb-md-0">
                        <h5 className="heading-tagline mb-0">
                            🎉 Get Ready for the Abacus Mega Competition! 🎉
                        </h5>
                    </div>

                    {/* Right Column with Social Icons */}
                    <div className="col-6 col-md-2 d-flex justify-content-center align-items-center order-3 order-md-2">
                        <div className="icons">
                            <Link
                                to="https://www.facebook.com/profile.php?id=61566500032820"
                                className="iconimage me-2"
                            >
                                <FaFacebook className="header-social-icon facebook" />
                            </Link>
                            <Link
                                to="https://www.youtube.com/@mathguruabacusho"
                                className="iconimage"
                            >
                                <FaYoutube className="header-social-icon youtube" />
                            </Link>
                        </div>
                    </div>

                    {/* Login Button */}
                    <div className="col-6 col-md-1 d-flex justify-content-end order-4">
                        <div className="login-btn">
                            {isAuthenticated ? (
                                <button
                                    type="button"
                                    className="btn btn-primary fw-semibold login"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link to="/login">
                                    <button
                                        type="button"
                                        className="btn btn-primary fw-semibold login"
                                    >
                                        Login
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {location.pathname === '/' && <Header />}
            <div className="mainabar navbar-container">
                <Navbar expand="xl" className="navbar-custom bg-warning">
                    <Container fluid>
                        <Navbar.Toggle aria-controls="navbarScroll" className='ms-auto' />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="me-auto my-2 my-lg-0 navi" navbarScroll>
                                <Nav.Link as={Link} to="/" className="active mainNavbar">Home</Nav.Link>
                                <Nav.Link as={Link} to="/about" className="mainNavbar">About Us</Nav.Link>
                                <Nav.Link as={Link} to="/whatwedo" className="mainNavbar">What we do</Nav.Link>

                                <NavDropdown title="Courses" className="mainNavbar" id="navbarScrollingDropdown">
                                    <NavDropdown.Item as={Link} to="/abacus">Abacus</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/kids-english">Kids English</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/vedicmath">Vedic Math</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/hand-writing">Handwriting</NavDropdown.Item>
                                </NavDropdown>

                                <Nav.Link as={Link} to="/studycenter" className="mainNavbar">Study Center</Nav.Link>

                                <NavDropdown title="Franchise" className='mainNavbar' id="navbarScrollingDropdown">
                                    <NavDropdown.Item as={Link} to="/benifit">Benefit</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/criteria">Criteria</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/franchise-registraion">Registration</NavDropdown.Item>
                                </NavDropdown>

                                <Nav.Link as={Link} to="/school-tieup" className="mainNavbar">School Tie-up</Nav.Link>

                                <NavDropdown title="Trainer" id="navbarScrollingDropdown">
                                    <NavDropdown.Item as={Link} to="/become-trainer">Become a Trainer</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/trainers">Our Certified Trainer</NavDropdown.Item>
                                </NavDropdown>

                                <Nav.Link as={Link} to="/buymaterials" className="mainNavbar">Buy Materials</Nav.Link>
                                <Nav.Link as={Link} to="/contact" className="mainNavbar">Contact us</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

        </>
    );
}

export default NavBar;
