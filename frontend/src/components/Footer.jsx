import React from 'react'
import { Link } from 'react-router-dom';

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
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni fugit animi at.
                                    </p>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="col-xl-2 col-lg-3 col-sm-6">
                                <div className="footer_widget">
                                    <h5 className="medium-black mb-16">Quick Links</h5>
                                    <ul className="unstyled list">
                                        <li key="link1">
                                            <Link to="#" className='items'><i class="fa-solid fa-chevron-right"></i> Join to Career</Link>
                                        </li>
                                        <li key="link2">
                                            <Link to="#" className='items'><i class="fa-solid fa-chevron-right"></i> Contact Us</Link>
                                        </li>
                                        <li key="link3">
                                            <Link to="#" className='items'><i class="fa-solid fa-chevron-right"></i> About Us</Link>
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
                                            <Link to="#" className="items"><i class="fa-solid fa-chevron-right"></i>Privacy Policy</Link>
                                        </li>
                                        <li key="link5">
                                            <Link to="#" className="items"><i class="fa-solid fa-chevron-right"></i>Terms & Conditions</Link>
                                        </li>
                                        <li key="link6">
                                            <Link to="#" className="items"><i class="fa-solid fa-chevron-right"></i>FAQ</Link>
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
                                            <Link to="#" className="items"><i class="fa-solid fa-chevron-right"></i>Blog</Link>
                                        </li>
                                        <li key="link8">
                                            <Link to="#" className="items"><i class="fa-solid fa-chevron-right"></i>Support</Link>
                                        </li>
                                        <li key="link9">
                                            <Link to="#" className="items"><i class="fa-solid fa-chevron-right"></i>Help Center</Link>
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
                                            <Link to="#" className="items"><i class="fa-solid fa-chevron-right"></i>Careers</Link>
                                        </li>
                                        <li key="link11">
                                            <Link to="#" className="items"><i class="fa-solid fa-chevron-right"></i>Press</Link>
                                        </li>
                                        <li key="link12">
                                            <Link to="#" className="items"><i class="fa-solid fa-chevron-right"></i>Partnerships</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Social Icons and Newsletter Section */}
                        <div className="bottom-row">
                            <ul className="unstyled social_icons_list">
                                <li key="fb">
                                    <Link to="/home" className="iconimage">
                                        <i className="fa-brands fa-facebook"></i>
                                    </Link>
                                </li>
                                <li key="yt">
                                    <Link to="/home" className="iconimage">
                                        <i className="fa-brands fa-youtube"></i>
                                    </Link>
                                </li>
                                <li key="ig">
                                    <Link to="/home" className="iconimage">
                                        <i className="fa-brands fa-instagram"></i>
                                    </Link>
                                </li>
                                <li key="tw">
                                    <Link to="/home" className="iconimage">
                                        <i className="fa-brands fa-twitter"></i>
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