import React, { useState, useEffect } from 'react';
import { MdDelete, MdEdit } from "react-icons/md";
import toast from 'react-hot-toast';
import axios from 'axios';
import { LOCAL_BACKEND_URL } from "../../../../../local_backend_url";
import { BACKEND_URL } from '../../../../../utils';

export default function AllBranches() {
    const [branches, setBranches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [editBranch, setEditBranch] = useState(null);
    const [editForm, setEditForm] = useState({ branchName: '', branchAddress: '' });

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${BACKEND_URL}/api/branches/allbranches`);
            setBranches(response.data.data);
        } catch (error) {
            setError("Failed to load branches.");
            toast.error("Failed to load branches.");
            console.error("Error fetching branches:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (branchId) => {
        if (!window.confirm("Are you sure you want to delete this branch?")) return;

        try {
            await axios.delete(`${BACKEND_URL}/api/branches/deletebranch/${branchId}`);
            setBranches(prev => prev.filter(branch => branch._id !== branchId));
            toast.success("Branch deleted successfully!");
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Failed to delete branch.");
        }
    };

    const openEditModal = (branch) => {
        setEditBranch(branch);
        setEditForm({ branchName: branch.branchName, branchAddress: branch.branchAddress });
    };

    const closeEditModal = () => {
        setEditBranch(null);
        setEditForm({ branchName: '', branchAddress: '' });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${BACKEND_URL}/api/branches/updatebranch/${editBranch._id}`,
                editForm
            );
            setBranches(prev =>
                prev.map(branch =>
                    branch._id === editBranch._id ? response.data.data : branch
                )
            );
            toast.success("Branch updated successfully!");
            closeEditModal();
        } catch (error) {
            console.error("Update Error:", error);
            toast.error("Failed to update branch.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Branches List</h2>

            {error && <p className="text-danger">{error}</p>}
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : branches.length > 0 ? (
                <>
                    <p>Total Branches: {branches.length}</p>
                    <div className="table-container">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Location</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {branches.map((branch) => (
                                        <tr key={branch._id}>
                                            <td>{branch.branchName}</td>
                                            <td>{branch.branchAddress}</td>
                                            <td>
                                                <button
                                                    className="btn btn-link p-0 text-primary mx-3"
                                                    onClick={() => openEditModal(branch)}
                                                >
                                                    <MdEdit size={20} />
                                                </button>
                                                <button
                                                    className="btn btn-link p-0 text-danger mx-3"
                                                    onClick={() => handleDelete(branch._id)}
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
                <p>No branches available.</p>
            )}

            {/* Edit Modal */}
            {editBranch && (
                <div className="modal show d-block d-flex justify-center" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form onSubmit={handleEditSubmit}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Branch</h5>
                                    <button type="button" className="btn-close" onClick={closeEditModal}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="branchName"
                                            value={editForm.branchName}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Location</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="branchAddress"
                                            value={editForm.branchAddress}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeEditModal}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
