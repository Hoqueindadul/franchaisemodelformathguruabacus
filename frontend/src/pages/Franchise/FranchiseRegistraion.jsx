import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa6";

export default function FranchiseRegistraion() {
    const [fullName, setFullname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [note, setNote] = useState("");


    const handleFranchiseRegistration = async (e) => {
        e.preventDefault()
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


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
                                        <h2 className="mb-48 reg-heading">Register Now</h2>
                                    </div>
                                    <form onSubmit={handleFranchiseRegistration} className="form-validator">
                                        <div className="row ">
                                            <div className="col-sm-6">
                                                <div className="mb-24 ">
                                                    <input
                                                        type="text"
                                                        className="form-control p_lg p-3 mt-3"
                                                        id="full-name"
                                                        name="fullName"
                                                        required
                                                        placeholder="Full name"
                                                        value={fullName}
                                                        onChange={(e) => setFullname(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-24">
                                                    <input
                                                        type="text"
                                                        className="form-control p_lg p-3 mt-3"
                                                        id="email"
                                                        name="email"
                                                        required
                                                        placeholder="Email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
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
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-24 ">
                                                    <input
                                                        type="text"
                                                        className="form-control p_lg p-3 mt-3"
                                                        id="address"
                                                        name="address"
                                                        required
                                                        placeholder="Address"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-24">
                                            <input
                                                type="text"
                                                className="form-control franchieNoteInp p_lg p-3 mt-3"
                                                id="note"
                                                name="note"
                                                required
                                                placeholder="Note"
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
                                            <span className="educate-btn__curve text-light">Submit</span>
                                        </button>
                                    </form>
                                    <div className="text-end">
                                        <h6 className='account'>
                                            Already registered? <Link to="/login" className="color-primary"> Login</Link>
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
