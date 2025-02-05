import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BACKEND_URL } from '../../utils';
import { LOCAL_BACKEND_URL } from '../../local_backend_url';

export default function Course_handwritting() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrollmentStatus = async () => {
            if (!isAuthenticated) {
                setLoading(false); // Stop loading if not logged in
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

                const courseTitle = "hanwrtting"; // Match stored title

                const matchedCourse = storedCourses.find(course =>
                    course.courseTittle.toLowerCase().trim() === courseTitle.toLowerCase().trim()
                );

                if (!matchedCourse) {
                    console.error(`Course "${courseTitle}" not found in localStorage.`);
                    return;
                }

                const courseId = matchedCourse._id;

                // Fetch enrolled courses
                const response = await axios.get(
                    `${BACKEND_URL}/api/enrollcourse/enrolled/${studentId}`,
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
                    }
                );

                const enrolledCourses = response.data || [];

                // Check if student is already enrolled
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
            return navigate('/login'); // Redirect to login if not logged in
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
            const courseTitle = "hanwrtting"; // Ensure it matches stored data

            const matchedCourse = storedCourses.find(course =>
                course.courseTittle.toLowerCase().trim() === courseTitle.toLowerCase().trim()
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container mt-5 handwritingCourse">
            <header className="text-center courseHeader mb-5">
                <h1 className="display-4 courseH1">Enhance Your Handwriting with Winaum Learning</h1>
                <p className="lead coursePara">Unlock confidence and brain development through better handwriting.</p>
            </header>

            {/* Benefits Section */}
            <section className="mb-5">
                <h2 className="text-primary">Why Good Handwriting Matters</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item lgi1">✔ Increased confidence and cognitive development</li>
                    <li className="list-group-item lgi2">✔ Enhances academic performance</li>
                    <li className="list-group-item lgi3">✔ Boosts originality and creativity</li>
                    <li className="list-group-item lgi4">✔ Helps students obtain more points</li>
                </ul>
            </section>

            {/* Features Section */}
            <section className="mb-5">
                <h2 className="text-primary">Course Features</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item lgi6">🎓 Live instruction with experienced teachers</li>
                    <li className="list-group-item lgi7">🤝 Personalized attention in small batches</li>
                    <li className="list-group-item lgi8">📜 Certification upon course completion</li>
                </ul>
            </section>

            {/* Call to Action Section */}
            <div className="text-center">
                <h2 className="text-primary">Ready to Improve Your Handwriting?</h2>
                <p>Join Winaum Learning today and discover the joy of writing confidently and creatively!</p>
                <button
                    className="btn handwrittingBtn btn-lg"
                    onClick={handleEnroll}
                    disabled={isEnrolled} 
                >
                    {isEnrolled ? "Already Enrolled" : "Enroll Now"}
                </button>
            </div>
        </div>
    );
}
