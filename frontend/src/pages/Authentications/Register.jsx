import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../../utils';
import { FaAngleRight } from "react-icons/fa6";

export default function Register() {
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);  // Loading state added

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);  // Start loading

        const formData = {
            firstName,
            lastName,
            role,
            phone,
            email,
            password
        };

        try {
            const response = await axios.post(`${BACKEND_URL}/api/users/register`, formData, {
                headers: { "Content-Type": "application/json" }
            });

            toast.success("User registered successfully.");
            localStorage.setItem('firstName', firstName);

            // Reset fields
            setFirstname("");
            setLastname("");
            setEmail("");
            setPassword("");
            setPhone("");
            setRole("");

            // Redirect after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    return (
        <div>
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
                                                        required
                                                        placeholder="First Name"
                                                        value={firstName}
                                                        onChange={(e) => setFirstname(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-24">
                                                    <input
                                                        type="text"
                                                        className="form-control p_lg p-3 mt-3"
                                                        required
                                                        placeholder="Last Name"
                                                        value={lastName}
                                                        onChange={(e) => setLastname(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-24">
                                            <select 
                                                name="role" 
                                                value={role} 
                                                onChange={(e) => setRole(e.target.value)} 
                                                className="p_lg w-100 p-3 role mt-3"
                                                required
                                            >
                                                <option value="">Select a Role</option>
                                                <option value="franchise">Student or Parent</option>
                                                <option value="student">Visitor</option>
                                            </select>
                                        </div>
                                        <div className="mb-24">
                                            <input
                                                type="tel"
                                                className="form-control p_lg p-3 mt-3"
                                                required
                                                placeholder="Phone number"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-24">
                                            <input
                                                type="email"
                                                className="form-control p_lg p-3 mt-3"
                                                required
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-24 mt-3">
                                            <input
                                                type="password"
                                                className="form-control p_lg p-3"
                                                required
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <button 
                                            type="submit" 
                                            className="b-unstyle educate-btn w-100 mt-3"
                                            disabled={loading}  // Disable button when loading
                                        >
                                            {loading ? <div className="spinner-border text-light" role="status"></div> : "Signup"}  
                                        </button>
                                    </form>
                                    <div className="text-end">
                                        <h6 className='account'>
                                            Already have an account? <Link to="/login" className="color-primary">Login</Link>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
