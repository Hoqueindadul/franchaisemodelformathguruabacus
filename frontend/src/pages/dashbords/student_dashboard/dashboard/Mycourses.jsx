import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BACKEND_URL } from '../../../../utils';

export default function EnrolledCourses() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [totalEnrollments, setTotalEnrollments] = useState(0);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllEnrolledCourses = async () => {
            try {
                const response = await axios.get(
                    `${BACKEND_URL}/api/enrollcourse/allenrolledcourse`
                );

                console.log("Fetched Enrollments:", response.data);

                if (Array.isArray(response.data)) {
                    setEnrolledCourses(response.data);
                    setTotalEnrollments(response.data.length);
                } else {
                    setError("API did not return an array.");
                }
            } catch (error) {
                setError("Failed to fetch enrolled courses.");
                console.error("Fetch Error:", error);
            }
        };

        fetchAllEnrolledCourses();
    }, []);

    const handlePayment = (courseId) => {
        navigate(`/payment/${courseId}`); // Redirect to payment page
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">My Enrolled Courses</h2>
            <p>Total Enrollments: {totalEnrollments}</p>
            {error && <p className="text-danger">{error}</p>}

            {enrolledCourses.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th>Course Name</th>
                                <th>Student Name</th>
                                <th>Email</th>
                                <th>Enrollment Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrolledCourses.map((enrollment, index) => (
                                <tr key={enrollment._id}>
                                    <td>{index + 1}</td>
                                    <td>{enrollment.courseId?.courseTitle || "N/A"}</td>
                                    <td>{`${enrollment.studentId?.firstName || "N/A"} ${enrollment.studentId?.lastName || ""}`}</td>
                                    <td>{enrollment.studentId?.email || "N/A"}</td>
                                    <td>{new Date(enrollment.enrolledAt).toLocaleDateString()}</td>
                                    <td>
                                        <button 
                                            className="btn btn-primary" 
                                            onClick={() => handlePayment(enrollment.courseId?._id)}
                                        >
                                            Pay Now
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No enrollments available.</p>
            )}
        </div>
    );
}

