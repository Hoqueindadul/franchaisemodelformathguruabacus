import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import { useAuth } from '../../../../../context/AuthProvider';

export default function AllStudents() {
  const { isAuthenticated, students, fetchAllStudents, deleteStudent } = useAuth();
  const [error, setError] = useState('');

  // Function to handle student deletion
  const handleDelete = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await deleteStudent(studentId);  // Call global delete function
      toast.success("Student deleted successfully!");
      fetchAllStudents(); // Refresh student list after deletion
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete student.");
    }
  };

  if (!isAuthenticated) {
    return <p>Please log in to view students.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Students</h2>
      <p>Total Students: {students.length}</p>
      {error && <p className="text-danger">{error}</p>}

      {students.length > 0 ? (
        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>Admission Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.studentName}</td>
                    <td>{student.branch}</td>
                    <td>{student.addmissionDate ? new Date(student.addmissionDate).toLocaleDateString() : "N/A"}</td>
                    <td>
                      <button
                        className="btn btn-link p-0 text-danger mx-3"
                        onClick={() => handleDelete(student._id)}
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
        <p>No students available.</p>
      )}
    </div>
  );
}
