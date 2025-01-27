import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');  // State to store error message
  const [totalStudents, setTotalStudents] = useState(0);  // State to store total number of students

  useEffect(() => {
    // Fetch student data from the API
    const fetchStudents = async () => {
      try {
        // Replace with your API URL
        const response = await fetch('http://localhost:4000/api/users/all-users');
        const data = await response.json();
        console.log("Fetched Data:", data); // Debugging: Log the full response

        // Ensure data is an array and contains student objects
        if (Array.isArray(data)) {
          console.log("Students Array:", data); // Log the students array
          setStudents(data);  // Set the array of students
          setTotalStudents(data.length); // Set total students count
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

  // Log students data before rendering
  console.log("Students State:", students);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Students</h2>

      {/* Display total student count */}
      <p>Total Students: {totalStudents}</p>

      {/* Display error if any */}
      {error && <p className="text-danger">{error}</p>}

      {/* Render the list of students */}
      {students.length > 0 ? (
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
                <tr key={student._id}> {/* Using _id as the key */}
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.phone}</td>
                  <td>{student.email}</td> 
                  <td>
                    <button className="btn btn-link p-0" onClick={() => console.log("Delete", student._id)}>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No students available.</p>
      )}
    </div>
  );
}
