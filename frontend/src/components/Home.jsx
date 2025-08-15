import { Link } from 'react-router-dom';
import { GoPeople } from "react-icons/go";
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { BACKEND_URL } from '../utils.js';
import { LOCAL_BACKEND_URL } from '../local_backend_url';
import toast from 'react-hot-toast';
import { FaBoxOpen } from "react-icons/fa";
import Hero from './Hero.jsx';
import { FaGraduationCap, FaRocket, FaStar } from 'react-icons/fa';
import Classes from './CoursesSlider.jsx';
import About from '../pages/About.jsx';




function Home() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/products/getAllProducts`);
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else if (Array.isArray(response.data.products)) {
                    setProducts(response.data.products);
                } else {
                    console.error("Unexpected API response:", response.data);
                }
                console.log(products)
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                toast.error("Failed to load products");
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

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
            <section className="home-section">
                <div className="row mb-5">
                    <Hero />
                </div>
                <div className="container">
                    <div className="py-4 text-center">
                        <p className="fw-bold text-primary fs-3">
                            <FaGraduationCap className="me-2" />
                            Start Your Child’s Learning Journey Today –
                            <span className="text-success mx-2">Book a Free Live Class</span>
                            <FaRocket className="ms-2" />
                        </p>
                        <p className="text-secondary fs-5">

                            Interactive courses designed to boost creativity, logic, and confidence.
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3 d-flex" style={{ height: '70vh' }}>
                            <div className="video d-flex flex-column w-100" style={{ height: '100%' }}>

                                {/* Top Half - Video or Thumbnail */}
                                <div style={{ flex: 1 }}>
                                    {!isPlaying ? (
                                        <img
                                            src="/video-thumb.jpg"
                                            alt="Video Placeholder"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                cursor: 'pointer'
                                            }}
                                            onClick={handleImageClick}
                                        />
                                    ) : (
                                        <div className='homeVideo' style={{ height: '100%' }}>
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src="https://www.youtube.com/embed/mAmRhpnZlyc?autoplay=1"
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    )}
                                </div>

                                {/* Bottom Half - Stats */}
                                <div
                                    style={{ flex: 1 }}
                                    className="another-item d-flex align-items-center justify-content-between text-center"
                                >
                                    <div className="item1 mx-5">
                                        <p><span className='count fs-2 fw-bold text-primary'>4+</span><br />Courses</p>
                                    </div>
                                    <div className="item1 mx-5">
                                        <p><span className='count fs-2 fw-bold text-primary'>10+</span><br />Trainer</p>
                                    </div>
                                    <div className="item1 mx-5">
                                        <p><span className='count fs-2 fw-bold text-primary'>50+</span><br />Learning Module</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Form Section */}
                        <div className="col-md-6 form p-4 shadow-sm rounded h-auto">
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

            {/* About area start */}
            <section className='m-4 p-4'>
                <About />
            </section>

            {/* about area end */}


            {/* Classes Slider */}
            <Classes />
            



            {/* Product sliding section start */}
            <div className="container my-4">
                <div className="text-center p-3">
                    <h2>Buy Our Products</h2>
                    <hr className="mx-auto w-25" />
                </div>

                {isLoading ? (
                    <p className="text-center">Loading products...</p>
                ) : (
                    <div className="slider-wrapper">
                        <div className="slider-container">
                            <div className="slide-track d-flex">
                                {products.map((product) => (
                                    <div key={product._id} className="product-card" style={{ width: "250px", height: "350px" }}>
                                        <div className="card text-center border-0 shadow-sm" style={{ width: "100%", height: "100%" }}>

                                            {/* Extract first image from array */}
                                            {product.image.length > 0 && (
                                                <img
                                                    src={product.image[0].url}
                                                    alt={product.name}
                                                    className="card-img-top p-3"
                                                    style={{ height: "200px", objectFit: "cover" }}
                                                />
                                            )}

                                            <div className="card-body">
                                                <div className="productTitle d-flex justify-content-between">
                                                    {/* Use `product.name` instead of `product.title` */}
                                                    <h6 className="card-title mb-0">{product.name}</h6>

                                                </div>
                                                <p className="text-primary fw-bold mb-0 text-start"> ₹{product.price}</p>

                                                {/* Encode image URL properly */}
                                                <Link
                                                    to={`/productDetails/${encodeURIComponent(product.name)}/${encodeURIComponent(product.image[0].url)}/${product.price}`}
                                                    className="btn btn-primary d-flex align-items-center justify-content-center"
                                                >
                                                    <span style={{ fontSize: "1rem" }}>
                                                        <FaBoxOpen className="me-2" />
                                                    </span>
                                                    See Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Product sliding section end*/}
        </>
    );
}

export default Home;

