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
                    <div className="col-6 col-md-4 d-flex align-items-center">
                        <div className="phoneNumber text-nowrap">
                            <img src="../new_blink_gif.gif" className="gif  me-2" alt="Blink GIF" />
                            <div className="text">
                                <h6 className="mb-0 text-item">
                                    Need Franchise? <br /> +91 8617848657, <br /> +91 97352333808
                                </h6>
                            </div>
                        </div>
                    </div>

                    {/* Center Column with Heading */}
                    <div className="col-6 col-md-5 text-center my-2 my-md-0">
                        <h5 className="heading-tagline">🎉 Get Ready for the Adacus Mega Competition! 🎉</h5>
                    </div>

                    {/* Right Column with Social Icons */}
                    <div className="col-6 col-md-2 d-flex justify-content-center align-items-center order-3 order-md-2 mt-2 mt-md-0">
                        <div className="icons">
                            <Link to="https://www.facebook.com/" className="iconimage me-2">
                                <FaFacebook className="header-social-icon facebook" />
                            </Link>
                            <Link to="https://www.youtube.com/" className="iconimage">
                                <FaYoutube className="header-social-icon youtube" />
                            </Link>
                        </div>
                    </div>

                    {/* Login Button */}
                    <div className="col-6 col-md-1 d-flex justify-content-end order-4 mt-2 mt-md-0">
                        <div className="login-btn">
                            {isAuthenticated ? (
                                <button
                                    type="button"
                                    className="btn btn-primary login"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link to="/login">
                                    <button type="button" className="btn btn-primary login">
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
                <Navbar expand="xl" className="navbar-custom">
                    <Container fluid>
                        <Navbar.Toggle aria-controls="navbarScroll" className='ms-auto'/>
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="me-auto my-2 my-lg-0 navi" navbarScroll>
                                <Nav.Link as={Link} to="/" className="active">Home</Nav.Link>
                                <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                                <Nav.Link as={Link} to="/whatwedo">What we do</Nav.Link>

                                <NavDropdown title="Courses" id="navbarScrollingDropdown">
                                    <NavDropdown.Item as={Link} to="/abacus">Abacus</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/kidsenglish">Kids English</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/vedicmath">Vedic Math</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/handwritting">Handwriting</NavDropdown.Item>
                                </NavDropdown>

                                <Nav.Link as={Link} to="/studycenter">Study Center</Nav.Link>

                                <NavDropdown title="Franchise" id="navbarScrollingDropdown">
                                    <NavDropdown.Item as={Link} to="/action1">Benefit</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/action2">Criteria</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/action2">Registration</NavDropdown.Item>
                                </NavDropdown>

                                <Nav.Link as={Link} to="/school-tieup">School Tie-up</Nav.Link>

                                <NavDropdown title="Trainer" id="navbarScrollingDropdown">
                                    <NavDropdown.Item as={Link} to="/action1">Become a Trainer</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/action2">Our Certified Trainer</NavDropdown.Item>
                                </NavDropdown>

                                <Nav.Link as={Link} to="/buymaterials">Buy Materials</Nav.Link>
                                <Nav.Link as={Link} to="/contact">Contact us</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

        </>
    );
}

export default NavBar;
