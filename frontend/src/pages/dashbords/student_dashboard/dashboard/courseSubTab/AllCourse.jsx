import React from 'react';
import { MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useAuth } from '../../../../../context/AuthProvider';
import axios from 'axios';
import { BACKEND_URL } from '../../../../../utils';

export default function AllCourse() {
  const { isAuthenticated, fetchCourses, courses } = useAuth(); // Get courses directly from context

  console.log("Courses:", courses); // Debugging

  // Function to delete a course
  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/courses/deleteCourse/${courseId}`);
      toast.success('Course deleted successfully!');
      fetchCourses(); // Fetch updated course list
    } catch (error) {
      console.error('Delete Error:', error);
      toast.error(error?.response?.data?.message || 'Failed to delete course.');
    }
  };

  if (!isAuthenticated) return <p>You must be logged in to view courses.</p>;
  if (!courses.length) return <p>No courses available.</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Courses</h2>
      <p>Total Courses: {courses.length}</p>

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
                  <td>{course.courseTitle}</td>
                  <td>{course.instructorName || 'Instructor not available'}</td>
                  <td>{course.duration}</td>
                  <td>₹{course.price}</td>
                  <td>{course.courseLevel}</td>
                  <td>
                    <button className="btn btn-link p-0 text-danger" onClick={() => handleDelete(course._id)}>
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
