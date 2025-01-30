// Import necessary dependencies
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const CoursePage = () => {
    const { setIsAuthenticated } = useAuth(); // Get login status
    const navigate = useNavigate();

    // Function to handle enroll button click
    const handleEnroll = () => {
        if (setIsAuthenticated) {
            navigate('/'); // Redirect to dashboard if logged in
        } else {
            toast.success("Please login to your account first");
            setTimeout(() => {
                navigate('/login'); // Redirect to login after 3 seconds
            }, 2000);
        }
    };
    return (
        <div className="container abacusCourse mt-5">
            {/* Header Section */}
            <header className="text-center courseHeader mb-5">
                <h1 className="display-4 courseH1">Welcome to Our Math Enrichment Program</h1>
                <p className="lead coursePara">Empowering young minds with the skills to excel in mathematics and beyond.</p>
            </header>

            {/* Course Objective Section */}
            <section className="mb-5">
                <h2 className="text-primary">Course Objectives</h2>
                <p>Our program is designed to help students:</p>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item lgi1"> <span className='courseIcon'>✔</span>Improve math accuracy and speed</li>
                    <li className="list-group-item lgi2"> <span className='courseIcon'>✔</span>Enhance concentration and focus</li>
                    <li className="list-group-item lgi3"> <span className='courseIcon'>✔</span>Develop problem-solving skills</li>
                    <li className="list-group-item lgi4"> <span className='courseIcon'>✔</span>Boost confidence in math abilities</li>
                    <li className="list-group-item lgi5"> <span className='courseIcon'>✔</span>Prepare for competitive exams and academic success</li>
                </ul>
            </section>

            {/* Course Curriculum Section */}
            <section className="mb-5">
                <h2 className="text-primary">Course Curriculum</h2>
                <p>Our curriculum covers a wide range of topics to ensure comprehensive learning:</p>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item lgi6">🔢 Abacus basics and operations</li>
                    <li className="list-group-item lgi7">🔢 Mental Math Calculations</li>
                    <li className="list-group-item lgi8">🔢 Arithmetic operations</li>
                    <li className="list-group-item lgi9">🔢 Algebra and geometry basics</li>
                    <li className="list-group-item lgi10">🔢 Fraction, decimals, and percentages</li>
                </ul>
            </section>

            {/* Course Structure Section */}
            <section className="mb-5">
                <h2 className="text-primary">Course Structure</h2>
                <p>Our program is structured into five progressive levels:</p>
                <div className="accordion" id="courseStructureAccordion">
                    {/* Basics Section */}
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingBasics">
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseBasics"
                                aria-expanded="true"
                                aria-controls="collapseBasics"
                            >
                                Basics - Level 0,1
                            </button>
                        </h2>
                        <div
                            id="collapseBasics"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingBasics"
                            data-bs-parent="#courseStructureAccordion"
                        >
                            <div className="accordion-body">
                                <strong>Age Group:</strong> Early learners<br />
                                Introduction to finger movements, conception of numbers, and basic assessments.
                            </div>
                        </div>
                    </div>

                    {/* Elementary Section */}
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingElementary">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseElementary"
                                aria-expanded="false"
                                aria-controls="collapseElementary"
                            >
                                Elementary - Level 2,3
                            </button>
                        </h2>
                        <div
                            id="collapseElementary"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingElementary"
                            data-bs-parent="#courseStructureAccordion"
                        >
                            <div className="accordion-body">
                                <strong>Age Group:</strong> Building foundational skills<br />
                                Introduction to the Abacus and basic math concepts.
                            </div>
                        </div>
                    </div>

                    {/* Intermediate Section */}
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingIntermediate">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseIntermediate"
                                aria-expanded="false"
                                aria-controls="collapseIntermediate"
                            >
                                Intermediate - Level 4,5
                            </button>
                        </h2>
                        <div
                            id="collapseIntermediate"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingIntermediate"
                            data-bs-parent="#courseStructureAccordion"
                        >
                            <div className="accordion-body">
                                <strong>Age Group:</strong> Developing expertise<br />
                                Focus on decimals, mixed compliments, and speed mathematics.
                            </div>
                        </div>
                    </div>

                    {/* Higher Section */}
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingHigher">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseHigher"
                                aria-expanded="false"
                                aria-controls="collapseHigher"
                            >
                                Higher - Level 6,7
                            </button>
                        </h2>
                        <div
                            id="collapseHigher"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingHigher"
                            data-bs-parent="#courseStructureAccordion"
                        >
                            <div className="accordion-body">
                                <strong>Age Group:</strong> Advanced learners<br />
                                Introduction to advanced Abacus techniques and applications.
                            </div>
                        </div>
                    </div>

                    {/* Advance Section */}
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingAdvance">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseAdvance"
                                aria-expanded="false"
                                aria-controls="collapseAdvance"
                            >
                                Advance - Level 8
                            </button>
                        </h2>
                        <div
                            id="collapseAdvance"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingAdvance"
                            data-bs-parent="#courseStructureAccordion"
                        >
                            <div className="accordion-body">
                                <strong>Age Group:</strong> Expert learners<br />
                                Master complex problem-solving and expert-level Abacus techniques.
                            </div>
                        </div>
                    </div>
                </div>
                {/* Call to Action Section */}
            
            </section>
            <div className="text-center">
                <h2 className="text-primary">Ready to Improve Your Handwriting?</h2>
                <p>Join Winaum Learning today and discover the joy of writing confidently and creatively!</p>
                <button className="btn handwrittingBtn btn-lg" onClick={handleEnroll}>
                    Enroll Now
                </button>
            </div>
        </div>
    );
};

export default CoursePage;
