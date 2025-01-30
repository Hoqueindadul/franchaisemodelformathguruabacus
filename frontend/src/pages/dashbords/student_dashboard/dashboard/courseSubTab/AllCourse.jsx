import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';

export default function AllCourse() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [totalCourses, setTotalCourses] = useState(0);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true); // Set loading to true while fetching
        const response = await axios.get('http://localhost:4000/api/courses/allCourse');

        console.log(response.data); // Log the entire response for inspection

        // Check if the API response contains courses data
        if (response.data && Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
          setTotalCourses(response.data.totalCourses);  // Update with totalCourses from response
        } else {
          setError('API did not return an array of courses.');
        }
      } catch (error) {
        setError('Failed to fetch course data.');
        console.error('Fetch Error:', error);
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    fetchCourses();
  }, []);

  // Function to delete a course
  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/courses/deleteCourse/${courseId}`);
      setCourses(courses.filter((course) => course._id !== courseId)); // Remove deleted course from state
      setTotalCourses((prev) => prev - 1); // Update totalCourses after deletion
      toast.success("Course deleted successfully!");
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete course.");
    }
  };

  if (loading) {
    return <p>Loading courses...</p>; // Show loading message while fetching courses
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Courses</h2>
      <p>Total Courses: {totalCourses}</p>
      {error && <p className="text-danger">{error}</p>}

      {courses.length > 0 ? (
        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Instructor</th>
                  <th>Duration</th>
                  <th>Price</th>
                  <th>Level</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td>{course.courseTittle}</td>
                    <td>{course.instractorName || "Instructor not available"}</td> {/* Ensure instructorName is displayed correctly */}
                    <td>{course.duration}</td>
                    <td>${course.price}</td>
                    <td>{course.courseLevel}</td>
                    <td>
                      <button
                        className="btn btn-link p-0 text-danger"
                        onClick={() => handleDelete(course._id)}
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
}
