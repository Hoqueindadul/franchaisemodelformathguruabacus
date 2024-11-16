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
                    <Link to="/" className='logo'><img src="./logo.png" style={{ width: 75, height: 70 }} alt="logo" /></Link>
                </div>
                <div className="icons">
                    <Link to="https://www.facebook.com/" className="iconimage"> <FaFacebook className='header-sodial-icon' /> </Link>
                    <Link to="https://www.instagram.com/" className="iconimage"> <FaInstagram className='header-sodial-icon' /> </Link>
                    <Link to="https://www.youtube.com/" className="iconimage"> <FaYoutube className='header-sodial-icon' /> </Link>
                    <Link to="https://twitter.com/" className="iconimage"> <FaTwitterSquare className='header-sodial-icon' /> </Link>
                </div>
                <div className="btn">
                    {/* <Link to="/dashboard"><button type="button" className="btn btn-primary pr-5 dash">Dashboard</button></Link> */}
                    <Link to="/login"><button type="button" className="btn btn-primary mx-auto ml-8 login">Login</button></Link>
                </div>
            </div>
            <div className="subhead col justify-content-center">
            <h1>Math Guru Abacus</h1>
            <h5>Regd.under T.M.Act Govt INDIA</h5>
            <h5>ISO 9001:2015 Certified organization</h5>
        </div>
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
                                    <NavDropdown.Item as={Link} to="/abacus">Abacus</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/kidsenglish">
                                        Kids English
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/vedicmath">
                                        Vedic Math
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/handwritting">
                                        Handwritting
                                    </NavDropdown.Item>
                                    {/* <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/action3">
                                        Something else here
                                    </NavDropdown.Item> */}
                                </NavDropdown>
                                <Nav.Link as={Link} to="/studycenter">Study Center</Nav.Link>
                                <NavDropdown title="Franchise" id="navbarScrollingDropdown">
                                    <NavDropdown.Item as={Link} to="/action1">Benifit</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/action2">
                                        Criteria
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/action2">
                                        Registration
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={Link} to="/school-tieup">School Tie-up</Nav.Link>
                                <NavDropdown title="Trainer" id="navbarScrollingDropdown">
                                    <NavDropdown.Item as={Link} to="/action1">Become a Trainer</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/action2">
                                        Our Certified Trainer
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={Link} to="/contact">Buy Materials</Nav.Link>
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