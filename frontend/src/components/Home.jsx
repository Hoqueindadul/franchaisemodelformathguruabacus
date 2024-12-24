import { Link } from 'react-router-dom';
import { GoPeople } from "react-icons/go";
import React, { useState } from 'react';
import axios from 'axios'
import { BACKEND_URL } from '../utils';
import { LOCAL_BACKEND_URL } from '../local_backend_url';
import toast from 'react-hot-toast';
import { motion } from "framer-motion";
import { Carousel } from "react-bootstrap";

const products = [
    { id: 1, name: "Counting Tool", image: "./material-1.jpg" },
    { id: 2, name: "Bag", image: "./material-2.jpg" },
    { id: 3, name: "T-shirt", image: "./material-3.jpeg" },
    { id: 4, name: "Watch", image: "./material-4.jpeg" },
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
            console.log(formData);

            const response = await axios.post(
                `${BACKEND_URL}/api/users/sendWhatsappMessage`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Include cookies or credentials in the request
                }
            );

            console.log("Message sent successfully:", response.data);
            toast.success("Message sent successfully via WhatsApp!");
            setFormData({
                program: "",
                name: "",
                phone: "",
            });
        } catch (error) {
            console.error("Error sending WhatsApp message:", error.response || error.message);
            toast.error("Failed to send WhatsApp message.");
        } finally {
            setIsSending(false); // Reset the loading state
        }
    };

    return (
        <>
            <section className="home-section p-60">
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
                                    <div style={{ width: '100%', height: '80vh' }}>
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src="https://www.youtube.com/embed/mAmRhpnZlyc?autoplay=1" // Added autoplay parameter
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                                <div className="another-item mt-3 d-flex align-items-center justify-content-center text-center">
                                    <div className="item1 mt-3">
                                        <h2>4+ <p>Courses</p></h2>
                                    </div>
                                    <div className="item1 mt-3">
                                        <h2>10+ <p>Trainer</p></h2>
                                    </div>
                                    <div className="item1 mt-3">
                                        <h2>50+ <p>Learning Module</p></h2>
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

            {/* Product sliding section start */}
            <div className="slider-container">
                <div className="slider_tittle text-center p-4">
                    <span className="slider_section_tittle"> Buy Our Products</span>
                    <p className="line"></p>
                </div>

                <motion.div
                    className="slider"
                    animate={{
                        x: isPaused ? 0 : ["0%", "-100%"], // If paused, keep at 0%
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 25, // Increased duration for slower speed
                        ease: "linear", // Ensures smooth continuous flow
                    }}
                    onMouseEnter={() => setIsPaused(true)} // Stop animation when mouse enters
                    onMouseLeave={() => setIsPaused(false)} // Resume animation when mouse leaves
                >
                    {products.map((product) => (
                        <div className="product-card" key={product.id}>
                            <h6 className="text-center mt-2">{product.name}</h6>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="product-image"
                            />
                            <Link to="/buymaterials"><button className="order-btn">Order Now</button></Link>
                        </div>
                    ))}
                </motion.div>
            </div>
            {/* Product sliding section end*/}
        </>
    );
}

export default Home;
