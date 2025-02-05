import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useAuth } from '../../../../../context/AuthProvider';
import axios from 'axios'; // Ensure axios is imported
import { BACKEND_URL } from '../../../../../utils';

export default function AllCourse() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [totalCourses, setTotalCourses] = useState(0); // Define totalCourses state
  const { isAuthenticated, fetchCourses } = useAuth(); // Use `fetchCourses` from AuthProvider

  useEffect(() => {
    const loadCourses = async () => {
      if (!isAuthenticated) {
        setCourses([]); // Clear courses on logout
        setTotalCourses(0); // Reset total courses to 0
        localStorage.removeItem("courses");
        return;
      }

      try {
        setLoading(true);
        await fetchCourses(); // Fetch courses from AuthProvider
        const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
        setCourses(storedCourses);
        setTotalCourses(storedCourses.length); // Set total courses
      } catch (error) {
        setError('Failed to load course data.');
        console.error('Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses(); // Fetch when `isAuthenticated` changes
  }, [isAuthenticated, fetchCourses]);

  // Function to delete a course
  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/courses/deleteCourse/${courseId}`);

      // Remove from state
      const updatedCourses = courses.filter((course) => course._id !== courseId);
      setCourses(updatedCourses);
      setTotalCourses(updatedCourses.length); // Update total courses count

      // Update `localStorage`
      localStorage.setItem("courses", JSON.stringify(updatedCourses));

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
