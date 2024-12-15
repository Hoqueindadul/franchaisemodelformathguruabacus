import { Link } from 'react-router-dom';
import { GoPeople } from "react-icons/go";
import React, { useState } from 'react';


function Home() {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleImageClick = () => {
        setIsPlaying(true); // Show the video and hide the image
    };
    return (
        <>
            <section className="home-section p-60">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Video Section */}
                        <div className="col-md-6 mb-3">
                            <div className="video">
                                {/* Show image until video starts */}
                                {!isPlaying && (
                                    <img
                                        src="/MGA.jpg"
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
                                    <video
                                        className="video-full"
                                        loop
                                        autoPlay
                                        muted
                                        style={{
                                            width: '100%',
                                            height: '200%',
                                            maxHeight: '800vh',
                                        }}
                                    >
                                        <source src="video.mp4" type="video/mp4" />
                                    </video>
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
                            <h2 className="text-center mb-4">Book a Live Class, For Free!</h2>
                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="programSelect">Your Topic of Interest *</label>
                                    <select
                                        className="form-control mt-2 w-100"
                                        id="programSelect"
                                        style={{ backgroundColor: 'white' }}
                                    >
                                        <option className="opt">Select Program</option>
                                        <option className="opt">Abacus</option>
                                        <option className="opt">Kids English</option>
                                        <option className="opt">Vedic Math</option>
                                        <option className="opt">Handwriting</option>
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="nameInput">Name</label>
                                    <input
                                        type="text"
                                        className="form-control mt-2"
                                        id="nameInput"
                                        placeholder="Enter Name"
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="phoneInput">Phone</label>
                                    <div className="input-group mt-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text p-3">+91</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phoneInput"
                                            placeholder="Enter Phone"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="book-btn w-100 mt-3">
                                    Book Free Live Class
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



            {/* Slider end */}

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
                                <h6 className="color-primary about-tittle mb-8">----About Us</h6>
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
                                    <h5 className="mb-4p">Leatest Course</h5>
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

                            {/* About card 3 */}
                            {/* <div className="about_card mb-24">
                                <div className="about_card_icon">
                                    <img src="/star.png" alt="" />
                                </div>
                                <div className="about_card_content">
                                    <h5 className="mb-4p">Leatest Course</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptate necessitatibus, odit voluptatem beatae, labore ex nulla dolores eligendi harum voluptatum dolore ad!</p>
                                </div>
                            </div> */}

                            {/* Learn more button in home page */}
                            <div className="text-end wow fadeInUp animated">
                                <Link to="/about-us" className='educate-btn'>
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
                                    <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.1s" src="/about2.jpg" alt="About 1" />
                                </div>
                                <div className="col-6 text-start">
                                    <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.3s" src="/about2.jpg" style={{ marginTop: '25%' }} alt="About 2" />
                                </div>
                                <div className="col-6 text-end">
                                    <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.5s" src="/about2.jpg" alt="About 3" />
                                </div>
                                <div className="col-6 text-end">
                                    <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.7s" src="/about2.jpg" alt="About 4" />
                                </div>
                            </div>
                        </div>

                        {/* About images */}

                    </div>
                </div>
            </section>

            {/* about area end */}

            {/* Product sliding section start */}
            
            <div class="container">
                <div class="marquee row p-4">
                    <div class="marquee-content d-flex">
                        <div class="marquee-item col-auto">
                            <img src="../material-1.jpeg" class="img-fluid" alt="01" />
                        </div>
                        <div class="marquee-item col-auto">
                            <img src="../material-2.jpeg" class="img-fluid" alt="02" />
                        </div>
                        <div class="marquee-item col-auto">
                            <img src="../material-4.jpeg" class="img-fluid" alt="03" />
                        </div>
                        <div class="marquee-item col-auto">
                            <img src="../material-5.jpeg" class="img-fluid" alt="04" />
                        </div>
                        <div class="marquee-item col-auto">
                            <img src="../material-1.jpeg" class="img-fluid" alt="01" />
                        </div>
                        <div class="marquee-item col-auto">
                            <img src="../material-2.jpeg" class="img-fluid" alt="02" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Product sliding section end*/}

        </>
    )
}

export default Home