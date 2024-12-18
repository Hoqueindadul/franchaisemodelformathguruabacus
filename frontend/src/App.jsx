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
import Whatwedo from "./pages/Whatwedo"
import Trainers from "./pages/Trainers"
import NoteFound from './pages/NotFound';
import Course_abacus from './pages/Course_abacus';
import Course_kidsEnglish from './pages/Course_kidsEnglish';
import Course_handwritting from './pages/Course_handwritting';
import Course_vedicMath from './pages/Course_vedicMath';
import Study_Center from './pages/Study_Center';
import School_tieup from './pages/School_tieup';
import Buy_materials from './pages/Buy_materials';

import Dashboard from './pages/dashbords/student_dashboard/Dashboard'




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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/whatwedo" element={<Whatwedo />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/studycenter" element={<Study_Center />} />
            <Route path="/school-tieup" element={<School_tieup />} />
            <Route path="/buymaterials" element={<Buy_materials />} />
            
            <Route path="/vedicmath" element={<Course_vedicMath />} />
            <Route path="/abacus" element={<Course_abacus />} />
            <Route path="/handwritting" element={<Course_handwritting />} />
            <Route path="/kidsenglish" element={<Course_kidsEnglish />} />

            {/* Universal route */}
            <Route path="*" element={<NoteFound/>} />

            <Route path="/dashboard/*" element={<Dashboard/>} />


        </Routes>
        <Toaster />
    { !hideNavbarFooter && <Footer /> }
    </div>
  )
}

export default App