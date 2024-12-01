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
            <div className="head">
                <div className="d-flex cont">
                    <Link to="/" className="logo">
                        <img src="./logo.png" style={{ width: 75, height: 70 }} alt="logo" />
                    </Link>
                </div>
                <div className="icons">
                    <Link to="https://www.facebook.com/" className="iconimage">
                        <FaFacebook className="header-sodial-icon" />
                    </Link>
                    <Link to="https://www.instagram.com/" className="iconimage">
                        <FaInstagram className="header-sodial-icon" />
                    </Link>
                    <Link to="https://www.youtube.com/" className="iconimage">
                        <FaYoutube className="header-sodial-icon" />
                    </Link>
                    <Link to="https://twitter.com/" className="iconimage">
                        <FaTwitterSquare className="header-sodial-icon" />
                    </Link>
                </div>
                <div className="btn">
                    {isAuthenticated ? (
                        <button
                            type="button"
                            className="btn btn-primary mx-auto ml-8 login"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/login">
                            <button
                                type="button"
                                className="btn btn-primary mx-auto ml-8 login"
                            >
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
            {location.pathname === '/' && <Header />}
            <div className="mainabar navbar-container">
                <Navbar expand="lg" className="navbar-custom">
                    <Container fluid>
                        <Navbar.Toggle aria-controls="navbarScroll" />
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
