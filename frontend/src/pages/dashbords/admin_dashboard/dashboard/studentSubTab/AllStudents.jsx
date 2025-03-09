import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import { useAuth } from '../../../../../context/AuthProvider';

export default function AllStudents() {
  const { students, fetchAllStudents, deleteStudent } = useAuth();
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState('');

  // Fetch students on mount
  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        await fetchAllStudents();
      } catch (error) {
        setError("Failed to load students.");
        console.error("Fetch Students Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, [fetchAllStudents]);

  // Function to handle student deletion
  const handleDelete = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await deleteStudent(studentId);
      toast.success("Student deleted successfully!");
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete student.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Students</h2>

      {error && <p className="text-danger">{error}</p>}
      {loading ? (
        <p>Loading students...</p>
      ) : students.length > 0 ? (
        <>
          <p>Total Students: {students.length}</p>
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
        </>
      ) : (
        <p>No students available.</p>
      )}
    </div>
  );
}
