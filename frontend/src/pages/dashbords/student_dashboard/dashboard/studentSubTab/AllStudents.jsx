import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';

import { BACKEND_URL } from '../../../../../utils';
import { LOCAL_BACKEND_URL } from '../../../../../local_backend_url';

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/users/all-users`);
        if (Array.isArray(response.data)) {
          setStudents(response.data);
          setTotalStudents(response.data.length);
        } else {
          setError('API did not return an array.');
        }
      } catch (error) {
        setError('Failed to fetch student data.');
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  // Function to delete a student
  const handleDelete = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/users/delete/${studentId}`);
      setStudents(students.filter((student) => student._id !== studentId));
      setTotalStudents(prev => prev - 1);
      toast.success("Student deleted successfully!");
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete student.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Students</h2>
      <p>Total Students: {totalStudents}</p>
      {error && <p className="text-danger">{error}</p>}

      {students.length > 0 ? (
        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.phone}</td>
                    <td>{student.email}</td>
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
