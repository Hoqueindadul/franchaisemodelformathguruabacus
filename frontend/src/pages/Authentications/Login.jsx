import { useAuth } from '../../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../../utils';
import { LOCAL_BACKEND_URL } from '../../local_backend_url';
import { FaAngleRight } from "react-icons/fa6";

const isProduction = process.env.NODE_ENV === 'production';
const BASE_URL = isProduction ? BACKEND_URL : LOCAL_BACKEND_URL;

export default function Login() {
    const [formData, setFormData] = useState({
        role: "",
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const { setIsAuthenticated, login } = useAuth(); 
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const { role, email, password } = formData;

        if (!role || !email || !password) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsLoading(true); 

        try {
            const { data } = await axios.post(`${BASE_URL}/api/users/login`, formData, {
                headers: { "Content-Type": "application/json" },
            });

            const { token, student } = data;
            login(token, student); // Save token & user info in AuthProvider
            setIsAuthenticated(true);

            toast.success(data.message || "User logged in successfully.");

            setFormData({ role: "", email: "", password: "" });

            
        } catch (error) {
            console.error("Login failed:", error);
            toast.error(error.response?.data?.message || "Failed to log in.");
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="form_page">
            <div className="container studentLogin">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="form_block">
                            <div className="text_block">
                                <Link to="/" className="educate_link_btn color-primary h6 mb-48">
                                    <FaAngleRight /> Back To Home
                                </Link>
                                <div className="title">
                                    <img src="/mic-speaker.png" alt="speaker icon" className="speaker_icon" />
                                    <h2 className="mb-50 login-heading">Login To Your Account</h2>
                                </div>
                                <form onSubmit={handleLogin} className="form-validator">
                                    {/* Role Selection */}
                                    <div className="mb-24">
                                        <select
                                            name="role"
                                            className="p_lg w-100 p-3 role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            required
                                        >
                                            <option value="">Select a Role</option>
                                            <option value="admin">Admin</option>
                                            <option value="franchise">Franchise</option>
                                            <option value="student">Student</option>
                                        </select>
                                    </div>

                                    {/* Email Input */}
                                    <div className="mb-24">
                                        <input
                                            type="email"
                                            className="form-control p_lg p-3 mt-3"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            required
                                        />
                                    </div>

                                    {/* Password Input */}
                                    <div className="mb-24 mt-3">
                                        <input
                                            type="password"
                                            className="form-control p_lg p-3"
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            required
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="b-unstyle educate-btn w-100 mb-24 mt-3"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span>Logging in...</span>
                                                <div className="spinner-border text-light ms-2" role="status"></div>
                                            </>
                                        ) : (
                                            "Login to Account"
                                        )}
                                    </button>
                                </form>

                                {/* Bottom Links */}
                                <div className="bottom-row">
                                    <h6>
                                        Don't have an account? <Link to="/register" className="color-primary">Register</Link>
                                    </h6>
                                    <h6>
                                        <Link to="/forgot-password" className="color-primary">Forgot Password</Link>
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
