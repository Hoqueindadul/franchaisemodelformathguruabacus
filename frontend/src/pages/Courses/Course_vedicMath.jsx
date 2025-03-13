import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BACKEND_URL } from '../../utils';

export default function Course_vedicMath() {
    const { isAuthenticated, courses } = useAuth();
    const navigate = useNavigate();
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const courseTitle = "Vedic Math";

    useEffect(() => {
        if (!isAuthenticated || !courses || courses.length === 0) {
            setLoading(false);
            return;
        }

        const fetchEnrollmentStatus = async () => {
            try {
                const studentData = localStorage.getItem('student');
                if (!studentData) {
                    console.error('No valid student found in localStorage.');
                    setLoading(false);
                    return;
                }
                const student = JSON.parse(studentData);
                if (!student._id) {
                    console.error('Invalid student data.');
                    setLoading(false);
                    return;
                }

                const matchedCourse = courses?.find(course => 
                    course?.courseTitle?.toLowerCase().trim() === courseTitle.toLowerCase().trim()
                );
                
                if (!matchedCourse) {
                    console.error('Course not found in useAuth.courses');
                    setLoading(false);
                    return;
                }
                
                const response = await axios.get(
                    `${BACKEND_URL}/api/enrollcourse/enrolled/${student._id}`,
                    { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } }
                );

                const enrolledCourses = response.data || [];
                const alreadyEnrolled = enrolledCourses.some(enrolledCourse => 
                    enrolledCourse.courseId?._id === matchedCourse._id
                );
                setIsEnrolled(alreadyEnrolled);
            } catch (error) {
                console.error("Error checking enrollment status:", error.response?.data || error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollmentStatus();
    }, [isAuthenticated, courses]);

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
            const studentData = localStorage.getItem('student');
            if (!studentData) {
                toast.error("Student data missing. Please log in again.");
                return;
            }
            const student = JSON.parse(studentData);
            if (!student._id) {
                toast.error("Invalid student data. Please log in again.");
                return;
            }

            const matchedCourse = courses?.find(course => 
                course?.courseTitle?.toLowerCase().trim() === courseTitle.toLowerCase().trim()
            );
            
            if (!matchedCourse) {
                toast.error("Course not found.");
                return;
            }

            const requestBody = {
                studentId: student._id || null,
                courseId: matchedCourse?._id || null,
                courseTitle: matchedCourse?.courseTitle || null,
            };

            if (!requestBody.studentId || !requestBody.courseId || !requestBody.courseTitle) {
                toast.error("Enrollment request failed. Missing required fields.");
                return;
            }

            const response = await axios.post(
                `${BACKEND_URL}/api/enrollcourse/enroll`,
                requestBody,
                { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } }
            );

            if (response.data.message === 'Enrollment successful') {
                toast.success("Enrollment request submitted! Visit our center to complete payment.");
                setIsEnrolled(true);
            }
        } catch (error) {
            console.error('Enrollment error:', error.response?.data || error);
            toast.error(error.response?.data?.message || 'Enrollment failed.');
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="container vedicMathCourse mt-5">
            {/* Header Section */}
            <header className="text-center courseHeader mb-5">
                <h1 className="display-4 courseH1">Discover the Power of Vedic Mathematics</h1>
                <p className="lead coursePara">Simplify calculations and enhance mental math skills with ancient techniques.</p>
            </header>

            {/* Introduction Section */}
            <section className="mb-5">
                <h2 className="text-primary">What is Vedic Math?</h2>
                <p>
                    Vedic Maths is a system of mathematics rediscovered from the Vedas by Indian mathematician Jagadguru Shri Bharati Krishna Tirthaji.
                    It includes various techniques aimed at simplifying calculations and enhancing mathematical understanding.
                </p>
            </section>

            {/* Benefits Section */}
            <section className="mb-5">
                <h2 className="text-primary">Benefits of Vedic Mathematics</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item lgi1">✔ Speed and Accuracy</li>
                    <li className="list-group-item lgi3">✔ Simple and Easy to Use</li>
                    <li className="list-group-item lgi4">✔ Systematic Development of Brain</li>
                    <li className="list-group-item lgi5">✔ Develops Creativity</li>
                    <li className="list-group-item lgi6">✔ Improves Memory and Retention</li>
                    <li className="list-group-item lgi7">✔ Improves Concentration</li>
                </ul>
            </section>

            {/* Syllabus Section */}
            {/* Syllabus for Grade 2-5 */}
            <section className="mb-5">
                <h2 className="text-primary">Vedic Math Syllabus for Grade 2-5</h2>
                <div className="row">
                    {/* Foundation Addition */}
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-header addCard text-white">Foundation Addition</div>
                            <div className="card-body">
                                <ul>
                                    <li>Number Sense for Addition</li>
                                    <li>Mental Maths Addition</li>
                                    <li>Rapid Addition- Single to Double-Digit</li>
                                    <li>Rapid Addition- Double to Double-Digit</li>
                                    <li>Rapid Addition- Triple to Triple-Digit</li>
                                    <li>Left to Right Addition</li>
                                    <li>Number Splitting</li>
                                    <li>Adding 10 to Numbers</li>
                                    <li>Basic Word Problems</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Foundation Subtraction */}
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-header subtractCard text-white">Foundation Subtraction</div>
                            <div className="card-body">
                                <ul>
                                    <li>Number Sense for Subtraction</li>
                                    <li>Mental Maths Subtraction</li>
                                    <li>Complement</li>
                                    <li>Subtraction Using Complements</li>
                                    <li>Subtraction of Two-Digit Numbers</li>
                                    <li>Subtraction of Double-Digit Numbers</li>
                                    <li>Subtraction of Triple Digit Numbers</li>
                                    <li>Subtraction using Nikliam</li>
                                    <li>Basic Word Problems</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Foundation Multiplication */}
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-header multiCard text-white">Foundation Multiplication</div>
                            <div className="card-body">
                                <ul>
                                    <li>Introduction of Multiplication</li>
                                    <li>Table of 2-25</li>
                                    <li>Mental Maths Multiplication</li>
                                    <li>Traditional Multiplication</li>
                                    <li>Multiplication with Tricks</li>
                                    <li>Basic Word Problems</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Foundation Division */}
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-header diviCard text-white">Foundation Division</div>
                            <div className="card-body">
                                <ul>
                                    <li>Introduction of Division</li>
                                    <li>Warmup for Division</li>
                                    <li>Traditional Division</li>
                                    <li>Division by 10, 100, or 1000</li>
                                    <li>Mental Maths Division</li>
                                    <li>Basic Word Problems</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Syllabus for Grade 6 and above */}
            <section>
                <h2 className="text-primary">Vedic Math Syllabus for Grade 6 and above</h2>
                <div className="row">
                    {/* Level 1 */}
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-header level1 text-white">Level 1</div>
                            <div className="card-body">
                                <ul>
                                    <li>Number Sense for Addition</li>
                                    <li>Mental Maths Addition</li>
                                    <li>Addition with numbers near 10</li>
                                    <li>Left to Right Addition</li>
                                    <li>Rapid Addition</li>
                                    <li>Number Splitting</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Level 2 */}
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-header level2 text-white">Level 2</div>
                            <div className="card-body">
                                <ul>
                                    <li>Subtraction Warmups</li>
                                    <li>Mental Maths Subtraction</li>
                                    <li>Subtraction using Nikilam</li>
                                    <li>Introduction to Multiplication</li>
                                    <li>Simple Multiplication</li>
                                    <li>Introduction to Division</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Level 3 */}
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-header level3 text-white">Level 3</div>
                            <div className="card-body">
                                <ul>
                                    <li>Multiplication of Two-digit numbers</li>
                                    <li>Multiplication by 11</li>
                                    <li>Multiplication by Base Numbers</li>
                                    <li>Criss-Cross Method</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Level 4 */}
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-header level4 text-white">Level 4</div>
                            <div className="card-body">
                                <ul>
                                    <li>Digital Roots</li>
                                    <li>Divisibility</li>
                                    <li>Fractions</li>
                                    <li>Squares and Cubes</li>
                                    <li>Square and Cube Roots</li>
                                    <li>Division of Double-Digit Numbers</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="text-center mt-4">
                <h2 className="text-primary">Ready to Improve Your Handwriting?</h2>
                <p>Join Winaum Learning today and discover the joy of writing confidently and creatively!</p>
                <button
                    className="btn handwrittingBtn btn-lg"
                    onClick={handleEnroll}
                    disabled={isEnrolled || loading}
                >
                    {loading ? "Checking Enrollment..." : isEnrolled ? "Already Enrolled" : "Enroll Now"}
                </button>
            </div>


        </div>
    )
}
