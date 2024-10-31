import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

function Contact() {
   
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const onSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        formData.append("access_key", "c27f556b-c59f-4c19-8095-f92e9259a7a7");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            toast.success("Form Submitted Successfully");
            event.target.reset(); // Reset the form
        } else {
            console.log("Error", data);
            toast.error(data.message || "Internal error! Please try again");
        }
    };


    return (
        <>
            <section className="about_page_banner">
                <div className="container h-100">
                    <div className="row h-100 align-items-center justify-content-between">
                        <div className="col-lg-6 col-md-6 text-md-left text-center position-relative">
                            <div className="tittle">
                                <h1 className="display-4">Contact Us</h1>
                                <img src="/tag-2.png" alt="loading" className="position-absolute" style={{ width: '58px', height: '58px', top: '-60px', left: '350px', animation: 'upDown 3s linear infinite alternate' }} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 d-none d-md-block">
                            <div className="educate-tilt">
                                <img src="/page_title.png" alt="Educate Tilt" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* page title banner end */}

            {/* Contact form start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
                        <h1 className="mb-3">Get In Touch</h1>
                        <p>
                            Have a question or need assistance? Our team is ready to support you with any inquiries, feedback, or issues. Reach out through the form below or via our contact details!
                        </p>
                    </div>
                    <div className="bg-light rounded contact-form">
                        <div className="row g-0">
                            <div className="col-lg-6">
                                <div className="h-100 d-flex flex-column justify-content-center p-5">
                                    <p className="mb-4 main-p">We look forward to hearing from you!</p>
                                    <form onSubmit={onSubmit}>
                                        <div className="row g-3">
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input
                                                        type="text"
                                                        className="form-control border-0"
                                                        id="name"
                                                        name="name"
                                                        required
                                                        placeholder="Your Name"
                                                    />
                                                    <label htmlFor="name">Your Name</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input
                                                        type="email"
                                                        className="form-control border-0"
                                                        id="email"
                                                        name="email"
                                                        required
                                                        placeholder="Your Email"
                                                    />
                                                    <label htmlFor="email">Your Email</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating">
                                                    <input
                                                        type="text"
                                                        className="form-control border-0"
                                                        id="subject"
                                                        name="subject"
                                                        required
                                                        placeholder="Subject"
                                                    />
                                                    <label htmlFor="subject">Subject</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating">
                                                    <textarea
                                                        className="form-control border-0"
                                                        placeholder="Leave a message here"
                                                        id="message"
                                                        name="message"
                                                        required
                                                        style={{ height: "100px" }}
                                                    ></textarea>
                                                    <label htmlFor="message">Message</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100 py-3" type="submit">
                                                    Send Message
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 map" style={{ minHeight: "400px" }}>
                                <div className="position-relative h-100">
                                    <iframe
                                        className="position-relative rounded w-100 h-100"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3642.348222672521!2d88.26120430947326!3d24.089246675596257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f97d8263062099%3A0x9d908195cfb76101!2sBerhampore%20Court%20Railway%20Station!5e0!3m2!1sen!2sin!4v1729810966406!5m2!1sen!2sin"
                                        frameBorder="0"
                                        style={{ minHeight: "400px", border: 0 }}
                                        allowFullScreen=""
                                        aria-hidden="false"
                                        tabIndex="0"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact form end */}
        </>
    )
}

export default Contact