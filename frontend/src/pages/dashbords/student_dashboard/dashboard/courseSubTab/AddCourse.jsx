import React, { useState } from 'react';
import { FaBookOpen, FaClock, FaDollarSign, FaFileAlt, FaGraduationCap, FaUsers } from 'react-icons/fa';

function App() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    price: '',
    maxStudents: '',
    category: '',
    level: 'beginner'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
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
                  <label htmlFor="title" className="form-label">Course Title</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaBookOpen />
                    </span>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Advanced Web Development"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="instructor" className="form-label">Instructor Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUsers />
                    </span>
                    <input
                      type="text"
                      id="instructor"
                      name="instructor"
                      className="form-control"
                      required
                      value={formData.instructor}
                      onChange={handleChange}
                      placeholder="e.g., John Doe"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="duration" className="form-label">Duration</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaClock />
                    </span>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      className="form-control"
                      required
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="e.g., 8 weeks"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaDollarSign />
                    </span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      className="form-control"
                      required
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="e.g., 299"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="maxStudents" className="form-label">Maximum Students</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUsers />
                    </span>
                    <input
                      type="number"
                      id="maxStudents"
                      name="maxStudents"
                      className="form-control"
                      required
                      value={formData.maxStudents}
                      onChange={handleChange}
                      placeholder="e.g., 30"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="level" className="form-label">Course Level</label>
                  <select
                    id="level"
                    name="level"
                    className="form-select"
                    value={formData.level}
                    onChange={handleChange}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Course Description</label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter a detailed description of the course..."
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary addCoursebtn"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary addCoursebtn"
                  >
                    Create Course
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

export default App;
