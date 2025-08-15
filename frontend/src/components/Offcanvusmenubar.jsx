import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import './Offcanvus.css'; // Custom CSS

const OffcanvasMenu = () => {
  const [show, setShow] = useState(false);

  const toggleMenu = () => setShow(!show);

  return (
    <>
      {/* Hamburger Button */}
      <div className="d-lg-none position-fixed hambargarIcon top end-0 m-3 z-1030">
        <button className="btn btn-warning rounded-circle" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {/* Overlay */}
      <div className={`offcanvas-backdrop ${show ? 'show' : ''}`} onClick={toggleMenu}></div>

      {/* Sidebar */}
      <div className={`offcanvas-menu ${show ? 'open' : ''}`}>
        <div className="d-flex justify-content-between align-items-center px-3 py-3 border-bottom">
          <img src="https://i.ibb.co/bmN4W3k/logo.png" alt="logo" height="40" />
          <button className="btn-close-custom" onClick={toggleMenu}><FaTimes /></button>
        </div>

        <nav className="p-3">
          <ul className="list-unstyled">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/classes">Classes</Link></li>
            <li><Link to="/event">Event</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>

          <hr />

          <div className="contact-info">
            <h6>Contact Info</h6>
            <p><FaMapMarkerAlt className="me-2" />Main Street, Melbourne, Australia</p>
          </div>

          <div className="social-icons d-flex gap-3 mt-3">
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
            <FaYoutube />
          </div>
        </nav>
      </div>
    </>
  );
};

export default OffcanvasMenu;
