import React, { useState } from 'react';
import { FaBookOpen, FaClock, FaDollarSign, FaGraduationCap, FaUsers } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

import { BACKEND_URL } from '../../../../../utils';
import { LOCAL_BACKEND_URL } from '../../../../../local_backend_url';

export default function AddCourse() {
  const [formData, setFormData] = useState({
    courseTitle: '', 
    instructorName: '', 
    duration: '',
    price: '',
    courseLevel: '', 
    courseDescription: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      courseTittle: '',
      instractorName: '',
      duration: '',
      price: '',
      courseLevel: '',
      courseDescription: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty before submitting
    for (const key in formData) {
      if (formData[key].trim() === '') {
        toast.error(`Please fill in the ${key} field.`);
        return;
      }
    }

    setIsLoading(true);

    try {
      console.log("Submitting FormData:", formData); // Debugging: Check data before sending

      const response = await axios.post(`${BACKEND_URL}/api/courses/addCourse`, formData, {
        headers: { "Content-Type": "application/json" }
      });
      toast.success("Course added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding course:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to add course");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white d-flex align-items-center">
              <FaGraduationCap className="me-2" />
              <h5 className="mb-0">Add New Course</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="courseTittle" className="form-label">Course Title</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaBookOpen /></span>
                    <input type="text" id="courseTittle" name="courseTittle" className="form-control" required value={formData.courseTittle} onChange={handleChange} placeholder="e.g., Advanced Web Development" />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="instractorName" className="form-label">Instructor Name</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaUsers /></span>
                    <input type="text" id="instractorName" name="instractorName" className="form-control" required value={formData.instractorName} onChange={handleChange} placeholder="e.g., John Doe" />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="duration" className="form-label">Duration</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaClock /></span>
                    <input type="text" id="duration" name="duration" className="form-control" required value={formData.duration} onChange={handleChange} placeholder="e.g., 8 weeks" />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaDollarSign /></span>
                    <input type="number" id="price" name="price" className="form-control" required value={formData.price} onChange={handleChange} placeholder="e.g., 299" />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="courseLevel" className="form-label">Course Level</label>
                  <select id="courseLevel" name="courseLevel" className="form-select" value={formData.courseLevel} onChange={handleChange}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="courseDescription" className="form-label">Course Description</label>
                  <textarea id="courseDescription" name="courseDescription" className="form-control" rows={4} required value={formData.courseDescription} onChange={handleChange} placeholder="Enter a detailed description of the course..." />
                </div>

                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? <div className="spinner-border spinner-border-sm text-light" role="status"></div> : "Create Course"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
