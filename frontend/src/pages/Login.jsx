
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../utils';

function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const handleLogin = async(e) => {
        e.preventDefault()
        
        if(!email || !password){
            toast.error("Please fill the required field")
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/users/login`, {email, password}, {
                headers:{
                    "Content-Type":"application/json"
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
                                <i class="fa-solid fa-chevron-left"></i> Back To Home
                                </Link>
                                <div className="title">
                                    <img src="/mic-speaker.png" alt="speaker icon" className="speaker_icon" />
                                    <h2 className="mb-48">Login To Your Account</h2>
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
                                        
                                    <div className="mb-24 another">
                                        <input
                                            type="email"
                                            className="form-control p_lg"
                                            id="login-email"
                                            name="email"
                                            required
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-24 another">
                                        <input
                                            type="password"
                                            className="form-control p_lg"
                                            id="login-password"
                                            name="password"
                                            required
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

export default Login