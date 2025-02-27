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
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); // 🔹 Add loading state
    const { setIsAuthenticated, login } = useAuth(); // Access setIsAuthenticated from Auth context
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on component mount
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!role || !email || !password) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsLoading(true); // 🔹 Start loading

        try {
            const { data } = await axios.post(`${BACKEND_URL}/api/users/login`, {
                role,
                email,
                password,
            }, {
                headers: { "Content-Type": "application/json" },
            });
            const token = data.token;
            const student = data.student
            // store login information
            login(token, student)


            setIsAuthenticated(true);

            // show success message
            toast.success(data.message || "User logged in successfully.");

            setEmail("");
            setPassword("");

            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error("Login failed:", error);
            toast.error(error.response?.data?.message || "Failed to log in.");
        } finally {
            setIsLoading(false); // 🔹 Stop loading
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
                                    <div className="mb-24">
                                        <select
                                            name="role"
                                            id="role"
                                            className="p_lg w-100 p-3 role"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            disabled={isLoading} // 🔹 Disable input while loading
                                        >
                                            <option value="">Select a Role</option>
                                            <option value="franchise">Student or Parent</option>
                                            <option value="student">Visitor</option>
                                        </select>
                                    </div>
                                    <div className="mb-24 another">
                                        <input
                                            type="email"
                                            className="form-control p_lg p-3 mt-3"
                                            id="login-email"
                                            name="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={isLoading} // 🔹 Disable input while loading
                                        />
                                    </div>
                                    <div className="mb-24 another">
                                        <input
                                            type="password"
                                            className="form-control p_lg p-3"
                                            id="login-password"
                                            name="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={isLoading} // 🔹 Disable input while loading
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="b-unstyle educate-btn w-100 mb-24"
                                        disabled={isLoading} // 🔹 Disable button while loading
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
