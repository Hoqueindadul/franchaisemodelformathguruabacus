import React, { useState } from "react";
import { FaBookOpen, FaClock, FaUsers } from "react-icons/fa";
import { FaIndianRupeeSign, FaCodeBranch } from "react-icons/fa6";

import axios from "axios";
import toast from "react-hot-toast";

import { BACKEND_URL } from "../../../../../utils";
import { LOCAL_BACKEND_URL } from "../../../../../local_backend_url";

export default function AddBranch() {
    const [formData, setFormData] = useState({
        courseTitle: "", 
        instructorName: "", 
        duration: "",
        price: "",
        courseLevel: "",
        courseDescription: "",
      });
    
      const [isLoading, setIsLoading] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const resetForm = () => {
        setFormData({
          courseTitle: "",
          instructorName: "",
          duration: "",
          price: "",
          courseLevel: "",
          courseDescription: "",
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if any field is empty before submitting
        for (const key in formData) {
          if (formData[key].trim() === "") {
            toast.error(`Please fill in the ${key} field.`);
            return;
          }
        }
    
        setIsLoading(true);
    
        try {
          console.log("Submitting FormData:", formData); // Debugging: Check data before sending
    
          const response = await axios.post(`${BACKEND_URL}/api/courses/addCourse`, formData, {
            headers: { "Content-Type": "application/json" },
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
                      <FaCodeBranch className="me-2" />
                      <h5 className="mb-0">Add New Branch</h5>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="branchName" className="form-label">
                            Branch Name
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              id="branchName"
                              name="branchName"
                              className="form-control"
                              required
                              value={formData.branchName} 
                              onChange={handleChange}
                            />
                          </div>
                        </div>
        
                        <div className="mb-3">
                          <label htmlFor="branchAddress" className="form-label">
                            Branch Address
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              id="branchAddress"
                              name="branchAddress"
                              className="form-control"
                              required
                              value={formData.branchAddress} 
                              onChange={handleChange}
                              placeholder="e.g., Berhampore"
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-between">
                          <button type="button" className="btn btn-secondary" onClick={resetForm}>
                            Cancel
                          </button>
                          <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? (
                              <div className="spinner-border spinner-border-sm text-light" role="status"></div>
                            ) : (
                              "Add Branch"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    )
}
