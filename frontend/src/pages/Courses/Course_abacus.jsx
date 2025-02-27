import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../utils';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CoursePage = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrollmentStatus = async () => {
            if (!isAuthenticated){
                setLoading(false);
                return;
            } 
            
            try {
                const student = JSON.parse(localStorage.getItem('student'));
                if (!student || !student._id) {
                    console.error('No valid student found in localStorage.');
                    return;
                }

                const studentId = student._id;
                const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
                const courseTitle = "Abacus";
                
                const matchedCourse = storedCourses.find(course =>
                    course.courseTitle && course.courseTitle.toLowerCase().trim() === courseTitle.toLowerCase().trim()
                );
                console.log(matchedCourse);
                
                if (!matchedCourse) {
                    console.error('Course not found in localStorage.');
                    return;
                }
                
                const courseId = matchedCourse._id;
                const response = await axios.get(
                    `${BACKEND_URL}/api/enrollcourse/enrolled/${studentId}`,
                    { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } }
                );
                
                const enrolledCourses = response.data || [];
                const alreadyEnrolled = enrolledCourses.some(enrolledCourse =>
                    enrolledCourse.courseId?._id === courseId
                );
                setIsEnrolled(alreadyEnrolled);
            } catch (error) {
                console.error("Error checking enrollment status:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollmentStatus();
    }, [isAuthenticated]);

    const handleEnroll = async () => {
        if (!isAuthenticated) {
            toast.error("Please log in to enroll.");
            return navigate('/login');
        }

        if (isEnrolled) {
            toast.error("You are already enrolled in this course.");
            return;
        }

        try {
            const student = JSON.parse(localStorage.getItem('student'));
            if (!student || !student._id) {
                toast.error("Student data missing. Please log in again.");
                return;
            }

            const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
            const courseTitle = "Abacus";
            const matchedCourse = storedCourses.find(course =>
                course.courseTitle && course.courseTitle.toLowerCase().trim() === courseTitle.toLowerCase().trim()
            );

            if (!matchedCourse) {
                toast.error("Course not found.");
                return;
            }

            const response = await axios.post(
                `${BACKEND_URL}/api/enrollcourse/enroll`,
                {
                    studentId: student._id,
                    courseId: matchedCourse._id,
                    paymentMethod: 'Offline'
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
                }
            );

            if (response.data.message === 'Enrollment successful') {
                toast.success("Enrollment request submitted! Visit our center to complete payment.");
                navigate('/feesForm');
            }
        } catch (error) {
            console.error('Enrollment error:', error);
            toast.error(error.response?.data?.message || 'Enrollment failed.');
        }
    };

    return (
        <div className="container abacusCourse mt-5">
            <header className="text-center courseHeader mb-5">
                <h1 className="display-4 courseH1">Welcome to Our Math Enrichment Program</h1>
                <p className="lead coursePara">Empowering young minds with the skills to excel in mathematics and beyond.</p>
            </header>

            <section className="mb-5">
                <h2 className="text-primary">Course Objectives</h2>
                <p>Our program is designed to help students:</p>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">✔ Improve math accuracy and speed</li>
                    <li className="list-group-item">✔ Enhance concentration and focus</li>
                    <li className="list-group-item">✔ Develop problem-solving skills</li>
                    <li className="list-group-item">✔ Boost confidence in math abilities</li>
                    <li className="list-group-item">✔ Prepare for competitive exams and academic success</li>
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
            </section>

            {/* syllabus section */}
            <section className="mb-5">
                <h2 className="text-primary">Course Syllabus</h2>
                <div className="card p-4 shadow">
                    <p><strong>Abacus JUNIOR (4 Levels, 12 months, Age: 4-5 years):</strong></p>
                    <ul>
                        <li>Alphabet & Numbers</li>
                        <li>Basic Addition & Subtraction</li>
                        <li>Forming Words</li>
                        <li>Play-based Learning</li>
                    </ul>
                    <p><strong>Abacus BASIC (8 Levels, 24 months, Age: 6-15 years):</strong></p>
                    <ul>
                        <li>Addition, Subtraction, Multiplication, Division</li>
                        <li>Percentage (%), Simplification</li>
                        <li>Square, Square Root, Cube, Cube Root</li>
                        <li>HCF & LCM</li>
                    </ul>
                    <p><strong>Extra Curriculum (Not included in Basic Program):</strong></p>
                    <ul>
                        <li>Equation of Vector</li>
                        <li>Logarithm</li>
                    </ul>
                </div>
            </section>
            
            <section className="mb-5">
                <h2 className="text-primary">Fees Structure</h2>
                <div className="card p-4 shadow">
                    <p><strong>Abacus JUNIOR:</strong></p>
                    <ul>
                        <li>Registration: ₹500 (one-time)</li>
                        <li>Tuition Fee: ₹200 per month</li>
                    </ul>
                    <p><strong>Abacus BASIC:</strong></p>
                    <ul>
                        <li>Registration: ₹700 (one-time)</li>
                        <li>Tuition Fee: ₹300 per month</li>
                    </ul>
                    <p><strong>Abacus Extra Curriculum:</strong></p>
                    <ul>
                        <li>Registration: NIL</li>
                        <li>Tuition Fee: ₹700 per month</li>
                    </ul>
                </div>
            </section>

            {/* call to action button  */}
            <div className="text-center">
                <h2 className="text-primary">Ready to Improve Your Math Skills?</h2>
                <p>Join Winaum Learning today and discover the joy of mathematics!</p>
                <button
                    className="btn handwrittingBtn btn-lg"
                    onClick={handleEnroll}
                    disabled={isEnrolled || loading}
                >
                    {loading ? "Checking Enrollment..." : isEnrolled ? "Already Enrolled" : "Enroll Now"}
                </button>
            </div>
        </div>
    );
};

export default CoursePage;
