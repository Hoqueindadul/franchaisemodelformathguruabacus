import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

function Home() {
    return (
        <>
            <div className="slider">
                <Carousel>
                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block w-100"
                            src="about1.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Best Online Learning Platform</h3>
                            <p>Make Your Free Account & Get Discounts</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block w-100"
                            src="about2.jpg"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="about3.jpg"
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            {/* Slider end */}

            {/* Features area start */}

            <section className='py-60 feature'>
                <div className="container">
                    <div className="row">

                        {/* First Card */}
                        <div className="col-xl-3 col-sm-6 cd">
                            <div className="feature-card mb-24 mb-xl-0">
                                <div className="feature-icon">
                                    <img src="/Pricing.png" alt="Free Trials Icon" />
                                </div>
                                <div className="feature-content">
                                    <h5 className="mb-8">Free Trials</h5>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatem delectus vitae?</p>
                                    <img src="/feture-bg-shape.png" alt="" className='feature-bg-shape' />
                                </div>
                            </div>
                        </div>

                        {/* second card */}
                        <div className="col-xl-3 col-sm-6" data-wow-delay="200ms">
                            <div className="feature-card mb-24 mb-xl-0">
                                <div className="feature-icon">
                                    <img src="/Quality.png" alt="Free Trials Icon" />
                                </div>
                                <div className="feature-content">
                                    <h5 className="mb-8">Lifetime Access</h5>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatem delectus vitae?</p>
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
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatem delectus vitae?</p>
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
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatem delectus vitae?</p>
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
                                <h6 className="color-primary mb-8">----About Us</h6>
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
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptate necessitatibus, odit voluptatem beatae, labore ex nulla dolores eligendi harum voluptatum dolore ad!</p>
                                </div>
                            </div>

                            {/* About card 2 */}
                            <div className="about_card mb-24">
                                <div className="about_card_icon">
                                    <img src="/WiFi.png" alt="" />
                                </div>
                                <div className="about_card_content">
                                    <h5 className="mb-4p">Leatest Course</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptate necessitatibus, odit voluptatem beatae, labore ex nulla dolores eligendi harum voluptatum dolore ad!</p>
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

        </>
    )
}

export default Home