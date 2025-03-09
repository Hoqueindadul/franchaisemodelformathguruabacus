import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { useAuth } from '../../../../context/AuthProvider';

const ToppersList = ({ handlePay }) => {
    const { students } = useAuth();

    return (
        <div className="toppers-list">
            <div className="card-header">
                <h3>Students List</h3>
                <button className="btn-icon"><FaEllipsisV /></button>
            </div>
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Branch</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student) => (
                                <tr key={student._id}>
                                    <td>
                                        <div className="user-info">
                                            <span>{student.studentName}</span>
                                        </div>
                                    </td>
                                    <td>{student.branch || 'N/A'}</td>
                                    <td>{student.paymentStatus || 'Unpaid'}</td>
                                    <td>
                                        <button
                                            className="pay-button"
                                            onClick={() => handlePay(student)}
                                            disabled={student.paymentStatus === 'Paid'}
                                        >
                                            {student.paymentStatus === 'Paid' ? 'Paid' : 'Pay'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No students found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ToppersList;