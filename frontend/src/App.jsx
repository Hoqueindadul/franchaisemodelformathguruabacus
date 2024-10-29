import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { Toaster } from 'react-hot-toast';

import NavBar from "../src/components/NavBar"
import Home from "../src/components/Home"
import Footer from "../src/components/Footer"

import Contact from "./pages/Contact"
import About from "./pages/About"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Courses from "./pages/Courses"
import Whatwedo from "./pages/Whatwedo"
import Trainers from "./pages/Trainers"
import Dashboard from "./pages/Dashboard"
import NoteFound from './pages/NotFound';


function App() {
    const location = useLocation()
    const hideNavbarFooter = ["/dashboard", "/register", "/login"].includes(location.pathname)

  return (
    <div>
    { !hideNavbarFooter && <NavBar /> }
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/whatwedo" element={<Whatwedo />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/dashboard" element={<Dashboard />} />
            

            {/* Universal route */}
            <Route path="*" element={<NoteFound/>} />
        </Routes>
        <Toaster />
    { !hideNavbarFooter && <Footer /> }
    </div>
  )
}

export default App