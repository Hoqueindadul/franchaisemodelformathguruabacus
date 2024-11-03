import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';

// icon import
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";




function NavBar() {
    const [show, setShow] = useState(false);

    const toggleDropdown = () => setShow((prev) => !prev);
    return (
        <>
            <div className="head">
                <div className="d-flex cont">
                    {/* <a href="#" className="d-flex align-items-center mr-4">
                        <span className="icon-envelope mr-2"><i class="fa-solid fa-envelope"></i></span>
                        <span className="d-none d-md-inline-block">info@domain.com</span>
                    </a>
                    <a href="#" className="d-flex align-items-center mr-auto">
                        <span className="icon-phone mr-2"><i class="fa-solid fa-phone"></i></span>
                        <span className="d-none d-md-inline-block">+1 234 4567 8910</span>
                    </a> */}
                    <Link to="/" className='logo'><img src="./logo.png" style={{ width: 75, height: 70 }} alt="logo" /></Link>
                </div>
                <div className="icons">
                    <Link to="https://www.facebook.com/" className="iconimage"> <FaFacebook className='header-sodial-icon' /> </Link>
                    <Link to="https://www.instagram.com/" className="iconimage"> <FaInstagram className='header-sodial-icon' /> </Link>
                    <Link to="https://www.youtube.com/" className="iconimage"> <FaYoutube className='header-sodial-icon' /> </Link>
                    <Link to="https://twitter.com/" className="iconimage"> <FaTwitterSquare className='header-sodial-icon' /> </Link>
                </div>
                <div className="btn">
                    <Link to="/dashboard"><button type="button" className="btn btn-primary pr-5 dash">Dashboard</button></Link>
                    <Link to="/login"><button type="button" className="btn btn-primary mx-auto ml-8 login">Login</button></Link>
                </div>
            </div>
            {/* <div className="subhead">
                <h1>Math Guru Abacus</h1>
                <h5>Regd.under T.M.Act Govt INDIA</h5>
                <h5>ISO 9001:2015 Certified organization</h5>
            </div> */}
            <div className="mainabar navbar-container">
                <Navbar expand="lg" className="navbar-custom">
                    <Container fluid>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0 navi"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link as={Link} to="/" className='active'>Home</Nav.Link>
                                <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                                <Nav.Link as={Link} to="/whatwedo">What we do</Nav.Link>
                                <NavDropdown title="Courses" id="navbarScrollingDropdown">
                                    <NavDropdown.Item as={Link} to="/action1">Abacus</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/action2">
                                        Kids English
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/action2">
                                        Vedic Math
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/action2">
                                        Handwritting
                                    </NavDropdown.Item>
                                    {/* <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/action3">
                                        Something else here
                                    </NavDropdown.Item> */}
                                </NavDropdown>
                                <Nav.Link as={Link} to="/link">Study Center</Nav.Link>
                                <NavDropdown title="Franchise" id="navbarScrollingDropdown">
                                    <NavDropdown.Item as={Link} to="/action1">Unit Franchise</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/action2">
                                        city Franchise
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/action2">
                                        Master Franchise
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={Link} to="/link">School Tie-up</Nav.Link>
                                <NavDropdown title="Trainer" id="navbarScrollingDropdown">
                                    <NavDropdown.Item as={Link} to="/action1">Become a Trainer</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/action2">
                                        Our Certified Trainer
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={Link} to="/contact">Contact us</Nav.Link>

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

        </>
    )
}

export default NavBar