import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils"; // Ensure this is correctly set
import { FaAngleRight } from "react-icons/fa6";
import { LOCAL_BACKEND_URL } from "../../local_backend_url";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    phone: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate role before sending request
    const validRoles = ["admin", "franchise", "student"];
    if (!validRoles.includes(formData.role)) {
      toast.error("Invalid role selected.");
      setLoading(false);
      return;
    }

    try {
      console.log("Sending request with:", formData); //Log request data
      const response = await axios.post(`${BACKEND_URL}/api/users/register`, formData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      toast.success(response.data.message || "User registered successfully.");
      localStorage.setItem("firstName", formData.firstName);

      // Reset form fields
      setFormData({
        firstName: "",
        lastName: "",
        role: "",
        phone: "",
        email: "",
        password: "",
      });

      // Redirect after success
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form_page">
      <div className="container studentRegister">
        <div className="row">
          <div className="col-xl-6">
            <div className="form_block">
              <div className="text_block">
                <Link to="/" className="educate_link_btn color-primary h6 mb-48">
                  <FaAngleRight /> Back To Home
                </Link>
                <div className="title">
                  <img src="/mic-speaker.png" alt="speaker icon" className="speaker_icon" />
                  <h2 className="mb-48 reg-heading">Create an account</h2>
                </div>

                <form onSubmit={handleRegister} className="form-validator">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-24">
                        <input
                          type="text"
                          className="form-control p_lg p-3 mt-3"
                          name="firstName"
                          required
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-24">
                        <input
                          type="text"
                          className="form-control p_lg p-3 mt-3"
                          name="lastName"
                          required
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Role Selection */}
                  <div className="mb-24">
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="p_lg w-100 p-3 role mt-3"
                      required
                    >
                      <option value="">Select a Role</option>
                      <option value="admin">Admin</option>
                      <option value="franchise">Franchise</option>
                      <option value="student">Student</option>
                    </select>
                  </div>

                  {/* Phone */}
                  <div className="mb-24">
                    <input
                      type="tel"
                      className="form-control p_lg p-3 mt-3"
                      name="phone"
                      required
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-24">
                    <input
                      type="email"
                      className="form-control p_lg p-3 mt-3"
                      name="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-24 mt-3">
                    <input
                      type="password"
                      className="form-control p_lg p-3"
                      name="password"
                      required
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="b-unstyle educate-btn w-100 mt-3" disabled={loading}>
                    {loading ? <div className="spinner-border text-light" role="status"></div> : "Signup"}
                  </button>
                </form>

                {/* Login Link */}
                <div className="text-end">
                  <h6 className="account">
                    Already have an account? <Link to="/login" className="color-primary">Login</Link>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
