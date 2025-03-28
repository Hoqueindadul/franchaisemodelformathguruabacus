import { Link } from 'react-router-dom';
import { GoPeople } from "react-icons/go";
import React, { useState } from 'react';
import axios from 'axios'
import { BACKEND_URL } from '../utils.js';
import { LOCAL_BACKEND_URL } from '../local_backend_url';
import toast from 'react-hot-toast';
import { motion } from "framer-motion";
import { Carousel } from "react-bootstrap";
import { FaBoxOpen} from "react-icons/fa";


const products = [
    { id: 1, name: "Counting Tool", image: "/material-1.jpg", price: 299 },
    { id: 2, name: "Bag", image: "/material-2.jpg", price: 499 },
    { id: 3, name: "T-shirt", image: "/material-3.jpeg", price: 399 },
    { id: 4, name: "Watch", image: "/material-4.jpeg", price: 599 },
];
function Home() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const duplicatedProducts = [...products, ...products];

    const handleImageClick = () => {
        setIsPlaying(true); // Show the video and hide the image
    };

    const [formData, setFormData] = useState({
        program: "",
        name: "",
        phone: "",
    });
    const [isSending, setIsSending] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        try {
            console.log("Submitting Data:", formData);

            const response = await axios.get(
                `${BACKEND_URL}/api/users/sendWhatsappMessage`,
                {
                    params: {
                        program: formData.program,
                        name: formData.name,
                        phone: formData.phone,
                    },
                    withCredentials: true,
                }
            );

            console.log("Server Response:", response.data);

            // Check success inside the 'response' object
            if (response.data.response.success) {
                toast.success("WhatsApp message sent successfully!");
                setFormData({ program: "", name: "", phone: "" });
                window.scrollTo(0, 0);
            } else {
                console.log("Unexpected Response:", response.data);
                toast.error("Failed to send WhatsApp message");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to send message! try again");
        } finally {
            setIsSending(false);
        }
    };


    return (
        <>
            <section className="home-section p-6">
                <div className="container">
                    <div className="row">
                        {/* Video Section */}
                        <div className="col-md-6 mb-3">
                            <div className="video">
                                {/* Show image until video starts */}
                                {!isPlaying && (
                                    <img
                                        src="/video-thumb.jpg"
                                        alt="Video Placeholder"
                                        style={{
                                            width: '100%',
                                            height: '50vh',
                                            cursor: 'pointer',
                                        }}
                                        onClick={handleImageClick}
                                    />
                                )}

                                {/* Show video when playing */}
                                {isPlaying && (
                                    <div className='homeVideo'>
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src="https://www.youtube.com/embed/mAmRhpnZlyc?autoplay=1" // Added autoplay parameter
                                            title="YouTube video player"
                                            frameBorder="0"
                                            rel="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                                <div className="another-item mt-3 d-flex align-items-center justify-content-center text-center">
                                    <div className="item1 mt-3">
                                        <p><span className='count'>4+</span><br /> Courses</p>
                                    </div>
                                    <div className="item1 mt-3">
                                        <p><span className='count'>10+ </span><br />Trainer</p>
                                    </div>
                                    <div className="item1 mt-3">
                                        <p><span className='count'>50+</span><br />Learning Module</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="col-md-6 form p-4 h-auto">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="programSelect">Your Topic of Interest *</label>
                                    <select
                                        className="form-control mt-2 w-100"
                                        id="program"
                                        value={formData.program}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Program</option>
                                        <option value="Abacus">Abacus</option>
                                        <option value="Kids English">Kids English</option>
                                        <option value="Vedic Math">Vedic Math</option>
                                        <option value="Handwriting">Handwriting</option>
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="nameInput">Name</label>
                                    <input
                                        type="text"
                                        className="form-control mt-2"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter Name"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="phoneInput">Phone</label>
                                    <input
                                        type="text"
                                        className="form-control mt-2"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter Phone"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="book-btn w-100 mt-3"
                                    disabled={isSending} // Disable the button while loading
                                >
                                    {isSending ? "Sending..." : "Book Free Live Class"}
                                </button>
                                <div className="limited-seat mt-3">
                                    <span>
                                        <GoPeople className="ico" /> Limited Seats Left
                                    </span>
                                </div>
                                <div className="haveAccount mt-3">
                                    <span>
                                        Already Have An Account? <Link to="/login">Login</Link>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features area start */}

            <section className='py-6 feature'>
                <div className="container">
                    <div className="row">

                        {/* First Card */}
                        <div className="col-xl-3 col-sm-6">
                            <div className="feature-card mb-24 ">
                                <div className="feature-icon">
                                    <img src="/Pricing.png" alt="Free Trials Icon" />
                                </div>
                                <div className="feature-content">
                                    <h5 className="mb-8">Free Trials</h5>
                                    <p>Explore all the benefits with our exclusive free trial. Sign up now for advanced features, and expert support without any commitment.</p>
                                    <img src="/feture-bg-shape.png" alt="" className='feature-bg-shape' />
                                </div>
                            </div>
                        </div>

                        {/* second card */}
                        <div className="col-xl-3 col-sm-6" data-wow-delay="200ms">
                            <div className="feature-card mb-24 mb-xl-0">
                                <div className="feature-icon">
                                    <img src="/Quality.png" alt="lifetime access icon" />
                                </div>
                                <div className="feature-content">
                                    <h5 className="mb-8">Lifetime Access</h5>
                                    <p>Forever access to all premium features, and Unrestricted benefits for all time, without renewals or additional costs.</p>
                                    <img src="/feture-bg-shape.png" alt="" />
                                </div>
                            </div>
                        </div>

                        {/* third card */}
                        <div className="col-xl-3 col-sm-6" data-wow-delay="200ms">
                            <div className="feature-card mb-24 mb-xl-0">
                                <div className="feature-icon">
                                    <img src="/Check-mark.png" alt="Free Trials Icon" />
                                </div>
                                <div className="feature-content">
                                    <h5 className="mb-8">Best Teachers</h5>
                                    <p>Through our courses, you can get in touch with outstanding teachers who are enthusiastic about teaching.</p>
                                    <img src="/feture-bg-shape.png" alt="" />
                                </div>
                            </div>
                        </div>

                        {/* fourth card */}
                        <div className="col-xl-3 col-sm-6" data-wow-delay="200ms">
                            <div className="feature-card mb-24 mb-xl-0">
                                <div className="feature-icon">
                                    <img src="/Support.png" alt="Free Trials Icon" />
                                </div>
                                <div className="feature-content">
                                    <h5 className="mb-8">24/7 Support</h5>
                                    <p>Our dedicated support team is available here to assist you. Whether you have questions, need guidance, or any issue, drop a message.</p>
                                    <img src="/feture-bg-shape.png" alt="" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* Features area end */}

            {/* About area start */}

            <section className="py-60 about_area">
                <div className="container">
                    <div className="row align-item-center mt-3">
                        <div className='col-lg-6 mb-48 mb-lg-0'>

                            {/* About description start */}

                            <div className='heading mb-16'>
                                <h6 className="color-primary about-tittle mb-8">About Us</h6>
                                <h2>Building a Digital Learning <span className='fm-sec'>Ecosystem</span></h2>
                            </div>
                            <p className="mb-32">
                                Abacus learning, an ancient method of mental mathematics, originated in Mesopotamia around 2500 BC. It involves using a physical or visual abacus tool to perform arithmetic calculations like addition, subtraction, multiplication, and division, optimizing brain growth, developing confidence, and fostering math enjoyment.
                            </p>

                            {/* About description start */}

                            {/* About card 1 */}
                            <div className="about_card mb-24">
                                <div className="about_card_icon">
                                    <img src="/Clock.png" alt="" />
                                </div>
                                <div className="about_card_content">
                                    <h5 className="mb-4p">Latest Course</h5>
                                    <p>Our latest courses are designed to provide an engaging and effective approach to mastering essential mathematical skills for learners of all levels.</p>
                                </div>
                            </div>

                            {/* About card 2 */}
                            <div className="about_card mb-24">
                                <div className="about_card_icon">
                                    <img src="/WiFi.png" alt="" />
                                </div>
                                <div className="about_card_content">
                                    <h5 className="mb-4p">Interactive Learning</h5>
                                    <p>Our unique and extremely interactive approach for the overall mental development of children.</p>
                                </div>
                            </div>

                            {/* Learn more button in home page */}
                            <div className="text-end">
                                <Link to="/about" className='educate-btn'>
                                    <span className='educate-btn_text'>
                                        Learn More..
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* About images */}

                        <div className="col-lg-6">
                            <div className="row g-3 mt-5">
                                <div className="col-6 text-start">
                                    <img className="img-fluid rounded w-100 h-100 wow zoomIn" data-wow-delay="0.1s" src="/img1.jpg" alt="About 1" />
                                </div>
                                <div className="col-6 text-start">
                                    <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.3s" src="/img2.jpg" style={{ marginTop: '25%' }} alt="About 2" />
                                </div>
                                <div className="col-6 text-end">
                                    <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.5s" src="/img3.jpg" alt="About 3" />
                                </div>
                                <div className="col-6 text-end">
                                    <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.7s" src="/img5.jpeg" alt="About 4" />
                                </div>
                            </div>
                        </div>

                        {/* About images */}

                    </div>
                </div>
            </section>

            {/* about area end */}



            {/* Product sliding section start */}
            <div className="container my-4">
                <div className="text-center p-3">
                    <h2>Buy Our Products</h2>
                    <hr className="mx-auto w-25" />
                </div>

                <div className="slider-wrapper">
                    <div className="slider-container">
                        <div className="slide-track d-flex">
                            {products.map((product) => (
                                <div key={product.id} className="product-card" style={{ width: "250px", height: "350px" }}>
                                    <div className="card text-center border-0 shadow-sm" style={{ width: "100%", height: "100%" }}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="card-img-top p-3"
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                        <div className="card-body">
                                            <div className="productTitle d-flex justify-content-between">
                                                <h6 className="card-title mb-0">{product.name}</h6>
                                                <p className="text-primary fw-bold mb-0"> ₹{product.price}</p>
                                            </div>

                                            <Link
                                                to={`/productDetails/${encodeURIComponent(product.name)}/${encodeURIComponent(product.image)}/${product.price}`}
                                                className="btn btn-primary d-flex align-items-center justify-content-center"
                                            >
                                                <span style={{ fontSize: "1rem" }}>
                                                    <FaBoxOpen className="me-2" />
                                                </span>See Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Product sliding section end*/}
        </>
    );
}

export default Home;

