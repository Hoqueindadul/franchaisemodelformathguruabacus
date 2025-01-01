import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function About() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            {/* about area start */}

            <section className="py-60">
                <div className="container">
                    <div className="row align-item-center mt-3">
                        <div className='col-lg-6 mb-48 mb-lg-0'>

                            {/* About description start */}

                            <div className='heading mb-16'>
                                <h6 className="color-primary about-tittle mb-8">About Us</h6>
                                <h2>Building a Digital Learning <span className='fm-sec'>Ecosystem</span></h2>
                            </div>
                            <p className="mb-32">
                            "To say that the Abacus tool is merely used to calculate numbers would be a mistake"
                                	Abacus learning is an ancient method of mental mathematics and calculation that originated  in Mesopotamia around 2500 BC . It involves using a physical abacus tool or visualizing one to perform arithmetic calculation, such as addition , Subtraction , multiplication and division .The Abacus and its derivative technique of Mental  Maths cater to the importance of optimizing  the growth of a human brain and its functions . Additionally the child develops confidence, masters arithmetic concepts, and starts enjoying math.

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
                            <div className="about_card mb-24">
                                <div className="about_card_icon">
                                    <img src="/star.png" alt="" />
                                </div>
                                <div className="about_card_content">
                                    <h5 className="mb-4p">Modern Teaching Methods</h5>
                                    <p>We standardize and modernize the teachers' training to ensure the best learning experience.</p>
                                </div>
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

        </>
    )
}
