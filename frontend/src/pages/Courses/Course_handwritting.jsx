import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BACKEND_URL } from '../../utils';

export default function Course_handwriting() {
    const { isAuthenticated, courses } = useAuth();
    const navigate = useNavigate();
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const courseTitle = "Handwritting";

    useEffect(() => {
        if (!isAuthenticated || !courses || courses.length === 0) {
            setLoading(false);
            return;
        }

        const fetchEnrollmentStatus = async () => {
            try {
                const student = JSON.parse(localStorage.getItem('student'));
                if (!student || !student._id) {
                    setLoading(false);
                    return;
                }

                const matchedCourse = courses.find(course => 
                    course.courseTitle?.toLowerCase().trim() === courseTitle.toLowerCase().trim()
                );
                
                if (!matchedCourse) {
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

            const matchedCourse = courses.find(course => 
                course.courseTitle?.toLowerCase().trim() === courseTitle.toLowerCase().trim()
            );

            if (!matchedCourse) {
                toast.error("Course not found.");
                return;
            }

            const requestBody = {
                studentId: student._id,
                courseId: matchedCourse._id,
                courseTitle: matchedCourse.courseTitle,
            };

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

            <section className="mb-5">
                <h2 className="text-primary">Why Good Handwriting Matters</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item lgi1">✔ Increased confidence and cognitive development</li>
                    <li className="list-group-item lgi2">✔ Enhances academic performance</li>
                    <li className="list-group-item lgi3">✔ Boosts originality and creativity</li>
                    <li className="list-group-item lgi4">✔ Helps students obtain more points</li>
                </ul>
            </section>

            <section className="mb-5">
                <h2 className="text-primary">Course Features</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item lgi6">🎓 Live instruction with experienced teachers</li>
                    <li className="list-group-item lgi7">🤝 Personalized attention in small batches</li>
                    <li className="list-group-item lgi8">📜 Certification upon course completion</li>
                </ul>
            </section>

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
