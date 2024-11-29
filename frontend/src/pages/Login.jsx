
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../utils';
import { LOCAL_BACKEND_URL } from '../local_backend_url';
import { FaAngleRight } from "react-icons/fa6";


const isProduction = process.env.NODE_ENV === 'production';
const BASE_URL = isProduction ? BACKEND_URL : LOCAL_BACKEND_URL;

export default function Login() {
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const handleLogin = async (e) => {
        e.preventDefault()

        if (!email && !password) {
            toast.error("Please fill the required field")
        }
        else {
            if (!password) {
                toast.error("Please enter your password")
            }
            if (!email) {
                toast.error("Please enter your email")
            }
        }

        try {
            const response = await axios.post(`${LOCAL_BACKEND_URL}/api/users/login`, {email, password}, {
            // const response = await axios.post(`${BACKEND_URL}/api/users/login`, { email, password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data);
            toast.success("User login successfully.")

            setEmail("")
            setPassword("")

            setTimeout(() => {
                navigate('/')
            }, 2000);

        } catch (error) {
            console.log(error);
            // toast.error("Error occuring! please try agian.")

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
                                        <h2 className="mb-48 login-heading">Login To Your Account</h2>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <Link to="#" className="link-btn h6 mb-24">
                                                <img src="/google.png" alt="Google icon" /> Login with Google
                                            </Link>
                                        </div>
                                        <div className="col-sm-6">
                                            <Link to="#" className="link-btn h6 mb-24">
                                                <img src="/facebook.png" alt="Facebook icon" /> Login with Facebook
                                            </Link>
                                        </div>
                                    </div>
                                    <h5 className="or mb-4">------------------- or -------------------</h5>
                                    <div className="text-center">
                                        <h6 className="mb-24">Login with your email address</h6>
                                    </div>
                                    <form onSubmit={handleLogin} className="form-validator">

                                        <div className="mb-24">
                                            <select name="role" id="role" className='p_lg w-100 p-3 role'>
                                                <option value="" className='op'>Select a Role</option>
                                                <option value="admin">Admin</option>
                                                <option value="franchise">Franchise</option>
                                                <option value="student">Student</option>
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
                                            />
                                        </div>
                                        <button type="submit" className="b-unstyle educate-btn w-100 mb-24">
                                            <span className="educate-btn__curve"></span>Login to Account
                                        </button>
                                    </form>
                                    <div className="bottom-row">
                                        <h6>
                                            Don't have an account? <Link to="/register" className="color-primary">Register</Link>
                                        </h6>
                                        <h6>
                                            <Link to="/register" className="color-primary">Forgot Password</Link>
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
