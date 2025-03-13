import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { BACKEND_URL } from "../../utils";
import { LOCAL_BACKEND_URL } from "../../local_backend_url";

const Course_kidsEnglish = () => {
    const { isAuthenticated, courses } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const courseTitle = "Kids English";

    useEffect(() => {
        if (!isAuthenticated || !courses || courses.length === 0) {
            setLoading(false);
            return;
        }

        const fetchEnrollmentStatus = async () => {
            try {
                const studentData = localStorage.getItem("student");
                if (!studentData) {
                    console.error("No student data found in localStorage.");
                    setLoading(false);
                    return;
                }
                
                const student = JSON.parse(studentData);
                if (!student._id) {
                    console.error("Invalid student data.");
                    setLoading(false);
                    return;
                }

                const matchedCourse = courses.find(course => 
                    course.courseTitle?.toLowerCase().trim() === courseTitle.toLowerCase().trim()
                );
                
                if (!matchedCourse) {
                    console.error("Course not found in useAuth.courses");
                    setLoading(false);
                    return;
                }
                
                const response = await axios.get(
                    `${BACKEND_URL}/api/enrollcourse/enrolled/${student._id}`,
                    { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
                );

                const enrolledCourses = response.data || [];
                setIsEnrolled(enrolledCourses.some(enrolledCourse => 
                    enrolledCourse.courseId?._id === matchedCourse._id
                ));
            } catch (error) {
                console.error("Error checking enrollment status:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollmentStatus();
    }, [isAuthenticated, courses]);

    const handleEnroll = async () => {
        if (!isAuthenticated) {
            toast.error("Please log in to enroll.");
            return navigate("/login");
        }

        if (isEnrolled) {
            toast.error("You are already enrolled in this course.");
            return;
        }

        try {
            const studentData = localStorage.getItem("student");
            if (!studentData) {
                toast.error("Student data missing. Please log in again.");
                return;
            }

            const student = JSON.parse(studentData);
            if (!student._id) {
                toast.error("Invalid student data.");
                return;
            }

            const matchedCourse = courses.find(course => 
                course.courseTitle?.toLowerCase().trim() === courseTitle.toLowerCase().trim()
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
                    courseTitle: matchedCourse.courseTitle,
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
                }
            );

            if (response.data.message === "Enrollment successful") {
                toast.success("Enrollment request submitted! Visit our center to complete payment.");
                setIsEnrolled(true);
            }
        } catch (error) {
            console.error("Enrollment error:", error);
            toast.error(error.response?.data?.message || "Enrollment failed.");
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            

            {/* page title banner end */}


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
                        <li className="list-group-item"> <span className='courseIcon'>✔</span>Improve math accuracy and speed</li>
                        <li className="list-group-item"> <span className='courseIcon'>✔</span>Enhance concentration and focus</li>
                        <li className="list-group-item"> <span className='courseIcon'>✔</span>Develop problem-solving skills</li>
                        <li className="list-group-item"> <span className='courseIcon'>✔</span>Boost confidence in math abilities</li>
                        <li className="list-group-item"> <span className='courseIcon'>✔</span>Prepare for competitive exams and academic success</li>
                    </ul>
                </section>

                {/* Course Curriculum Section */}
                <section className="mb-5">
                    <h2 className="text-primary">Course Curriculum</h2>
                    <p>Our curriculum covers a wide range of topics to ensure comprehensive learning:</p>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">🔢 Abacus basics and operations</li>
                        <li className="list-group-item">🔢 Mental Math Calculations</li>
                        <li className="list-group-item">🔢 Arithmetic operations</li>
                        <li className="list-group-item">🔢 Algebra and geometry basics</li>
                        <li className="list-group-item">🔢 Fraction, decimals, and percentages</li>
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

                <div className="text-center mt-4">
                    <h2 className="text-primary">Ready to Enhance Your English Skills?</h2>
                    <p>Join our Kids English course today and gain confidence in communication!</p>
                    <button
                        className="btn handwrittingBtn btn-lg"
                        onClick={handleEnroll}
                        disabled={isEnrolled || loading}
                    >
                        {loading ? "Checking Enrollment..." : isEnrolled ? "Already Enrolled" : "Enroll Now"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Course_kidsEnglish;
