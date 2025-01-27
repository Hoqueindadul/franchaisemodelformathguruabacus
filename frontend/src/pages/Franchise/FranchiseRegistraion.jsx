
import { useAuth } from '../../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../../utils.js';
import { LOCAL_BACKEND_URL } from '../../local_backend_url.js';
import { FaAngleRight } from "react-icons/fa6";


export default function FranchiseRegistration() {

    const [fullName, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    
    


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleFranchiseRegisttration = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('fullName', fullName)
        formData.append('email', email)
        formData.append('phone', phone)
        formData.append('address', address)
        formData.append('note', note)
        formData.append('password', password)



        try {
            console.log(BACKEND_URL);
            const response = await axios.post(`${BACKEND_URL}/api/franchises/franchiseRegister`, formData, {
                headers: {
                    "Content-Type": "application/json"
                },
            })
            toast.success("You are registered successfully.")
            localStorage.setItem('fullName', fullName);
            console.log(response.data);


            // Reset form fields
            setFullname("");
            setEmail("");
            setPhone("");
            setAddress("");
            setNote("");
            setPassword("");

            // Redirect after 2 seconds
            setTimeout(() => {
                navigate("/franchise-login");
            }, 2000);

        } catch (error) {
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message); // Show error message from backend
            } else {
                console.log(error);
                
                toast.error("An unexpected error occurred. Please try again."); // Fallback error message
            }

        }
    }

    return (
        <div>
            <div className="form_page">
                <div className="container franchise">
                    <div className="row franchiseRow">
                        <div className="col-xl-6">
                            <div className="form_block">
                                <div className="text_block">
                                    <Link to="/" className="educate_link_btn color-primary h6 mb-48">
                                        <FaAngleRight /> Back To Home
                                    </Link>
                                    <div className="title">
                                        <img src="/mic-speaker.png" alt="speaker icon" className="speaker_icon" />
                                        <h2 className="mb-48 reg-heading">Register Now</h2>
                                    </div>
                                    <form onSubmit={handleFranchiseRegisttration} className="form-validator">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="mb-24">
                                                    <input
                                                        type="text"
                                                        className="form-control p_lg p-3 mt-3"
                                                        placeholder="Full name"
                                                        value={fullName}
                                                        onChange={(e) => setFullname(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
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
                                            </div>
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
                                                type="text"
                                                className="form-control p_lg p-3 mt-3"
                                                id="address"
                                                name="address"
                                                required
                                                placeholder="Enter your address"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-24">
                                            <textarea
                                                className="form-control p_lg p-3 mt-3"
                                                placeholder="Note"
                                                id='note'
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
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
                                            <span className="educate-btn__curve text-light">Create Account</span>
                                        </button>
                                    </form>
                                    <div className="text-end">
                                        <h6 className='account'>
                                            Already have an account? <Link to="/franchise-login" className="color-primary"> Login</Link>
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
