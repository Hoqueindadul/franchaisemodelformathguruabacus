import React, { useEffect } from 'react';
import { FaBullseye, FaEye, FaPhoneAlt } from 'react-icons/fa';

export default function About() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="about-section position-relative py-5">
            <div className="container">
                <div className="row align-items-center">

                    {/* Left Image */}
                    <div className="col-lg-6 mb-4 mb-lg-0 text-center">
                        <div className="about-image-wrapper position-relative">
                            <img
                                src="/05.webp"
                                alt="About Us"
                                className="img-fluid "
                            />
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="col-lg-6">
                        <h6
                            className="mb-2"
                            style={{
                                fontFamily: "'Pacifico', cursive",
                                fontSize: "1.8rem",
                                color: "#1f68ee", 
                            }}
                        >
                            About Us
                        </h6>

                        <h2 className="fw-bold mb-3">
                            Welcome To MathGuru Abacus <br /> For Your Child
                        </h2>
                        <p className="text-muted mb-4">
                            At MathGuru Abacus, we turn learning into a fun adventure! Through the power of abacus and mental math, we help children build sharp minds, boost confidence, and develop a lifelong love for numbers — all while having fun in a friendly and engaging environment.
                        </p>

                        {/* Features */}
                        <div className="d-flex flex-wrap gap-3 align-item-center mb-4">
                            <div className="about-feature-card text-start">
                                <div className="icon-wrap bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                                    <FaBullseye size={30} className='text-primary' />
                                </div>
                                <h6 className="fw-bold mt-2">Our Mission</h6>
                                <p className="small text-muted mb-0 text-justify">
                                    To spark a love for math in children by making learning fun, creative, and confidence-boosting through the abacus.
                                </p>

                            </div>

                            <div className="about-feature-card text-start">
                                <div className="icon-wrap bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                                    <FaEye size={30} className='text-primary' />
                                </div>
                                <h6 className="fw-bold mt-2">Our Vision</h6>
                                <p className="small text-muted mb-0 text-justify">
                                    To nurture young minds into confident problem-solvers and lifelong learners through engaging math experiences.
                                </p>

                            </div>
                        </div>

                        {/* Founder Info */}
                        <div className="d-flex align-items-center border-top pt-3">
                            <img
                                src="/Support.png"
                                alt="Founder"
                                className="rounded-circle me-3"
                                width="50"
                                height="50"
                            />
                            <div>
                                <h6 className="mb-0">Rabin Saha</h6>
                                <small className="text-muted">Co, Founder</small>
                            </div>
                            <div className="ms-auto d-flex align-items-center">
                                <div className="icon-wrap bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: 40, height: 40 }}>
                                    <FaPhoneAlt size={18} className='text-primary' />
                                </div>
                                <div>
                                    <small className="text-muted">Call Us Now</small>
                                    <div className="fw-bold text-primary">+208-555-0112</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
