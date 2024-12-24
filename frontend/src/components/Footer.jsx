import React from 'react'
import { Link } from 'react-router-dom';

import { FaAngleRight } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdOutlinePolicy } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";


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
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="col-xl-2 col-lg-3 col-sm-6">
                                <div className="footer_widget">
                                    <h5 className="medium-black mb-16">Quick Links</h5>
                                    <ul className="unstyled list">
                                        <li key="link3">
                                            <Link to="/about" className='items'><FaAngleRight className='text-danger'/> About Us</Link>
                                        </li>
                                        <li key="link2">
                                            <Link to="/contact" className='items'><FaAngleRight className='text-danger'/> Contact Us</Link>
                                        </li>
                                        <li key="link3">
                                            <Link to="/buymaterials" className='items'><FaAngleRight className='text-danger'/> Buy Materials</Link>
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
                                            <Link to="#" className="items" target="_blank"
                                                rel="noopener noreferrer"><FaAngleRight className='text-danger'/> Privacy Policy</Link>
                                        </li>
                                        <li key="link5">
                                            <Link to="#" className="items text-nowrap" target="_blank"
                                                rel="noopener noreferrer"><FaAngleRight className='text-danger'/> Terms & Conditions</Link>
                                        </li>
                                        <li key="link6">
                                            <Link to="#" className="items" target="_blank"
                                                rel="noopener noreferrer"><FaAngleRight className='text-danger'/> FAQ</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Contact us Links */}
                            <div className="col-xl-2 col-lg-3 col-sm-6">
                                <div className="footer_widget">
                                    <h5 className="medium-black mb-16">Socials</h5>
                                    <ul className="unstyled list">
                                        <li key="link10">
                                            <Link to="#" className="items " target="_blank"
                                                rel="noopener noreferrer"><BiLogoGmail className='text-danger'/> rabinsahaknd1@gmail.com</Link>
                                        </li>
                                        <li key="link10">
                                            <Link to="#" className="items"><FaPhoneAlt className='text-warning'/> +91 9735 2338 08</Link>
                                        </li>
                                        <li key="link10">
                                            <Link to="https://www.facebook.com/profile.php?id=61566500032820"           
                                                className="items" 
                                                target="_blank"
                                                rel="noopener noreferrer"><FaFacebook className='text-primary'/> Facebook</Link>
                                        </li>
                                        <li key="link10">
                                            <Link to="https://www.youtube.com/@mathguruabacusho" 
                                                className="items" 
                                                target="_blank"
                                                rel="noopener noreferrer"><FaYoutube className='text-danger'/> Youtube</Link>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="copyright_row d-flex justify-content-center">
                    <p>©2024 MathGuru-Abacus All Rights Reserved.</p>
                </div>
            </footer>

            {/* Footer area End */}

        </>
    )
}

export default Footer