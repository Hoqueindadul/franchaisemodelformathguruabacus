
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../utils';
import { LOCAL_BACKEND_URL } from '../local_backend_url';
import { FaAngleRight } from "react-icons/fa6";


export default function Register() {

    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleRegister = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('firstName', firstName)
        formData.append('lastName', lastName)
        formData.append('role', role)
        formData.append('phone', phone)
        formData.append('email', email)
        formData.append('password', password)
        
        

        try {
            const response = await axios.post(`${BACKEND_URL}/api/users/register`, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            toast.success("User register successfully.")
            console.log(response.data);
            
            
            setFirstname("")
            setLastname("")
            setEmail("")
            setPassword("")

            setTimeout(() => {
                navigate('/login')
            }, 2000);

        } catch (error) {
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message); // Show error message from backend
            } else {
                toast.error("An unexpected error occurred. Please try again."); // Fallback error message
            }

        }
    }

    return (
        <div>
            <div className="form_page">
                <div className="container">
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
                                                        id="first-name"
                                                        name="firstName"
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
                                                        id="last-name"
                                                        name="lastName"
                                                        required
                                                        placeholder="Last Name"
                                                        value={lastName}
                                                        onChange={(e) => setLastname(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-24">
                                            <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} className='p_lg w-100 p-3 role'>
                                                <option value="" className='op'>Select a Role</option>
                                                <option value="franchise">Franchise</option>
                                                <option value="student">Student</option>
                                            </select>
                                        </div>

                                        <div className="mb-24">
                                            <input
                                                type="phone"
                                                className="form-control p_lg p-3 mt-3"
                                                id="phone"
                                                name="phone"
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
                                                id="login-email"
                                                name="email"
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
                                                id="login-password"
                                                name="password"
                                                required
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className="b-unstyle educate-btn w-100 mt-3">
                                            <span className="educate-btn__curve">Create Account</span>
                                        </button>
                                    </form>
                                    <div className="text-end">
                                        <h6 className='account'>
                                            Already have an account? <Link to="/login" className="color-primary"> Login</Link>
                                        </h6>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
