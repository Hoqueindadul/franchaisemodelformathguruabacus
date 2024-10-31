
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../utils';
import { LOCAL_BACKEND_URL } from '../local_backend_url';

function Register() {
    
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    const handleRegister = async(e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('firstName', firstName)
        formData.append('lastName', lastName)
        formData.append('email', email)
        formData.append('password',password)

        try {
            const response = await axios.post(`${LOCAL_BACKEND_URL || BACKEND_URL}/api/users/register`, formData, {
                headers:{
                    "Content-Type":"application/json"
                }
            })
            console.log(response.data);
            toast.success("User register successfully.")
            setFirstname("")
            setLastname("")
            setEmail("")
            setPassword("")

            setTimeout(() => {
                navigate('/login')
            }, 2000);
            
        } catch (error) {
            console.log(error);
            toast.error("error.message || please fill the required field")
            
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
                                    <i className="fa-solid fa-chevron-left"></i> Back To Home
                                </Link>
                                <div className="title">
                                    <img src="/mic-speaker.png" alt="speaker icon" className="speaker_icon" />
                                    <h2 className="mb-48">Create an account</h2>
                                </div>
                                <form onSubmit={handleRegister} className="form-validator">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="mb-24">
                                                <input
                                                    type="text"
                                                    className="form-control p_lg"
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
                                                    className="form-control p_lg"
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
                                    <div className="mb-24">
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
                                        <span className="educate-btn__curve"></span>Create Account
                                    </button>
                                </form>
                                <div className="text-end">
                                    <h6>
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

export default Register