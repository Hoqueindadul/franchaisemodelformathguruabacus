import React from 'react'
import { Link } from 'react-router-dom';

import { FaAngleRight } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";


function Footer() {
    return (
        <>
            {/* Footer area Start */}

            <footer>
                <div className="footer_main py-60">
                    <div className="container footer_container">
                        <div className="row row_footer">
                            {/* Logo and description */}
                            <div className="col-xl-3">
                                <div className="footer_widget">
                                    <Link to="/" className="mb-8 footer_logo">
                                        <img src="/logo.png" alt="" />
                                    </Link>
                                    <p className="description_text">
                                        From zero to hero, no need for speed,
                                        MathGuru Abacus gives you all you need.
                                    </p>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="col-xl-2 col-lg-3 col-sm-6">
                                <div className="footer_widget">
                                    <h5 className="medium-black mb-16">Quick Links</h5>
                                    <ul className="unstyled list">
                                        <li key="link1">
                                            <Link to="#" className='items'><FaAngleRight />
                                                Join to Career</Link>
                                        </li>
                                        <li key="link2">
                                            <Link to="#" className='items'><FaAngleRight /> Contact Us</Link>
                                        </li>
                                        <li key="link3">
                                            <Link to="/about" className='items'><FaAngleRight /> About Us</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Explore Links */}
                            <div className="col-xl-2 col-lg-3 col-sm-6">
                                <div className="footer_widget">
                                    <h5 className="medium-black mb-16">Explore</h5>
                                    <ul className="unstyled list">
                                        <li key="link4">
                                            <Link to="#" className="items"><FaAngleRight /> Privacy Policy</Link>
                                        </li>
                                        <li key="link5">
                                            <Link to="#" className="items"><FaAngleRight /> Terms & Conditions</Link>
                                        </li>
                                        <li key="link6">
                                            <Link to="#" className="items"><FaAngleRight /> FAQ</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Information Links */}
                            <div className="col-xl-2 col-lg-3 col-sm-6">
                                <div className="footer_widget">
                                    <h5 className="medium-black mb-16">Information</h5>
                                    <ul className="unstyled list">
                                        <li key="link7">
                                            <Link to="#" className="items"><FaAngleRight /> Blog</Link>
                                        </li>
                                        <li key="link8">
                                            <Link to="#" className="items"><FaAngleRight /> Support</Link>
                                        </li>
                                        <li key="link9">
                                            <Link to="#" className="items"><FaAngleRight /> Help Center</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Contact us Links */}
                            <div className="col-xl-2 col-lg-3 col-sm-6">
                                <div className="footer_widget">
                                    <h5 className="medium-black mb-16">Contact Us</h5>
                                    <ul className="unstyled list">
                                        <li key="link10">
                                            <Link to="#" className="items"><FaAngleRight /> Careers</Link>
                                        </li>
                                        <li key="link11">
                                            <Link to="#" className="items"><FaAngleRight /> Press</Link>
                                        </li>
                                        <li key="link12">
                                            <Link to="#" className="items"><FaAngleRight /> Partnerships</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Social Icons and Newsletter Section */}
                        <div className="bottom-row">
                            <ul className="unstyled social_icons_list">
                                <li key="fb" className="soci-icon">
                                    <Link to="https://www.facebook.com/" className="footer-iconimage">
                                        <FaFacebook style={{ color: '#2698c3', fontSize: '35px', transition: 'color 0.3s ease' }} />
                                    </Link>
                                </li>
                                <li key="yt" className="soci-icon">
                                    <Link to="https://www.instagram.com/" className="footer-iconimage">
                                        <FaInstagram style={{ color: '#2698c3', fontSize: '35px', transition: 'color 0.3s ease' }} />
                                    </Link>
                                </li>
                                <li key="ig" className="soci-icon">
                                    <Link to="https://www.youtube.com/" className="footer-iconimage">
                                        <FaYoutube style={{ color: '#2698c3', fontSize: '38px', transition: 'color 0.3s ease' }} />
                                    </Link>
                                </li>
                                <li key="tw" className="soci-icon">
                                    <Link to="https://twitter.com/" className="footer-iconimage">
                                        <FaTwitterSquare style={{ color: '#2698c3', fontSize: '33px', transition: 'color 0.3s ease' }} />
                                    </Link>
                                </li>
                            </ul>

                            {/* Newsletter Section */}
                            <div className="col-lg-3 col-md-6">
                                <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Newsletter</h4>
                                <p>Stay updated with our latest news and offers.</p>
                                <div className="position-relative mx-auto" style={{ maxWidth: '400px' }}>
                                    <input className="form-control border-primary w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email" />
                                    <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="copyright_row">
                    <p>©2024 MathGuru-Abacus All Rights Reserved.</p>
                </div>
            </footer>

            {/* Footer area End */}

        </>
    )
}

export default Footer